import { SignalField, type SignalMode } from "./signal-field";

const services: { mode: SignalMode; title: string; description: string }[] = [
  { mode: "signals", title: "Agents built for your business", description: "We turn operational challenges into purpose-built AI agents that understand your context, take action and help your team focus on higher-value work." },
  { mode: "systems", title: "Connected teams, smarter operations", description: "We connect agents, people and tools across your business, bringing fragmented workflows together so intelligence can move from one team to the next." },
  { mode: "infrastructure", title: "Engineered for long-term growth", description: "We build the shared technology foundation behind our services and ventures, making it easier to launch new capabilities and scale what works." },
];

export function ServicesScroll() {
  return <section className="services-scroll" id="services" aria-label="Our services and approach">
    <div className="services-sticky">
      <div className="value-grid">
        {services.map(service => <article className={`value-card ${service.mode}`} key={service.mode}>
          <div className="value-art"><SignalField mode={service.mode} interactive ink={service.mode === "infrastructure" ? "#c4a1e8" : "#62d8aa"} /></div>
          <div className="value-copy"><h2>{service.title}</h2><p>{service.description}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
