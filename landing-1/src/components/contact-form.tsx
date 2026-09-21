"use client";

import { FormEvent, useState } from "react";

function SendArrow() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="field-row">
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" placeholder="Your name" required />
      </label>
      <label>
        <span>Company</span>
        <input name="company" autoComplete="organization" placeholder="Company name" required />
      </label>
    </div>
    <label>
      <span>Work email</span>
      <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
    </label>
    <label>
      <span>What would you like to build?</span>
      <textarea name="brief" rows={5} placeholder="Tell us about the opportunity, workflow or product you have in mind." required />
    </label>
    <button className="contact-submit" type="submit">Send inquiry <SendArrow /></button>
    {sent && <p className="form-status" aria-live="polite">Thank you. We’ll be in touch shortly.</p>}
  </form>;
}
