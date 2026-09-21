"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ProductFluidBackground } from "./product-fluid-background";

type Product = {
  name: string;
  statement: string;
  description: string;
  tone: string;
};

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function ProductScenes({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / range));
      setPosition(progress * products.length);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [products.length]);

  const activeIndex = Math.min(products.length - 1, Math.floor(position));

  return <div className="product-scenes" ref={sectionRef}>
    <div
      className="product-stage"
      ref={stageRef}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        event.currentTarget.style.setProperty("--pointer-x", `${x * 34}px`);
        event.currentTarget.style.setProperty("--pointer-y", `${y * 26}px`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--pointer-x", "0px");
        event.currentTarget.style.setProperty("--pointer-y", "0px");
      }}
    >
      {products.map((product, index) => {
        const palettes: Record<string, string[]> = {
          mint: ["#07110d", "#123f31", "#287553", "#66aa7e"],
          silver: ["#080c0b", "#18322d", "#3f7568", "#9ab5aa"],
          lilac: ["#100713", "#361454", "#702c9d", "#d875c7"],
        };
        const opacity = index === activeIndex ? 1 : 0;
        const shift = index === activeIndex ? 0 : 16;
        const style = {
          "--scene-opacity": opacity,
          "--scene-shift": `${shift}px`,
          "--scene-scale": 0.985 + opacity * 0.015,
          "--panel-opacity": opacity,
          zIndex: Math.round(opacity * 10),
        } as CSSProperties;

        return <article
          className={`product-scene ${product.tone}`}
          key={product.name}
          style={style}
          aria-hidden={opacity < .15}
        >
          <ProductFluidBackground
            colors={palettes[product.tone]}
            active={opacity > .15}
            phase={[7, 31, 49][index]}
          />
          <div className="product-panel-inner">
            <div className="product-content">
              <p className="product-name">{product.name}</p>
              <h3>{product.statement}</h3>
              <p className="product-description">{product.description}</p>
              <button className="product-link" type="button">Visit {product.name} <Arrow /></button>
            </div>
            <div className="product-visual" aria-label={`${product.name} product preview`} role="img" />
          </div>
        </article>;
      })}
    </div>
  </div>;
}
