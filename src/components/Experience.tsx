import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    period: "May 2024 – Aug 2024",
    description:
      "Developed futuristic dashboards using React, Tailwind, and animation frameworks for enterprise clients."
  },
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    period: "Jan 2023 – Apr 2024",
    description:
      "Created high-performance websites with elegant UI, real-time Firebase integrations, and smooth UX animations."
  },
  {
    title: "Open Source Contributor",
    company: "GitHub Community",
    period: "2022 – Present",
    description:
      "Contributed to web accessibility and interactive animation projects, mentoring juniors through pull requests."
  }
];

export default function Experience() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#050708] via-[#08121c] to-[#050708] flex flex-col items-center py-24"
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        x.set(e.clientX - innerWidth / 2);
        y.set(e.clientY - innerHeight / 2);
      }}
    >
      {/* background floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-[#00fff555] rounded-full blur-[180px]"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          style={{ opacity: 0.2 }}
        />
      </div>

      <h2 className="text-5xl font-bold text-[#00ffe5] drop-shadow-[0_0_12px_#00ffe5] mb-24 z-10">
        Experience
      </h2>

      {/* vertical neon line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-transparent via-[#00fff6] to-transparent rounded-full blur-[2px]" />

      <div className="relative flex flex-col gap-28 items-center z-10 w-full max-w-5xl px-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col md:flex-row items-center justify-center gap-6 ${
              index % 2 === 0 ? "md:self-start" : "md:self-end"
            }`}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px #00fff6, 0 0 60px #00fff633",
                y: -10
              }}
              className="bg-[#0c1318]/70 backdrop-blur-lg border border-[#00fff544] rounded-3xl p-8 w-full md:w-[420px] shadow-[0_0_20px_#00fff533] transition-all duration-500"
            >
              <h3 className="text-2xl font-semibold text-[#00fff7] mb-2">
                {exp.title}
              </h3>
              <h4 className="text-[#b9ffff]/80 mb-1">{exp.company}</h4>
              <p className="text-sm text-[#a8fdfd]/70 mb-3">{exp.period}</p>
              <p className="text-[#dbffff]/90 text-sm leading-relaxed">
                {exp.description}
              </p>
            </motion.div>

            {/* glowing connector node */}
            <div className="absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 w-6 h-6 rounded-full bg-[#00fff7] shadow-[0_0_25px_#00fff7] animate-pulse"></div>
          </motion.div>
        ))}
      </div>

      {/* floating glow orb that moves with scroll */}
      <motion.div
        className="absolute left-1/2 top-0 w-8 h-8 rounded-full bg-[#00fff7] shadow-[0_0_30px_#00fff7] blur-[2px]"
        animate={{
          y: scrollY * 0.4 + 100,
          scale: [1, 1.2, 1]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </section>
  );
}
