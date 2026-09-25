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
  const targetPalette = useRef(colors.slice(1, 3).map(rgb));
  const currentPalette = useRef(colors.slice(1, 3).map(rgb));
  const [visited, setVisited] = useState(active);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    targetPalette.current = colors.slice(1, 3).map(rgb);
  }, [colors]);

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
      const selected = colors;
      const source = document.createElement("canvas");
      source.width = 320;
      source.height = 240;
      const context = source.getContext("2d")!;
      let frame = context.createImageData(source.width, source.height);
      const renderer = createStudioRenderer(target, {
        style: "dots",
        cellSize: 5,
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
      let viewportHeight = 1;
      let verticalSpan = 1;
      let field = new FluidField(1, 2.4, true);
      let raf = 0;
      let last = 0;
      let time = phase;
      let first = true;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)");
      const canAnimate = () => running.current && !document.hidden && !reduced.matches;

      const paint = () => {
        const current = currentPalette.current;
        const targetColors = targetPalette.current;
        for (let band = 0; band < current.length; band++) {
          for (let channel = 0; channel < 3; channel++) {
            current[band][channel] += (targetColors[band][channel] - current[band][channel]) * .045;
          }
        }
        const [low, high] = current;
        paintLiquidSource(frame.data, source.width, source.height, width / viewportHeight, time, field, verticalSpan, .22);
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
        viewportHeight = Math.max(1, Math.min(height, window.innerHeight));
        verticalSpan = Math.max(1, height / viewportHeight);
        source.height = Math.min(960, Math.max(240, Math.round(source.width * height / width)));
        frame = context.createImageData(source.width, source.height);
        field = new FluidField(width / viewportHeight, 2.4, true);
        sync();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(element);
      document.addEventListener("visibilitychange", sync);
      reduced.addEventListener("change", sync);
      wake.current = sync;
      resize();

      cleanup = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        renderer.destroy();
        wake.current = null;
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
  }, [visited, phase]);

  return <div ref={host} className="product-fluid" data-ready={ready} aria-hidden="true">
    <canvas ref={canvas} />
  </div>;
}
