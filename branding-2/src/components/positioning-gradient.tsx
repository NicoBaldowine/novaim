"use client";

import { useEffect, useRef } from "react";

export function PositioningGradient() {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = field.current;
    if (!container) return;
    const videos = Array.from(container.querySelectorAll("video"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let active = 0;
    let blending = false;
    let frame = 0;
    const overlap = 2;
    videos.forEach((video) => { video.playbackRate = .75; });
    const play = (video: HTMLVideoElement) => { void video.play().catch(() => {}); };
    const sync = () => {
      if (visible && !document.hidden && !reduced.matches) {
        play(videos[active]);
        if (blending) play(videos[1 - active]);
      } else videos.forEach((video) => video.pause());
    };
    const tick = () => {
      const outgoing = videos[active];
      const incoming = videos[1 - active];
      if (visible && !document.hidden && !reduced.matches && Number.isFinite(outgoing.duration)) {
        const start = outgoing.duration - overlap;
        if (!blending && outgoing.currentTime >= start && incoming.readyState >= 2) {
          incoming.currentTime = 0;
          blending = true;
          play(incoming);
        }
        if (blending) {
          const progress = Math.min(1, incoming.currentTime / overlap);
          const fade = progress * progress * (3 - 2 * progress);
          outgoing.style.opacity = String(1 - fade);
          incoming.style.opacity = String(fade);
          if (progress >= 1) {
            outgoing.pause();
            outgoing.currentTime = 0;
            active = 1 - active;
            blending = false;
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(container);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      videos.forEach((video) => video.pause());
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return <div ref={field} className="positioning-wave positioning-knot" aria-hidden="true">
    {[0, 1].map((index) => <video key={index} muted playsInline preload="auto" style={{ opacity: index === 0 ? 1 : 0 }} poster="/media/novaim-knot-poster.png">
      <source src="/media/novaim-knot.mp4" type="video/mp4" />
    </video>)}
  </div>;
}
