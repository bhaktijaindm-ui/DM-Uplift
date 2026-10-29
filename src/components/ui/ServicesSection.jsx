import { useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { content } from "../../data/content";

/**
 * ServicesSection
 * Semantic, accessible service accordion with synchronized 3D preview panel.
 * - Semantic buttons with aria-expanded and aria-controls
 * - Natural wrapping for descriptions and two-column feature lists
 * - Coordinated preview panel showing active service details & aspect-[4/3] image
 * - Zero overlap between expanded rows and neighboring elements
 */
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

  const previewService = services[activeIndex >= 0 ? activeIndex : 0] || services[0];

  return (
    <section
      id="services-section"
      className="site-section bg-[#040814] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,123,255,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,180,255,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3.5 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-SPECTRUM MARKETING</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-4">
            OUR <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">SERVICES</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] max-w-2xl font-normal leading-relaxed">
            Precision-engineered acquisition funnels, technical supremacy, and 3D creative pipelines designed to scale modern businesses.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Semantic Service Accordion List */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 w-full min-w-0">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              const panelId = `service-panel-${service.id}`;
              const headerId = `service-header-${service.id}`;

              return (
                <div
                  key={service.id}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isActive
                      ? "bg-[#0A1530]/90 border-[#00B4FF] shadow-[0_0_30px_rgba(0,180,255,0.25)]"
                      : "bg-[#0A1530]/35 border-white/10 hover:border-[#2E7BFF]/50 hover:bg-[#0A1530]/55"
                  }`}
                >
                  {/* Semantic Button Trigger for Accordion */}
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                  >
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
                        className={`font-['Cinzel'] text-sm sm:text-base md:text-lg font-bold truncate transition-colors ${
                          isActive ? "text-white" : "text-[#CBD5E1] group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#00B4FF] hidden sm:inline">
                        {service.category}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#00B4FF] transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Active Details Container with p-6 */}
                  {isActive && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="p-6 border-t border-white/10 transition-all duration-300 min-w-0"
                    >
                      <p className="text-xs sm:text-sm text-white font-normal leading-relaxed mb-4 [overflow-wrap:anywhere]">
                        {service.shortDesc}
                      </p>

                      {/* 2-Column Responsive Feature List with gap-3 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {service.features.map((feat) => (
                          <div
                            key={feat}
                            className="flex items-start gap-2 text-xs text-[#CBD5E1]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4FF] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Metric Stat */}
                      <div className="pt-3 flex items-center justify-between border-t border-white/10">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00B4FF]">
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

          {/* Right Column: Synchronized Preview Panel with Predefined Aspect Ratio */}
          <div className="lg:col-span-6 w-full lg:sticky lg:top-8">
            <div className="relative w-full aspect-[4/3] max-w-[520px] mx-auto rounded-3xl overflow-hidden border border-[#2E7BFF]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,180,255,0.2)] bg-[#0A1530]">
              <img
                src={previewService.image}
                alt={previewService.title}
                loading="lazy"
                onError={(e) => handleImageError(e, previewService.fallbackImage)}
                className="w-full h-full object-cover filter brightness-90 contrast-105 transition-opacity duration-300"
              />

              {/* Gradient Overlay for high contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/40 to-transparent pointer-events-none" />

              {/* Synchronized Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/40 text-[#00B4FF] text-[11px] font-bold uppercase tracking-wider mb-2.5 w-fit backdrop-blur-md">
                  <span>{previewService.category}</span>
                </div>

                <h4 className="font-['Cinzel'] text-xl sm:text-2xl font-black text-white mb-1.5">
                  {previewService.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2 mb-3.5 font-normal">
                  {previewService.shortDesc}
                </p>

                <div className="flex items-center justify-between border-t border-white/20 pt-3">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#00B4FF]">
                    {previewService.metric}
                  </span>
                  <span className="text-xs font-semibold text-white/80 pr-2">
                    {previewService.number} / 07
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
