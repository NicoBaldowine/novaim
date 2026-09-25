"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./brand-mark";

const sectionIds = ["services", "products", "company", "contact"];

function HeaderArrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function LanguageChevron() {
  return <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SiteHeader({ language, onLanguageChange }: { language: "en" | "es"; onLanguageChange: (language: "en" | "es") => void }) {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const languageMenu = useRef<HTMLDetailsElement>(null);
  const copy = language === "en"
    ? { sections: ["Services", "Products", "Company", "Contact"], talk: "Let’s talk", navigation: "Main navigation", open: "Open navigation", close: "Close navigation" }
    : { sections: ["Servicios", "Productos", "Compañía", "Contacto"], talk: "Hablemos", navigation: "Navegación principal", open: "Abrir navegación", close: "Cerrar navegación" };

  useEffect(() => {
    const updateTheme = () => {
      const section = document.getElementById("process");
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      setLight(bounds.top <= 72 && bounds.bottom > 72);
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return <header className={`header${light ? " header-light" : ""}`}>
    <a className="logo" href="#" aria-label="novaim home"><Wordmark /></a>
    <nav className="desktop-nav" aria-label={copy.navigation}>{copy.sections.slice(0, 3).map((section, index) => <a key={sectionIds[index]} href={`#${sectionIds[index]}`}>{section}</a>)}</nav>
    <div className="header-actions">
      <details className="language-menu" ref={languageMenu}>
        <summary aria-label={language === "en" ? "Change language" : "Cambiar idioma"}>{language.toUpperCase()} <LanguageChevron /></summary>
        <div>
          <button type="button" aria-current={language === "en" ? "true" : undefined} onClick={() => { onLanguageChange("en"); languageMenu.current?.removeAttribute("open"); }}>English</button>
          <button type="button" aria-current={language === "es" ? "true" : undefined} onClick={() => { onLanguageChange("es"); languageMenu.current?.removeAttribute("open"); }}>Español</button>
        </div>
      </details>
      <a className="contact-link" href="#contact">{copy.talk}</a>
      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
      <button type="button" aria-label={menuOpen ? copy.close : copy.open} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
        <span className="mobile-menu-icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <nav aria-label={copy.navigation}>{copy.sections.map((section, index) => <a key={sectionIds[index]} href={`#${sectionIds[index]}`} onClick={() => setMenuOpen(false)}>{section}<HeaderArrow /></a>)}</nav>
      </div>
    </div>
  </header>;
}
