import { PositioningGradient } from "./positioning-gradient";
import { LogoConstruction } from "./logo-construction";
import { ConceptArt } from "./concept-art";
import Image from "next/image";
import type { CSSProperties } from "react";

export function IdentityBento() {
  return <div className="identity-bento refreshed-bento">
    <div className="bento-logo" tabIndex={0} aria-label="NovaIM logo construction">
      <LogoConstruction />
    </div>
    <div className="bento-signal icon-carousel" aria-label="Six animated brand icons">{[0,1,2,3,4,5].map(i => <div className="icon-frame" key={i} style={{"--icon-delay": `${i * 4}s`} as CSSProperties}><ConceptArt variant={i} /></div>)}</div>
    <div className="bento-type">
      <div className="type-window" aria-label="Instrument Sans uppercase and lowercase alphabet"><div className="type-track" aria-hidden="true">{[0,1].map(copy => <span key={copy}>{Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(letter => <span className="type-pair" key={letter}>{letter}{letter.toLowerCase()}</span>)}</span>)}</div></div>
      <span className="bento-label">Instrument Sans</span>
    </div>
    <div className="bento-palette" aria-label="NovaIM brand palette">
      <div className="palette-carbon" tabIndex={0}><span>Black<small>#050607</small></span></div>
      <div className="palette-graphite" tabIndex={0}><span>Graphite<small>#171A1F</small></span></div>
      <div className="palette-purple" tabIndex={0}><span>Cobalt<small>#2F5BEA</small></span></div>
      <div className="palette-mineral" tabIndex={0}><span>Mineral blue<small>#6F8FB8</small></span></div>
      <div className="palette-cyan" tabIndex={0}><span>Sage<small>#9DB0A5</small></span></div>
      <div className="palette-amber" tabIndex={0}><span>Ivory<small>#D8CFB8</small></span></div>
      <div className="palette-white" tabIndex={0}><span>White<small>#F1F0EA</small></span></div>
    </div>
    <div className="bento-mockup live-keynote restored-deck">
      <Image src="/mockups/novaim-keynote-v2.png" alt="NovaIM presentation in a dark auditorium" fill sizes="(max-width:700px) 88vw, 58vw" />
      <div className="keynote-screen">{["Find the signal", "Connect the layers", "Move forward"].map((title,i) => <div className="deck-frame" key={title} style={{"--deck-delay": `${i * 6}s`} as CSSProperties}>
        <div className="keynote-copy"><p>{title}</p></div><div className="deck-art"><ConceptArt variant={i} /></div>
      </div>)}</div>
    </div>
    <div className="bento-orbit bento-knot-detail" role="img" aria-label="Animated white lines on graphite"><PositioningGradient /></div>
    <div className="bento-brand-applications">
      <div className="bento-brand-photo"><Image src="/mockups/novaim-shirt-iso4.png" alt="White NovaIM symbol embroidered on a black shirt" fill sizes="(max-width:700px) 88vw, (min-width:1478px) 640px, 44vw" /></div>
      <div className="bento-brand-photo"><Image src="/mockups/novaim-facade-iso4.png" alt="NovaIM symbol on a graphite sign mounted on a metal facade" fill sizes="(max-width:700px) 88vw, (min-width:1478px) 640px, 44vw" /></div>
    </div>
  </div>;
}
