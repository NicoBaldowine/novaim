"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./brand-mark";

const sections = ["Services", "Products", "Company", "Contact"];

function HeaderArrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function SiteHeader() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="desktop-nav" aria-label="Main navigation">{sections.slice(0, 3).map(section => <a key={section} href={`#${section.toLowerCase()}`}>{section}</a>)}</nav>
    <a className="contact-link" href="#contact">Let’s talk <HeaderArrow /></a>
    <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
      <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
        <span className="mobile-menu-icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <nav aria-label="Mobile navigation">{sections.map(section => <a key={section} href={`#${section.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{section}<HeaderArrow /></a>)}</nav>
    </div>
  </header>;
}
