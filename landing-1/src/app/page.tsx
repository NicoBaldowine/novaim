import DottedSurface from "@/components/ui/dotted-surface";
import { ServicesScroll } from "@/components/services-scroll";
import { ContactForm } from "@/components/contact-form";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { SiteHeader } from "@/components/site-header";
import { ProductScenes } from "@/components/product-scenes";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const products = [
  {
    name: "Nova Trainer",
    statement: "Turn company knowledge into training that moves with your team.",
    description: "An adaptive learning experience that helps people build practical skills through guided practice, relevant feedback and knowledge grounded in the way your business works.",
    tone: "mint",
  },
  {
    name: "Nova Copilot",
    statement: "Give every team an expert that understands the work.",
    description: "A company-wide AI copilot connected to your knowledge and tools, helping teams find answers, make informed decisions and move everyday work forward.",
    tone: "silver",
  },
  {
    name: "Broki",
    statement: "A smarter way to move real estate conversations forward.",
    description: "An AI agent built for real estate that responds, qualifies opportunities and keeps every conversation moving, so teams can focus on relationships and closing business.",
    tone: "lilac",
  },
];

const workflow = [
  { phase: "Discover.", title: "Find the work that matters." },
  { phase: "Design.", title: "Shape the right system." },
  { phase: "Build.", title: "Ship into real workflows." },
  { phase: "Scale.", title: "Learn, extend and compound." },
];

const clientLogos = [
  { name: "Siemens", src: `${basePath}/client-logos/siemens-wordmark.svg` },
  { name: "Spotify", src: `${basePath}/client-logos/spotify-wordmark.svg` },
  { name: "OpenAI", src: `${basePath}/client-logos/openai-wordmark-v2.svg` },
  { name: "Shopify", src: `${basePath}/client-logos/shopify-wordmark.svg` },
  { name: "Stripe", src: `${basePath}/client-logos/stripe-wordmark.svg` },
  { name: "GitHub", src: `${basePath}/client-logos/github-wordmark.svg` },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function Landing() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-surface" aria-hidden="true">
          <DottedSurface size={8} opacity={0.8} sizeAttenuation vertexColors />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">Agentic engineering<br />services. Built for<br /><span className="heading-accent">what’s next.</span></h1>
          <p className="hero-support">We design, build and integrate AI agents that work across your business. From everyday workflows to complex operations, we help your teams turn AI into practical, scalable solutions.</p>
          <a className="hero-cta" href="#products">See our products <Arrow /></a>
        </div>
        <div className="hero-proof" aria-label="Company logo examples">
          {clientLogos.map(logo => <div className="proof-logo" key={logo.name} title={logo.name}>
            <Image src={logo.src} width={140} height={36} alt={logo.name} />
          </div>)}
        </div>
      </section>
      <ServicesScroll />
      {/*
      <section className="workflow" id="process" aria-labelledby="workflow-heading">
        <div className="workflow-inner">
          <h2 className="workflow-heading" id="workflow-heading">How we build agentic systems.</h2>
          <div className="workflow-list">
            {workflow.map(step => <article className="workflow-step" key={step.phase}>
              <p className="workflow-phase">{step.phase}</p>
              <svg className="workflow-arrow" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 16h21M17 6l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" /></svg>
              <h3>{step.title}</h3>
            </article>)}
          </div>
        </div>
      </section>
      */}
      <section className="products" id="products" aria-label="Focused products">
        <ProductScenes products={products} />
      </section>
      <section className="testimonial" id="company" aria-labelledby="testimonial-heading">
        <TestimonialCarousel />
      </section>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="contact-intro">
          <h2 id="contact-heading">Let’s build what’s next.</h2>
          <p>Tell us where your teams are losing time or where a new AI product could create value. We’ll help you turn the opportunity into a practical path forward.</p>
        </div>
        <ContactForm />
      </section>
    </main>
    <footer className="site-footer" id="footer">
      <div className="footer-inner">
        <div className="footer-directory">
          <div className="footer-identity"><p className="footer-note">An agentic engineering company and product studio.</p></div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div><p>Explore</p><a href="#services">Services</a><a href="#products">Products</a><a href="#company">Company</a></div>
            <div><p>Products</p><a href="#products">Nova Trainer</a><a href="#products">Nova Copilot</a><a href="#products">Broki</a></div>
            <div><p>Connect</p><a href="#contact">Start a project</a><a href="#company">Client stories</a><a href="#contact">Get in touch</a></div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© novaim {new Date().getFullYear()}</span>
          <div className="footer-socials" aria-label="Social platforms">
            {[
              ["LinkedIn", "social-linkedin.svg"],
              ["Instagram", "social-instagram.svg"],
              ["Discord", "social-discord.svg"],
              ["Claude", "social-claude.svg"],
              ["ChatGPT", "social-openai.svg"],
            ].map(([name, file]) => <span key={name} title={name}><Image src={`${basePath}/${file}`} width={18} height={18} alt={name} /></span>)}
          </div>
        </div>
      </div>
    </footer>
  </>;
}
