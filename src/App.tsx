import Hero from "./components/Hero";
import { TransitionOverlay } from "./Transition/transition";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ExperienceOrbit from "./components/ExperienceOrbit";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <div className="overflow-x-hidden ">
      <TransitionOverlay >
        <div>
          <Hero />
          <Projects />
          <ExperienceOrbit />
          <Education />
          {/* More sections will come later */}
        </div>
      </ TransitionOverlay>
    </div>
  );
}
