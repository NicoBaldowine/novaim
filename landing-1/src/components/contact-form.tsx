"use client";

import { FormEvent, useState } from "react";

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
    <button className="contact-submit" type="submit">Send inquiry <span aria-hidden="true">↗</span></button>
    {sent && <p className="form-status" aria-live="polite">Thank you. We’ll be in touch shortly.</p>}
  </form>;
}
