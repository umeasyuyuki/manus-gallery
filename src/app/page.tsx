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
      <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center text-center text-white overflow-hidden">
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

        {/* Overlay with Fukujo-style subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 text-white drop-shadow-lg">
            Manus Gallery
          </h2>
          <p className="font-serif text-lg md:text-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 text-neutral-100 drop-shadow-md leading-relaxed tracking-widest">
            偶然と必然が交差する、<br className="md:hidden" />発想と情熱の美術館。
          </p>
        </div>
      </section>

      {/* Black Box Concept Section (New Request) */}
      <section className="w-full bg-[#1a1a1a] text-white py-24 md:py-32 px-6 flex justify-center items-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent opacity-50 pointer-events-none" />

        <div className="max-w-4xl w-full text-center space-y-16 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-widest leading-relaxed">
            『 アートを、もっと身近に 』
          </h2>

          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto" />

          <p className="font-serif text-lg md:text-2xl leading-loose tracking-wide text-neutral-300">
            Manus Gallery は<br className="md:hidden" />「 誰でも・いつでも・無料で 」<br />
            オンライン上でアートを楽しむことのできる<br />
            唯一のオンライン美術館です。
          </p>
        </div>
      </section>

      {/* Refined About Section (Fukujo Style - Clean & Academic) */}
      <section className="py-24 px-6 bg-[#f8f8f8] text-center relative overflow-hidden">
        {/* Vertical Text Decoration */}
        <div className="hidden lg:block absolute left-12 top-24 writing-vertical-rl text-neutral-200 font-serif tracking-[0.2em] text-7xl select-none pointer-events-none font-bold opacity-30">
          MANUS GALLERY
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="space-y-12 font-serif text-lg md:text-xl leading-loose text-neutral-700">
            <p>
              ご来訪いただきありがとうございます。<br />
              近年、AIの力は凄まじい勢いで成長し、<br className="hidden md:inline" />日々目まぐるしく新しい技術が現れています。<br />
              これは他でもない、<br />
              <span className="text-black font-semibold">「誰もがクリエイターとなり、想い・情熱を形にできる革命」</span><br />
              なのです。
            </p>
            <p>
              自分の中で魅力的だと思うものができたけど、知らせる場所がない…<br />
              Manusを使ったら何ができるのかわからない…<br />
              そんな悩みを解決し、<br className="hidden md:inline" />誰もがクリエイターになれることを願ってこの場所を生み出しました。
            </p>
            <p>
              我々は皆さんのアイデア・情熱を心から歓迎します。
            </p>

            <div className="pt-12">
              <p className="text-neutral-800 font-medium text-xl md:text-2xl mb-6 tracking-wide">
                是非とも、このManus Galleryを通じて、
              </p>
              <p className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-black drop-shadow-sm pb-2 leading-tight">
                クリエイティブな人生を謳歌しましょう。
              </p>
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
