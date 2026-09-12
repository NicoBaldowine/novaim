import { PositioningGradient } from "@/components/positioning-gradient";
import { ConceptArt } from "@/components/concept-art";
import { BrandPrinciples, LayerField } from "@/components/brand-principles";
import { IdentityBento } from "@/components/identity-bento";
import { LogoIntro } from "@/components/logo-intro";


const concepts = [
  { title: "Find the signal", copy: "Turn complexity into a clear starting point." },
  { title: "Connect the layers", copy: "Bring distinct capabilities into one system." },
  { title: "Move forward", copy: "Give every action a shared direction." },
  { title: "Build continuity", copy: "Create connections that carry intelligence further." },
  { title: "Add possibility", copy: "Let each new layer build on what came before." },
  { title: "Act as one", copy: "A connected whole. More than the sum of its parts." },
];

export default function Home() {
  return <>
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none" }}><defs>
      <filter id="knot-fine-lines" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="2" intercept="-.5" />
          <feFuncG type="linear" slope="2" intercept="-.5" />
          <feFuncB type="linear" slope="2" intercept="-.5" />
        </feComponentTransfer>
        <feMorphology operator="erode" radius="0.45" />
      </filter>
      <filter id="holding-palette" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.0196 0.0235 0.0863 0.2078 0.2078 0.4353 0.6196 0.8902 0.9451" />
          <feFuncG type="table" tableValues="0.0235 0.0667 0.2275 0.3725 0.4039 0.5608 0.7020 0.8510 0.9412" />
          <feFuncB type="table" tableValues="0.0275 0.1137 0.4196 0.8392 0.8314 0.7216 0.6549 0.7255 0.9176" />
        </feComponentTransfer>
      </filter>
      <filter id="optical-palette" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0 .02 .027 .60 .82 .94" />
          <feFuncG type="table" tableValues="0 .08 .56 .80 .91 .97" />
          <feFuncB type="table" tableValues="0 .15 .82 .94 .97 .99" />
        </feComponentTransfer>
      </filter>
    </defs></svg>
    <a className="skip-link" href="#direction">Skip to the proposal</a>
    <main>
      <LogoIntro />

      <div className="positioning-continuum">
      <PositioningGradient />
      <section className="direction section" id="direction">
        <div className="positioning-copy">
          <p className="section-label">BRAND POSITIONING</p>
          <h2><span className="positioning-line">Intelligence, built</span><span className="positioning-line">layer by layer.</span></h2>
          <p className="positioning-support">NovaIM connects AI products, agents and systems<br />into the infrastructure that moves business forward.</p>
        </div>
      </section>
      <section className="language section" id="language"><p className="section-label">VISUAL CONCEPT</p><div className="section-heading"><h2>Simple forms.<br /><span>Connected possibilities.</span></h2><p>A visual language of layers, light and connection.<br />Each form expresses a different part of one shared system.</p></div><div className="concept-grid">{concepts.map((concept,index) => <article className="concept-card geometric-card" key={concept.title}><div className="concept-visual"><ConceptArt variant={index} /></div><div className="concept-copy"><h3>{concept.title}</h3><p>{concept.copy}</p></div></article>)}</div></section>
      </div>
      <BrandPrinciples />
      <section className="identity section" id="identity"><div className="identity-heading"><h2>The identity</h2><p>A layered mark brings individual planes into one connected form. Instrument Sans gives that system a clear, human voice. Black gives the system focus. Cobalt accents and mineral blue connect simple geometry, repeating patterns and layered light. Sage reflections and graphite give the system depth. Each layer represents a capability; together, they form the infrastructure. Soft white brings clarity against a deep black foundation.</p></div><IdentityBento /></section>
      <section className="portfolio section" id="brands">
        <div className="portfolio-heading"><h2>Independent brands.<br />Connected layers.</h2></div>
        <div className="portfolio-grid">
          <article className="product-card product-hive"><div className="product-visual product-knot"><PositioningGradient /></div><div className="product-copy"><h3>Hive</h3><p>Intelligence at work. The operational expression of the NovaIM ecosystem.</p></div></article>
          <article className="product-card product-broky"><div className="product-visual product-layer-detail"><LayerField /></div><div className="product-copy"><h3>Broki</h3><p>An AI agent for real estate. A focused application of NovaIM’s intelligence, built around the property business.</p></div></article>
        </div>
      </section>
    </main>
  </>;
}
