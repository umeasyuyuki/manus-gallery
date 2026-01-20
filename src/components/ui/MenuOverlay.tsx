"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" }, // Placeholder for now
    { label: "Gallery", href: "/" },
    { label: "Contact", href: "https://x.com/Sunwood_ai_labs" }, // External link example
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 text-white animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-4 text-white hover:opacity-70 transition-opacity"
                aria-label="Close menu"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col items-center gap-8 text-center">
                {MENU_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="text-3xl md:text-4xl font-serif tracking-widest hover:text-zinc-400 transition-colors"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
