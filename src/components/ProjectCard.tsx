import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "../lib/projectList";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/jagadeesh-portfolio/projects/${project.slug}`}>
        <div className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500 hover:scale-105 hover:border-primary hover:glow-cyan">
          {/* Cover Image */}
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm text-muted-foreground mb-2 font-medium tracking-wider">
                {project.category}
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
            </div>
          </div>

          {/* Static Info (visible when not hovering) */}
          <div className="p-6 transition-opacity duration-300 group-hover:opacity-0">
            <p className="text-xs text-primary mb-2 font-semibold tracking-widest uppercase">
              {project.category}
            </p>
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
