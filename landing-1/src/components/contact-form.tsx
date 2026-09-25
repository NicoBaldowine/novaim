"use client";

import { FormEvent, useState } from "react";

function SendArrow() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ContactForm({ language }: { language: "en" | "es" }) {
  const [sent, setSent] = useState(false);
  const copy = language === "en" ? {
    name: "Name", namePlaceholder: "Your name", company: "Company", companyPlaceholder: "Company name", email: "Work email",
    brief: "What would you like to build?", briefPlaceholder: "Tell us about the opportunity, workflow or product you have in mind.", send: "Send inquiry", sent: "Thank you. We’ll be in touch shortly.",
  } : {
    name: "Nombre", namePlaceholder: "Tu nombre", company: "Empresa", companyPlaceholder: "Nombre de la empresa", email: "Correo de trabajo",
    brief: "¿Qué te gustaría construir?", briefPlaceholder: "Cuéntanos sobre la oportunidad, el flujo o el producto que tienes en mente.", send: "Enviar consulta", sent: "Gracias. Nos pondremos en contacto pronto.",
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="field-row">
      <label>
        <span>{copy.name}</span>
        <input name="name" autoComplete="name" placeholder={copy.namePlaceholder} required />
      </label>
      <label>
        <span>{copy.company}</span>
        <input name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} required />
      </label>
    </div>
    <label>
      <span>{copy.email}</span>
      <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
    </label>
    <label>
      <span>{copy.brief}</span>
      <textarea name="brief" rows={5} placeholder={copy.briefPlaceholder} required />
    </label>
    <button className="contact-submit" type="submit">{copy.send} <SendArrow /></button>
    {sent && <p className="form-status" aria-live="polite">{copy.sent}</p>}
  </form>;
}
