import { useRef } from "react";
import { Sparkles, Calendar, ArrowUpRight } from "lucide-react";
import { content } from "../../data/content";

/**
 * ============================================================================
 * EXPERIENCE / TRACK RECORD SECTION (ISOLATED COMPONENT)
 * ============================================================================
 * - 4 milestones in ONE row of 4 equal-height cards on desktop (>=1100px)
 * - 2x2 on tablet, 1 column on mobile
 * - 24px gap, 28px padding, 56px gap between heading+subtext and cards
 * - Standard site-section padding clamp(72px, 9vw, 120px) without extra blank gaps
 * ============================================================================
 */
export default function ExperienceSection() {
  const { experience } = content;
  const sectionRef = useRef(null);

  return (
    <section
      id="experience-section"
      ref={sectionRef}
      className="site-section bg-[#040814] text-white"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(46,123,255,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header: 56px gap between heading+subtext and the cards (mb-14) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{experience.badge}</span>
          </div>

          <h2 className="font-['Cinzel'] text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            {experience.heading}
          </h2>

          <p className="mt-4 text-base md:text-lg text-[#CBD5E1] font-normal leading-relaxed">
            {experience.subheading}
          </p>
        </div>

        {/* 
          Milestone Cards Grid:
          - ONE row of 4 equal-height cards on desktop (>=1100px)
          - 2x2 on tablet (md:grid-cols-2)
          - 1 column on mobile
          - 24px gap (gap-6)
          - No orphan cards
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1100px]:grid-cols-4 gap-6">
          {experience.timeline.map((item) => (
            <div
              key={item.year}
              className="group p-[28px] rounded-3xl bg-[#0A1530]/60 border border-white/10 hover:border-[#00B4FF]/60 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,180,255,0.2)] transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Year Stamp & Phase Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#040814] border border-[#2E7BFF]/40 text-[#00B4FF] text-xs font-mono font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#CBD5E1]/80">
                    {item.phase}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="font-['Cinzel'] text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#00B4FF] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#040814]/80 text-[#CBD5E1] border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#00B4FF] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
