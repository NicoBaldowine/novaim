"use client";

import { useEffect, useRef, useState } from "react";

const principles = [
  ["Intelligence that acts.", "Move business forward."],
  ["Systems, not tools.", "Build the connections."],
  ["Complexity made simple.", "Make room for clarity."],
];

const pointCount = 2352;
function position(i: number, state: number) {
  if (state === 2) {
    // A continuous particle field narrows smoothly into a single shared signal.
    const column = i % 49;
    const lane = Math.floor(i / 49);
    const t = column / 48;
    const v = lane / 47 * 2 - 1;
    const converge = Math.max(0, Math.min(1, (t - .08) / .76));
    const smooth = converge * converge * (3 - 2 * converge);
    const spread = 195 * (1 - smooth);
    const jitter = Math.sin(i * 12.9898) * 2.5 * (1 - smooth);
    return [55 + t * 390, 250 + v * spread + jitter, .25 + .45 * smooth];
  }
  const count = state === 1 ? 784 : pointCount;
  const local = state === 1 ? Math.floor(i / 3) : i;
  const depth = 1 - 2 * (local + .5) / count;
  const latitude = Math.sqrt(1 - depth * depth);
  const angle = local * 2.3999632297;
  const radius = state === 1 ? 105 : 190;
  let x = Math.cos(angle) * latitude * radius;
  let y = Math.sin(angle) * latitude * radius;
  if (state === 1) {
    // Identical projected spheres rotated 120 degrees around one shared junction.
    const orbit = (i % 3) * Math.PI * 2 / 3 - Math.PI / 2;
    const px = x;
    x = Math.cos(orbit) * (px + 82) - Math.sin(orbit) * y;
    y = Math.sin(orbit) * (px + 82) + Math.cos(orbit) * y;
  }
  return [250 + x, 250 + y, .22 + .65 * (depth + 1) / 2];
}

const shapes = [0, 1, 2].map(state => {
  const points = Array.from({ length: pointCount }, (_, i) => position(i, state));
  const minY = Math.min(...points.map(point => point[1]));
  const maxY = Math.max(...points.map(point => point[1]));
  const minX = Math.min(...points.map(point => point[0]));
  const maxX = Math.max(...points.map(point => point[0]));
  const scale = 390 / (maxY - minY);
  return points.map(([x, y, depth]) => [250 + (x - (minX + maxX) / 2) * scale, 250 + (y - (minY + maxY) / 2) * scale, depth]);
});
const tones = [[35, 108, 81], [42, 115, 91], [32, 103, 79]];

function PrincipleCanvas({ active }: { active: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const current = useRef(shapes[0].map(point => [...point]));
  const currentTone = useRef([...tones[0]]);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const from = current.current.map(point => [...point]);
    const fromTone = [...currentTone.current];
    const target = shapes[active];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, elapsed = 0, last = 0, visible = false, width = 0;
    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden) { last = 0; return; }
      if (last) elapsed += Math.min(now - last, 40);
      last = now;
      const progress = reduced.matches ? 1 : Math.min(1, elapsed / 2200);
      const t = progress * progress * (3 - 2 * progress);
      ctx!.clearRect(0, 0, width, width);
      currentTone.current = tones[active].map((value, i) => fromTone[i] + (value - fromTone[i]) * t);
      ctx!.fillStyle = `rgb(${currentTone.current.map(Math.round).join(",")})`;
      for (let i = 0; i < pointCount; i++) {
        const point = current.current[i];
        for (let axis = 0; axis < 3; axis++) point[axis] = from[i][axis] + (target[i][axis] - from[i][axis]) * t;
      }
      // Batch equal-opacity points into eight paths instead of 2,400 DOM animations.
      for (let bucket = 0; bucket < 8; bucket++) {
        ctx!.globalAlpha = (bucket + 1) / 9;
        ctx!.beginPath();
        for (const [x, y, depth] of current.current) {
          if (Math.min(7, Math.floor(depth * 8)) !== bucket) continue;
          const px = ((x - 250) * 1.1 + 250) / 500 * width;
          const py = ((y - 250) * 1.1 + 250) / 500 * width;
          const radius = (1.15 + depth * .45) / 500 * width;
          ctx!.moveTo(px + radius, py);
          ctx!.arc(px, py, radius, 0, Math.PI * 2);
        }
        ctx!.fill();
      }
      if (progress < 1) frame = requestAnimationFrame(draw);
    }
    function resume() { cancelAnimationFrame(frame); last = 0; frame = requestAnimationFrame(draw); }
    const resize = new ResizeObserver(() => {
      width = el.getBoundingClientRect().width;
      const dpr = Math.min(devicePixelRatio, 1.5);
      el.width = Math.round(width * dpr); el.height = Math.round(width * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resume();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    resize.observe(el); observer.observe(el);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); document.removeEventListener("visibilitychange", resume); reduced.removeEventListener("change", resume); };
  }, [active]);
  return <canvas ref={canvas} className="principles-canvas" />;
}

export function BrandPrinciples() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const lastChange = useRef(0);
  const select = (index: number) => { lastChange.current = 0; setActive(index); };
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let visible = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; lastChange.current = 0; });
    observer.observe(el);
    const timer = window.setInterval(() => {
      if (!visible || document.hidden || reduced.matches) return;
      lastChange.current += 200;
      if (lastChange.current < 6800) return;
      lastChange.current = 0;
      setActive(value => (value + 1) % principles.length);
    }, 200);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, []);
  return <section ref={root} className="principles section principles-experiment" aria-label="NovaIM principles">
    <div className="principles-editorial">
      <div className="principles-choices">{principles.map(([title, copy], index) => <button key={title} type="button" className={`principle-choice ${active === index ? "is-active" : ""}`} aria-pressed={active === index} onPointerEnter={() => select(index)} onFocus={() => select(index)} onClick={() => select(index)}><span><span className="principle-statement">{title}</span><span className="principle-consequence">{copy}</span></span></button>)}</div>
      <div className={`principles-instrument instrument-${active}`} aria-hidden="true">
        <PrincipleCanvas active={active} />

      </div>
    </div>
  </section>;
}
