import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [sent, setSent] = useState(false);
    const controls = useAnimation();
    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById("footer");
            if (!footer) return;
            const rect = footer.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                controls.start({ height: "100px", opacity: 1 });
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    const socials = [
        { name: "Mail", username: "aryathatikonda13@gmail.com", url: "mailto:aryathatikonda13@gmail.com" },
        { name: "LinkedIn", username: "jagadeesh-chandra-5517b02b4", url: "https://www.linkedin.com/in/jagadeesh-chandra-5517b02b4" },
        { name: "GitHub", username: "Jagadeesh-1314", url: "https://github.com/Jagadeesh-1314" },
        { name: "Instagram", username: "tj.arya", url: "https://www.instagram.com/tj.arya?igsh=ZHZnbHlncHZuNDUx" },
    ];

    useEffect(() => {
        const handleMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    // Letters for the name
    const nameLetters = "T JAGADEESH CHANDRA".split("");
    const [triggerIndex, setTriggerIndex] = useState<number | null>(null);

    // Letter component with wave animation
    function Letter({ char, index }: { char: string, index: number }) {
        const letterControls = useAnimation();

        useEffect(() => {
            if (triggerIndex === null) return;
            const distance = Math.abs(triggerIndex - index);
            const delay = distance * 0.05;

            void letterControls.start({
                y: [0, -12, 4, 0],
                scale: [1, 1.45, 1.15, 1],
                rotateY: [0, 28, -10, 0],
                color: "#00ffe5",
                textShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0 0 10px rgba(0,255,229,0.9)",
                    "0 0 22px rgba(0,255,229,0.85)",
                    "0 0 0px rgba(0,0,0,0)"
                ],
                transition: { duration: 0.45, ease: "easeInOut", delay },
            });
        }, [triggerIndex]);

        const reset = () => {
            void letterControls.start({
                y: 0,
                scale: 1,
                rotateY: 0,
                color: "#ffffff",
                textShadow: "0 0 0px transparent",
                transition: { duration: 0.35, ease: "easeOut" },
            });
        };

        return (
            <motion.span
                onMouseEnter={() => setTriggerIndex(index)}
                onMouseLeave={reset}
                animate={letterControls}
                className="inline-block transition-all duration-200 cursor-pointer hover:drop-shadow-[0_0_12px_#00ffe5]"
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        );
    }

    return (
        <footer
            id="footer"
            className="relative overflow-hidden w-full min-h-[80vh] 
           bg-linear-to-b from-[#0a0a0f] via-[#0b0f1f] to-[#1a1a20]
           text-[#e0e0e0] flex flex-col justify-center items-center 
           py-20 px-6 md:px-16"
        >
            {/* Aurora background layers */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,#00ffe511,#8b5cf611,#00ffe511)] animate-aurora opacity-80"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#00ffe522,transparent_40%),radial-gradient(circle_at_top_right,#8b5cf622,transparent_40%)] blur-3xl animate-auroraSlow"></div>
            </div>

            {/* Floating glow orb */}
            <motion.div
                className="pointer-events-none fixed w-[250px] h-[250px] bg-[#00ffe5]/15 rounded-full blur-[120px]"
                animate={{ x: mouse.x - 125, y: mouse.y - 125 }}
                transition={{ type: "spring", stiffness: 80, damping: 25 }}
            />

            {/* Title & tagline */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-6xl font-semibold text-center bg-linear-to-r from-[#00ffe5] via-[#00ffff] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_20px_#00ffe5aa]"
            >
                Let’s Connect 🌐
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-gray-300 text-center mt-4 max-w-2xl leading-relaxed"
            >
                Got an idea, collaboration, or just want to say hi? Drop your message below!
                <br />
                <span className="italic text-sm text-[#bdfaff]">
                    “Every great story starts with a message.”
                </span>
            </motion.p>

            {/* Main grid: Form + Social links */}
            <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-white/5 backdrop-blur-2xl border border-[#00ffe533] 
                     p-8 rounded-2xl shadow-[0_0_40px_#00ffe533] 
                     flex flex-col gap-6 w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" required placeholder="Your Name"
                            className="bg-transparent border-b border-[#00ffe533] focus:border-[#00ffe5] 
                         outline-none text-white placeholder-gray-400 transition-all duration-300 py-2"/>
                        <input type="email" required placeholder="Your Email"
                            className="bg-transparent border-b border-[#00ffe533] focus:border-[#00ffe5] 
                         outline-none text-white placeholder-gray-400 transition-all duration-300 py-2"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Phone (optional)"
                            className="bg-transparent border-b border-[#00ffe533] focus:border-[#00ffe5] 
                         outline-none text-white placeholder-gray-400 transition-all duration-300 py-2"/>
                        <input type="text" placeholder="Subject / Company (optional)"
                            className="bg-transparent border-b border-[#00ffe533] focus:border-[#00ffe5] 
                         outline-none text-white placeholder-gray-400 transition-all duration-300 py-2"/>
                    </div>
                    <textarea rows={6} placeholder="Your Message" required
                        className="w-full md:w-full bg-transparent border border-[#00ffe533] 
                       focus:border-[#00ffe5] outline-none text-white placeholder-gray-400 
                       transition-all duration-300 p-3 rounded-xl resize-none mx-auto"/>
                    <motion.button type="submit" whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}
                        className="relative overflow-hidden mt-4 py-3 rounded-full border border-[#00ffe5] 
                       text-[#00ffe5] font-medium bg-linear-to-r from-[#00ffe533] to-[#8b5cf633] 
                       tracking-wide uppercase shadow-[0_0_25px_#00ffe522]">
                        {sent ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✅ Sent Successfully!</motion.span> : "Send Message"}
                    </motion.button>
                </motion.form>

                {/* Social Links */}
                <div className="flex flex-col gap-6 items-center justify-center">
                    {socials.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHovered(item.name)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative text-2xl font-medium cursor-pointer inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.span animate={{ opacity: hovered === item.name ? 0 : 1, y: hovered === item.name ? -10 : 0 }}
                                transition={{ duration: 0.3 }}>
                                {item.name}
                            </motion.span>
                            <motion.span
                                className="absolute left-0 top-0 text-transparent bg-clip-text bg-linear-to-r from-[#00ffe5] to-[#8b5cf6] whitespace-nowrap"
                                style={{ fontSize: 'clamp(14px, 2vw, 1.2rem)' }}
                                animate={{ opacity: hovered === item.name ? 1 : 0, y: hovered === item.name ? 0 : 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.username}
                            </motion.span>
                            <motion.div
                                className="h-1 mt-1 bg-linear-to-r from-[#00ffe5] to-[#8b5cf6] rounded-full"
                                animate={{ width: hovered === item.name ? "100%" : "0%" }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Animated Name with ripple/wave */}
            {/* Animated Name with ripple/wave */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }} className="mt-20 max-w-3xl text-center">
                <div className="flex justify-center gap-2 text-6xl md:text-7xl font-bold select-none">
                    {nameLetters.map((char, i) => (
                        <Letter key={i} char={char} index={i} />
                    ))}
                </div>
            </motion.div>

            {/* Footer note */}
            <div className="mt-20 text-center text-sm text-gray-400">
                © 2025 <span className="text-[#00ffe5] font-medium">T Jagadeesh Chandra</span> | Crafted with ❤️ & Code
            </div>

            {/* Aurora animations */}
            <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes auroraSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-aurora {
          background-size: 400% 400%;
          animation: aurora 14s ease-in-out infinite alternate;
        }
        .animate-auroraSlow {
          animation: auroraSlow 10s ease-in-out infinite;
        }
      `}</style>
        </footer>
    );
}
