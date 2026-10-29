import { useState, useRef } from "react";
import { ArrowUpRight, Sparkles, Play } from "lucide-react";
import { content } from "../../data/content";

function ProjectCard3D({ project }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleImgFallback = (e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${
          isHovered ? 15 : 0
        }px)`,
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="group relative rounded-2xl overflow-hidden bg-[#0A1530]/75 border border-[#2E7BFF]/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#00B4FF] hover:shadow-[0_0_35px_rgba(0,180,255,0.25)] flex flex-col justify-between h-full min-w-0"
    >
      {/* Standardized Aspect Ratio Media (16/10) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#040814] shrink-0">
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.image}
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              isHovered ? "opacity-100" : "opacity-90"
            }`}
          />
        ) : (
          <img
            src={project.image}
            alt={project.name}
            onError={handleImgFallback}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Video Reel Badge */}
        {project.videoUrl && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/40 text-[10px] font-bold text-[#00B4FF] flex items-center gap-1.5 backdrop-blur-md shadow-md">
            <Play className="w-2.5 h-2.5 fill-[#00B4FF]" />
            <span>Interactive Reel</span>
          </div>
        )}

        {/* Result Metric Banner Overlay */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/50 text-xs font-bold text-white shadow-[0_0_15px_rgba(0,180,255,0.35)] backdrop-blur-md">
          <span className="text-[#00B4FF] mr-1.5">✦</span>
          <span>{project.metric}</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-transparent to-transparent opacity-75 pointer-events-none" />
      </div>

      {/* Card Content & Metadata with Equal Corner Spacing (p-5 sm:p-6) */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#00B4FF] mb-1.5 block">
            {project.category}
          </span>
          <h3 className="font-['Cinzel'] text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00B4FF] transition-colors leading-snug [overflow-wrap:anywhere]">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2 leading-relaxed mb-5 font-normal [overflow-wrap:anywhere]">
            {project.desc}
          </p>
        </div>

        <div>
          {/* Tag Pills (Protected from overflow) with px-3 py-1 */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md text-[10px] font-medium bg-[#040814]/80 text-[#CBD5E1] border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Link with Visible Focus */}
          <a
            href="#contact-section"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#00B4FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] rounded"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { projects } = content;
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

  return (
    <section
      id="projects-section"
      className="site-section bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] text-white relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,180,255,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header: Left Title, Right Filter Tabs with 12px gap */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3.5 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D PORTFOLIO SHOWCASE</span>
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

        {/* 3-Column Responsive Case-Study Grid (minmax(0, 1fr)) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((project) => (
            <ProjectCard3D key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
