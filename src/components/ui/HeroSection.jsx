import { ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import Hero3DScene from "./Hero3DScene";
import { content } from "../../data/content";

export default function HeroSection() {
  const { hero } = content;

  return (
    <section
      id="hero-section"
      className="site-section min-h-[100svh] bg-gradient-to-b from-[#040814] via-[#071129] to-[#040814] flex items-center justify-center"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,123,255,0.14)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,180,255,0.1)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />

      {/* Standard Spacing Container */}
      <div className="site-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Text Content (Headline never overlaps 3D sphere) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a1530]/85 border border-[#2E7BFF]/40 text-[#00B4FF] text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(0,180,255,0.2)]">
              <Zap className="w-3.5 h-3.5 text-[#00B4FF]" />
              <span>{hero.badge}</span>
            </div>

            {/* Punchy Headline (clamp(40px, 6.5vw, 84px), line-height 1.05, max 3 lines) */}
            <h1 className="font-['Cinzel'] text-[clamp(40px,6.5vw,84px)] font-black text-white tracking-normal leading-[1.05]">
              <span className="block">{hero.title.line1}</span>
              <span className="block bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,180,255,0.4)]">
                {hero.title.line2}
              </span>
            </h1>

            {/* Subtext: 16px gap below headline, readable soft white */}
            <p className="mt-3.5 text-base sm:text-lg md:text-xl text-[#CBD5E1] font-normal leading-relaxed max-w-xl">
              {hero.subtitle}
            </p>

            {/* Buttons Row: 16px gap, 32px below subtext (mt-8) */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href={hero.primaryCta.href}
                className="px-8 py-3.5 rounded-full text-sm md:text-base font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] via-[#00B4FF] to-[#2E7BFF] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_30px_rgba(0,180,255,0.5)] hover:shadow-[0_0_45px_rgba(0,180,255,0.8)] hover:scale-105 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>{hero.primaryCta.text}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="px-8 py-3.5 rounded-full text-sm md:text-base font-bold uppercase tracking-wider text-white bg-[#0A1530]/80 hover:bg-[#0A1530] border border-[#2E7BFF]/40 hover:border-[#00B4FF] transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_25px_rgba(46,123,255,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{hero.secondaryCta.text}</span>
                <ChevronRight className="w-4 h-4 text-[#00B4FF] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Dedicated Stats Row: at least 32-48px below buttons (mt-8), fully visible */}
            <div className="mt-8 inline-flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-[#0A1530]/80 border border-[#2E7BFF]/30 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <span className="font-['Cinzel'] font-black text-xl sm:text-2xl text-[#00B4FF] tracking-tight">
                {hero.statsBadge.number}
              </span>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-xs sm:text-sm text-[#CBD5E1] font-medium text-left">
                {hero.statsBadge.label}
              </span>
            </div>
          </div>

          {/* Right Column: 3D Wireframe Sphere & Orbiting Shapes */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[380px] lg:h-[460px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#2E7BFF]/20 bg-[#0A1530]/20 backdrop-blur-sm">
              <Hero3DScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
