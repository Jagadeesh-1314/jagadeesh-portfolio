import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Summary() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
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

      // Description Animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, clipPath: "inset(0 100% 0 0)", scale: 0.95, transformOrigin: "left center" },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Button Animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="relative flex flex-col items-start justify-start gap-6 px-6 py-16 md:px-16 bg-[#06080a] text-[#dfffff] overflow-hidden"
    >
      {/* Animated Title */}
      <h1
        ref={titleRef}
        className="font-bold tracking-widest text-[#00ffe5] drop-shadow-[0_0_15px_#00ffe5]"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        About Me <span className="inline-block ml-2">🧔🏻‍♂️</span>
      </h1>

      {/* Animated Description */}
      <span
        ref={descRef}
        className="text-[#bdfaff] tracking-widest max-w-8xl leading-relaxed block text-lg md:text-2xl"
      >
        A passionate computer science graduate with strong skills in full-stack web development using React.js, Node.js, and MySQL.
        Focused on writing clean, efficient code and solving real-world problems through technology.
        Experienced in building scalable, user-centric web applications that enhance productivity.
        Driven by curiosity, continuous learning, and a desire to contribute to innovative tech solutions.
      </span>

      {/* Animated Button */}
      <Link ref={buttonRef} to="about-me" className="btn-animated mt-6">
        <span>Tell me more →</span>
      </Link>
    </section>
  );
}
