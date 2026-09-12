"use client";

import { useEffect, useRef, useState } from "react";

export type SignalMode = "principles" | "signals" | "systems" | "infrastructure" | "positioning" | "momentum" | "resonance" | "identity";
const prompts = {
  principles: "A continuous field of intelligence",
  identity: "Explore a signal grid transforming into concentric patterns",
  momentum: "Explore coordinated signals moving forward",
  resonance: "Explore connections spreading through a signal field",
  positioning: "Explore intelligence moving through a circular foundation",
  signals: "Move to find focus · click to send a signal",
  systems: "Move to gather · click to synchronize",
  infrastructure: "Move to route · click to send a pulse",
};

export function SignalField({ mode = "signals", interactive = false, paused: externallyPaused = false, animatePalette = false, neural = false, pointScale = 1, ink }: { pointScale?: number; neural?: boolean; ink?: string; animatePalette?: boolean; mode?: SignalMode; interactive?: boolean; paused?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const interaction = useRef({ x: .5, y: .5, active: false, pulse: 0 });
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, visible = false, time = 0, last = 0;
    let flowTime = 0;
    let focusX = .5, focusY = .5, influence = 0, pulseStart = -10, previousPulse = 0;
    let paused = document.documentElement.dataset.motion === "paused";
    let color = "#62d8aa";

    function draw(now: number) {
      if (!ctx) return;
      const elapsed = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      const still = paused || externallyPaused || reduced.matches;
      if (!still && visible) time += elapsed;
      const pointer = interaction.current;
      const ease = still ? 1 : 1 - Math.exp(-elapsed * (mode === "principles" ? 2.2 : 6));
      influence += ((pointer.active ? 1 : 0) - influence) * ease;
      focusX += (pointer.x - focusX) * ease;
      focusY += (pointer.y - focusY) * ease;
      if (!still && visible) flowTime += elapsed * (1 + influence * 1.8);
      if (pointer.pulse !== previousPulse) { pulseStart = time; previousPulse = pointer.pulse; }
      const pulseAge = time - pulseStart;
      const surge = Math.max(0, 1 - pulseAge / 2.4);
      const cols = 29, rows = interactive ? 29 : 25;
      const gap = Math.min(width / (cols + 4), height / (rows + 4));
      const left = (width - (cols - 1) * gap) / 2;
      const top = (height - (rows - 1) * gap) / 2;
      const fx = (focusX * .7 + .15) * width;
      const fy = (focusY * .7 + .15) * height;
      ctx.clearRect(0, 0, width, height);
      if (mode === "identity" || animatePalette) {
        const mix = (.5 + .5 * Math.sin(time * .23)) * .8;
        const mint = [98, 216, 170], lilac = [196, 161, 232];
        color = `rgb(${mint.map((v, i) => Math.round(v + (lilac[i] - v) * mix)).join(",")})`;
      }
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      function dot(x: number, y: number, energy: number, radius: number) {
        if (!ctx) return;
        ctx.globalAlpha = Math.min(1, Math.max(.025, energy));
        ctx.beginPath(); ctx.arc(x, y, Math.max(.4, radius), 0, Math.PI * 2); ctx.fill();
      }
      if (mode === "principles") {
        const spacing = 7;
        const shade = [39, 63, 50].map((channel, i) => Math.round(channel + ([160, 196, 177][i] - channel) * influence));
        ctx.fillStyle = `rgb(${shade.join(",")})`;
        for (let y = 8; y < height; y += spacing) {
          for (let x = 6; x < width; x += spacing) {
            const nx = x / width, ny = y / height;
            const wave = .5 + .5 * Math.sin(nx * 10 - time * .38 + ny * 2.5);
            const veil = .035 + .58 * Math.pow(nx, 2.2);
            const edge = Math.sin(Math.PI * ny) ** .6;
            const energy = veil * (.2 + .8 * wave ** 2) * edge;
            dot(x, y + Math.sin(nx * 8 - time * .28) * 2, energy, .42 + wave * .3 + influence * (1.1 + wave * .5));
          }
        }
      }
      if (mode === "positioning") {
        // Orthographic projection of a complete spherical surface: density builds
        // naturally at the silhouette, with points continuing through the center.
        const size = Math.min(width, height);
        const radius = size * .47;
        const count = 3200;
        const rotation = flowTime * .085;
        const tilt = .22 + Math.sin(time * .12) * .045;
        const cr = Math.cos(rotation), sr = Math.sin(rotation);
        const ct = Math.cos(tilt), st = Math.sin(tilt);
        for (let i = 0; i < count; i++) {
          const z = 1 - 2 * (i + .5) / count;
          const latitude = Math.sqrt(1 - z * z);
          const angle = i * 2.399963229728653;
          const x = Math.cos(angle) * latitude;
          const y = Math.sin(angle) * latitude;
          const rx = x * cr + z * sr;
          const rz = z * cr - x * sr;
          const ry = y * ct - rz * st;
          const depth = y * st + rz * ct;
          const edge = Math.sqrt(rx * rx + ry * ry);
          const wave = .5 + .5 * Math.sin(ry * 5 + rx * 3 - time * .65);
          const response = influence * Math.exp(-((rx - (focusX - .5) * 2) ** 2 + (ry - (focusY - .5) * 2) ** 2) / .22);
          let activation = 0;
          if (neural) {
            // Sparse individual nodes breathe independently; no spatial rings.
            const selected = Math.sin(i * 127.1) * 43758.5453;
            const seedValue = selected - Math.floor(selected);
            if (seedValue > .83) {
              activation = Math.pow(.5 + .5 * Math.sin(time * (1.1 + seedValue * .8) + i * 2.39), 8) * .85;
            }
          }
          const base = neural ? .22 + .15 * edge ** 3 + .07 * wave : .56 + .20 * edge ** 3 + .16 * wave;
          const energy = (base + response * .15 + activation * .95) * (depth < 0 ? .34 : 1);
          // Smooth radial expansion increases central spacing without cutting a hole.
          const densityScale = Math.pow(Math.max(edge, .0001), -.28);
          dot(width / 2 + rx * densityScale * radius, height / 2 + ry * densityScale * radius,
            energy, pointScale * size * (.0019 + .00035 * edge + .0002 * wave + activation * .001));
        }
      }
      for (let y = 0; mode !== "positioning" && mode !== "principles" && y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const gx = left + x * gap, gy = top + y * gap;
          let px = gx, py = gy, energy = .1;
          if (mode === "identity") {
            // The same signals smoothly shift from a Cartesian grid into radial order.
            const morph = (.5 - .5 * Math.cos(time * .55)) * (1 - influence * .55);
            const index = y * cols + x;
            const angle = index * 2.3999632297 + time * .055;
            const radius = Math.sqrt((index + .5) / (rows * cols)) * Math.min(width, height) * .41;
            px = gx * (1 - morph) + (width / 2 + Math.cos(angle) * radius) * morph;
            py = gy * (1 - morph) + (height / 2 + Math.sin(angle) * radius) * morph;
            const cx = width * (.5 + .18 * Math.sin(time * .4)) * (1 - influence) + fx * influence;
            const cy = height * (.5 + .18 * Math.cos(time * .35)) * (1 - influence) + fy * influence;
            const d = Math.hypot(px - cx, py - cy) / gap;
            energy = .12 + .8 * Math.exp(-d * d / 30);
          } else if (mode === "momentum") {
            // Parallel streams carry a shared impulse forward across the whole field.
            const speed = time * (1.1 + influence * .6);
            const crest = Math.sin(x * .22 - speed + y * .12);
            py += crest * gap * (1.1 + influence * 1.5);
            const band = Math.pow((Math.sin(x * .32 - speed * 2 + y * .09) + 1) / 2, 6);
            energy = .12 + band * .8;
            px += Math.sin(time * .4 + y * .3) * gap * .2;
          } else if (mode === "resonance") {
            // Two origins radiate outward; their interference reveals shared connections.
            const originX = cols * (.32 + influence * (focusX - .5) * .3);
            const originY = rows * (.45 + influence * (focusY - .5) * .3);
            const d1 = Math.hypot(x - originX, y - originY);
            const d2 = Math.hypot(x - (cols - originX), y - (rows - originY));
            const a = Math.sin(d1 * .65 - time * 1.5);
            const b = Math.sin(d2 * .65 - time * 1.5);
            energy = .1 + Math.pow((a + b + 2) / 4, 4) * .9;
            px += Math.cos(d1 * .3 + time * .4) * gap * .15;
          } else if (mode === "signals") {
            // A moving focus resolves a dim field into a clear, coherent signal.
            const cx = width * (.5 + .19 * Math.sin(time * .36)) * (1 - influence) + fx * influence;
            const cy = height * (.5 + .15 * Math.cos(time * .44)) * (1 - influence) + fy * influence;
            const distance = Math.hypot(gx - cx, gy - cy) / gap;
            const focus = Math.exp(-distance * distance / 23);
            const ripple = Math.exp(-Math.pow(distance - pulseAge * 9, 2) / 1.8) * surge;
            energy = .09 + focus * .8 + ripple * .8;
            px += Math.sin(y * 3.4 + x * 1.7 + time * .3) * gap * .13 * (1 - focus);
            py += Math.cos(x * 2.1 + y * .8 + time * .25) * gap * .13 * (1 - focus);
          } else if (mode === "systems") {
            // Four independent groups coordinate into a single shared grid.
            const align = Math.min(1, .5 + .5 * Math.sin(time * .55 - 1.2) + influence * .6 + surge);
            const groupX = x < cols / 2 ? -1 : 1;
            const groupY = y < rows / 2 ? -1 : 1;
            const scatter = 1 - align;
            px += (groupX * gap * 1.3 + Math.sin(x * 5.7 + y * 2.3) * gap * .8) * scatter;
            py += (groupY * gap * 1.3 + Math.cos(y * 3.9 + x) * gap * .8) * scatter;
            px += (fx - width / 2) * influence * .1;
            py += (fy - height / 2) * influence * .1;
            const beat = Math.pow((Math.sin(time * 2 - x * .18) + 1) / 2, 5);
            energy = .15 + align * .3 + beat * (.25 + align * .25);
          } else {
            // The backbone never shifts. Packets travel through connected lanes.
            const rowStep = interactive ? 7 : 6;
            const lane = x % 7 === 0 || y % rowStep === 0;
            const routeY = (1 - influence) * (.5 + .45 * Math.sin(time * .4)) + influence * focusY;
            const route = Math.round((routeY * (rows - 1)) / rowStep) * rowStep;
            const column = Math.round((focusX * (cols - 1)) / 7) * 7;
            const selected = y === route;
            const phase = ((x + y * .6 - flowTime * 7) % 14 + 14) % 14;
            const packet = Math.exp(-Math.pow(phase - 7, 2) / 2.5);
            energy = lane ? .24 + packet * .55 : .045;
            if (selected) energy += .12 + influence * .28 + surge * packet * .5;
            if (x === column) energy += influence * (.2 + packet * .35);
          }
          dot(px, py, energy, gap * (.085 + energy * .11));
        }
      }
      // Larger junctions distinguish the stable infrastructure from its traffic.
      if (mode === "infrastructure") {
        for (let y = 0; y < rows; y += interactive ? 7 : 6) {
          for (let x = 0; x < cols; x += 7) {
            const px = left + x * gap, py = top + y * gap;
            ctx.globalAlpha = .24;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(px, py, gap * .5, 0, Math.PI * 2); ctx.stroke();
            dot(px, py, .8, gap * .16);
          }
        }
      }
      ctx.globalAlpha = 1;
      if (visible && !still && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function restart() { cancelAnimationFrame(frame); last = 0; draw(performance.now()); }
    function onMotion() { paused = document.documentElement.dataset.motion === "paused"; restart(); }
    function onInteraction() { if (paused || externallyPaused || reduced.matches) restart(); }
    const row = mode === "principles" ? el.closest(".principle-row") : null;
    const enterRow = () => { interaction.current.active = true; onInteraction(); };
    const leaveRow = () => { interaction.current.active = false; onInteraction(); };
    row?.addEventListener("pointerenter", enterRow);
    row?.addEventListener("pointerleave", leaveRow);
    row?.addEventListener("focusin", enterRow);
    row?.addEventListener("focusout", leaveRow);
    const resize = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = width * dpr; el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = ink ?? getComputedStyle(el).color;
      restart();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    resize.observe(el); observer.observe(el);
    reduced.addEventListener("change", restart);
    window.addEventListener("brand-motion", onMotion);
    window.addEventListener("signal-interaction", onInteraction);
    document.addEventListener("visibilitychange", restart);
    return () => {
      row?.removeEventListener("pointerenter", enterRow);
      row?.removeEventListener("pointerleave", leaveRow);
      row?.removeEventListener("focusin", enterRow);
      row?.removeEventListener("focusout", leaveRow);
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      reduced.removeEventListener("change", restart);
      window.removeEventListener("brand-motion", onMotion);
      window.removeEventListener("signal-interaction", onInteraction);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [mode, interactive, externallyPaused, animatePalette, ink, neural, pointScale]);
  const graphic = <canvas ref={canvas} className="signal-canvas" aria-hidden="true" />;
  if (!interactive) return graphic;
  return <button type="button" className="signal-interaction" aria-label={prompts[mode]} onPointerMove={event => {
    const rect = event.currentTarget.getBoundingClientRect();
    interaction.current.x = (event.clientX - rect.left) / rect.width;
    interaction.current.y = (event.clientY - rect.top) / rect.height;
    interaction.current.active = true;
    window.dispatchEvent(new Event("signal-interaction"));
  }} onPointerLeave={() => { interaction.current.active = false; }} onFocus={() => { interaction.current.active = true; window.dispatchEvent(new Event("signal-interaction")); }} onBlur={() => { interaction.current.active = false; }} onClick={() => {
    interaction.current.pulse += 1;
    window.dispatchEvent(new Event("signal-interaction"));
  }}>{graphic}</button>;
}

export function MotionControl() {
  const [paused, setPaused] = useState(false);
  return <button className="motion-control" aria-pressed={paused} onClick={() => {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? "paused" : "playing";
    window.dispatchEvent(new Event("brand-motion"));
  }}>{paused ? "Play motion ↗" : "Pause motion Ⅱ"}</button>;
}
