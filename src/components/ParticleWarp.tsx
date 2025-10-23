import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  active: boolean;
  width?: number;
  height?: number;
}

export default function ParticleWarp({ active, width = 400, height = 200 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    const mount = mountRef.current;
    if (mount) mount.appendChild(renderer.domElement);

    // particles
    const geometry = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 2;
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#00ffe5",
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 3;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      // simple outward burst
      geometry.attributes.position.array.forEach((_, i) => {
        geometry.attributes.position.array[i] *= 1 + 0.001;
      });
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // remove after 0.8s automatically
    const timer = setTimeout(() => {
      if (mount && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
    }, 800);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
      if (mount && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [active, width, height]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-10" />;
}
