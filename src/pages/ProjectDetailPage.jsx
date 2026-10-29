import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Check,
  TrendingUp,
  Clock,
  Building2,
  Share2,
  Layers,
  Play,
} from "lucide-react";
import { content } from "../data/content";
import { findProject } from "../utils/projectUtils";
import HalftoneWordmarkFooter from "../components/ui/HalftoneWordmarkFooter";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = findProject(projectId);

  const [activeMedia, setActiveMedia] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState(projectId);
  const [copied, setCopied] = useState(false);

  // Reset active media when routing to a different project
  if (projectId !== prevProjectId) {
    setPrevProjectId(projectId);
    setActiveMedia(0);
  }

  // Automatically scroll to top whenever the active project changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1530] border border-[#2E7BFF]/40 text-[#00B4FF] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Project Not Found</span>
        </div>
        <h1 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          CASE STUDY UNKNOWN
        </h1>
        <p className="text-sm sm:text-base text-[#CBD5E1] max-w-md mb-8">
          The requested project URL could not be resolved. Explore our 20 flagship digital marketing case studies.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,180,255,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    );
  }

  const projects = content.projects || [];
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const totalCount = projects.length;
  const prevProject = projects[(currentIndex - 1 + totalCount) % totalCount];
  const nextProject = projects[(currentIndex + 1) % totalCount];

  const details = project.details || {};
  const gallery =
    details.gallery && details.gallery.length > 0
      ? details.gallery
      : [project.image];

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const padNumber = (num) => (num < 10 ? `0${num}` : String(num));

  return (
    <div className="min-h-screen bg-[#040814] text-white selection:bg-[#00B4FF] selection:text-[#040814] overflow-x-hidden">
      {/* 1. Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#040814]/85 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="site-container h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Back to Home Button */}
          <Link
            to="/#projects-section"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#0A1530] border border-[#2E7BFF]/35 text-[#CBD5E1] hover:text-[#00B4FF] hover:border-[#00B4FF] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00B4FF] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Center Brand Identity */}
          <Link
            to="/"
            className="font-['Cinzel'] text-lg sm:text-xl font-black tracking-widest text-white hover:text-[#00B4FF] transition-colors"
          >
            UPLIFT
          </Link>

          {/* Quick Prev / Next Navigator & Inquire CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1530] border border-white/10 font-mono text-xs">
              <span className="text-[#00B4FF] font-bold">
                {padNumber(currentIndex + 1)}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-[#CBD5E1]">{padNumber(totalCount)}</span>
            </div>

            {/* Prev Project Link */}
            <Link
              to={`/project/${prevProject.id}`}
              className="w-9 h-9 rounded-full bg-[#0A1530] border border-white/10 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all cursor-pointer"
              title={`Previous: ${prevProject.name}`}
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            {/* Next Project Link */}
            <Link
              to={`/project/${nextProject.id}`}
              className="w-9 h-9 rounded-full bg-[#0A1530] border border-white/10 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all cursor-pointer"
              title={`Next: ${nextProject.name}`}
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>

            {/* Contact CTA */}
            <a
              href="/#contact-section"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF] hover:from-[#00B4FF] hover:to-[#2E7BFF] transition-all shadow-[0_0_15px_rgba(0,180,255,0.35)] cursor-pointer text-decoration-none"
            >
              <span>Inquire</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Page Content */}
      <main className="site-container py-10 sm:py-14 lg:py-16">
        {/* Breadcrumb & Identifier */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            <Link to="/" className="hover:text-[#00B4FF] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link
              to="/#projects-section"
              className="hover:text-[#00B4FF] transition-colors"
            >
              Featured Projects
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#00B4FF] font-semibold truncate max-w-[200px] sm:max-w-none">
              {project.name}
            </span>
          </div>

          {/* Personal URL Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1530] border border-[#00B4FF]/30 text-[11px] font-mono text-[#CBD5E1]">
            <span className="text-[#00B4FF]">●</span>
            <span>Dedicated URL: /project/{project.id}</span>
          </div>
        </div>

        {/* Hero Title & Identity */}
        <div className="mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#00B4FF]/40 text-[#00B4FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(0,180,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00B4FF]" />
            <span>{project.category}</span>
          </div>

          <h1 className="font-['Cinzel'] text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
            {project.name || project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-4xl leading-relaxed mb-6">
            {details.overview || project.desc}
          </p>

          {/* Metadata Pill Matrix */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            {project.client && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1530] border border-white/10 text-[#CBD5E1]">
                <Building2 className="w-3.5 h-3.5 text-[#00B4FF]" />
                <span className="font-semibold text-white">{project.client}</span>
              </div>
            )}
            {project.industry && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1530] border border-white/10 text-[#CBD5E1]">
                <Layers className="w-3.5 h-3.5 text-[#2E7BFF]" />
                <span>{project.industry}</span>
              </div>
            )}
            {project.timeline && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1530] border border-white/10 text-[#CBD5E1]">
                <Clock className="w-3.5 h-3.5 text-[#00B4FF]" />
                <span>{project.timeline}</span>
              </div>
            )}
            {project.seoBadge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1530] border border-[#00B4FF]/40 text-[#00B4FF] font-bold shadow-[0_0_15px_rgba(0,180,255,0.2)]">
                <TrendingUp className="w-3.5 h-3.5 text-[#00B4FF]" />
                <span>{project.seoBadge}</span>
              </div>
            )}
          </div>

          {/* Hero Action Row */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00B4FF] hover:bg-white text-[#040814] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,180,255,0.5)] cursor-pointer text-decoration-none"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4 text-[#040814]" />
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#00B4FF]" />
                  <span className="text-[#00B4FF]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Page</span>
                </>
              )}
            </button>

            <a
              href="/#contact-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-decoration-none"
            >
              <span>Inquire Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3. Interactive Media Viewport */}
        <section className="mb-14 lg:mb-16">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden bg-[#0A1530] border border-[#2E7BFF]/35 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,180,255,0.2)]">
            {project.videoUrl && activeMedia === 0 ? (
              <video
                src={project.videoUrl}
                poster={project.image}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={gallery[activeMedia] || project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* Video Indicator Pill */}
            {project.videoUrl && activeMedia === 0 && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/40 text-[#00B4FF] text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg pointer-events-none">
                <Play className="w-3 h-3 fill-[#00B4FF]" />
                <span>Cinematic Video Reel</span>
              </div>
            )}
          </div>

          {/* Gallery Switcher Strip (if multi-media available) */}
          {gallery.length > 1 && (
            <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CBD5E1] shrink-0 mr-1">
                Visual Assets:
              </span>
              {gallery.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => setActiveMedia(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeMedia === idx
                      ? "border-[#00B4FF] shadow-[0_0_15px_rgba(0,180,255,0.4)] scale-105"
                      : "border-white/15 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 4. Verified Performance Metrics Grid */}
        <section className="mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-[11px] font-bold uppercase tracking-widest mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Documented Business Metrics</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(details.stats || [
              { metric: project.metric, label: "Core Result" },
              { metric: "99/100", label: "Core Web Vitals" },
              { metric: "5.4x", label: "Average ROI" },
              { metric: "100%", label: "Milestones Delivered" },
            ]).map((stat, i) => (
              <div
                key={stat.label || i}
                className="p-5 sm:p-6 rounded-2xl bg-[#0A1530]/75 border border-[#2E7BFF]/35 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#00B4FF] mb-2">
                  ✦ Metric {padNumber(i + 1)}
                </div>
                <div className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                  {stat.metric}
                </div>
                <div className="text-xs sm:text-sm text-[#CBD5E1] font-medium leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Deep-Dive Case Study: Challenge vs. Solution */}
        <section className="mb-14 lg:mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* The Strategic Challenge */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1530]/65 border border-red-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span>The Strategic Challenge</span>
              </div>
              <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-black text-white mb-4">
                Friction, Bottlenecks & Market Obstacles
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                {details.challenge ||
                  "The client experienced elevated acquisition costs, legacy platform latency, and inconsistent creative alignment across omni-channel paid touchpoints."}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-red-400/90 font-medium flex items-center gap-1.5">
              <span>● Key Priority: Eliminate acquisition leakage and unlock scale</span>
            </div>
          </div>

          {/* The Engineering & Growth Solution */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1530]/65 border border-[#00B4FF]/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4FF]/10 border border-[#00B4FF]/40 text-[#00B4FF] text-xs font-bold uppercase tracking-wider mb-4">
                <span>The Engineered Solution</span>
              </div>
              <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-black text-white mb-4">
                Architecture, 3D Experience & Paid Scale
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                {details.solution ||
                  "Engineered a high-performance headless architecture, paired with cinematic visual assets, automated conversion funnels, and algorithmic search optimization."}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#00B4FF] font-medium flex items-center gap-1.5">
              <span>✦ Delivered on schedule with zero performance compromises</span>
            </div>
          </div>
        </section>

        {/* 6. Key Deliverables & Tech Stack */}
        <section className="mb-14 lg:mb-16 p-6 sm:p-8 rounded-3xl bg-[#0A1530]/75 border border-[#2E7BFF]/35 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#00B4FF] mb-2">
                VERIFIED SCOPE
              </div>
              <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-black text-white">
                Engineered Deliverables & Implementation
              </h3>
            </div>

            {/* Tags Cloud */}
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#040814] text-[#CBD5E1] border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {(details.deliverables || [
              "Custom Web Architecture",
              "Conversion Optimization",
              "Performance Marketing",
              "Full Identity Handoff",
            ]).map((deliv) => (
              <div
                key={deliv}
                className="p-4 rounded-xl bg-[#040814]/70 border border-white/10 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00B4FF] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {deliv}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bottom Navigation: Previous & Next Project Cards */}
        <section className="mb-14 lg:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-4 text-center sm:text-left">
            Explore Next Case Studies
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <Link
              to={`/project/${prevProject.id}`}
              className="group p-5 sm:p-6 rounded-2xl bg-[#0A1530]/60 border border-white/15 hover:border-[#00B4FF] transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer text-decoration-none shadow-md"
            >
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B4FF] flex items-center gap-1 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Project</span>
                </span>
                <h4 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white group-hover:text-[#00B4FF] transition-colors truncate">
                  {prevProject.name}
                </h4>
                <p className="text-xs text-[#CBD5E1] truncate mt-0.5">
                  {prevProject.category}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#040814] border border-white/10 shrink-0">
                <img
                  src={prevProject.image}
                  alt={prevProject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Next Project Card */}
            <Link
              to={`/project/${nextProject.id}`}
              className="group p-5 sm:p-6 rounded-2xl bg-[#0A1530]/60 border border-white/15 hover:border-[#00B4FF] transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer text-decoration-none shadow-md text-right sm:text-left"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#040814] border border-white/10 shrink-0 hidden sm:block">
                <img
                  src={nextProject.image}
                  alt={nextProject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0 sm:text-right flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B4FF] flex items-center justify-end gap-1 mb-1">
                  <span>Next Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <h4 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white group-hover:text-[#00B4FF] transition-colors truncate">
                  {nextProject.name}
                </h4>
                <p className="text-xs text-[#CBD5E1] truncate mt-0.5">
                  {nextProject.category}
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* 8. Call to Action Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#06122c] via-[#0A1530] to-[#06122c] border border-[#00B4FF]/40 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,180,255,0.2)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#040814] border border-[#00B4FF]/30 text-[#00B4FF] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Hyper-Growth?</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            ARCHITECT YOUR DIGITAL DOMINANCE
          </h2>

          <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl mx-auto mb-8 leading-relaxed">
            Every business has unique growth leverage points. Let our team analyze your current acquisition funnel and deliver a concrete roadmap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF] hover:from-[#00B4FF] hover:to-[#2E7BFF] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,180,255,0.4)] cursor-pointer text-decoration-none"
            >
              <span>Schedule Growth Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/#projects-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#040814] border border-white/15 hover:border-[#00B4FF] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-decoration-none"
            >
              <span>View All 20 Case Studies</span>
            </Link>
          </div>
        </section>
      </main>

      {/* 9. Brand Wordmark Footer */}
      <HalftoneWordmarkFooter
        wordmark={content.footer.wordmark}
        label={content.footer.label}
        meta={content.footer.meta}
        columns={content.footer.columns}
      />
    </div>
  );
}
