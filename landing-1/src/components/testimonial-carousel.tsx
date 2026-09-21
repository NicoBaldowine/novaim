"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SignalField } from "./signal-field";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const testimonials = [
  {
    quote: "Novaim helped us move from scattered AI experiments to a system our teams can use every day.",
    name: "Maya Chen",
    role: "Operations Director",
    company: "Siemens",
    logo: `${basePath}/client-logos/siemens-wordmark.svg`,
    initials: "MC",
  },
  {
    quote: "They understood the operational reality first, then built agents that fit naturally into the way our people work.",
    name: "Daniel Brooks",
    role: "Head of Product",
    company: "Spotify",
    logo: `${basePath}/client-logos/spotify-wordmark.svg`,
    initials: "DB",
  },
  {
    quote: "What started as one focused workflow became a foundation we can extend across the entire organization.",
    name: "Elena Rossi",
    role: "Transformation Lead",
    company: "Shopify",
    logo: `${basePath}/client-logos/shopify-wordmark.svg`,
    initials: "ER",
  },
];

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const dragStart = useRef<number | null>(null);

  const move = (direction: number) => {
    setActive(value => (value + direction + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % testimonials.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];
  return <>
    <div className="testimonial-frame">
      <div className="testimonial-grid" aria-hidden="true"><SignalField mode="signals" ink="#e6e9e5" gridDensity={2.65} pointScale={0.34} /></div>
      <div
        className="testimonial-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials. Drag or swipe to browse."
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onPointerDown={event => {
          dragStart.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.dataset.dragging = "true";
        }}
        onPointerUp={event => {
          const start = dragStart.current;
          dragStart.current = null;
          delete event.currentTarget.dataset.dragging;
          if (start === null) return;
          const distance = event.clientX - start;
          if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
        }}
        onPointerCancel={event => {
          dragStart.current = null;
          delete event.currentTarget.dataset.dragging;
        }}
      >
        <div className="testimonial-copy" key={active}>
          <Image className="testimonial-company-logo" src={testimonial.logo} width={150} height={38} alt={testimonial.company} />
          <blockquote id="testimonial-heading">“{testimonial.quote}”</blockquote>
          <div className="testimonial-person">
            <p><strong>{testimonial.name}</strong><span>{testimonial.role} · {testimonial.company}</span></p>
          </div>
        </div>
      </div>
    </div>
  </>;
}
