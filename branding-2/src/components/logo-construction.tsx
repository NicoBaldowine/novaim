"use client";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./brand-mark";
type Box = { x:number; y:number; width:number; height:number };
export function LogoConstruction() {
 const root = useRef<HTMLDivElement>(null);
 const [boxes,setBoxes] = useState<Box[]>([]);
 useEffect(() => {
  const groups=root.current?.querySelectorAll<SVGGElement>(".supplied-logo > g");
  if (!groups) return;
  setBoxes(Array.from(groups,g=>{
   const b=g.getBBox();
   const matrix=g.transform.baseVal.consolidate()?.matrix;
   const a=new DOMPoint(b.x,b.y).matrixTransform(matrix);
   const z=new DOMPoint(b.x+b.width,b.y+b.height).matrixTransform(matrix);
   return {x:a.x,y:a.y,width:z.x-a.x,height:z.y-a.y};
  }));
 },[]);
 const mark=boxes[0], type=boxes[1];
 const middle=mark && type ? (mark.x+mark.width+type.x)/2 : 0;
 return <div className="logo-construction vector-logo-construction" ref={root}><Wordmark />
 <svg className="vector-logo-guides" viewBox="0 0 522 96" fill="none" stroke="currentColor" aria-hidden="true">
 {mark && type && boxes.map((b,i)=>{
  const left=i===0 ? mark.x-28 : middle;
  const right=i===0 ? middle : type.x+type.width+28;
  return <path key={i} d={`M ${b.x} -48 V 144 M ${b.x+b.width} -48 V 144 M ${left} ${b.y} H ${right} M ${left} ${b.y+b.height} H ${right}`} />;
 })}
 </svg></div>;
}
