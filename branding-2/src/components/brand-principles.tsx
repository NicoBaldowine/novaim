import type { CSSProperties } from "react";

// Uneven heights with moderated jumps retain an organic, non-repeating rhythm.
const heights = [14,5,18,10,22,15,3,13,1,9,19,10,2,14,6,21,11,18,7,16,10,2,16,7,14,1,12,5,13,21,10,18,5,13,20,9,23,14,4,17,8,2,12,0,16];

export function BrandPrinciples() {
  return <section className="principles section reference-layers" id="layers" aria-labelledby="layers-title">
    <h2 id="layers-title">Independent layers.<br /><span>One shared intelligence.</span></h2>
    <LayerField />
  </section>;
}

export function LayerField() {
  return (<div className="reference-layer-panorama" aria-hidden="true">
      {heights.map((height, i) => <span key={i} style={{
        "--dark-stop": `${Math.min(12 + ((i * 13 + height * 7) % 29), 30 + height * .55)}%`,
        "--blue-stop": `${46 + height * .55}%`,
        "--mint-stop": `${61 + height * .55}%`,
        "--light-stop": `${66 + height * .55}%`,
        "--return-stop": `${73 + height * .55}%`,
        "--flow-delay": `${-i * .63}s`,
        "--flow-duration": `${12 + (i % 5) * .9}s`,
      } as CSSProperties} />)}
    </div>);
}
