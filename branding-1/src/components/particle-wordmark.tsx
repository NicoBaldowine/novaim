"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "./brand-mark";

const random = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

export function ParticleWordmark() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = root.current;
    const surface = canvas.current;
    const svg = el?.querySelector("svg");
    const ctx = surface?.getContext("2d");
    if (!el || !surface || !svg || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false, frame = 0, active = false, complete = false, ready = false;
    let elapsed = 0, last = 0, width = 0, height = 0;
    const points: { x: number; y: number; seed: number }[] = [];
    const show = () => { el.style.setProperty("--wordmark-ink", "1"); surface.style.opacity = "0"; };
    const draw = (now: number) => {
      frame = 0;
      if (disposed || !active || document.hidden || !ready || complete) { last = 0; return; }
      if (reduced.matches) { show(); complete = true; return; }
      if (last) elapsed += Math.min(now - last, 64);
      last = now;
      const p = Math.min(1, elapsed / 3200);
      const settle = 1 - Math.pow(1 - p, 4);
      const fade = Math.max(0, Math.min(1, (p - .78) / .22));
      el.style.setProperty("--wordmark-ink", String(fade));
      surface.style.opacity = String(1 - fade);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#080a09";
      ctx.beginPath();
      const textHeight = width * 87 / 618;
      const top = (height - textHeight) / 2;
      for (const point of points) {
        const startX = (random(point.seed + 17) - .5) * width * 1.2 + width / 2;
        const startY = (random(point.seed + 71) - .5) * height * .9 + height / 2;
        const bend = Math.sin(p * Math.PI) * (1 - settle);
        const x = startX + (point.x * width - startX) * settle + Math.sin(point.seed) * width * .12 * bend;
        const y = startY + (top + point.y * textHeight - startY) * settle + Math.cos(point.seed) * height * .15 * bend;
        const radius = Math.max(.65, width / 1000) * (1.15 + random(point.seed + 5) * .85);
        ctx.moveTo(x + radius, y); ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
      if (p < 1) frame = requestAnimationFrame(draw);
      else { complete = true; show(); }
    };
    const resume = () => { cancelAnimationFrame(frame); last = 0; if (!complete) frame = requestAnimationFrame(draw); };
    const resize = new ResizeObserver(() => {
      width = el.clientWidth; height = el.clientHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      surface.width = Math.round(width * dpr); surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); resume();
    });
    resize.observe(el);
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting && entry.intersectionRatio >= .45;
      resume();
    }, { threshold: [0, .45] });
    observer.observe(el);
    const copy = svg.cloneNode(true) as SVGSVGElement;
    copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    copy.setAttribute("width", "1236"); copy.setAttribute("height", "174");
    copy.style.color = "#000";
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)], { type: "image/svg+xml" }));
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      if (disposed) return;
      const mask = document.createElement("canvas"); mask.width = 1236; mask.height = 174;
      const context = mask.getContext("2d");
      if (!context) { show(); return; }
      context.drawImage(image, 0, 0);
      const data = context.getImageData(0, 0, 1236, 174).data;
      for (let y = 1; y < 174; y += 3) for (let x = 1; x < 1236; x += 3) {
        if (data[(y * 1236 + x) * 4 + 3] > 128) points.push({ x: x / 1236, y: y / 174, seed: x * .71 + y * 1.37 });
      }
      ready = true; resume();
    };
    image.onerror = () => { URL.revokeObjectURL(url); show(); };
    image.src = url;
    document.addEventListener("visibilitychange", resume); reduced.addEventListener("change", resume);
    return () => { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); URL.revokeObjectURL(url); document.removeEventListener("visibilitychange", resume); reduced.removeEventListener("change", resume); };
  }, []);
  return <div ref={root} className="particle-wordmark assembling-wordmark"><Wordmark textOnly /><canvas ref={canvas} className="wordmark-assembly" aria-hidden="true" /></div>;
}
