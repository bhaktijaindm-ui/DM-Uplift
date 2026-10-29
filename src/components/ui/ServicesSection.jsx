import { Sparkles } from "lucide-react";
import { content } from "../../data/content";
import WorksWheel from "./WorksWheel";

/**
 * ServicesSection
 * Modernized with interactive 3D WorksWheel drum and ring interface.
 * - Removed old one-sided accordion data list and preview carousel
 * - Smooth 3D Ring-to-Drum perspective transitions
 * - Direct index navigation and interactive card selection
 * - Optimized for mobile touch, tablet, and desktop viewports
 */
export default function ServicesSection() {
  const { services } = content;

  return (
    <section
      id="services-section"
      className="site-section bg-[#040814] text-white relative overflow-hidden pt-12 sm:pt-16 pb-12 sm:pb-16"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,180,255,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(46,123,255,0.07)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-SPECTRUM MARKETING</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-3">
            OUR <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">SERVICES</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed max-w-xl">
            Precision-engineered acquisition funnels, technical supremacy, and 3D creative pipelines designed to scale modern businesses.
          </p>
        </div>

        {/* 3D WorksWheel Interactive Drum / Ring Showcase */}
        <div className="w-full max-w-6xl mx-auto rounded-3xl bg-[#060F26]/60 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
          <WorksWheel
            items={services}
            label="OUR SERVICES"
            action="Inquire"
          />
        </div>
      </div>
    </section>
  );
}
