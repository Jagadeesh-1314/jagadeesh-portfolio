import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ProjectCard } from "../../components/ProjectCard";
import { projects } from "../../lib/projectList";
import { TransitionOverlay } from "../../Transition/transition";

const ProjectsList = () => {
    return (
        <TransitionOverlay>
            <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 1,    
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Sparkles className="w-8 h-8 text-primary animate-glow" />
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                                My Projects
                            </h1>
                            <Sparkles className="w-8 h-8 text-primary animate-glow" />
                        </div>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            A collection of work I've crafted with passion and precision.
                        </p>
                        <div className="h-1 w-32 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mt-8 glow-cyan-subtle" />
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </TransitionOverlay>
    );
};

export default ProjectsList;
