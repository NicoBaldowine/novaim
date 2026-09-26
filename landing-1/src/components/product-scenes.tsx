"use client";

import { useEffect, useRef, useState } from "react";
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

export function ProductScenes({ products, visitLabel }: { products: Product[]; visitLabel: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const palettes: Record<string, string[]> = {
    mint: ["#07110d", "#123f31", "#287553", "#66aa7e"],
    silver: ["#080c0b", "#18322d", "#3f7568", "#9ab5aa"],
    lilac: ["#100713", "#361454", "#702c9d", "#d875c7"],
  };

  return <div className={`product-scenes tone-${products[activeIndex]?.tone ?? "mint"}`}>
    <ProductFluidBackground colors={palettes[products[activeIndex]?.tone] ?? palettes.mint} active phase={7} />
    {products.map((product, index) => (
      <ProductScene product={product} index={index} onActive={setActiveIndex} visitLabel={visitLabel} key={product.name} />
    ))}
  </div>;
}

function ProductScene({ product, index, onActive, visitLabel }: { product: Product; index: number; onActive: (index: number) => void; visitLabel: string }) {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onActive(index);
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [index, onActive]);

  return <article
    ref={scene}
    className={`product-scene ${product.tone}${index % 2 === 1 ? " product-scene-reverse" : ""}`}
  >
    <div className="product-panel-inner">
      <div className="product-content">
        <p className="product-name">{product.name}</p>
        <h3>{product.statement}</h3>
        <p className="product-description">{product.description}</p>
        <button className="product-link" type="button">{visitLabel} {product.name} <Arrow /></button>
      </div>
      <div className="product-visual" aria-label={`${product.name} product preview`} role="img" />
    </div>
  </article>;
}
