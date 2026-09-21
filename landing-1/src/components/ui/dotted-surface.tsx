"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = {
  size?: number;
  opacity?: number;
  sizeAttenuation?: boolean;
  vertexColors?: boolean;
  className?: string;
};

export default function DottedSurface({
  size = 8,
  opacity = 0.8,
  sizeAttenuation = true,
  vertexColors = true,
  className = "",
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a09, 0.055);

    const camera = new THREE.PerspectiveCamera(54, 1, 0.1, 80);
    camera.position.set(0, 5.8, 9.3);
    camera.lookAt(0, -0.55, -2.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x080a09, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const columns = 112;
    const rows = 76;
    const count = columns * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);
    const phase = new Float32Array(count);
    const color = new THREE.Color();

    let point = 0;
    for (let row = 0; row < rows; row += 1) {
      const z = THREE.MathUtils.lerp(-11.8, 4.2, row / (rows - 1));
      for (let column = 0; column < columns; column += 1) {
        const x = THREE.MathUtils.lerp(-11.8, 11.8, column / (columns - 1));
        const i = point * 3;
        const randomPhase = Math.sin(point * 12.9898) * 43758.5453;
        const brightness = 0.36 + 0.58 * (randomPhase - Math.floor(randomPhase));

        baseX[point] = x;
        baseZ[point] = z;
        phase[point] = (column * 0.13 + row * 0.07) % (Math.PI * 2);
        positions[i] = x;
        positions[i + 1] = 0;
        positions[i + 2] = z;

        color.setRGB(brightness * 0.92, brightness * 0.96, brightness * 0.93);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        point += 1;
      }
    }

    const geometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute("position", positionAttribute);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: size },
        uOpacity: { value: opacity },
        uReverseAttenuation: { value: sizeAttenuation ? 1 : 0 },
        uUseVertexColors: { value: vertexColors ? 1 : 0 },
      },
      vertexShader: `
        varying vec3 vColor;
        varying float vDepthFade;
        uniform float uSize;
        uniform float uReverseAttenuation;

        void main() {
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          float cameraDistance = max(-viewPosition.z, 0.1);
          float reverseScale = mix(0.56, 1.0, smoothstep(3.2, 15.0, cameraDistance));
          gl_PointSize = uSize * mix(1.0, reverseScale, uReverseAttenuation);
          gl_Position = projectionMatrix * viewPosition;
          vColor = color;
          vDepthFade = smoothstep(2.6, 6.2, cameraDistance);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDepthFade;
        uniform float uOpacity;
        uniform float uUseVertexColors;

        void main() {
          float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceFromCenter > 0.5) discard;
          float circle = exp(-distanceFromCenter * distanceFromCenter * 18.0);
          vec3 pointColor = mix(vec3(0.91, 0.93, 0.91), vColor, uUseVertexColors);
          gl_FragColor = vec4(pointColor, circle * uOpacity * vDepthFade);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.NormalBlending,
    });

    const surface = new THREE.Points(geometry, material);
    scene.add(surface);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    const startedAt = performance.now();

    const updateSurface = (time: number) => {
      const t = reduceMotion.matches ? 0.8 : (time - startedAt) * 0.00034;
      for (let i = 0; i < count; i += 1) {
        const x = baseX[i];
        const z = baseZ[i];
        const radial = Math.hypot(x * 0.62, z + 1.8);
        positions[i * 3 + 1] =
          Math.sin(x * 0.54 + t * 2.2 + phase[i] * 0.08) * 0.33 +
          Math.cos(z * 0.62 - t * 1.45) * 0.28 +
          Math.sin(radial * 0.72 - t * 1.7) * 0.24;
      }
      positionAttribute.needsUpdate = true;
      surface.rotation.y = Math.sin(t * 0.28) * 0.018;
    };

    const render = (time: number) => {
      updateSurface(time);
      renderer.render(scene, camera);
      if (!reduceMotion.matches && visible) frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible && !visible && !reduceMotion.matches) frame = requestAnimationFrame(render);
      visible = nextVisible;
      if (!visible) cancelAnimationFrame(frame);
    }, { rootMargin: "100px" });
    intersectionObserver.observe(container);

    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [opacity, size, sizeAttenuation, vertexColors]);

  return <div ref={containerRef} className={`dotted-surface ${className}`.trim()} />;
}
