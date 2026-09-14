"use client";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./brand-mark";
export function LogoConstruction() {
 const root = useRef<HTMLDivElement>(null);
 const [boxes,setBoxes] = useState<{x:number;y:number;width:number;height:number}[]>([]);
 useEffect(() => {
  const groups = root.current?.querySelectorAll<SVGGElement>(".supplied-logo > g");
  if(groups) setBoxes(Array.from(groups,g=>{const b=g.getBBox();return {x:b.x,y:b.y,width:b.width,height:b.height};}));
 },[]);
 return <div className="logo-construction vector-logo-construction" ref={root}><Wordmark /><svg className="vector-logo-guides" viewBox="0 0 522 96" fill="none" stroke="currentColor" aria-hidden="true">{boxes.map((b,i)=><path key={i} d={`M ${b.x} -70 V 140 M ${b.x+b.width} -70 V 140 M ${b.x-30} ${b.y} H ${b.x+b.width+30} M ${b.x-30} ${b.y+b.height} H ${b.x+b.width+30}`} />)}</svg></div>;
}
