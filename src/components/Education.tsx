import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface EduItem {
    id: number;
    degree: string;
    institute: string;
    year: string;
    details: string;
}

const eduData: EduItem[] = [
    {
        id: 1,
        degree: "Bachelor of Technology in Computer Science",
        institute: "XYZ University",
        year: "2021 – 2025",
        details: "Focused on full-stack development, AI & ML, project management, and data structures."
    },
    {
        id: 2,
        degree: "Higher Secondary Education",
        institute: "ABC Junior College",
        year: "2019 – 2021",
        details: "Completed with distinction, specialized in Mathematics and Computer Science."
    },
    {
        id: 3,
        degree: "Secondary Education",
        institute: "National Public School",
        year: "2019",
        details: "Built early interest in programming and robotics."
    }
];

// Small 3D glow behind the active card
function GlowOrb({ active }: { active: boolean }) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!active) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(180, 180);
        const mount = mountRef.current;
        if (mount) mount.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: "#00ffe5",
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        camera.position.z = 3;

        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.02;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            if (mount && renderer.domElement.parentNode === mount)
                mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [active]);

    return <div ref={mountRef} className="absolute -left-24 top-1/2 -translate-y-1/2 z-0" />;
}

export default function Education() {
    const [visibleId, setVisibleId] = useState<number | null>(null);

    return (
        <section
            id="education"
            className="relative min-h-screen bg-[#06080a] text-[#dfffff] flex flex-col items-center py-24 px-4"
        >
            <h2 className="text-5xl font-bold text-[#00ffe5] drop-shadow-[0_0_12px_#00ffe5] mb-5 tracking-widest">
                🎓 My Education
            </h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-[#bdfaff] tracking-widest mb-12"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ display: "block" }}
                >
                    📚 The Foundation of My Learning Journey
                </motion.span>
            </motion.p>


            <div className="relative w-full max-w-3xl">
                {/* Vertical timeline line */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-[#00ffe533]" />

                <div className="flex flex-col gap-24">
                    {eduData.map((edu) => (
                        <motion.div
                            key={edu.id}
                            onViewportEnter={() => setVisibleId(edu.id)}
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="relative flex flex-col md:flex-row items-center gap-6 z-10"
                        >
                            {/* Glow orb when visible */}
                            <GlowOrb active={visibleId === edu.id} />

                            {/* Timeline marker */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#00ffe5] rounded-full shadow-[0_0_20px_#00ffe5]" />

                            {/* Card */}
                            <motion.div
                                className="bg-[#0b0f13]/90 backdrop-blur-lg border border-[#00ffe522] rounded-2xl p-8 w-full md:w-[70%] shadow-[0_0_20px_#00ffe533]"
                                whileHover={{ scale: 1.03, boxShadow: "0 0 30px #00ffe588" }}
                            >
                                <h3 className="text-2xl font-semibold text-[#00ffe5] mb-2">{edu.degree}</h3>
                                <h4 className="text-[#bdfaff]/80 text-sm mb-1">{edu.institute}</h4>
                                <p className="text-[#bdfaff]/70 text-sm mb-3">{edu.year}</p>
                                <p className="text-[#dfffff]/90 text-sm leading-relaxed">{edu.details}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
