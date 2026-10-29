import { Sparkles } from "lucide-react";
import { content } from "../../data/content";
import FerrisWheelGallery from "./FerrisWheelGallery";

/**
 * ServicesSection
 * Vertical rotating Ferris Wheel gallery with physically upright, swaying gondolas.
 * Features all 7 marquee services with high-contrast imagery, live metrics,
 * interactive drag/click rotation, and seamless luxury dark theme alignment.
 */
export default function ServicesSection() {
  const { services } = content;

  // Format all 7 services for Ferris Wheel Gallery
  const ferrisServices = services.map((s, index) => ({
    id: s.id,
    number: s.number || `0${index + 1}`,
    src: s.image,
    fallbackSrc: s.fallbackImage,
    alt: s.title,
    title: s.title,
    discipline: s.category,
    year: s.metric,
    shortDesc: s.shortDesc,
    features: s.features,
    metric: s.metric,
  }));

  return (
    <section
      id="services-section"
      className="site-section bg-[#040814] text-white relative overflow-hidden py-12 sm:py-16 lg:py-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,180,255,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,123,255,0.06)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
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

        {/* Vertical Ferris Wheel Gallery Showcase */}
        <div className="w-full">
          <FerrisWheelGallery
            items={ferrisServices}
            autoplay={true}
            interval={3400}
          />
        </div>
      </div>
    </section>
  );
}
