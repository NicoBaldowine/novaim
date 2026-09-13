import type { CSSProperties } from "react";

import { brandPoints } from "./brand-points";

export function BrandMark({ animated = false }: { animated?: boolean }) {
  return <svg className={`brand-mark${animated ? " animated-mark" : ""}`} viewBox="0 0 100 100" aria-hidden="true">
    {brandPoints.map(({ x, y, r }, i) => <circle key={i} cx={x} cy={y} r={r} fill="currentColor" style={{ "--delay": `${i * .035}s`, "--dx": `${(x - 50) * .6}px`, "--dy": `${(y - 50) * .6}px` } as CSSProperties} />)}
  </svg>;
}

export function Wordmark({ animated = false }: { animated?: boolean }) {
  return <span className="wordmark"><BrandMark animated={animated} /><span>NovaIM</span></span>;
}
