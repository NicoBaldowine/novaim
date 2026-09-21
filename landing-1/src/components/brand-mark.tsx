export function BrandMark({ animated = false }: { animated?: boolean }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <img className={`brand-mark${animated ? " animated-mark" : ""}`} src={`${basePath}/novaim-isotipo.svg`} alt="" aria-hidden="true" />;
}

export function Wordmark() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <span className="wordmark branding-one-wordmark" role="img" aria-label="NovaIM">
    <img className="header-isotipo" src={`${basePath}/novaim-isotipo.svg`} alt="" aria-hidden="true" />
    <img className="header-wordmark" src={`${basePath}/novaim-wordmark.svg`} alt="" aria-hidden="true" />
  </span>;
}
