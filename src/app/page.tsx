"use client";

import { useState, useMemo, useEffect } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Header } from "@/components/ui/Header";
import { GalleryControls } from "@/components/gallery/GalleryControls";
import { ProjectModal } from "@/components/gallery/ProjectModal";
import { ProjectCategory, Project } from "@/data/projects";
import { fetchProjects } from "@/lib/api";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category Filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.creator_name.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-32">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center text-center text-white overflow-hidden mb-12">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 text-white drop-shadow-lg">
            Manus Gallery
          </h2>
          <p className="font-serif text-lg md:text-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 text-neutral-100 drop-shadow-md leading-relaxed">
            偶然と必然が交差する、<br className="md:hidden" />発想と情熱の美術館。
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 max-w-4xl mx-auto mb-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="relative">
          {/* Decorative Gradient Blur */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-50" />

          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="space-y-8 font-serif text-lg md:text-xl leading-relaxed text-muted-foreground">
              <p>
                近年、AIの力は凄まじい勢いで成長し、日々目まぐるしく新しい技術が現れています。<br />
                これは他でもない、「誰もがクリエイターとなり、想い・情熱を形にできる革命」なのです。
              </p>
              <p>
                とても自分の中で魅力的だと思うものができたけど、知らせる場所がない…<br />
                Manusを使ったら何ができるのかわからない…
              </p>
              <p>
                そんな悩みを解決し、誰もがクリエイターになれることを願ってこの場所を生み出しました。
              </p>
              <p>
                我々は皆さんのアイデア・情熱を心から歓迎します。
              </p>

              <div className="pt-8">
                <p className="text-foreground font-medium text-xl md:text-2xl mb-4">
                  是非とも、このManus Galleryを通じて、
                </p>
                <p className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-sm">
                  クリエイティブな人生を共に謳歌しましょう。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <main className="px-6 max-w-7xl mx-auto">
        <GalleryControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredProjects.length > 0 ? (
          <GalleryGrid
            projects={filteredProjects}
            onSelectProject={setSelectedProject}
          />
        ) : (
          <div className="text-center py-20 text-muted font-serif italic">
            No projects found matching your criteria.
          </div>
        )}
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
