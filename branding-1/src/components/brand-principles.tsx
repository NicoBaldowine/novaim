"use client";

import { useEffect, useRef } from "react";

// Complementary distributions: a concentrated volume and an open spherical shell.
const particles = Array.from({ length: 6000 }, (_, i) => {
  const sphere = i < 3000 ? 0 : 1;
  const n = i % 3000;
  const z = 1 - 2 * (n + .5) / 3000;
  const angle = n * 2.3999632297;
  const u = ((n * 1597) % 3000 + .5) / 3000;
  const radius = sphere === 0 ? Math.pow(u, .82) : .93 + .07 * u;
  const ring = Math.sqrt(1 - z * z) * radius;
  return { sphere, x: Math.cos(angle) * ring, y: Math.sin(angle) * ring, z: z * radius, seed: n * .731 };
});

export function BrandPrinciples() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = false, width = 0, height = 0, time = 0, last = 0;
    const buckets: number[][] = Array.from({ length: 8 }, () => []);
    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden || !width) { last = 0; return; }
      if (!reduced.matches && last && now - last < 32) { frame = requestAnimationFrame(draw); return; }
      if (last && !reduced.matches) time += Math.min(now - last, 80) / 1000;
      last = now;
      ctx!.clearRect(0, 0, width, height);
      buckets.forEach(bucket => { bucket.length = 0; });
      const unit = Math.min(width / 3.7, height / 2.5);
      for (const p of particles) {
        const angle = time * (p.sphere ? -.085 : .1);
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = p.x * c + p.z * s;
        const z = p.z * c - p.x * s;
        const size = p.sphere ? 1 : .82;
        const center = p.sphere ? .67 : -.94;
        const pulse = .5 + .5 * Math.sin(time * .7 + p.seed);
        const alpha = .17 + (z + 1) * .22 + (pulse > .96 ? .18 : 0);
        const bucket = buckets[Math.min(7, Math.floor(alpha * 8))];
        bucket.push(width / 2 + (center + x * size) * unit, height / 2 + p.y * unit * size);
      }
      ctx!.fillStyle = "#535957";
      const dot = Math.max(.65, Math.min(1.35, unit * .005));
      for (let i = 0; i < buckets.length; i++) {
        ctx!.globalAlpha = (i + 1) / 9;
        ctx!.beginPath();
        const points = buckets[i];
        for (let j = 0; j < points.length; j += 2) {
          ctx!.moveTo(points[j] + dot, points[j + 1]);
          ctx!.arc(points[j], points[j + 1], dot, 0, Math.PI * 2);
        }
        ctx!.fill();
      }
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    }
    function resume() { cancelAnimationFrame(frame); last = 0; frame = requestAnimationFrame(draw); }
    const resize = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio, 1.5);
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); resume();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    resize.observe(el); observer.observe(el);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); document.removeEventListener("visibilitychange", resume); reduced.removeEventListener("change", resume); };
  }, []);
  return <section className="principles section particle-duality" aria-label="Two connected particle spheres: one concentrated at its core, the other at its surface">
    <canvas ref={canvas} className="duality-canvas" aria-hidden="true" />
  </section>;
}
