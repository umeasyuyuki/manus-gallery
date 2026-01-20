import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
    return (
        <div
            className="group flex flex-col gap-4 animate-in fade-in duration-700 slide-in-from-bottom-4 cursor-pointer"
            onClick={() => onSelect(project)}
        >
            {/* Image Container with Hover Effect */}
            <div
                className="block overflow-hidden relative aspect-video bg-neutral-100" // Video aspect ratio for screenshots
            >
                <Image
                    src={project.thumbnail_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>

            {/* Meta Info */}
            <div className="space-y-2">
                <div className="flex items-start justify-between">
                    <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide text-foreground group-hover:text-neutral-500 transition-colors duration-300">
                        {project.title}
                    </h3>
                </div>

                <p className="text-sm text-muted line-clamp-2 min-h-[2.5em] leading-relaxed">
                    {project.description_short}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted font-sans uppercase tracking-wider">
                        <span className="px-2 py-0.5 border border-border rounded-full">
                            {project.category}
                        </span>
                        <span>by {project.creator_name}</span>
                    </div>

                    {/* Social Link - independent click */}
                    {project.creator_x_url && (
                        <Link
                            href={project.creator_x_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-foreground transition-colors p-1"
                            aria-label={`Visit ${project.creator_name}'s X profile`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-4 w-4 fill-current"
                            >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
