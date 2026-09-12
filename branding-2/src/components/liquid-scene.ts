import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";
import type { SignalMode } from "./signal-field";

export function createLiquidScene(canvas: HTMLCanvasElement, mode: SignalMode, ink?: string) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:"low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 30);
  camera.position.set(0, .1, 5.8);
  const environment = new RoomEnvironment();
  const generator = new THREE.PMREMGenerator(renderer);
  const env = generator.fromScene(environment, .035);
  scene.environment = env.texture;
  environment.dispose(); generator.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(-3,4,5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 2.4); rim.position.set(4,1,-2); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xc4dfd1,.75); fill.position.set(-3,-2,1); scene.add(fill);
  const group = new THREE.Group(); scene.add(group);
  const noise = new ImprovedNoise();
  const gold = new THREE.Color("#db9d47"), green = new THREE.Color("#0b201a");
  const multi = mode === "systems";
  const count = multi ? 3 : 1;
  const pieces = Array.from({length:count}, (_,index) => {
    const geometry = new THREE.SphereGeometry(1, 96, 64);
    const original = new Float32Array(geometry.attributes.position.array);
    const colors = new Float32Array(original.length);
    const material = new THREE.MeshPhysicalMaterial({color:0xffffff,vertexColors:true,metalness:.94,roughness:.19,clearcoat:.8,clearcoatRoughness:.12,envMapIntensity:1.4});
    geometry.setAttribute("color", new THREE.BufferAttribute(colors,3));
    const mesh = new THREE.Mesh(geometry,material);
    if (multi) { mesh.scale.setScalar(.57); mesh.position.set(index === 0 ? -.54 : .38, index === 2 ? -.42 : .32, index === 1 ? -.2 : .14); }
    group.add(mesh);
    const dark = multi ? index === 1 : mode === "resonance" || ink === "#0b201a";
    return {geometry,original,colors,material,mesh,dark,index};
  });
  const shade = new THREE.Color();
  function render(time:number, x:number, y:number, pulse:number) {
    for (const piece of pieces) {
      const {geometry,original,colors,index,dark,mesh}=piece;
      const position=geometry.attributes.position;
      const t=time*.2+index*3.8;
      for (let i=0;i<position.count;i++) {
        const px=original[i*3],py=original[i*3+1],pz=original[i*3+2];
        const n=noise.noise(px*1.5+t*.23,py*1.5-t*.18,pz*1.5+t*.15);
        const swell=.16*Math.sin(px*3.1+py*1.8+t)+.12*Math.cos(py*3.6-pz*2.2-t*.7);
        const radius=1+.38*n+swell+pulse*.065;
        position.setXYZ(i,px*radius,py*radius,pz*radius);
        const blend=dark ? .03 : THREE.MathUtils.smoothstep(py*.6+px*.4+n*.25,-.5,.4);
        shade.copy(green).lerp(gold,blend);
        colors[i*3]=shade.r;colors[i*3+1]=shade.g;colors[i*3+2]=shade.b;
      }
      position.needsUpdate=true; geometry.attributes.color.needsUpdate=true; geometry.computeVertexNormals();
      mesh.rotation.set(.18+Math.sin(t*.3)*.13, t*.18, -.18);
    }
    group.rotation.y=x*.25; group.rotation.x=y*.18;
    renderer.render(scene,camera);
  }
  return {
    render,
    resize(width:number,height:number) { if(!width||!height)return; renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix(); },
    dispose() { pieces.forEach(p=>{p.geometry.dispose();p.material.dispose();});env.dispose();renderer.dispose(); },
  };
}
