export function BrandMark({ animated = false }: { animated?: boolean }) {
  return <span className={`brand-mark layer-mark${animated ? " animated-mark" : ""}`} aria-hidden="true" />;
}
export function Wordmark({ animated = false }: { animated?: boolean }) {
  return <span className="wordmark"><BrandMark animated={animated} /><span>NovaIM</span></span>;
}
