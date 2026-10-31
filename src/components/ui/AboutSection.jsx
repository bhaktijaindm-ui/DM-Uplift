import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { content } from "../../data/content";
import ExperienceJourney from "./ExperienceJourney";

function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return value;
    }
    return 0;
  });
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (hasAnimated) return;
    const el = countRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);

          let start = 0;
          const end = parseFloat(value);
          const isDecimal = value.toString().includes(".");
          const startTime = performance.now();

          const updateCount = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOutProgress;

            setCount(isDecimal ? current.toFixed(1) : Math.floor(current));

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const { about } = content;

  return (
    <section
      id="about-section"
      className="site-section bg-gradient-to-b from-[#040814] via-[#060F2B] to-[#040814] text-white relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(0,180,255,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/40 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3.5 shadow-[0_0_20px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{about.badge}</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-3">
            ARCHITECTING <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">ORGANIC SUPREMACY</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* 4 Consistent Metric Counters in Shared Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {about.stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-3xl bg-[#0A1530]/50 border border-white/10 backdrop-blur-md text-center flex flex-col items-center justify-center hover:border-[#00B4FF]/40 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-0"
            >
              <div className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1.5 tracking-tight">
                <span className="text-[#00B4FF]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 1-Year Experience Journey with Zig-Zag Pinned Milestone Cards */}
        <ExperienceJourney />
      </div>
    </section>
  );
}
