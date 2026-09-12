"use client";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { Wordmark } from "./brand-mark";
export type SignalMode="principles"|"signals"|"systems"|"infrastructure"|"positioning"|"momentum"|"resonance"|"identity";
type Props={mode?:SignalMode;interactive?:boolean;paused?:boolean;animatePalette?:boolean;neural?:boolean;pointScale?:number;ink?:string};
export function SignalField({mode="signals",interactive=false}:Props){
 const root=useRef<HTMLButtonElement>(null);
 const [pulse,setPulse]=useState(false);
 const flat=mode==="signals";
 const pattern=mode==="systems"||mode==="momentum";
 const content=<div className={`visual-surface ${flat?"flat-visual":pattern?"pattern-visual":"glass-visual"}`}>
  {flat?<><Wordmark/><span className="flat-rule"/></>:pattern?<div className="pattern-grid" style={{"--pattern-shift":pulse?"-26px":"0px"} as CSSProperties}>{Array.from({length:42},(_,i)=><i key={i}/>)}</div>:<Image className="glass-image" src="/media/glass-layers.png" width={1024} height={1024} sizes="(max-width:700px) 100vw, 55vw" alt="" unoptimized/>}
 </div>;
 if(!interactive)return content;
 return <button ref={root} type="button" className="signal-interaction" aria-label={pattern?"Shift the orbital pattern":flat?"Animate the NovaIM mark":"Tilt the connected glass layers"} onPointerMove={e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='paused')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--tilt-x',`${((e.clientX-r.left)/r.width-.5)*9}deg`);e.currentTarget.style.setProperty('--tilt-y',`${-((e.clientY-r.top)/r.height-.5)*9}deg`);}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--tilt-x','0deg');e.currentTarget.style.setProperty('--tilt-y','0deg');}} onClick={()=>{setPulse(v=>!v);if(root.current)root.current.style.setProperty('--tilt-x',pulse?'-5deg':'5deg');}}>{content}</button>;
}
export function SculptureFilm(){return <SignalField mode="positioning"/>;}
export function MotionControl(){const[paused,setPaused]=useState(false);return <button className="motion-control" aria-pressed={paused} onClick={()=>{const next=!paused;setPaused(next);document.documentElement.dataset.motion=next?'paused':'playing';window.dispatchEvent(new Event('brand-motion'));}}>{paused?'Resume motion ↗':'Pause motion Ⅱ'}</button>;}
