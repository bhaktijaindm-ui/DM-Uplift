import { useEffect, useState } from "react";
import { X, ExternalLink, Sparkles, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";

/**
 * ClientDetailModal
 * High-conversion glassmorphic modal displaying in-depth client case study,
 * multiple images, deliverables, SEO stats, and direct links.
 */
export default function ClientDetailModal({ client, isOpen, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !client) return null;

  const details = client.details || {};
  const gallery = details.gallery && details.gallery.length > 0
    ? details.gallery
    : [client.photo.url];

  const handleImgFallback = (e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#040814]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A1530] border border-[#2E7BFF]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(0,180,255,0.2)] z-10 text-white flex flex-col p-6 sm:p-8 lg:p-10">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#040814] border border-[#00B4FF]/40 text-[#00B4FF] text-[11px] font-bold uppercase tracking-widest mb-2.5 w-fit shadow-[0_0_15px_rgba(0,180,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{client.category}</span>
            </div>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {client.client}
            </h2>
            <span className="text-xs sm:text-sm text-[#CBD5E1] mt-1 font-medium">
              {client.role}
            </span>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-[#040814] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shrink-0 cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery & Live Link Row */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-[#040814] border border-white/10 shadow-inner">
            <img
              src={gallery[activeImage] || gallery[0]}
              alt={client.client}
              onError={handleImgFallback}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/90 via-transparent to-transparent pointer-events-none" />

            {/* Live website link badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
              <div className="px-3.5 py-1.5 rounded-full bg-[#040814]/85 border border-[#00B4FF]/50 text-xs font-mono font-bold text-[#00B4FF] backdrop-blur-md">
                <span>{client.seoBadge}</span>
              </div>

              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#00B4FF] text-[#040814] hover:bg-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,180,255,0.4)] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Thumbnail switcher if multiple images */}
          {gallery.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    activeImage === i
                      ? "border-[#00B4FF] scale-105 shadow-[0_0_12px_rgba(0,180,255,0.5)]"
                      : "border-white/15 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${client.client} thumbnail ${i + 1}`}
                    onError={handleImgFallback}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Narrative Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Narrative Column */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00B4FF]" />
                <span>Project Overview</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                {details.overview || client.summary}
              </p>
            </div>

            {details.challenge && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00B4FF] mb-1.5">
                  The Challenge
                </h4>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                  {details.challenge}
                </p>
              </div>
            )}

            {details.solution && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00B4FF] mb-1.5">
                  Our Engineering & Strategy Solution
                </h4>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                  {details.solution}
                </p>
              </div>
            )}

            {details.deliverables && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                  Key Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {details.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[#040814]/60 border border-white/10 text-xs text-[#CBD5E1]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4FF] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Metrics & CTA Column */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00B4FF] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Verified Client Metrics</span>
              </span>

              {details.stats && details.stats.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {details.stats.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#040814]/80 border border-[#2E7BFF]/30 text-center flex flex-col items-center justify-center shadow-sm"
                    >
                      <span className="font-['Cinzel'] font-black text-xl sm:text-2xl text-[#00B4FF]">
                        {s.metric}
                      </span>
                      <span className="text-[11px] text-[#CBD5E1] mt-1 font-medium">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#040814]/80 border border-[#2E7BFF]/30 text-center">
                  <span className="text-xs font-mono text-[#00B4FF]">
                    {client.seoBadge}
                  </span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#040814]/40 border border-white/10 flex items-center gap-3 mt-2">
                <ShieldCheck className="w-5 h-5 text-[#00B4FF] shrink-0" />
                <span className="text-xs text-[#CBD5E1]">
                  Full technical SEO and continuous conversion optimization managed by UPLIFT.
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF] hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,180,255,0.4)]"
                >
                  <span>Open Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href="#contact-section"
                onClick={onClose}
                className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] hover:text-white bg-[#040814] border border-white/15 hover:border-[#00B4FF] text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Request A Similar Transformation</span>
                <ArrowRight className="w-3 h-3 text-[#00B4FF]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
