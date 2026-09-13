"use client";

import { useEffect, useRef } from "react";
import { ParticleWordmark } from "./particle-wordmark";

// Keep the two original volumes suspended partway through their dissolution.
const random = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
const particles = Array.from({ length: 6000 }, (_, i) => {
  const n = i % 3000;
  const z = 1 - 2 * (n + .5) / 3000;
  const angle = n * 2.3999632297;
  const ring = Math.sqrt(1 - z * z);
  return {
    sphere: i < 3000 ? -1 : 1,
    x: Math.cos(angle) * ring, y: Math.sin(angle) * ring, z,
    scatterX: (random(i + 1) * 2 - 1) * 1.7,
    scatterY: (random(i + 9001) * 2 - 1) * 1.05,
    seed: random(i + 18001) * Math.PI * 2,
    depth: random(i + 27001),
  };
});

export function BrandPrinciples() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = false, width = 0, height = 0, time = 0, last = 0;
    const buckets: number[][] = Array.from({ length: 16 }, () => []);
    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden || !width) { last = 0; return; }
      if (!reduced.matches && last && now - last < 32) { frame = requestAnimationFrame(draw); return; }
      if (last && !reduced.matches) time += Math.min(now - last, 80) / 1000;
      last = now;
      ctx!.clearRect(0, 0, width, height);
      buckets.forEach(bucket => { bucket.length = 0; });
      const unit = Math.min(Math.min(width * .88, 1300) / 3.7, height / 2.9);
      const dissolve = .72 + Math.sin(time * .12) * .055;
      for (const p of particles) {
        const angle = time * .055 * p.sphere;
        const x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
        const z = p.z * Math.cos(angle) - p.x * Math.sin(angle);
        const y = p.y * Math.cos(.22) - z * Math.sin(.22);
        const px = p.sphere * .665 + x;
        const driftX = Math.sin(time * .2 + p.seed) * .055;
        const driftY = Math.cos(time * .17 + p.seed) * .055;
        const screenX = width / 2 + (px * (1 - dissolve) + p.scatterX * dissolve + driftX) * unit;
        const screenY = height / 2 + (y * (1 - dissolve) + p.scatterY * dissolve + driftY) * unit;
        const opacity = .16 + p.depth * .12;
        buckets[Math.floor(opacity * 16)].push(screenX, screenY);
      }
      ctx!.fillStyle = "#535957";
      const dot = Math.max(.7, Math.min(1.4, width / 1000));
      for (let i = 0; i < buckets.length; i++) {
        ctx!.globalAlpha = (i + .5) / 16;
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
  return <section className="principles section particle-duality" id="wordmark" aria-label="NovaIM">
    <canvas ref={canvas} className="duality-canvas" aria-hidden="true" />
    <ParticleWordmark />
  </section>;
}
