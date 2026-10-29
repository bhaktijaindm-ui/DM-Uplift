import { ArrowUpRight, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { content } from "../../data/content";

export default function CTASection() {
  const { cta } = content;

  return (
    <section
      id="cta-section"
      className="site-section bg-[#040814] text-center"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18)_0%,rgba(46,123,255,0.12)_40%,transparent_75%)] blur-[90px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Main CTA Card: p-10 outer padding */}
        <div className="rounded-3xl p-10 bg-gradient-to-b from-[#0A1530]/85 to-[#040814]/95 border border-[#2E7BFF]/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(0,180,255,0.15)] flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#040814]/80 border border-[#00B4FF]/40 text-[#00B4FF] text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,180,255,0.3)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{cta.badge}</span>
          </div>

          {/* Fully Visible Headline */}
          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.15] mb-3 max-w-2xl">
            READY TO <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">SCALE YOUR REVENUE</span>?
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed">
            {cta.description}
          </p>

          {/* Buttons Row: px-6 py-3 buttons */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto justify-center">
            <a
              href="#contact-section"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] via-[#00B4FF] to-[#2E7BFF] bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_0_25px_rgba(0,180,255,0.4)] hover:shadow-[0_0_40px_rgba(0,180,255,0.7)] hover:scale-102 flex items-center justify-center gap-2 group"
            >
              <span>{cta.primaryBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#projects-section"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#040814]/80 hover:bg-[#0A1530] border border-[#2E7BFF]/40 hover:border-[#00B4FF] transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#00B4FF]" />
              <span>{cta.secondaryBtn}</span>
            </a>
          </div>

          {/* 3 Trust Ticks: mt-6 and gap-6 between check items */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 w-full text-xs sm:text-sm text-[#CBD5E1]">
            {cta.trustNotes.map((note) => (
              <div key={note} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4FF] shrink-0" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
