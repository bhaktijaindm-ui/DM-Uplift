import { useState, useEffect, useRef, useCallback } from "react";
import { ExternalLink, ArrowRight, Pause, Play, ChevronLeft, ChevronRight, Globe } from "lucide-react";

/**
 * CircularExperienceGallery
 * 3D Stage Carousel with Controlled Depth and Zero Text Collisions.
 * - Active card is prominently centered, fully opaque, and 100% legible
 * - Side cards have controlled angle, scale, and depth without text overlap
 * - Touch handling preserves natural vertical page scrolling
 * - Pauses on hover, focus, drag, or prefers-reduced-motion
 * - Full keyboard navigation (Arrow keys) and accessible controls
 */
export default function CircularExperienceGallery({
  items = [],
  autoRotateInterval = 4000,
  onSelectClient,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const total = items.length;
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isHorizontalSwipeRef = useRef(false);
  const carouselRegionRef = useRef(null);

  // Resize listener for responsive layout adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive spacing and visible card count
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const cardWidth = isMobile ? 260 : isTablet ? 300 : 340;
  const cardHeight = isMobile ? 380 : isTablet ? 410 : 430;
  const cardSpacing = isMobile ? 210 : isTablet ? 260 : 310;
  const maxDistance = isMobile ? 1 : isTablet ? 2 : 3;

  // Next / Previous helpers with modulo wrap-around
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Autoplay loop with pause triggers
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isPaused || isHovered || isFocused || prefersReducedMotion || total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [isPaused, isHovered, isFocused, autoRotateInterval, goToNext, total]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  // Touch and pointer events: safe vertical scrolling
  const handleTouchStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isHorizontalSwipeRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current.time) return;
    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Determine swipe direction: don't block vertical scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isHorizontalSwipeRef.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current.time || !isHorizontalSwipeRef.current) {
      touchStartRef.current = { x: 0, y: 0, time: 0 };
      return;
    }

    const touch = e.changedTouches ? e.changedTouches[0] : e;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const threshold = 35;

    if (deltaX < -threshold) {
      goToNext();
    } else if (deltaX > threshold) {
      goToPrev();
    }

    touchStartRef.current = { x: 0, y: 0, time: 0 };
    isHorizontalSwipeRef.current = false;
  };

  const handleImgFallback = (e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={carouselRegionRef}
      role="region"
      aria-label="Client Transformations Carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!carouselRegionRef.current?.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full flex flex-col items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] rounded-3xl"
    >
      {/* 3D Depth Stage Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        className="relative w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          height: `${cardHeight + 40}px`,
          perspective: "1200px",
        }}
      >
        {/* Subtle radial depth highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Card Track Stage */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            // Calculate shortest signed distance with wrap-around
            let dist = i - activeIndex;
            if (dist > total / 2) dist -= total;
            if (dist < -total / 2) dist += total;

            // Only display cards within the visible arc
            const isVisible = Math.abs(dist) <= maxDistance;
            if (!isVisible) return null;

            const isCenter = dist === 0;
            const isLeft = dist < 0;

            // Transform calculations
            const translateX = dist * cardSpacing;
            const translateZ = isCenter ? 40 : -Math.abs(dist) * 80;
            const rotateY = isCenter ? 0 : isLeft ? 15 : -15;
            const scale = isCenter ? 1.02 : Math.max(0.78, 1 - Math.abs(dist) * 0.12);
            const opacity = isCenter ? 1 : Math.max(0.3, 0.8 - Math.abs(dist) * 0.28);
            const zIndex = 30 - Math.abs(dist) * 5;

            return (
              <div
                key={item.id || i}
                role="group"
                aria-label={`${item.client} — ${item.category}`}
                aria-hidden={!isCenter}
                onClick={() => {
                  if (!isCenter) goToIndex(i);
                }}
                className={`absolute transition-all duration-500 ease-out ${
                  !isCenter ? "cursor-pointer" : ""
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transformOrigin: "center center",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Opaque Solid Card Shell — Guarantees ZERO background text overlap */}
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between border bg-[#0A1530] transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.85)] ${
                    isCenter
                      ? "border-[#00B4FF] shadow-[0_0_35px_rgba(0,180,255,0.25)] ring-1 ring-[#00B4FF]/40"
                      : "border-white/10 hover:border-[#2E7BFF]/50"
                  }`}
                >
                  {/* Top Image Banner */}
                  <div className="relative w-full h-[40%] overflow-hidden bg-[#040814] shrink-0">
                    <img
                      src={item.photo?.url}
                      alt={item.photo?.text || item.client}
                      onError={handleImgFallback}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-[#0A1530]/40 to-transparent" />

                    {/* SEO Metric Pill Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#040814]/90 border border-[#00B4FF]/50 text-[10px] font-mono font-bold text-[#00B4FF] backdrop-blur-md truncate shadow-sm">
                        {item.seoBadge || "SEO Optimized"}
                      </span>
                      {item.id === "dash-company" && (
                        <span className="px-2 py-0.5 rounded-full bg-[#00B4FF] text-[#040814] text-[9px] font-black uppercase tracking-wider shrink-0 shadow-[0_0_10px_rgba(0,180,255,0.6)]">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content & Text with comfortable breathing room (p-5 sm:p-6) */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B4FF] truncate">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-['Cinzel'] text-sm sm:text-base font-black text-white leading-snug line-clamp-1 mb-1.5 [overflow-wrap:anywhere]">
                        {item.client}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed font-normal mb-2 [overflow-wrap:anywhere]">
                        {item.role || item.summary}
                      </p>
                    </div>

                    {/* Action Links & Button */}
                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isCenter ? 0 : -1}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00B4FF] hover:text-white transition-colors cursor-pointer truncate focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00B4FF] rounded"
                        >
                          <Globe className="w-3 h-3 shrink-0" />
                          <span className="truncate">
                            {item.website.replace("https://", "")}
                          </span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      )}

                      <button
                        type="button"
                        tabIndex={isCenter ? 0 : -1}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectClient) onSelectClient(item);
                        }}
                        className="w-full py-1.5 sm:py-2 px-3 rounded-xl bg-[#040814] hover:bg-[#00B4FF] border border-[#2E7BFF]/40 hover:border-[#00B4FF] text-white hover:text-[#040814] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                      >
                        <span>View Client Details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Prev, Play/Pause, Next, and Pagination Dots */}
      <div className="mt-4 flex flex-col items-center gap-3 z-20">
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous client transformation"
            className="w-9 h-9 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
            className="px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/40 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#00B4FF] fill-[#00B4FF]" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-[#00B4FF]" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next client transformation"
            className="w-9 h-9 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pagination Indicator Dots */}
        <div className="flex items-center gap-1.5 max-w-full overflow-x-auto py-1 px-2">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => goToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${item.client}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                idx === activeIndex
                  ? "w-6 bg-[#00B4FF] shadow-[0_0_8px_#00B4FF]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="text-center">
          <span className="text-[11px] text-[#CBD5E1]/70 tracking-widest uppercase">
            Card {activeIndex + 1} of {total} · Use arrow keys or swipe horizontally
          </span>
        </div>
      </div>
    </div>
  );
}
