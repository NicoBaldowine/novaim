import { BrandPrinciples } from "@/components/brand-principles";
import { IdentityBento } from "@/components/identity-bento";
import { LogoIntro } from "@/components/logo-intro";

import { SignalField, type SignalMode } from "@/components/signal-field";

const concepts: { mode: SignalMode; title: string; copy: string; phrase: string }[] = [
  { mode: "signals", title: "Clarity from complexity", copy: "Recognize what matters. A field of individual signals reveals a clear focus.", phrase: "Every signal is a beginning." },
  { mode: "systems", title: "Intelligence in concert", copy: "Connect individual capabilities. Separate signals come together to act as one system.", phrase: "A shared rhythm. A greater whole." },
  { mode: "infrastructure", title: "A foundation for flow", copy: "Give intelligence a path to act. A stable framework carries signals across the business.", phrase: "Built to connect. Designed to endure." },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#direction">Skip to the proposal</a>
    <main>
      <LogoIntro />

      <section className="direction section" id="direction">
        <div className="positioning-copy">
          <p className="section-label">Brand positioning</p>
          <h2><span className="positioning-line">The intelligence</span><span className="positioning-line">infrastructure behind</span><span className="positioning-line">modern companies.</span></h2>
          <p className="positioning-support">One connected foundation.<br />An entire ecosystem of possibilities.</p>
        </div>
        <div className="positioning-art"><SignalField mode="positioning" interactive neural /></div>
      </section>
      <section className="shift section">
        <div className="shift-from"><p className="section-label">Where we started</p><h3>{["Services.", "Agents.", "Automation."].map(label => <span className="shift-concept" key={label}><span>{label}</span><svg className="shift-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 16h21M17 6l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" /></svg></span>)}</h3></div>
        <div><p className="section-label">Where we’re going</p><h3>Systems.<br />Infrastructure.<br />A technology group.</h3></div>
      </section>
      <section className="language section" id="language"><p className="section-label">Visual concept</p><div className="section-heading"><h2>Invisible intelligence.<br /><span>Visible structure.</span></h2><p>Points with a purpose.<br />An identity built on how<br />intelligence actually works.</p></div><div className="concept-grid">{concepts.map(concept => <article className={`concept-card ${concept.mode}`} key={concept.mode}><div className="concept-visual"><SignalField mode={concept.mode} interactive /></div><div className="concept-copy"><h3>{concept.title}</h3><p>{concept.copy}</p></div></article>)}</div></section>
      <BrandPrinciples />
      <section className="identity section" id="identity"><div className="identity-heading"><h2>The identity</h2><p>A circular mark brings individual signals into one connected whole. Zalando Sans gives that system a clear, human voice. Black, white and gray create a calm foundation; greens and lilacs bring distinction and life to the moments that matter.</p></div><IdentityBento /></section>
      <section className="portfolio section" id="brands">
        <div className="portfolio-heading"><h2>Independent brands.<br /><span>One shared foundation.</span></h2><p>NovaIM brings distinct products together under one technology group. From operational intelligence to real estate, each product gives the shared foundation a focused purpose.</p></div>
        <div className="portfolio-grid">
          <article className="product-card product-hive"><div className="product-visual"><SignalField mode="systems" interactive /></div><div className="product-copy"><h3>Hive</h3><p>Intelligence at work. The operational expression of the NovaIM ecosystem.</p></div></article>
          <article className="product-card product-broky"><div className="product-visual"><SignalField mode="resonance" interactive /></div><div className="product-copy"><h3>Broki</h3><p>An AI agent for real estate. A focused application of NovaIM’s intelligence, built around the property business.</p></div></article>
        </div>
      </section>
      <section className="closing section"><div className="closing-sphere"><SignalField mode="positioning" pointScale={0.55} /></div><h2>Intelligence,<br />built in.</h2></section>
    </main>
  </>;
}
