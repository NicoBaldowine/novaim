"use client";

import { useEffect, useRef } from "react";
import { Wordmark } from "./brand-mark";

export function LogoConstruction() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current;
    const mark = container?.querySelector<HTMLElement>(".brand-mark");
    const text = container?.querySelector<HTMLElement>(".wordmark > span:last-child");
    if (!container || !mark || !text) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const box = container.getBoundingClientRect();
      const m = mark.getBoundingClientRect();
      const t = text.getBoundingClientRect();
      const style = getComputedStyle(text);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.letterSpacing = style.letterSpacing;
      const ink = ctx.measureText("NovaIM");
      const cap = ctx.measureText("IM");
      const baseline = t.top - box.top + (t.height - ink.fontBoundingBoxAscent - ink.fontBoundingBoxDescent) / 2 + ink.fontBoundingBoxAscent;
      const values = {
        "mark-left": m.left - box.left + m.width * .04,
        "mark-right": m.left - box.left + m.width * .95,
        "mark-top": m.top - box.top + m.height * .06,
        "mark-bottom": m.top - box.top + m.height * .94,
        "ink-left": t.left - box.left - ink.actualBoundingBoxLeft,
        "ink-right": t.left - box.left + ink.actualBoundingBoxRight,
        "cap-top": baseline - cap.actualBoundingBoxAscent,
        "cap-bottom": baseline + cap.actualBoundingBoxDescent,
      };
      Object.entries(values).forEach(([key,value]) => container.style.setProperty(`--${key}`, `${value}px`));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(text);
    void document.fonts.ready.then(measure);
    return () => { disposed = true; observer.disconnect(); };
  }, []);
  return <div className="logo-construction measured-construction" ref={root}><Wordmark /><div className="logo-guides" aria-hidden="true">
    {["mark-top", "mark-bottom", "cap-top", "cap-bottom"].map(edge => <i key={edge} className="measured-horizontal" style={{top:`var(--${edge})`}} />)}
    {["mark-left", "mark-right", "ink-left", "ink-right"].map(edge => <i key={edge} className="measured-vertical" style={{left:`var(--${edge})`}} />)}
  </div></div>;
}
