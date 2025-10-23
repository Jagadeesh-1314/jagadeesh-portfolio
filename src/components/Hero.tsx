import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 🌌 Three.js Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mount = mountRef.current;
    if (mount) mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: "#00ffe5",
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 5;

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      scene.rotation.x += (mouse.y * 0.3 - scene.rotation.x) * 0.05;
      scene.rotation.y += (mouse.x * 0.3 - scene.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 💫 GSAP Typing Effect for Quote
  useEffect(() => {
    const text = "“Every Line of Code Tells a Story.💡”";
    const el = typingRef.current;
    if (!el) return;

    el.textContent = "";
    const tl = gsap.timeline({ delay: 3.5 }); // start typing after delay

    text.split("").forEach((_char, i) => {
      tl.to(
        el,
        {
          duration: 0.05,
          onUpdate: () => {
            el.textContent = text.slice(0, i + 1);
          },
        },
        "+=0.05"
      );
    });

    // blinking cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
      delay: 3.5,
    });
  }, []);

  // 🎨 Framer Motion Variants for name
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 1, staggerChildren: 0.1 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const name = "T Jagadeesh Chandra";

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-linear-to-b from-[#0a0a0f] to-[#1a1a20] text-[#e0e0e0]"
    >
      <div ref={mountRef} className="absolute inset-0" />

      {/* ✨ Name Animation */}
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-[#00ffe5] font-bold drop-shadow-[0_0_20px_#00ffe5]
       tracking-widest scale-x-105 text-center
       flex flex-nowrap justify-center items-center
       whitespace-nowrap overflow-x-auto
       text-[clamp(1.5rem,6vw,5rem)]"
        style={{ WebkitOverflowScrolling: 'touch' }} // smoother scrolling on mobile
      >
        {name.split("").map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>


      {/* ✨ Subtitle Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-6 tracking-wide text-center"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ display: "block" }}
        >
          A Passionate Full Stack Developer 🚀 Turning Ideas into Interactive Experiences ✨
        </motion.span>

        {/* ✨ GSAP Typing Effect Section */}
        <div className="text-center mt-4" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
          <span ref={typingRef} className="text-[#bdfaff]" />
          <span ref={cursorRef} className="text-[#00ffe5]">|</span>
        </div>
      </motion.div>
    </section>
  );
}
