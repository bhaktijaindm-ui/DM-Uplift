import { useState, useEffect, useRef } from "react";
import { ExternalLink, ArrowRight, Pause, Play, ChevronLeft, ChevronRight, Globe } from "lucide-react";

function getResponsiveDimensions() {
  if (typeof window === "undefined") {
    return {
      radius: 600,
      cardWidth: 270,
      cardHeight: 370,
      containerHeight: 520,
      perspective: 2000,
    };
  }
  const w = window.innerWidth;
  if (w < 640) {
    // Mobile
    return {
      radius: 320,
      cardWidth: 200,
      cardHeight: 290,
      containerHeight: 420,
      perspective: 1000,
    };
  } else if (w < 1024) {
    // Tablet
    return {
      radius: 460,
      cardWidth: 240,
      cardHeight: 330,
      containerHeight: 460,
      perspective: 1500,
    };
  }
  // Laptop & Desktop (standard nominal sizing)
  return {
    radius: 600,
    cardWidth: 270,
    cardHeight: 370,
    containerHeight: 520,
    perspective: 2000,
  };
}

/**
 * CircularExperienceGallery
 * 3D circular cylinder carousel displaying 18 client experiences.
 * - Auto-rotation when idle
 * - Scroll-driven rotation synchronized with window scroll
 * - Touch & pointer drag with momentum
 * - Responsive radius, perspective, and dimensions across laptop, tablet, and mobile
 * - High-contrast glassmorphism cards with reliable image fallbacks
 */
export default function CircularExperienceGallery({
  items = [],
  autoRotateSpeed = 0.04,
  onSelectClient,
}) {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState(getResponsiveDimensions);

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, rotation: 0 });
  const scrollTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);

  // Responsive dimensions listener
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to handle scroll-based rotation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const scrollRotation = scrollProgress * 360 * 1.5;
      setRotation(scrollRotation);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Effect for auto-rotation when not scrolling or dragging
  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling && !isDraggingRef.current && !isPaused) {
        setRotation((prev) => prev + autoRotateSpeed);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };

    animationFrameRef.current = requestAnimationFrame(autoRotate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isScrolling, isPaused, autoRotateSpeed]);

  // Drag and touch interaction handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      rotation: rotation,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartRef.current.x;
    const sensitivity = 0.35;
    setRotation(dragStartRef.current.rotation - deltaX * sensitivity);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleRotateBy = (deg) => {
    setRotation((prev) => prev + deg);
  };

  // Image fallback handler so images never break
  const handleImgFallback = (e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800";
  };

  const totalItems = items.length || 1;
  const anglePerItem = 360 / totalItems;

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Circular Carousel Stage */}
      <div
        ref={containerRef}
        role="region"
        aria-label="3D Circular Experience Gallery"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          height: `${dimensions.containerHeight}px`,
          perspective: `${dimensions.perspective}px`,
        }}
      >
        {/* Radial ambient cylinder lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Rotated 3D Cylinder Container */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            // Front cards are vibrant (opacity 1); back cards soften smoothly (minimum 0.28)
            const opacity = Math.max(0.28, 1 - normalizedAngle / 190);
            const isNearFront = normalizedAngle < 45;

            return (
              <div
                key={item.id || item.photo?.url || i}
                role="group"
                aria-label={item.client}
                className="absolute"
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${dimensions.radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${dimensions.cardWidth / 2}px`,
                  marginTop: `-${dimensions.cardHeight / 2}px`,
                  opacity: opacity,
                  transition: isDragging ? "none" : "opacity 0.2s linear",
                  backfaceVisibility: "visible",
                  zIndex: isNearFront ? 20 : 1,
                }}
              >
                {/* Individual Experience Card (Equal padding around all corners) */}
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between border backdrop-blur-xl transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.8)] ${
                    isNearFront
                      ? "border-[#00B4FF]/60 shadow-[0_0_35px_rgba(0,180,255,0.25)] bg-[#0A1530]/90"
                      : "border-white/10 hover:border-[#2E7BFF]/50 bg-[#0A1530]/65"
                  }`}
                >
                  {/* Top Image Banner with High-Contrast Gradient */}
                  <div className="relative w-full h-[40%] overflow-hidden bg-[#040814] shrink-0">
                    <img
                      src={item.photo?.url}
                      alt={item.photo?.text || item.client}
                      onError={handleImgFallback}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-[#0A1530]/40 to-transparent" />

                    {/* SEO Metric Pill Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#040814]/85 border border-[#00B4FF]/50 text-[10px] font-mono font-bold text-[#00B4FF] backdrop-blur-md truncate shadow-sm">
                        {item.seoBadge || "SEO Optimized"}
                      </span>
                      {item.id === "dash-company" && (
                        <span className="px-2 py-0.5 rounded-full bg-[#00B4FF] text-[#040814] text-[9px] font-black uppercase tracking-wider shrink-0 shadow-[0_0_10px_rgba(0,180,255,0.6)]">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content & Text (Equal corner padding p-3.5 sm:p-4, centered, highly readable) */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B4FF] truncate">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-['Cinzel'] text-sm sm:text-base font-black text-white leading-snug line-clamp-1 mb-1.5">
                        {item.client}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed font-normal mb-2">
                        {item.role || item.summary}
                      </p>
                    </div>

                    {/* Action Links & Button (Corner spacing ensured) */}
                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                      {/* Live Website Link */}
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00B4FF] hover:text-white transition-colors cursor-pointer truncate"
                        >
                          <Globe className="w-3 h-3 shrink-0" />
                          <span className="truncate">
                            {item.website.replace("https://", "")}
                          </span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      )}

                      {/* View Client Details Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectClient) onSelectClient(item);
                        }}
                        className="w-full py-1.5 sm:py-2 px-3 rounded-xl bg-[#040814] hover:bg-[#00B4FF] border border-[#2E7BFF]/40 hover:border-[#00B4FF] text-white hover:text-[#040814] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group"
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

      {/* Interactive Controls Bar: Play/Pause, Prev/Next, and Card Counter */}
      <div className="mt-6 flex items-center justify-center gap-4 z-20">
        <button
          type="button"
          onClick={() => handleRotateBy(anglePerItem * 2)}
          aria-label="Previous client card"
          className="w-9 h-9 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Play rotation" : "Pause rotation"}
          className="px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/40 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 text-[#00B4FF] fill-[#00B4FF]" />
              <span>Resume 3D Rotation</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-[#00B4FF]" />
              <span>Pause Rotation</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleRotateBy(-anglePerItem * 2)}
          aria-label="Next client card"
          className="w-9 h-9 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 text-center">
        <span className="text-[11px] text-[#CBD5E1]/70 tracking-widest uppercase">
          Drag horizontally to spin or scroll down · 18 Active Client Transformations
        </span>
      </div>
    </div>
  );
}
