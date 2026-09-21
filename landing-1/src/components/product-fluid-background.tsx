"use client";

import { useEffect, useRef, useState } from "react";
import { FluidField, paintLiquidSource } from "@/lib/vendor/asciify/fluid-field";

const rgb = (hex: string) => [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16));

export function ProductFluidBackground({
  colors,
  active,
  phase = 7,
}: {
  colors: string[];
  active: boolean;
  phase?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const running = useRef(active);
  const wake = useRef<(() => void) | null>(null);
  const [visited, setVisited] = useState(active);
  const [ready, setReady] = useState(false);
  const palette = colors.join(",");

  useEffect(() => {
    running.current = active;
    if (active) setVisited(true);
    wake.current?.();
  }, [active]);

  useEffect(() => {
    if (!visited || !canvas.current || !host.current) return;
    const element = host.current;
    const target = canvas.current;
    let disposed = false;
    let cleanup = () => {};

    async function mount() {
      const { createStudioRenderer } = await import("asciify-engine/studio");
      if (disposed) return;
      const selected = palette.split(",");
      const low = rgb(selected[1]);
      const high = rgb(selected[2]);
      const source = document.createElement("canvas");
      source.width = 320;
      source.height = 240;
      const context = source.getContext("2d")!;
      const frame = context.createImageData(source.width, source.height);
      const renderer = createStudioRenderer(target, {
        style: "dots",
        cellSize: 8,
        colorMode: "source",
        backdrop: { mode: "solid", color: "#080809" },
        color: { brightness: 0, contrast: 1, saturation: 1 },
        dither: {
          algorithm: "bayer4",
          palette: "custom",
          colors: ["#080809", selected[1], selected[2]],
          scale: 1,
          amount: 1,
        },
        motion: { type: "none" },
        hover: { effect: "none" },
      }, { maxDimension: 1920, maxCells: 65000, pixelRatio: 1 });

      let width = 1;
      let height = 1;
      let field = new FluidField(1, 2.4, true);
      let raf = 0;
      let last = 0;
      let time = phase;
      let first = true;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)");
      const canAnimate = () => running.current && !document.hidden && !reduced.matches;

      const paint = () => {
        paintLiquidSource(frame.data, source.width, source.height, width / height, time, field);
        for (let i = 0; i < frame.data.length; i += 4) {
          const light = Math.min(1, Math.pow(frame.data[i] / 255, .86));
          const mix = Math.min(1, Math.max(0, (light - .15) / .65));
          for (let c = 0; c < 3; c++) {
            frame.data[i + c] = (low[c] + (high[c] - low[c]) * mix) * light;
          }
        }
        context.putImageData(frame, 0, 0);
        renderer.invalidate();
        renderer.render(source, time, width, height);
        if (first) {
          first = false;
          setReady(true);
        }
      };

      const tick = (now: number) => {
        raf = 0;
        if (disposed || !running.current || document.hidden) return;
        if (!last || now - last >= 1000 / 24) {
          const dt = last ? Math.min((now - last) / 1000, .08) : 0;
          last = now;
          if (!reduced.matches) {
            time += dt * .48;
            field.step(dt);
          }
          paint();
        }
        if (canAnimate()) raf = requestAnimationFrame(tick);
      };

      const sync = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        if (running.current && !document.hidden) raf = requestAnimationFrame(tick);
        else field.clear();
      };

      const resize = () => {
        const rect = element.getBoundingClientRect();
        width = Math.max(1, Math.round(rect.width));
        height = Math.max(1, Math.round(rect.height));
        field = new FluidField(width / height, 2.4, true);
        sync();
      };

      const surface = element.closest("article")!;
      const pointer = (event: PointerEvent) => {
        if (!canAnimate() || event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        field.move(
          (event.clientX - rect.left) / rect.width,
          (event.clientY - rect.top) / rect.height,
        );
      };
      const leave = () => field.leave();
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      surface.addEventListener("pointermove", pointer);
      surface.addEventListener("pointerleave", leave);
      document.addEventListener("visibilitychange", sync);
      reduced.addEventListener("change", sync);
      wake.current = sync;
      resize();

      cleanup = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        renderer.destroy();
        wake.current = null;
        surface.removeEventListener("pointermove", pointer);
        surface.removeEventListener("pointerleave", leave);
        document.removeEventListener("visibilitychange", sync);
        reduced.removeEventListener("change", sync);
      };
    }

    mount().catch(error => {
      if (!disposed) {
        cleanup();
        setReady(false);
        if (process.env.NODE_ENV === "development") console.error("Product fluid background failed", error);
      }
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [visited, palette, phase]);

  return <div ref={host} className="product-fluid" data-ready={ready} aria-hidden="true">
    <canvas ref={canvas} />
  </div>;
}
