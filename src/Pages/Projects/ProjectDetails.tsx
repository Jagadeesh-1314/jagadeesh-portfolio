import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { getNextProject, getPrevProject, getProjectBySlug } from "../../lib/projectList";
import { TransitionOverlay } from "../../Transition/transition";

const ProjectDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [showNextPreview, setShowNextPreview] = useState(false);
    const [showPrevPreview, setShowPrevPreview] = useState(false);

    const project = slug ? getProjectBySlug(slug) : null;
    const nextProject = slug ? getNextProject(slug) : null;
    const prevProject = slug ? getPrevProject(slug) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
                    <Link to="/jagadeesh-portfolio/projects">
                        <button className="gap-2 btn-animated self-start">
                            <span className="flex items-center gap-2">
                                <ChevronLeft className="w-4 h-4" />
                                Back to Projects
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <TransitionOverlay>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-background"
            >
                {/* Hero Section */}
                <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                    <div className="absolute inset-0 flex items-end">
                        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 glow-cyan-subtle">
                                    {project.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                                    {project.tagline}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-secondary/50 border border-primary/30 rounded-full text-sm font-medium text-primary backdrop-blur-sm hover:border-primary transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <Link to="/jagadeesh-portfolio/projects">
                            <button className="btn-animated self-start text-[#bdfaff] hover:text-black hover:drop-shadow-[0_0_10px_#00ffe5] transition-all duration-300">
                                <span className="flex items-center gap-2">
                                    <ChevronLeft className="w-4 h-4" />
                                    Back to Projects
                                </span>
                            </button>
                        </Link>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-6">About This Project</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>

                    {/* Gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-8">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.gallery.map((image, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="aspect-video overflow-hidden rounded-lg border border-border hover:border-primary transition-all"
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation buttons with Previews */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row justify-between gap-6 pt-12 border-t border-border"
                    >
                        {/* Previous Project */}
                        <div
                            className="relative flex-1"
                            onMouseEnter={() => setShowPrevPreview(true)}
                            onMouseLeave={() => setShowPrevPreview(false)}
                        >
                            <button
                                onClick={() => prevProject && navigate(`/jagadeesh-portfolio/projects/${prevProject.slug}`)}
                                className="btn-animated self-start text-[#bdfaff] hover:text-black hover:drop-shadow-[0_0_10px_#00ffe5] transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous Project
                                </span>
                            </button>

                            <AnimatePresence>
                                {showPrevPreview && prevProject && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, x: -10 }}
                                        animate={{ opacity: 1, y: 0, x: 0 }}
                                        exit={{ opacity: 0, y: 10, x: -10 }}
                                        className="absolute bottom-full left-0 mb-2 w-64 bg-card border border-primary rounded-lg overflow-hidden glow-cyan-subtle z-10"
                                    >
                                        <img
                                            src={prevProject.coverImage}
                                            alt={prevProject.title}
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-3">
                                            <p className="text-sm font-bold text-foreground">{prevProject.title}</p>
                                            <p className="text-xs text-muted-foreground">{prevProject.tagline}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Next Project */}
                        <div
                            className="relative flex-1 flex justify-end"
                            onMouseEnter={() => setShowNextPreview(true)}
                            onMouseLeave={() => setShowNextPreview(false)}
                        >
                            <button
                                onClick={() => nextProject && navigate(`/jagadeesh-portfolio/projects/${nextProject.slug}`)}
                                className="btn-animated self-start text-[#bdfaff] hover:text-black hover:drop-shadow-[0_0_10px_#00ffe5] transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    Next Project
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </button>

                            <AnimatePresence>
                                {showNextPreview && nextProject && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, x: 10 }}
                                        animate={{ opacity: 1, y: 0, x: 0 }}
                                        exit={{ opacity: 0, y: 10, x: 10 }}
                                        className="absolute bottom-full right-0 mb-2 w-64 bg-card border border-primary rounded-lg overflow-hidden glow-cyan-subtle z-10"
                                    >
                                        <img
                                            src={nextProject.coverImage}
                                            alt={nextProject.title}
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-3">
                                            <p className="text-sm font-bold text-foreground">{nextProject.title}</p>
                                            <p className="text-xs text-muted-foreground">{nextProject.tagline}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </TransitionOverlay>
    );
};

export default ProjectDetails;
