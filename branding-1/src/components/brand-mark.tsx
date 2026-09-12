import type { CSSProperties } from "react";

// Seven staggered rows trace the circular silhouette in the supplied reference.
// Dot size increases down the mark, giving each signal a growing presence.
const rows = [[40, 60], [30, 50, 70], [20, 40, 60, 80], [30, 50, 70], [20, 40, 60, 80], [30, 50, 70], [40, 60]];

export function BrandMark({ animated = false }: { animated?: boolean }) {
  return <svg className={`brand-mark${animated ? " animated-mark" : ""}`} viewBox="0 0 100 100" aria-hidden="true">
    {rows.flatMap((row, y) => row.map((x, i) => <circle key={`${y}-${x}`} cx={x} cy={20 + y * 10} r={1.55 + y * .45} fill="currentColor" style={{ "--delay": `${y * .09 + i * .045}s`, "--dx": `${(x - 50) * .6}px`, "--dy": `${(y - 3) * 7}px` } as CSSProperties} />))}
  </svg>;
}

export function Wordmark({ animated = false }: { animated?: boolean }) {
  return <span className="wordmark"><BrandMark animated={animated} /><span>NovaIM</span></span>;
}
