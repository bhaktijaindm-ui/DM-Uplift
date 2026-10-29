import { useState, useEffect, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

/**
 * IntroSection
 * - Centered viewport-relative intro (100svh) without redundant rectangular enclosure
 * - Typing animation for "Hello, Welcome to UPLIFT" with blinking cursor
 * - Height-stable container preventing character reveals from shifting layout
 * - Interactive scroll indicator leading smoothly to #hero-section
 * - Respects prefers-reduced-motion
 */
export default function IntroSection() {
  const introContainerRef = useRef(null);
  const fullText = "Hello, Welcome to UPLIFT";

  const [displayedText, setDisplayedText] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return fullText;
    }
    return "";
  });
  const [isTypingComplete, setIsTypingComplete] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return false;
  });
  const [zoomStyle, setZoomStyle] = useState({ scale: 1, opacity: 1 });

  // 1. Typing animation effect with reduced-motion support
  useEffect(() => {
    if (isTypingComplete) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isTypingComplete]);

  // 2. Scroll-driven zoom in effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const zoomDistance = 450;
      const progress = Math.min(Math.max(scrollY / zoomDistance, 0), 1);

      const scale = 1 + progress * 0.45;
      const opacity = Math.max(0, 1 - progress * 1.3);

      setZoomStyle({ scale, opacity });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive formatting: "Hello," on line 1, "Welcome to UPLIFT" on line 2 on mobile
  const renderFormattedText = () => {
    if (!displayedText.includes(",")) {
      return (
        <span className="text-white drop-shadow-[0_0_35px_rgba(0,180,255,0.4)]">
          {displayedText}
        </span>
      );
    }

    const parts = displayedText.split(",");
    const line1 = parts[0] + ",";
    const line2 = parts[1] || "";

    return (
      <span className="flex flex-col sm:inline items-center">
        <span className="sm:hidden block text-white drop-shadow-[0_0_30px_rgba(0,180,255,0.4)]">
          {line1}
        </span>
        <span className="sm:hidden block bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,180,255,0.5)]">
          {line2.trimStart()}
        </span>
        <span className="hidden sm:inline text-white drop-shadow-[0_0_35px_rgba(0,180,255,0.4)]">
          {line1}{" "}
          <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">
            {line2.trimStart()}
          </span>
        </span>
      </span>
    );
  };

  return (
    <section
      id="intro-section"
      ref={introContainerRef}
      className="relative min-h-[100svh] w-full bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] flex flex-col items-center justify-between py-12 sm:py-16 px-4 sm:px-6 select-none overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.12)_0%,transparent_65%)] pointer-events-none z-0" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Spacer for balance */}
      <div className="w-full h-8 sm:h-12 pointer-events-none" />

      {/* Main Centered Content (No redundant bordered rectangle enclosure) */}
      <div
        style={{
          transform: `scale(${zoomStyle.scale})`,
          opacity: zoomStyle.opacity,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
        }}
        className="site-container relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto"
      >
        {/* Subtle Tag badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530]/80 border border-[#2E7BFF]/40 text-[#00B4FF] text-[11px] font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,180,255,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00B4FF]" />
          <span>Digital Marketing & 3D Engineering</span>
        </div>

        {/* Stable-Height Headline Container (Prevents character reveals from shifting layout) */}
        <div className="w-full flex items-center justify-center min-h-[90px] sm:min-h-[110px] md:min-h-[120px]">
          <h1 className="font-['Cinzel'] text-[clamp(28px,4.5vw,52px)] font-black tracking-tight leading-[1.1] flex items-center justify-center">
            {renderFormattedText()}
            {/* Blinking Cursor */}
            <span
              className={`inline-block ml-1.5 w-[3px] h-[34px] sm:h-[46px] bg-[#00B4FF] shadow-[0_0_15px_#00B4FF] ${
                isTypingComplete ? "animate-pulse" : "opacity-100"
              }`}
            />
          </h1>
        </div>

        {/* Sub-line */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal tracking-wide max-w-lg leading-relaxed">
          Architecting next-generation 3D digital experiences and high-growth organic acquisition engines.
        </p>
      </div>

      {/* Interactive Scroll Down Indicator */}
      <div className="relative z-10 w-full flex justify-center pb-4">
        <a
          href="#hero-section"
          aria-label="Scroll down to primary marketing headline"
          className="group flex flex-col items-center gap-2 text-[#CBD5E1]/80 hover:text-white transition-colors cursor-pointer text-decoration-none"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase font-semibold">
            Scroll down to explore
          </span>
          <ChevronDown className="w-4 h-4 text-[#00B4FF] group-hover:translate-y-1 transition-transform animate-bounce" />
        </a>
      </div>
    </section>
  );
}
