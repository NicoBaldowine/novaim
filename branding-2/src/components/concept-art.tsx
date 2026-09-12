import { useId } from "react";

export function ConceptArt({ variant }: { variant: number }) {
  const id = useId().replaceAll(":", "");
  const fill = (name: string) => `url(#${id}-${name})`;
  return <svg className="concept-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-rise`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#E3D9B9"/><stop offset=".12" stopColor="#9EB3A7"/><stop offset=".4" stopColor="#355FD6"/><stop offset=".78" stopColor="#06111D"/><stop offset="1" stopColor="#050607"/></linearGradient>
      <linearGradient id={`${id}-fall`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#050607"/><stop offset=".32" stopColor="#06111D"/><stop offset=".62" stopColor="#355FD6"/><stop offset=".9" stopColor="#9EB3A7"/><stop offset="1" stopColor="#E3D9B9"/></linearGradient>
      <linearGradient id={`${id}-across`}><stop stopColor="#E3D9B9"/><stop offset=".1" stopColor="#9EB3A7"/><stop offset=".36" stopColor="#355FD6"/><stop offset=".76" stopColor="#06111D"/><stop offset="1" stopColor="#050607"/></linearGradient>
      <linearGradient id={`${id}-reverse`}><stop stopColor="#050607"/><stop offset=".26" stopColor="#06111D"/><stop offset=".62" stopColor="#355FD6"/><stop offset=".9" stopColor="#9EB3A7"/><stop offset="1" stopColor="#E3D9B9"/></linearGradient>
      <linearGradient id={`${id}-warm`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#06111D"/><stop offset=".35" stopColor="#3567D4"/><stop offset=".62" stopColor="#9EB3A7"/><stop offset=".9" stopColor="#E3D9B9"/><stop offset="1" stopColor="#E3D9B9"/></linearGradient>
      <clipPath id={`${id}-lower-half`}><rect x="0" y="200" width="400" height="200" /></clipPath>
      <linearGradient id={`${id}-circle`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9EB3A7"/><stop offset=".35" stopColor="#355FD6"/><stop offset="1" stopColor="#050607"/></linearGradient>
      <linearGradient id={`${id}-diamond`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#050607"/><stop offset=".5" stopColor="#355FD6"/><stop offset=".88" stopColor="#9EB3A7"/><stop offset="1" stopColor="#E3D9B9"/></linearGradient>
    </defs>
    {variant === 0 && <g>{[150,175,240,280].map((h,i)=><rect key={i} x={60+i*70} y={340-h} width="70" height={h} fill={fill(i%2?'rise':'fall')}/>)}</g>}
    {variant === 1 && <g>{[0,1,2,3].map(i=><path key={i} d={`M ${60+i*53} 130 l 121 -70 v 210 l -121 70 Z`} fill={fill('across')}/>)}</g>}
    {variant === 2 && <g>{[2,1,0].map(i=><path key={i} d={`M ${60+i*60} 60 L ${220+i*60} 200 L ${60+i*60} 340 Z`} fill={fill('reverse')}/>)}</g>}
    {variant === 3 && <g transform="translate(0 20)">{[0,1,2].map(i=><rect key={i} x="72" y={64+i*78} width="256" height="78" fill={fill(i%2?'reverse':'across')}/>)}</g>}
    {variant === 4 && <g>{[0,1,2,3].map(i=><path key={i} d={`M60 ${268-i*48} L200 ${338-i*48} L340 ${268-i*48} L200 ${198-i*48} Z`} fill={fill(i%2?'reverse':'across')}/>)}</g>}
    {variant === 5 && <circle cx="200" cy="200" r="140" fill={fill('rise')}/>}
  </svg>;
}
