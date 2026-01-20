"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-border/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group">
                        <h1 className="text-xl md:text-2xl font-serif tracking-widest text-foreground group-hover:opacity-70 transition-opacity">
                            Manus Gallery
                        </h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        {/* Submit Button */}
                        <a
                            href="https://forms.gle/c332sS3ps9urUwTp8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:block text-sm font-sans tracking-wider uppercase text-muted hover:text-foreground transition-colors border border-border px-4 py-2 rounded-full hover:border-foreground"
                        >
                            Submit Project
                        </a>

                        {/* Hamburger Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 -mr-2 text-foreground hover:opacity-70 transition-opacity"
                            aria-label="Open menu"
                        >
                            <div className="space-y-2">
                                <span className="block w-8 h-[1px] bg-current"></span>
                                <span className="block w-8 h-[1px] bg-current"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay */}
            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
