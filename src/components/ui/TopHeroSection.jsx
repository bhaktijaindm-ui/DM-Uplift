import { useRef, useState } from "react";
import { ArrowUpRight, Sparkles, Layers, RotateCcw, Play } from "lucide-react";
import DotField from "./DotField";

export default function TopHeroSection() {
  const dotFieldRef = useRef(null);
  const [scattered, setScattered] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const headlines = [
    "WE UPLIFT BRANDS.",
    "DESIGN THAT MOVES.",
    "EXPONENTIAL SCALE.",
  ];

  const currentHeadline = headlines[headlineIndex];

  const handleToggleScatter = () => {
    const nextVal = !scattered;
    dotFieldRef.current?.setScattered(nextVal);
    setScattered(nextVal);
  };

  const handleReplay = () => {
    setScattered(false);
    dotFieldRef.current?.replay();
  };

  const handleToggleHeadline = () => {
    setHeadlineIndex((prev) => (prev + 1) % headlines.length);
  };

  return (
    <div className="relative w-full">
      {/* 1. Main DotField Canvas Hero */}
      <DotField
        ref={dotFieldRef}
        headline={currentHeadline}
        accent="#00B4FF"
        repelRadius={130}
        grid={[20, 13]}
        scrollScatter={true}
        scrollHint={{
          scatter: "Scroll to scatter",
          gather: "Scroll up to gather",
        }}
        eyebrow="PERFORMANCE MARKETING & 3D DIGITAL CREATIVE"
        description="Engineered full-funnel acquisition, cinematic 3D web experiences, and high-conversion headless architecture designed for exponential business scale."
        actions={
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary Consultation CTA */}
            <a
              href="#contact-section"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] via-[#00B4FF] to-[#2E7BFF] bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_0_25px_rgba(0,180,255,0.4)] hover:shadow-[0_0_40px_rgba(0,180,255,0.7)] hover:scale-105 flex items-center justify-center gap-2 cursor-pointer text-decoration-none"
            >
              <span>Get a Free Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Explore Case Studies */}
            <a
              href="#projects-section"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00B4FF] bg-[#0A1530]/85 hover:bg-[#00B4FF] hover:text-[#040814] border border-[#2E7BFF]/40 hover:border-[#00B4FF] transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(46,123,255,0.2)] flex items-center justify-center gap-2 cursor-pointer text-decoration-none"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore 20 Case Studies</span>
            </a>

            {/* View Services */}
            <a
              href="#services-section"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#CBD5E1] bg-[#040814]/80 hover:bg-[#0A1530] border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer text-decoration-none"
            >
              <Layers className="w-3.5 h-3.5 text-[#CBD5E1]" />
              <span>Our Services</span>
            </a>
          </div>
        }
      />

      {/* 2. Interactive Dot Field Playground Controls (Top-Right or Floating) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 flex items-center gap-2">
        {/* Toggle Headline */}
        <button
          type="button"
          onClick={handleToggleHeadline}
          className="h-8 rounded-full bg-[#0A1530]/85 border border-white/15 hover:border-[#00B4FF] px-3 text-[11px] font-bold tracking-wider uppercase text-[#CBD5E1] hover:text-[#00B4FF] backdrop-blur-md transition-all cursor-pointer shadow-md flex items-center gap-1.5"
          title="Switch headline text"
        >
          <Play className="w-3 h-3 text-[#00B4FF]" />
          <span className="hidden sm:inline">Text:</span>
          <span>{headlineIndex === 0 ? "Uplift" : headlineIndex === 1 ? "Moves" : "Scale"}</span>
        </button>

        {/* Scatter / Gather */}
        <button
          type="button"
          onClick={handleToggleScatter}
          className="h-8 rounded-full bg-[#0A1530]/85 border border-white/15 hover:border-[#00B4FF] px-3 text-[11px] font-bold tracking-wider uppercase text-[#CBD5E1] hover:text-[#00B4FF] backdrop-blur-md transition-all cursor-pointer shadow-md"
          title="Scatter or gather dots"
        >
          {scattered ? "Gather" : "Scatter"}
        </button>

        {/* Replay Intro */}
        <button
          type="button"
          onClick={handleReplay}
          className="h-8 rounded-full bg-[#0A1530]/85 border border-white/15 hover:border-[#00B4FF] px-3 text-[11px] font-bold tracking-wider uppercase text-[#CBD5E1] hover:text-[#00B4FF] backdrop-blur-md transition-all cursor-pointer shadow-md flex items-center gap-1"
          title="Replay flocking animation"
        >
          <RotateCcw className="w-3 h-3 text-[#00B4FF]" />
          <span className="hidden sm:inline">Replay</span>
        </button>
      </div>
    </div>
  );
}
