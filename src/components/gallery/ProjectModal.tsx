"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        // Close on Escape key
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);

        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div
                ref={modalRef}
                className="relative w-full max-w-6xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 rounded-xl"
                style={{ maxHeight: "90vh", height: "80vh" }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-black bg-white/50 hover:bg-white backdrop-blur-md rounded-full transition-colors"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                {/* Left: Image (Scrollable on mobile if needed, but usually fixed) */}
                <div className="w-full md:w-3/5 bg-black relative min-h-[300px] md:min-h-full flex items-center justify-center p-4">
                    <Image
                        src={project.thumbnail_url}
                        alt={project.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                    />
                </div>

                {/* Right: Content (Scrollable) - White Background */}
                <div className="w-full md:w-2/5 flex flex-col p-6 md:p-10 overflow-y-auto bg-white">
                    <div className="flex flex-col gap-6">
                        {/* Header Info */}
                        <div>
                            <span className="inline-block px-3 py-1 text-xs font-sans uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full mb-3">
                                {project.category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-tight">
                                {project.title}
                            </h2>
                        </div>

                        {/* Creator Info */}
                        <div className="flex items-center gap-3 py-4 border-y border-neutral-100">
                            <div className="text-sm">
                                <p className="text-neutral-400 uppercase tracking-wide text-xs mb-1">Created by</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-neutral-900 text-lg">
                                        {project.creator_name}
                                    </span>
                                    {project.creator_x_url && (
                                        <Link
                                            href={project.creator_x_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-400 hover:text-[#1DA1F2] transition-colors"
                                            aria-label={`${project.creator_name}'s X profile`}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                                className="h-5 w-5 fill-current"
                                            >
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                                {project.creator_x_id && (
                                    <p className="text-xs text-neutral-500">@{project.creator_x_id}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-sm md:prose-base text-neutral-600 leading-relaxed font-serif">
                            <p>{project.description}</p>
                        </div>
                    </div>

                    {/* Action Button - Sticky at bottom of mobile view if needed. Force black button for contrast */}
                    <div className="mt-8 md:mt-auto pt-6">
                        {project.project_url && (
                            <Link
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-neutral-800 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <span className="tracking-widest">体験する</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="transform transition-transform group-hover:translate-x-1"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
