import { useState, useEffect, useRef } from "react";
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
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TechCategory {
  name: string;
  icon: LucideIcon;
  technologies: string[];
  color: string;
  icons: LucideIcon[];
}

const techCategories: TechCategory[] = [
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
  const [isMobile, setIsMobile] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP animations for desktop circle
  useEffect(() => {
    if (!isMobile && circleRef.current) {
      gsap.to(circleRef.current, {
        boxShadow: `0 0 40px ${activeCategory.color}40, inset 0 0 30px ${activeCategory.color}20`,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [hoveredCategory, isMobile]);

  // Smooth clockwise rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (clockVisible && !isMobile) {
        setRotation((prev) => (prev + 1) % 360);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [clockVisible, isMobile]);

  // GSAP orbit animation
  useEffect(() => {
    if (!isMobile && orbitRef.current && clockVisible) {
      gsap.fromTo(
        orbitRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [clockVisible, isMobile]);

  // Title Animation with ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, letterSpacing: "0em", fontSize: "2.5rem" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.2em",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeIndex = hoveredCategory !== null ? hoveredCategory : lastHovered;
  const activeCategory = techCategories[activeIndex];

  return (
    <div ref={sectionRef} className=" text-white overflow-hidden">
      {/* Animated Title Section */}
      <div className="w-full px-6 md:px-16 m-5 p-0 md:mb-10">
        <h1
          ref={titleRef}
          className="font-bold tracking-widest text-[#00ffe5] drop-shadow-[0_0_15px_#00ffe5] m-0 p-0 leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          My Tech Stack <span className="inline-block ml-2">👨🏻‍💻</span>
        </h1>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto items-start justify-between px-4 m-0 mb-28 p-0">
        {/* Animated Circle */}
        <motion.div
          ref={circleRef}
          key={activeCategory.name}
          className="relative w-72 h-72 flex items-center justify-center rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: `${activeCategory.color}40`,
            background: `radial-gradient(circle at center, ${activeCategory.color}15, transparent 70%)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Center Icon */}
          {(() => {
            const CenterIcon = activeCategory.icon;
            return (
              <motion.div
                animate={
                  !hoveredCategory
                    ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }
                    : { scale: 1, opacity: 1 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              >
                <CenterIcon
                  size={56}
                  style={{
                    color: activeCategory.color,
                    filter: `drop-shadow(0 0 15px ${activeCategory.color})`,
                  }}
                />
              </motion.div>
            );
          })()}

          {/* Orbiting Icons */}
          <AnimatePresence>
            {clockVisible && hoveredCategory !== null && (
              <motion.div
                ref={orbitRef}
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
                  const radius = 95;
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);
                  return (
                    <Icon
                      key={i}
                      size={28}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px - 14px)`,
                        top: `calc(50% + ${y}px - 14px)`,
                        color: activeCategory.color,
                        opacity: 0.85,
                        filter: `drop-shadow(0 0 8px ${activeCategory.color}90)`,
                      }}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          className="flex-1 bg-[#0c0c15]/60 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/10 flex flex-col justify-center max-w-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
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
                <h2 className="text-4xl font-bold mb-6 bg-linear-to-r from-[#00ffe5] to-[#00ff9f] bg-clip-text text-transparent">
                  Explore My Tech Stack
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My tech stack is the core engine that drives every project from concept to creation.
                  It brings together innovation, precision, and performance to craft seamless user experiences
                  and reliable systems. Each layer — from design to deployment — plays a vital role in ensuring
                  speed, security, scalability, and visual elegance. 🚀
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
                  className="text-5xl font-bold mb-6"
                  style={{
                    color: activeCategory.color,
                    textShadow: `0 0 20px ${activeCategory.color}60`,
                  }}
                >
                  {activeCategory.name}
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-200 text-lg">
                  {activeCategory.technologies.map((tech) => (
                    <motion.li
                      key={tech}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-400 text-base">
                  These technologies form the foundation of my{" "}
                  {activeCategory.name.toLowerCase()} expertise, helping me build scalable,
                  efficient, and secure applications.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category List */}
        <div className="flex flex-col justify-center gap-4">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
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
                className="cursor-pointer px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center gap-3 group"
                style={{
                  color: hoveredCategory === index ? category.color : "#888",
                  backgroundColor:
                    hoveredCategory === index ? `${category.color}20` : "transparent",
                  border: `2px solid ${hoveredCategory === index ? category.color : "transparent"}`,
                }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  size={20}
                  className="transition-transform group-hover:rotate-12"
                  style={{
                    filter:
                      hoveredCategory === index ? `drop-shadow(0 0 8px ${category.color})` : "none",
                  }}
                />
                {category.name}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center justify-start min-h-screen px-4 py-12 gap-6">
        <motion.p
          className="text-gray-300 text-center text-sm px-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Tap on any category to explore the technologies I use to build powerful applications.
        </motion.p>

        {/* Mobile Cards */}
        <div className="w-full max-w-md space-y-4">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            const isExpanded = hoveredCategory === index;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative"
              >
                <motion.div
                  onClick={() => setHoveredCategory(isExpanded ? null : index)}
                  className="w-full bg-[#0c0c15]/80 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: isExpanded ? category.color : "rgba(255,255,255,0.1)",
                    boxShadow: isExpanded ? `0 0 30px ${category.color}40` : "none",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon
                        size={28}
                        style={{
                          color: category.color,
                          filter: isExpanded ? `drop-shadow(0 0 10px ${category.color})` : "none",
                        }}
                      />
                      <h3
                        className="text-xl font-bold"
                        style={{
                          color: isExpanded ? category.color : "#fff",
                        }}
                      >
                        {category.name}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Terminal size={20} style={{ color: category.color, opacity: 0.6 }} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-white/10">
                          <ul className="space-y-2 text-gray-300 text-sm">
                            {category.technologies.map((tech) => (
                              <motion.li
                                key={tech}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: category.color }}
                                />
                                {tech}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="flex gap-2 mt-4 flex-wrap">
                            {category.icons.map((IconItem, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-2 rounded-lg"
                                style={{
                                  backgroundColor: `${category.color}15`,
                                  border: `1px solid ${category.color}30`,
                                }}
                              >
                                <IconItem
                                  size={16}
                                  style={{
                                    color: category.color,
                                    opacity: 0.8,
                                  }}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
