import { SignalField, type SignalMode } from "./signal-field";

export type ServiceCopy = { mode: SignalMode; title: string; description: string };

export function ServicesScroll({ services, label }: { services: ServiceCopy[]; label: string }) {
  return <section className="services-scroll" id="services" aria-label={label}>
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
