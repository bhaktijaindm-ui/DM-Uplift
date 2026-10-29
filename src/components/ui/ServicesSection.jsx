import { useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { content } from "../../data/content";

export default function ServicesSection() {
  const { services } = content;
  const [activeIndex, setActiveIndex] = useState(0);

  // Reliable fallback image handler ensuring no broken images or alt text ever appear
  const handleImageError = (e, fallback) => {
    if (fallback && e.currentTarget.src !== fallback) {
      e.currentTarget.src = fallback;
    } else {
      e.currentTarget.src =
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000";
    }
  };

  return (
    <section
      id="services-section"
      className="site-section bg-[#040814] text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,123,255,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,180,255,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header: Spacing scale 16px heading->subtext, 48px subtext->content */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-SPECTRUM MARKETING</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            OUR <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">SERVICES</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#CBD5E1] max-w-2xl font-normal leading-relaxed">
            Precision-engineered acquisition funnels, technical supremacy, and 3D creative pipelines designed to scale modern businesses.
          </p>
        </div>

        {/* 2-Column Layout with 48px gap (gap-12), stacks vertically on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Service List (14px spacing, 24px expanded padding, no Phase 0) */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 w-full">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "p-6 bg-[#0A1530]/90 border-[#00B4FF] shadow-[0_0_30px_rgba(0,180,255,0.25)]"
                      : "p-5 bg-[#0A1530]/35 border-white/10 hover:border-[#2E7BFF]/50 hover:bg-[#0A1530]/55"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                          isActive
                            ? "bg-[#00B4FF] text-[#040814]"
                            : "bg-white/10 text-[#CBD5E1]"
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`font-['Cinzel'] text-base sm:text-lg md:text-xl font-bold truncate transition-colors ${
                          isActive ? "text-white" : "text-[#CBD5E1] group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#00B4FF] shrink-0">
                      {service.category}
                    </span>
                  </div>

                  {/* Expanded Active Details */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-white/10 transition-all duration-300">
                      <p className="text-sm md:text-base text-white font-normal leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                        {service.features.map((feat) => (
                          <div
                            key={feat}
                            className="flex items-center gap-2 text-xs md:text-sm text-[#CBD5E1]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4FF] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Fully Visible Bottom Stat */}
                      <div className="pt-2 flex items-center justify-between border-t border-white/10">
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00B4FF]">
                          <span>{service.metric}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Stack / Carousel (Strictly inside column, aspect-4/3, never overlaps text) */}
          <div className="lg:col-span-6 w-full sticky top-8">
            <div className="relative w-full aspect-[4/3] max-w-[540px] mx-auto rounded-3xl overflow-hidden border border-[#2E7BFF]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,180,255,0.2)] bg-[#0A1530]">
              {services.map((service, index) => {
                const isCurrent = index === activeIndex;

                return (
                  <div
                    key={service.id}
                    className={`absolute inset-0 transition-all duration-500 ease-out overflow-hidden ${
                      isCurrent
                        ? "opacity-100 scale-100 pointer-events-auto z-10"
                        : "opacity-0 scale-95 pointer-events-none z-0"
                    }`}
                  >
                    {/* Fixed aspect ratio 4/3 image with object-cover */}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      onError={(e) => handleImageError(e, service.fallbackImage)}
                      className="w-full h-full object-cover filter brightness-90 contrast-105"
                    />

                    {/* Gradient Overlay for high contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/40 to-transparent" />

                    {/* Card Content Overlay: 24px padding to caption text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/40 text-[#00B4FF] text-xs font-bold uppercase tracking-wider mb-2.5 w-fit backdrop-blur-md">
                        <span>{service.category}</span>
                      </div>

                      <h4 className="font-['Cinzel'] text-2xl sm:text-3xl font-black text-white mb-2">
                        {service.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2 mb-4 font-normal">
                        {service.shortDesc}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/20 pt-3">
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#00B4FF]">
                          {service.metric}
                        </span>
                        {/* 16px right padding on counter (pr-4) to prevent cutoff */}
                        <span className="text-xs font-semibold text-white/80 pr-4">
                          {service.number} / 07
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
