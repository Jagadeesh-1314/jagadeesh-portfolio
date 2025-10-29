import Experience from "../../components/Experience";
import Projects from "../../components/Projects";
import Summary from "../../components/Summary";
import TechStack from "../../components/Techstack";
import { TransitionOverlay } from "../../Transition/transition";
import Hero from "../Hero/Hero";

export default function Home() {
    return (
        <TransitionOverlay >
            <div>
                <Hero />
                <Summary />
                <TechStack />
                <Projects />
                <Experience />
                {/* More sections will come later */}
            </div>
        </ TransitionOverlay>
    );
}