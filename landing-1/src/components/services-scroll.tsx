"use client";

import { useEffect, useRef } from "react";
import { SignalField, type SignalMode } from "./signal-field";

const services: { mode: SignalMode; title: string; description: string }[] = [
  { mode: "signals", title: "Agents built for your business", description: "We turn operational challenges into purpose-built AI agents that understand your context, take action and help your team focus on higher-value work." },
  { mode: "systems", title: "Connected teams, smarter operations", description: "We connect agents, people and tools across your business, bringing fragmented workflows together so intelligence can move from one team to the next." },
  { mode: "infrastructure", title: "Engineered for long-term growth", description: "We build the shared technology foundation behind our services and ventures, making it easier to launch new capabilities and scale what works." },
];

export function ServicesScroll() {
  const shell = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = shell.current;
      const row = track.current;
      if (!section || !row || !matchMedia("(max-width: 600px)").matches) {
        row?.style.removeProperty("--services-shift");
        return;
      }

      const bounds = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (68 - bounds.top) / travel));
      const distance = Math.max(0, row.scrollWidth - window.innerWidth);
      row.style.setProperty("--services-shift", `${-distance * progress}px`);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return <section className="services-scroll" id="services" aria-label="Our services and approach" ref={shell}>
    <div className="services-sticky">
      <div className="value-grid" ref={track}>
        {services.map(service => <article className={`value-card ${service.mode}`} key={service.mode}>
          <div className="value-art"><SignalField mode={service.mode} interactive ink={service.mode === "infrastructure" ? "#c4a1e8" : "#62d8aa"} /></div>
          <div className="value-copy"><h2>{service.title}</h2><p>{service.description}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
