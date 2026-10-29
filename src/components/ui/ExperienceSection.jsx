import { useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import CircularExperienceGallery from "./CircularExperienceGallery";
import ClientDetailModal from "./ClientDetailModal";
import { content } from "../../data/content";

/**
 * ============================================================================
 * EXPERIENCE SECTION — 3D CIRCULAR CAROUSEL
 * ============================================================================
 * - 3D cylinder rotating gallery featuring 18 client transformations
 * - Auto-rotation + scroll-driven rotation
 * - Highlights Dash Company website development and SEO integration
 * - Interactive modal with in-depth client case study, gallery, and live links
 * - Standard nominal laptop typography and equal corner box spacing
 * ============================================================================
 */
export default function ExperienceSection() {
  const { experience } = content;
  const sectionRef = useRef(null);
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <section
      id="experience-section"
      ref={sectionRef}
      className="site-section bg-[#040814] text-white relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(46,123,255,0.12)_0%,transparent_70%)] blur-[110px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header: Nominal laptop typography, perfectly centered */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/40 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{experience.badge || "PROVEN EXPERIENCE"}</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
            {experience.heading}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed">
            {experience.subheading}
          </p>
        </div>

        {/* 3D Circular Carousel Gallery (18 Cards) */}
        <CircularExperienceGallery
          items={experience.items || []}
          autoRotateSpeed={0.035}
          onSelectClient={(client) => setSelectedClient(client)}
        />
      </div>

      {/* Full Client Details Modal */}
      <ClientDetailModal
        key={selectedClient?.id}
        client={selectedClient}
        isOpen={Boolean(selectedClient)}
        onClose={() => setSelectedClient(null)}
      />
    </section>
  );
}
