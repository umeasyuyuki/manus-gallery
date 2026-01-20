"use client";

import { ProjectCategory } from "@/data/projects";

interface GalleryControlsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: ProjectCategory | "All";
    setSelectedCategory: (category: ProjectCategory | "All") => void;
}

const CATEGORIES: (ProjectCategory | "All")[] = ["All", "Tool", "Art", "Game", "Utility"];

export function GalleryControls({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
}: GalleryControlsProps) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-border py-2 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-colors font-sans"
                />
                <svg
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-sm tracking-wider uppercase transition-colors ${selectedCategory === category
                                ? "text-foreground font-bold border-b border-foreground"
                                : "text-muted hover:text-foreground"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
