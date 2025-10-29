import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionOverlay } from "../../Transition/transition";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMeFull() {
    const [showMore, setShowMore] = useState(false); // state for "Read More"

    const paragraphs = [
        <p className="name-title text-4xl md:text-5xl tracking-widest m-1 font-semibold text-[#00ffe5]">
            Hello, I’m <strong>T. Jagadeesh Chandra</strong> <br />
            a passionate Full-Stack Developer who enjoys building scalable, user-centric applications that make an impact.
        </p>,
        <p>
            I hold a B.Tech in Computer Science Engineering, where I developed a strong foundation in programming, problem-solving, and system design. My curiosity for technology quickly evolved into a deep interest in creating seamless digital experiences.
        </p>,
        <p>
            I have hands-on experience developing projects such as a{" "}
            <strong>
                <i>Teacher Learning Process Feedback System</i>
            </strong>{" "}
            and an{" "}
            <strong>
                <i>Exam Branch Portal</i>
            </strong>
            . Through these, I gained practical exposure to full-stack development using{" "}
            <code>React.js</code>, <code>Node.js</code>, and <code>MySQL</code>, ensuring smooth front-end and back-end integration.
        </p>,
        <p>
            During my internship at{" "}
            <strong>
                <i>Tech Nirmaan Company</i>
            </strong>
            , I contributed to building production-level applications and improved my understanding of real-world development workflows, API design, and performance optimization.
        </p>,
        <p>
            Beyond coding, I’m interested in exploring modern UI/UX principles, learning emerging frameworks, and refining my problem-solving mindset. I value teamwork, continuous learning, and delivering solutions that are both functional and user-friendly.
        </p>,
        <p>
            I’m eager to apply my skills in dynamic environments where innovation, ownership, and technical excellence are encouraged. My goal is to grow as a developer who not only writes efficient code but also contributes to meaningful projects that make technology more human-centered.
        </p>,
        <p className="flex w-full justify-center text-xl md:text-2xl text-[#00ffe5] italic mt-6">
            “Code with purpose, build with passion.”
        </p>,
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const paraRefs = useRef<HTMLDivElement[]>([]);
    paraRefs.current = [];

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !paraRefs.current.includes(el)) paraRefs.current.push(el);
    };

    useEffect(() => {
        if (!paraRefs.current.length) return;

        paraRefs.current.forEach((p, i) => {
            if (!p) return;
            gsap.fromTo(
                p,
                {
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)",
                    scale: 0.95,
                    transformOrigin: "left center",
                },
                {
                    opacity: 1,
                    clipPath: "inset(0 0% 0 0)",
                    scale: 1,
                    duration: 1.3,
                    ease: "power3.out",
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: p,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, [showMore]); // re-run animation when new paragraphs are added

    return (
        <TransitionOverlay>
            <section
                ref={sectionRef}
                className="relative bg-[#06080a] text-[#dfffff] min-h-screen py-24 px-6 md:px-16 flex flex-col gap-10"
            >
                <h1 className="text-5xl md:text-6xl font-bold tracking-widest text-[#00ffe5] drop-shadow-[0_0_15px_#00ffe5] mb-12">
                    About Me
                </h1>

                {/* Always show first paragraph */}
                <div
                    ref={addToRefs}
                    className="text-lg md:text-2xl leading-relaxed max-w-4xl text-[#bdfaff]"
                >
                    {paragraphs[0]}
                </div>

                {/* Read More Button */}
                {!showMore && (
                    <button
                        onClick={() => setShowMore(true)}
                        className="btn-animated self-start text-[#bdfaff] hover:text-[#00ffe5] hover:drop-shadow-[0_0_10px_#00ffe5] transition-all duration-300"
                    >
                        <span>Read More →</span>
                    </button>
                )}

                {/* Rest of the paragraphs, shown after clicking Read More */}
                {showMore &&
                    paragraphs.slice(1).map((p, i) => (
                        <div
                            key={i}
                            ref={addToRefs}
                            className="text-lg md:text-2xl leading-relaxed max-w-4xl text-[#bdfaff]"
                        >
                            {p}
                        </div>
                    ))}
            </section>
        </TransitionOverlay>
    );
}
