"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./brand-mark";
import { SignalField } from "./signal-field";

const themes = ["white", "carbon", "forest", "plum", "mint", "lilac", "gray"];
const inks = ["#080a09", "#ecefec", "#91ebbd", "#ddc6f1", "#173d32", "#34283f", "#080a09"];
const studies = ["signals", "systems", "infrastructure"] as const;

export function IdentityBento() {
  const root = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState([0, 2, 5, 3]);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const container = root.current?.querySelector<HTMLElement>(".logo-construction");
    const label = container?.querySelector<HTMLElement>(".wordmark > span");
    if (!container || !label) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const style = getComputedStyle(label);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.letterSpacing = style.letterSpacing;
      const full = ctx.measureText("NovaIM");
      const capital = ctx.measureText("N");
      const rect = label.getBoundingClientRect();
      const parent = container.getBoundingClientRect();
      const baseline = rect.top - parent.top + (rect.height - full.fontBoundingBoxAscent - full.fontBoundingBoxDescent) / 2 + full.fontBoundingBoxAscent;
      container.style.setProperty("--text-left", `${rect.left - parent.left - full.actualBoundingBoxLeft}px`);
      container.style.setProperty("--text-right", `${rect.left - parent.left + full.actualBoundingBoxRight}px`);
      container.style.setProperty("--text-top", `${baseline - capital.actualBoundingBoxAscent}px`);
      container.style.setProperty("--text-bottom", `${baseline + capital.actualBoundingBoxDescent}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(label);
    void document.fonts.ready.then(measure);
    return () => { disposed = true; observer.disconnect(); };
  }, []);

  const [study, setStudy] = useState(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(el);
    const timers = [6100, 8300, 10700, 13900].map((delay, piece) => window.setInterval(() => {
      if (!visible || document.hidden || reduced.matches) return;
      setColors(current => {
        const next = [...current];
        const paletteSize = piece === 2 ? themes.length : 4;
        let candidate = (current[piece] + 1) % paletteSize;
        const occupied = current.filter((_, index) => index !== piece);
        while (occupied.includes(candidate)) candidate = (candidate + 1) % paletteSize;
        next[piece] = candidate;
        return next;
      });
      if (piece === 1) setStudy(value => (value + 1) % studies.length);
      if (piece === 2) setSlide(value => (value + 1) % 3);
    }, delay));
    return () => { observer.disconnect(); timers.forEach(clearInterval); };
  }, []);
  // Clamp rendered themes as well as future ticks (Fast Refresh can retain old state).
  const signalColor = colors[1] % 4;
  const orbitColor = colors[3] % 4;
  return <div className="identity-bento living-bento" ref={root}>
    <div className={`bento-logo logo-theme-${themes[colors[0]]}`} tabIndex={0} aria-label="NovaIM logo construction">
      <div className="logo-construction"><Wordmark /><div className="logo-guides" aria-hidden="true"><i className="guide-top" /><i className="guide-middle" /><i className="guide-bottom" /><i className="guide-left" /><i className="guide-mark-end" /><i className="guide-type-start" /><i className="guide-right" /><span className="guide-circle" /><span className="guide-text-box" /></div></div>

    </div>
    <div className={`bento-signal palette-theme-${themes[signalColor]}`}><SignalField mode={studies[study]} ink={inks[signalColor]} interactive /></div>
    <div className="bento-type">
      <div className="type-window" aria-label="Zalando Sans uppercase and lowercase alphabet"><div className="type-track" aria-hidden="true">{[0, 1].map(copy => <span key={copy}>{Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(letter => <span className="type-pair" key={letter}>{letter}{letter.toLowerCase()}</span>)}</span>)}</div></div>
      <span className="bento-label">Zalando Sans Regular</span>
    </div>
    <div className="bento-palette" aria-label="Brand palette: Mint, Forest, Lilac, Plum, Carbon, Gray, White">
      <div className="palette-mint" tabIndex={0}><span>Mint<small>#62D8AA</small></span></div>
      <div className="palette-forest" tabIndex={0}><span>Forest<small>#173D32</small></span></div>
      <div className="palette-tones"><div className="tone-lilac" tabIndex={0}><span>Lilac<small>#C4A1E8</small></span></div><div className="tone-plum" tabIndex={0}><span>Plum<small>#34283F</small></span></div></div>
      <div className="palette-carbon" tabIndex={0}><span>Carbon<small>#080A09</small></span></div>
      <div className="palette-tones"><div className="tone-gray" tabIndex={0}><span>Gray<small>#929A95</small></span></div><div className="palette-white" tabIndex={0}><span>White<small>#FFFFFF</small></span></div></div>
    </div>
    <div className="bento-mockup bento-keynote live-keynote">
      <Image src="/mockups/novaim-keynote-v2.png" alt="A dark auditorium with a live NovaIM presentation on stage." fill sizes="(max-width: 700px) 88vw, 58vw" />
      <div className={`keynote-screen palette-theme-${themes[colors[2]]}`}>
        <div className="keynote-slide" key={slide}>
          <div className="keynote-copy"><Wordmark /><p>{[<>Intelligence,<br />built in.</>, <>One system.<br />More possibility.</>, <>Connected.<br />By design.</>][slide]}</p></div>
          <div className="keynote-dots" aria-hidden="true" />
        </div>
      </div>
    </div>
    <div className={`bento-orbit palette-theme-${themes[orbitColor]}`} aria-label="A close-up of a rotating sphere of signals">
      <div className="bento-orbit-crop"><SignalField mode="positioning" ink={inks[orbitColor]} /></div>
    </div>
    <div className="bento-mockup bento-social-profile">
      <Image src="/mockups/novaim-social-profile-v1.png" alt="NovaIM social profile with a dotted sphere cover, constellation avatar, and Connecting points. Creating possibilities." fill sizes="(max-width: 700px) 88vw, 30vw" />
    </div>
    <div className="bento-mockup bento-business-cards">
      <Image src="/mockups/novaim-silver-foil-v2.png" alt="NovaIM logo stamped in silver foil near the corner of graphite-black textured paper." fill sizes="(max-width: 700px) 88vw, 60vw" />
    </div>
  </div>;
}
