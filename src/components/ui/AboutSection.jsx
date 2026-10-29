import { useState, useEffect, useRef } from "react";
import { Sparkles, ShieldCheck, TrendingUp, Layers } from "lucide-react";
import { content } from "../../data/content";
import ExperienceJourney from "./ExperienceJourney";

function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative rounded-3xl p-6 sm:p-8 bg-[#0A1530]/60 border border-[#2E7BFF]/30 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:border-[#00B4FF] hover:shadow-[0_0_35px_rgba(0,180,255,0.25)] transition-colors h-full flex flex-col justify-between ${className}`}
    >
      {children}
    </div>
  );
}

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
  const pillarIcons = [Layers, TrendingUp, ShieldCheck];

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
            WE ARCHITECT <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">DIGITAL SUPREMACY</span>
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

        {/* 3D Tilt Cards for Pillars: Clean 3-column grid with gap-6 sm:gap-8 and mt-10 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
          {about.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] || Sparkles;
            return (
              <TiltCard key={pillar.title}>
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#00B4FF]/10 border border-[#00B4FF]/40 flex items-center justify-center mb-5 text-[#00B4FF] shadow-[0_0_15px_rgba(0,180,255,0.25)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Cinzel'] text-base sm:text-lg md:text-xl font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
