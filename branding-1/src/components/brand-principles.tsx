"use client";

import { useEffect, useRef } from "react";

// Both surfaces share the positioning sphere geometry; hover dissolves the pair.
const particles = Array.from({ length: 6000 }, (_, i) => {
  const sphere = i < 3000 ? 0 : 1;
  const n = i % 3000;
  const z = 1 - 2 * (n + .5) / 3000;
  const angle = n * 2.3999632297;
  const u = ((n * 1597) % 3000 + .5) / 3000;
  const radius = 1;
  const ring = Math.sqrt(1 - z * z) * radius;
  return { sphere, x: Math.cos(angle) * ring, y: Math.sin(angle) * ring, z: z * radius, seed: n * .731, scatterX: (u * 2 - 1) * 1.7, scatterY: (((n * 1091) % 3000 + .5) / 3000 * 2 - 1) * 1.05 };
});

export function BrandPrinciples() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = false, width = 0, height = 0, time = 0, last = 0, dissolve = 0, target = 0;
    const buckets: number[][] = Array.from({ length: 16 }, () => []);
    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden || !width) { last = 0; return; }
      if (!reduced.matches && last && now - last < 32) { frame = requestAnimationFrame(draw); return; }
      if (last && !reduced.matches) time += Math.min(now - last, 80) / 1000;
      last = now;
      dissolve += (target - dissolve) * (reduced.matches ? 1 : .035);
      ctx!.clearRect(0, 0, width, height);
      buckets.forEach(bucket => { bucket.length = 0; });
      const unit = Math.min(width / 3.7, height / 2.5);
      const rotations = [time * .085, -time * .085].map(a => [Math.cos(a), Math.sin(a)]);
      const tilt = .22, ct = Math.cos(tilt), st = Math.sin(tilt);
      for (const p of particles) {
        const [c, s] = rotations[p.sphere];
        const x = p.x * c + p.z * s;
        const rz = p.z * c - p.x * s;
        const y = p.y * ct - rz * st;
        const z = p.y * st + rz * ct;
        const edge = Math.hypot(x, y);
        const radial = Math.pow(Math.max(edge, .0001), -.28);
        const size = p.sphere ? 1 : .82;
        const center = p.sphere ? .57 : -.76;
        const px = center + x * radial * size;
        const py = y * radial * size;
        // The inward-facing halves fade gently through their shared intersection.
        const inward = p.sphere ? -x : x;
        const fade = 1 - .84 * Math.pow(Math.max(0, Math.min(1, (inward + .15) / 1.15)), 1.2);
        const pulse = Math.pow(.5 + .5 * Math.sin(time * .7 + p.seed), 16);
        const alpha = (.28 + .17 * edge ** 3 + pulse * .17) * (z < 0 ? .4 : 1) * fade;
        const opacity = alpha * (1 - dissolve) + .24 * dissolve;
        const bucket = buckets[Math.min(15, Math.floor(opacity * 16))];
        const driftX = Math.sin(time * .2 + p.seed) * .06;
        const driftY = Math.cos(time * .17 + p.seed) * .06;
        bucket.push(width / 2 + (px + (p.scatterX + driftX - px) * dissolve) * unit,
          height / 2 + (py + (p.scatterY + driftY - py) * dissolve) * unit);
      }
      ctx!.fillStyle = "#535957";
      const dot = Math.max(.65, Math.min(1.35, unit * .005));
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
    const enter = () => { target = 1; resume(); };
    const leave = () => { target = 0; resume(); };
    el.addEventListener("pointerenter", enter); el.addEventListener("pointerleave", leave);
    el.addEventListener("focus", enter); el.addEventListener("blur", leave);
    resize.observe(el); observer.observe(el);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener("change", resume);
    return () => { el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); el.removeEventListener("focus", enter); el.removeEventListener("blur", leave); cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); document.removeEventListener("visibilitychange", resume); reduced.removeEventListener("change", resume); };
  }, []);
  return <section className="principles section particle-duality" aria-label="Two overlapping particle spheres with a translucent connection">
    <canvas ref={canvas} className="duality-canvas" tabIndex={0} role="img" aria-label="Hover or focus to dissolve the spheres; leave to reform them" />
  </section>;
}
