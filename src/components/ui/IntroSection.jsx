import { useState, useEffect, useRef } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

/**
 * IntroSection
 * - Typing animation for "Hello, Welcome to UPLIFT" with blinking cursor
 * - Responsive multi-line formatting on mobile
 * - Scroll-driven zoom in: as the user scrolls, the intro text zooms in (scale 1 -> 1.6)
 *   and smoothly fades into the Hero section
 * - Standard nominal laptop sizing and equal corner padding
 */
export default function IntroSection() {
  const introContainerRef = useRef(null);
  const zoomBoxRef = useRef(null);

  const fullText = "Hello, Welcome to UPLIFT";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ scale: 1, opacity: 1 });

  // 1. Typing animation effect
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // 2. Scroll-driven zoom in effect: when scrolling down, it zooms in and scrolls away
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const zoomDistance = 450; // Distance in pixels over which zoom occurs
      const progress = Math.min(Math.max(scrollY / zoomDistance, 0), 1);

      // Scale from 1.0 to 1.65 (zooms in), opacity from 1.0 to 0
      const scale = 1 + progress * 0.65;
      const opacity = Math.max(0, 1 - progress * 1.25);

      setZoomStyle({ scale, opacity });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile split helper: "Hello," on line 1, "Welcome to UPLIFT" on line 2
  const renderFormattedText = () => {
    if (!displayedText.includes(",")) {
      return (
        <span className="text-white drop-shadow-[0_0_30px_rgba(0,180,255,0.4)]">
          {displayedText}
        </span>
      );
    }

    const parts = displayedText.split(",");
    const line1 = parts[0] + ",";
    const line2 = parts[1] || "";

    return (
      <div className="flex flex-col items-center">
        <span className="sm:hidden block text-white drop-shadow-[0_0_25px_rgba(0,180,255,0.4)]">
          {line1}
        </span>
        <span className="sm:hidden block bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,180,255,0.5)]">
          {line2.trimStart()}
        </span>
        <span className="hidden sm:inline text-white drop-shadow-[0_0_35px_rgba(0,180,255,0.5)]">
          {line1}{" "}
          <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">
            {line2.trimStart()}
          </span>
        </span>
      </div>
    );
  };

  return (
    <section
      id="intro-section"
      ref={introContainerRef}
      className="site-section min-h-[90vh] bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] flex flex-col items-center justify-center select-none relative overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.12)_0%,transparent_65%)] pointer-events-none z-0" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="site-container relative z-10 flex flex-col items-center justify-center">
        {/* Main Interactive Zoom Box with Equal Corner Padding */}
        <div
          ref={zoomBoxRef}
          style={{
            transform: `scale(${zoomStyle.scale})`,
            opacity: zoomStyle.opacity,
            transformOrigin: "center center",
            willChange: "transform, opacity",
            transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
          }}
          className="relative w-full max-w-4xl min-h-[45vh] sm:min-h-[50vh] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#0A1530]/50 border border-[#2E7BFF]/30 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,180,255,0.12)] text-center"
        >
          {/* Subtle Tag badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#040814]/80 border border-[#00B4FF]/40 text-[#00B4FF] text-[11px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Marketing & 3D Engineering</span>
          </div>

          {/* Typing Text with Neon-Blue Blinking Cursor (Nominal Laptop Sizing) */}
          <div className="w-full flex items-center justify-center min-h-[80px]">
            <h1 className="font-['Cinzel'] text-[clamp(26px,4.2vw,48px)] font-black tracking-tight leading-tight flex items-center justify-center">
              {renderFormattedText()}
              {/* Blinking Cursor */}
              <span
                className={`inline-block ml-1 w-[3px] h-[32px] sm:h-[44px] bg-[#00B4FF] shadow-[0_0_15px_#00B4FF] ${
                  isTypingComplete ? "animate-pulse" : "opacity-100"
                }`}
              />
            </h1>
          </div>

          {/* Status Sub-line */}
          <p className="mt-4 text-xs sm:text-sm text-[#CBD5E1] font-normal tracking-wide max-w-md">
            Architecting next-generation 3D digital experiences and high-growth organic acquisition.
          </p>
        </div>

        {/* Scroll Down Indicator placed clearly below the box with 32px spacing */}
        <div className="mt-8 flex flex-col items-center gap-2 cursor-pointer pointer-events-none select-none">
          <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#CBD5E1]/80">
            Scroll down to explore
          </span>
          <ChevronDown className="w-4 h-4 text-[#00B4FF] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
