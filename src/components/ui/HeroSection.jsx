import { ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import Hero3DScene from "./Hero3DScene";
import { content } from "../../data/content";

/**
 * HeroSection
 * Two-column desktop composition with balanced width constraints:
 * - Left column: Punchy headline, readable subtitle, aligned CTA buttons with flex-wrap,
 *   and dedicated stats badge with clear separation.
 * - Right column: Contained, stable 3D visual container with aspect-ratio 1/1.
 */
export default function HeroSection() {
  const { hero } = content;

  return (
    <section
      id="hero-section"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#040814] via-[#071129] to-[#040814] flex items-center justify-center overflow-visible"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,123,255,0.14)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,180,255,0.1)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />

      {/* Standard Spacing Container */}
      <div className="site-container relative z-10 w-full overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-visible">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left min-w-0 z-10">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1530]/85 border border-[#2E7BFF]/40 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,180,255,0.2)]">
              <Zap className="w-3.5 h-3.5 text-[#00B4FF]" />
              <span>{hero.badge}</span>
            </div>

            {/* Responsive Balanced Headline */}
            <h1 className="font-['Cinzel'] text-[clamp(28px,3.8vw,48px)] font-black text-white tracking-normal leading-[1.12] [text-wrap:balance] [overflow-wrap:break-word] max-w-xl">
              <span className="block">{hero.title.line1}</span>
              <span className="block bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,180,255,0.35)]">
                {hero.title.line2}
              </span>
            </h1>

            {/* Subtext: Adequate mb-6 separation from buttons */}
            <p className="mt-4 mb-6 text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed max-w-lg">
              {hero.subtitle}
            </p>

            {/* CTA Buttons: Aligned consistently with gap-4 or gap-6 in flex container */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <a
                href={hero.primaryCta.href}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] via-[#00B4FF] to-[#2E7BFF] bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_0_25px_rgba(0,180,255,0.4)] hover:shadow-[0_0_35px_rgba(0,180,255,0.7)] hover:scale-102 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{hero.primaryCta.text}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0A1530]/80 hover:bg-[#0A1530] border border-[#2E7BFF]/40 hover:border-[#00B4FF] transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(46,123,255,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{hero.secondaryCta.text}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#00B4FF] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Dedicated Stats Row: Separated from CTA group with px-4 py-1.5 */}
            <div className="mt-8 inline-flex items-center gap-3 px-4 py-1.5 sm:py-2 rounded-xl bg-[#0A1530]/80 border border-[#2E7BFF]/30 backdrop-blur-md shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              <span className="font-['Cinzel'] font-black text-lg sm:text-xl text-[#00B4FF] tracking-tight">
                {hero.statsBadge.number}
              </span>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-[11px] sm:text-xs text-[#CBD5E1] font-medium text-left">
                {hero.statsBadge.label}
              </span>
            </div>
          </div>

          {/* Right Column: 3D Scene - Break out of grid, free-floating, bleeding naturally */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center overflow-visible z-20">
            {/* Free-floating wrapper breaking out of standard grid constraints */}
            <div className="relative w-full max-w-[560px] lg:max-w-none lg:w-[136%] lg:-ml-[16%] lg:-mr-[20%] xl:w-[145%] xl:-ml-[20%] xl:-mr-[25%] -my-6 sm:-my-10 lg:-my-14 flex items-center justify-center overflow-visible pointer-events-none">
              {/* Soft atmospheric blurred glow puddle beneath (not a box shadow) */}
              <div
                aria-hidden="true"
                className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-[72%] h-24 sm:h-32 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.22)_0%,rgba(46,123,255,0.12)_45%,transparent_75%)] blur-[40px] sm:blur-[60px] pointer-events-none z-0"
              />

              {/* Gentle floating motion container: translateY ±12px, 7s ease-in-out */}
              <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[620px] overflow-visible pointer-events-auto animate-hero-float">
                <Hero3DScene />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
