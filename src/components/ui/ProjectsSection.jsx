import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { content } from "../../data/content";
import PolaroidLineCarousel from "./PolaroidLineCarousel";

export default function ProjectsSection() {
  const { projects } = content;
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = [
    "All",
    "Web & Paid Acquisition",
    "Branding & Social Reach",
    "SEO & Content Domination",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter.split(" ")[0]));

  const handleSelectProject = (project) => {
    if (project?.id) {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <section
      id="projects-section"
      className="site-section bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] text-white relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,180,255,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header: Left Title, Right Filter Tabs with 12px gap */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3.5 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D PORTFOLIO SHOWCASE (20 FLAGSHIPS)</span>
            </div>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              FEATURED <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">PROJECTS</span>
            </h2>
          </div>

          {/* Filter Pills with flex-wrap and focus ring */}
          <div className="flex flex-wrap gap-2.5">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] ${
                  activeFilter === cat
                    ? "bg-[#00B4FF] text-[#040814] border-[#00B4FF] shadow-[0_0_15px_rgba(0,180,255,0.4)]"
                    : "bg-[#0A1530]/60 text-[#CBD5E1] border-white/10 hover:border-[#2E7BFF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Polaroid Line Physics Carousel with Infinite Loop & Dedicated URLs */}
        <PolaroidLineCarousel
          key={activeFilter}
          slides={filteredProjects}
          onSelectProject={handleSelectProject}
        />
      </div>
    </section>
  );
}
