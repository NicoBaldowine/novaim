"use client";

import DottedSurface from "@/components/ui/dotted-surface";
import { ServicesScroll } from "@/components/services-scroll";
import { ContactForm } from "@/components/contact-form";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { SiteHeader } from "@/components/site-header";
import { ProductScenes } from "@/components/product-scenes";
import Image from "next/image";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const productsEn = [
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

const productsEs = [
  { name: "Nova Trainer", statement: "Convierte el conocimiento de tu empresa en formación que avanza con tu equipo.", description: "Una experiencia de aprendizaje adaptativa que desarrolla habilidades prácticas mediante práctica guiada, retroalimentación relevante y conocimiento conectado con la forma en que opera tu negocio.", tone: "mint" },
  { name: "Nova Copilot", statement: "Dale a cada equipo un experto que entiende el trabajo.", description: "Un copiloto de IA conectado con el conocimiento y las herramientas de tu empresa, que ayuda a encontrar respuestas, tomar mejores decisiones y avanzar el trabajo diario.", tone: "silver" },
  { name: "Broki", statement: "Una forma más inteligente de hacer avanzar las conversaciones inmobiliarias.", description: "Un agente de IA para real estate que responde, califica oportunidades y mantiene cada conversación en movimiento para que el equipo se concentre en las relaciones y el cierre.", tone: "lilac" },
];

const servicesEn = [
  { mode: "signals" as const, title: "Define what matters", description: "Agents execute ambiguous instructions faithfully. We connect business, market and user reality to identify the problems worth solving before anything gets built." },
  { mode: "systems" as const, title: "Turn judgment into quality", description: "We translate product and design standards into living specifications, evaluations, tests and guardrails that make a good outcome measurable." },
  { mode: "infrastructure" as const, title: "Orchestrate reliable delivery", description: "We design the system around architects, orchestrators and domain operators, with agents working inside feedback loops that ship, verify and improve." },
];

const servicesEs = [
  { mode: "signals" as const, title: "Define lo que importa", description: "Los agentes ejecutan instrucciones ambiguas con fidelidad. Conectamos negocio, mercado y realidad del usuario para identificar los problemas que vale la pena resolver antes de construir." },
  { mode: "systems" as const, title: "Convierte el criterio en calidad", description: "Traducimos estándares de producto y diseño en especificaciones vivas, evaluaciones, pruebas y controles que vuelven medible un buen resultado." },
  { mode: "infrastructure" as const, title: "Orquesta entregas confiables", description: "Diseñamos el sistema alrededor de arquitectos, orquestadores y operadores de dominio, con agentes que trabajan en ciclos de entrega, verificación y mejora." },
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
  const [language, setLanguage] = useState<"en" | "es">("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("novaim-language");
    if (saved === "en" || saved === "es") setLanguage(saved);
  }, []);

  const changeLanguage = (next: "en" | "es") => {
    setLanguage(next);
    window.localStorage.setItem("novaim-language", next);
  };

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const es = language === "es";
  const products = es ? productsEs : productsEn;
  const services = es ? servicesEs : servicesEn;

  return <>
    <a className="skip-link" href="#main">{es ? "Ir al contenido" : "Skip to content"}</a>
    <SiteHeader language={language} onLanguageChange={changeLanguage} />
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-surface" aria-hidden="true">
          <DottedSurface size={8} opacity={0.8} sizeAttenuation vertexColors />
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">{es ? <>Ingeniería agéntica<br />para lo que realmente<br /><span className="heading-accent">importa.</span></> : <>Agentic engineering<br />for what matters<br /><span className="heading-accent">next.</span></>}</h1>
          <p className="hero-support">{es ? "Construir se está volviendo casi gratis. La ventaja ahora está en saber qué construir y demostrar que funciona. Unimos producto, diseño e ingeniería para convertir ese criterio en sistemas agénticos confiables." : "Building is becoming nearly free. The advantage now is knowing what to build—and proving it works. We unite product, design and engineering to turn that judgment into reliable agentic systems."}</p>
          <a className="hero-cta" href="#products">{es ? "Ver nuestros productos" : "See our products"} <Arrow /></a>
        </div>
        <div className="hero-proof" aria-label="Company logo examples">
          {clientLogos.map(logo => <div className="proof-logo" key={logo.name} title={logo.name}>
            <Image src={logo.src} width={140} height={36} alt={logo.name} />
          </div>)}
        </div>
      </section>
      <ServicesScroll services={services} label={es ? "Nuestros servicios y enfoque" : "Our services and approach"} />
      <section className="products" id="products" aria-label="Focused products">
        <ProductScenes products={products} visitLabel={es ? "Visitar" : "Visit"} />
      </section>
      <section className="testimonial" id="company" aria-labelledby="testimonial-heading">
        <TestimonialCarousel language={language} />
      </section>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="contact-intro">
          <h2 id="contact-heading">{es ? "Construyamos lo que sigue." : "Let’s build what’s next."}</h2>
          <p>{es ? "Tráenos el problema, el flujo o la decisión de producto. Te ayudaremos a definir qué vale la pena construir, hacer medible la calidad y convertirlo en un sistema confiable." : "Bring us the problem, the workflow or the product decision. We’ll help define what is worth building, make quality measurable and turn it into a reliable system."}</p>
        </div>
        <ContactForm language={language} />
      </section>
    </main>
    <footer className="site-footer" id="footer">
      <div className="footer-inner">
        <div className="footer-directory">
          <div className="footer-identity"><p className="footer-note">{es ? "Criterio de producto, calidad de diseño e ingeniería agéntica en un solo sistema." : "Product judgment, design quality and agentic engineering in one system."}</p></div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div><p>{es ? "Explorar" : "Explore"}</p><a href="#services">{es ? "Servicios" : "Services"}</a><a href="#products">{es ? "Productos" : "Products"}</a><a href="#company">{es ? "Compañía" : "Company"}</a></div>
            <div><p>{es ? "Productos" : "Products"}</p><a href="#products">Nova Trainer</a><a href="#products">Nova Copilot</a><a href="#products">Broki</a></div>
            <div><p>{es ? "Contacto" : "Connect"}</p><a href="#contact">{es ? "Iniciar un proyecto" : "Start a project"}</a><a href="#company">{es ? "Historias de clientes" : "Client stories"}</a><a href="#contact">{es ? "Contáctanos" : "Get in touch"}</a></div>
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
