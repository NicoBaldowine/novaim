"use client";

import { useEffect, useId, useRef } from "react";
import { TypeShape } from "./brand-mark";

const dots = Array.from({ length: 207 * 30 }, (_, i) => ({ x: 202 + (i % 207) * 3, y: 20 + Math.floor(i / 207) * 3 }));

export function BrandPrinciples() {
  const id = useId().replace(/:/g, "");
  const section = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const root = section.current;
    const art = svg.current;
    if (!root || !art) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const light = art.querySelector<SVGRadialGradientElement>(".wordmark-light")!;
    const route = art.querySelector<SVGPathElement>(".light-route")!;
    const length = route.getTotalLength();
    const samples = Array.from({ length: 700 }, (_, i) => route.getPointAtLength(i / 699 * length));
    let frame = 0, visible = false, last = 0, time = 0, lastPointerMove = -Infinity;
    let pointer: { x: number; y: number } | null = null;
    const position = { x: 209, y: 98 };
    const illuminate = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) { last = 0; return; }
      const dt = last ? Math.min(now - last, 64) / 1000 : 1 / 60;
      last = now;
      if (!reduced.matches) time += dt;
      const auto = route.getPointAtLength((time / 15 % 1) * length);
      const target = pointer && now - lastPointerMove < 1400 ? pointer : auto;
      const blend = reduced.matches ? 1 : 1 - Math.exp(-dt * 7);
      position.x += (target.x - position.x) * blend;
      position.y += (target.y - position.y) * blend;
      light.setAttribute("cx", String(position.x));
      light.setAttribute("cy", String(position.y));
      if (!reduced.matches) frame = requestAnimationFrame(illuminate);
    };
    const resume = () => { if (!frame) frame = requestAnimationFrame(illuminate); };
    const move = (event: PointerEvent) => {
      const matrix = art.getScreenCTM();
      if (!matrix) return;
      const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      // Keep the light on the lettering, even when the cursor crosses a counter.
      pointer = samples.reduce((closest, point) =>
        Math.hypot(point.x - p.x, point.y - p.y) < Math.hypot(closest.x - p.x, closest.y - p.y) ? point : closest);
      lastPointerMove = performance.now(); resume();
    };
    const leave = () => { pointer = null; resume(); };
    art.addEventListener("pointermove", move);
    art.addEventListener("pointerleave", leave);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (entry.intersectionRatio >= .3) root.classList.add("wordmark-visible");
      resume();
    }, { threshold: [0, .3] });
    if (reduced.matches) root.classList.add("wordmark-visible");
    else root.classList.add("wordmark-reveal-ready");
    observer.observe(root);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", resume); reduced.removeEventListener("change", resume); art.removeEventListener("pointermove", move); art.removeEventListener("pointerleave", leave); };
  }, []);
  return <section ref={section} className="principles section chromatic-wordmark" id="wordmark" aria-label="NovaIM">
    <svg ref={svg} className="wordmark-window" viewBox="202 20 618 87" role="img" aria-label="NovaIM — a black wordmark with a grid of light dots with automatic illumination that follows the cursor on hover">
      <defs>
        <path className="light-route" d="M209 98 V35 Q209 22 220 29 L282 98 Q297 106 297 91 V29 M374 29 C310 29 310 98 374 98 C439 98 439 29 374 29 M443 29 L481 97 Q488 103 496 96 L534 29 M539 99 L575 32 Q585 20 595 32 L632 99 M553 82 H617 M665 29 V99 M700 99 V36 Q700 20 715 31 L750 96 Q756 105 763 94 L794 33 Q810 18 812 36 V99" />
        <clipPath id={`${id}-letters`}><TypeShape /></clipPath>
        <radialGradient className="wordmark-light" id={`${id}-light`} gradientUnits="userSpaceOnUse" cx="260" cy="63" r="38">
          <stop stopColor="#fff" /><stop offset=".45" stopColor="#fff" /><stop offset="1" stopColor="#262a28" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${id}-letters)`}>
        <rect x="202" y="20" width="618" height="87" fill="#080a09" />
        {dots.map((dot, i) => <circle className="ink-dot" key={i} cx={dot.x} cy={dot.y} r=".27" fill={`url(#${id}-light)`} />)}
      </g>
    </svg>
  </section>;
}
