import { useEffect, useState } from "react";
import { getProjects } from "../lib/getProjects";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../types/Project";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [hovered, setHovered] = useState<string | null>(null);
    const [selected, setSelected] = useState<Project | null>(null);
    const [hoverPosition, setHoverPosition] = useState<"top" | "bottom">("top");

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);

    return (
        <section
            id="projects"
            className="relative min-h-screen bg-[#06080a] text-[#dfffff] flex flex-col items-center justify-center px-6 overflow-visible"
        >
            <h2 className="mt-10 text-5xl font-bold text-[#00ffe5] drop-shadow-[0_0_12px_#00ffe5] mb-5 tracking-widest">
                👨‍💻 What I’ve Built
            </h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-[#bdfaff] tracking-wide mb-12"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ display: "block" }}
                >
                    🚀 Showcasing My Journey Through Code
                </motion.span>
            </motion.p>

            {/* Project List */}
            <div className="relative flex flex-col gap-6 w-full max-w-4xl z-0">
                {projects.map((p) => (
                    <motion.div
                        key={p.id}
                        onMouseEnter={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const spaceBelow = window.innerHeight - rect.bottom;
                            setHoverPosition(spaceBelow > 300 ? "bottom" : "top");
                            setHovered(p.id);
                        }}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setSelected(p)}
                        className={`cursor-pointer relative rounded-xl transition-all duration-500 ease-out border border-[#00ffe522]
              ${hovered && hovered !== p.id ? "opacity-30 blur-sm scale-[0.97]" : "opacity-100 scale-100"}
            `}
                    >
                        {/* Card content */}
                        <div className="flex justify-between items-center px-8 py-6 bg-[#11111a]/80 rounded-xl z-0">
                            <h3 className="text-3xl font-semibold tracking-wider text-[#00ffe5]">
                                {p.title}
                            </h3>
                            <span className="text-sm text-[#bdfaff]/80 italic">
                                {p.tech.join(", ")}
                            </span>
                        </div>

                        {/* Floating Hover Panel */}
                        <AnimatePresence>
                            {hovered === p.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: hoverPosition === "top" ? 30 : -30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: hoverPosition === "top" ? 20 : -20, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className={`
                    absolute left-1/2 transform -translate-x-1/2 w-[400px] z-50 pointer-events-none
                    ${hoverPosition === "top" ? "bottom-full mb-3" : "top-full mt-3"}
                  `}
                                >
                                    <div className="bg-[#0b0f13]/90 backdrop-blur-lg rounded-2xl p-5 shadow-[0_0_25px_#00ffe566]">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-60 object-cover rounded-lg mb-4"
                                        />
                                        <p className="text-[#bdfaff] text-sm leading-relaxed">
                                            {p.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0b0f13] border border-[#00ffe566] rounded-2xl m-5 p-8 max-w-lg text-center shadow-[0_0_25px_#00ffe522]"
                        >
                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="w-full h-56 object-cover rounded-xl mb-4"
                            />
                            <h3 className="text-3xl font-semibold text-[#00ffe5] mb-3">
                                {selected.title}
                            </h3>
                            <p className="text-[#bdfaff] mb-4">{selected.description}</p>
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {selected.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs bg-[#00ffe511] text-[#00ffe5] px-2 py-1 rounded-full"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={selected.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#00ffe5] hover:underline"
                            >
                                🔗 Visit Project
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
