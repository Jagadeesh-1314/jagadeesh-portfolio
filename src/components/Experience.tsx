import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "XYZ Pvt Ltd",
    duration: "Jun 2023 – Sept 2023",
    description:
      "Developed responsive UI components with React and Tailwind CSS. Collaborated with backend team for API integration.",
  },
  {
    title: "Web Developer",
    company: "ABC Technologies",
    duration: "Oct 2023 – Jan 2024",
    description:
      "Built dynamic websites and implemented animations using Framer Motion. Improved page speed and SEO performance.",
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Remote Projects",
    duration: "Feb 2024 – Present",
    description:
      "Created full-stack web apps using React, Firebase, and Node.js. Delivered interactive dashboards and e-commerce systems.",
  },
];

export default function Experience() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    camera.position.z = 5;

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


    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
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
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative bg-[#0a0a0f] text-[#e0e0e0] py-24 px-4 md:px-12 overflow-hidden"
    >
      {/* 3D Particle Background */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#00ffe5] mb-16 drop-shadow-[0_0_20px_#00ffe5] relative z-10">
        My Experience Journey
      </h2>

      {/* Timeline line */}
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 top-[200px] bottom-20 transform -translate-x-1/2 w-0.5 bg-linear-to-b from-[#00ffe5] via-[#8b5cf6]/40 to-[#00ffe5]/40 rounded-full z-0"></div>
      {/* Vertical line for small screens */}
      <div className="md:hidden absolute top-full left-1/2 w-0.5 h-10 bg-linear-to-b from-[#00ffe5] via-[#8b5cf6]/40 to-[#00ffe5]/40 transform -translate-x-1/2 z-0"></div>

      {/* Experience Cards */}
      <div className="flex flex-col gap-10 max-w-4xl mx-auto relative z-10">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative w-full md:w-[42%] bg-[#0c1318]/60 border border-[#00ffe533] rounded-2xl p-5 shadow-[0_0_15px_#00ffe533] hover:shadow-[0_0_25px_#00ffe555] transition-all
              ${index % 2 === 0 ? "md:self-start md:mr-auto" : "md:self-end md:ml-auto"}`}
          >
            {/* Connector Dot */}
            <div
              className={`absolute w-4 h-4 bg-[#00ffe5] rounded-full top-5
              ${index % 2 === 0 ? "-right-6" : "-left-6"} shadow-[0_0_15px_#00ffe5] animate-pulse`}
            ></div>

            <h3 className="text-xl md:text-2xl font-semibold text-[#00ffe5] mb-1">{exp.title}</h3>
            <p className="text-[#bdfaff]/80 mb-2">{exp.company} — {exp.duration}</p>
            <p className="text-[#dbffff]/90 text-sm md:text-base leading-relaxed">{exp.description}</p>

            <div className="absolute inset-0 rounded-2xl border border-transparent hover:border-[#00ffe533] transition-all duration-300"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
