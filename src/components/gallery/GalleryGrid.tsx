import { ProjectCard } from "./ProjectCard";
import { Project } from "@/data/projects";

interface GalleryGridProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
}

export function GalleryGrid({ projects, onSelectProject }: GalleryGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={onSelectProject}
                />
            ))}
        </div>
    );
}
