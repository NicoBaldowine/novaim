"use client";

import { useEffect, useRef } from "react";
import { MarkShape, Wordmark } from "./brand-mark";



const stories = [
  ["It starts with a signal.", "One point. A possibility waiting to connect."],
  ["Individual signals. Collective intelligence.", "Different points. A shared rhythm. Intelligence takes shape through connection."],
  ["A clear voice for a connected world.", "The points become a mark. The name gives their connection a clear, human voice."],
  ["NovaIM.", "One connected foundation. An entire ecosystem of possibilities."],
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export function LogoIntro() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const mark = root.querySelector<SVGGElement>(".intro-mark")!;

    const seed = root.querySelector<SVGCircleElement>(".intro-seed")!;
    const name = root.querySelector<HTMLElement>(".intro-lockup")!;
    const captions = Array.from(root.querySelectorAll<HTMLElement>(".intro-story"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const p = clamp(-rect.top / Math.max(1, root.offsetHeight - window.innerHeight));
      const still = reduced.matches;
      const gather = still ? 1 : ease((p - .25) / .25);
      const revealName = still ? 1 : ease((p - .67) / .13);
      const centerX = 500;
      const markAlpha = still ? 0 : ease((p - .3) / .17) * (1 - ease((p - .58) / .09));
      mark.style.opacity = String(markAlpha);
      const markScale = p < .64 && !still ? 1.85 : 1.44;
      mark.setAttribute("transform", `translate(${centerX - 65 * markScale} ${190 - 64.5 * markScale}) scale(${markScale})`);
      seed.setAttribute("cx", String(centerX));
      seed.setAttribute("r", String(78 + (2.9 * 2.4 - 78) * gather));
      seed.style.opacity = String(still ? 0 : 1 - ease((p - .47) / .03));
      name.style.opacity = String(revealName);
      name.style.transform = `translate(-50%, calc(-50% + ${(1 - revealName) * 8}px))`;
      const windows = [[.055, .14, .245, .3], [.33, .4, .55, .61], [.62, .69, .82, .87], [.85, .90, .95, 1]];
      captions.forEach((caption, i) => {
        const [a, b, c, d] = windows[i];
        const alpha = ease((p - a) / (b - a)) * (1 - ease((p - c) / (d - c)));
        caption.style.opacity = String(still ? 1 : alpha);
        caption.style.transform = still ? "none" : `translateY(${(1 - alpha) * 12}px)`;
        caption.setAttribute("aria-hidden", String(!still && alpha < .5));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const resize = new ResizeObserver(schedule);
    resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    render();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, []);

  return <section className="logo-intro" id="top" ref={section} aria-label="The story of the NovaIM identity">
    <div className="intro-stage">
      <h1 className="sr-only">NovaIM — A connected identity</h1>
      <div className="intro-composition">
        <svg className="intro-art" viewBox="0 0 1000 420" aria-hidden="true">
          <circle className="intro-seed" cx="500" cy="190" r="78" fill="white" />
          <g className="intro-mark" transform="translate(380 70) scale(2.4)"><MarkShape /></g>
        </svg>
        <div className="intro-lockup"><Wordmark /></div>
        <div className="intro-stories">{stories.map(([title, copy]) => <div className="intro-story" key={title}><p>{copy}</p></div>)}</div>
      </div>
    </div>
  </section>;
}
