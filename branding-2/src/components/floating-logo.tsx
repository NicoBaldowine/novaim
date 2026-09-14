"use client";
import { useEffect, useState } from "react";
import { Wordmark } from "./brand-mark";

export function FloatingLogo() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const section = document.getElementById("direction");
    if (!section) return;
    const update = () => setVisible(section.getBoundingClientRect().top <= 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <a href="#top" className={`floating-logo${visible ? " is-visible" : ""}`} aria-label="NovaIM — Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1}><Wordmark /></a>;
}
