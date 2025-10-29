import { useState, useEffect } from "react";
import {
  Code2,
  Layers,
  Database,
  Wrench,
  Shield,
  Globe,
  Server,
  Terminal,
  GitBranch,
  Lock,
  Cpu,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const techCategories = [
  {
    name: "Frontend",
    icon: Code2,
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"],
    color: "#00ffe5",
    icons: [Globe, Layers, Terminal, Cpu],
  },
  {
    name: "Backend",
    icon: Database,
    technologies: ["Supabase", "PostgreSQL", "Edge Functions", "Deno Runtime"],
    color: "#00ff9f",
    icons: [Server, Wrench, GitBranch, Cpu],
  },
  {
    name: "Programming Languages",
    icon: Layers,
    technologies: ["TypeScript", "JavaScript", "SQL", "TSX/JSX"],
    color: "#00aaff",
    icons: [Terminal, Code2, Settings, Cpu],
  },
  {
    name: "Tools & Build",
    icon: Wrench,
    technologies: ["Vite", "ESLint", "PostCSS", "npm", "Git"],
    color: "#ffaa00",
    icons: [GitBranch, Server, Cpu, Settings],
  },
  {
    name: "Security & Auth",
    icon: Shield,
    technologies: ["Row Level Security", "JWT Auth", "Email/Password Auth", "Supabase Auth"],
    color: "#ff5555",
    icons: [Lock, Cpu, Server, Settings],
  },
];

export default function TechStack() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [lastHovered, setLastHovered] = useState(0);
  const [clockVisible, setClockVisible] = useState(false);

  // ✅ Make rotation move clockwise (+1) instead of counterclockwise
  useEffect(() => {
    const interval = setInterval(() => {
      if (clockVisible) {
        setRotation((prev) => (prev + 1) % 360);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [clockVisible]);

  const activeIndex = hoveredCategory !== null ? hoveredCategory : lastHovered;
  const activeCategory = techCategories[activeIndex];

  return (
    <div className="bg-linear-to-br from-[#0a0a0f] via-[#0c0c15] to-[#10101a] text-white flex flex-col items-center justify-center overflow-hidden">
      <div className="flex w-full max-w-6xl h-[75vh] items-center justify-between">
        {/* 🔵 Left Animated Circle */}
        <motion.div
          key={activeCategory.name}
          className="relative w-56 h-56 flex items-center justify-center rounded-full border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)]"
          style={{
            background: `radial-gradient(circle at center, ${activeCategory.color}15, transparent 70%)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Center Icon */}
          {(() => {
            const CenterIcon = activeCategory.icon;
            return (
              <motion.div
                animate={
                  !hoveredCategory
                    ? { scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }
                    : { scale: 1, opacity: 1 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <CenterIcon
                  size={40}
                  style={{
                    color: activeCategory.color,
                    filter: `drop-shadow(0 0 10px ${activeCategory.color})`,
                    zIndex: 10,
                  }}
                />
              </motion.div>
            );
          })()}

          {/* ✅ Orbiting Icons - smooth clockwise rotation */}
          <AnimatePresence>
            {clockVisible && hoveredCategory !== null && (
              <motion.div
                key="orbit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.05s linear",
                }}
              >
                {activeCategory.icons.map((Icon, i) => {
                  const angle = (i / activeCategory.icons.length) * 360;
                  const radius = 70;
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);
                  return (
                    <Icon
                      key={i}
                      size={22}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px - 11px)`,
                        top: `calc(50% + ${y}px - 11px)`,
                        color: activeCategory.color,
                        opacity: 0.9,
                        filter: `drop-shadow(0 0 6px ${activeCategory.color}80)`,
                      }}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 🧠 Info Panel */}
        <motion.div
          className="flex-1 bg-[#0c0c15]/80 p-8 rounded-xl shadow-lg backdrop-blur-md border border-white/10 flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {hoveredCategory === null ? (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold mb-4 text-[#00ffe5]">
                  Explore My Tech Stack
                </h2>
                <p className="text-gray-300 text-[clamp(0.9rem,1.2vw,1rem)] leading-relaxed">
                  My tech stack is the core engine that drives every project from concept to creation.
                  It brings together innovation, precision, and performance to craft seamless user experiences
                  and reliable systems. Each layer — from design to deployment — plays a vital role in ensuring
                  speed, security, scalability, and visual elegance. It’s not just about tools, but about building
                  a strong foundation where creativity meets technology to deliver impactful digital solutions 🚀.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2
                  className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4"
                  style={{ color: activeCategory.color }}
                >
                  {activeCategory.name}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-200 text-[clamp(0.9rem,1.5vw,1rem)]">
                  {activeCategory.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-400 text-[clamp(0.8rem,1.2vw,0.95rem)]">
                  These technologies form the foundation of my{" "}
                  {activeCategory.name.toLowerCase()} expertise, helping me build scalable,
                  efficient, and secure applications.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 🧩 Right Side: Category List */}
        <div className="flex flex-col justify-center gap-4 w-fit items-start">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              onMouseEnter={() => {
                setHoveredCategory(index);
                setLastHovered(index);
                setClockVisible(true);
              }}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setClockVisible(false);
              }}
              className="cursor-pointer px-4 py-2 rounded-lg text-[clamp(0.8rem,1vw,0.95rem)] font-semibold transition-all duration-300 w-fit"
              style={{
                color: hoveredCategory === index ? category.color : "#888",
                backgroundColor:
                  hoveredCategory === index ? `${category.color}20` : "transparent",
              }}
              whileHover={{ scale: 1.05 }}
            >
              {category.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
