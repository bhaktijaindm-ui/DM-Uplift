"use client";

import * as React from "react";
import { Sparkles, ArrowUpRight, ChevronUp, ChevronDown, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  WorksWheel: 3D Biomimetic Portfolio Drum & Ring                   */
/*  At rest (turn = 0), items sit in a ring around a central title.    */
/*  Turning opens into a vertical 3D drum where the active piece lies  */
/*  flat, and neighbors curve back along a perspective arc.           */
/* ------------------------------------------------------------------ */

const CARD_RATIO = 1.45; // card width / height
const STEP = 42; // degrees between cards on the drum
const DRUM = 2.2; // drum radius in card heights
const LENS = 2.7; // perspective distance
const RING_R = 1.08; // ring radius in card heights
const BOW = 1.75; // arc radius bow
const TITLE = 0.12; // ring label and front title ratio
const INDEX = 0.038; // index font size ratio
const CULL = 1.8; // culled by distance
const EASE = 0.12;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rad = (deg) => (deg * Math.PI) / 180;

const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items = [],
  label = "OUR SERVICES",
  action = "Inquire",
  className = "",
  ...props
}) {
  const stageRef = React.useRef(null);
  const wheelRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const labelRef = React.useRef(null);
  const titleRef = React.useRef(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState({ w: 0, h: 0 });
  const [isRing, setIsRing] = React.useState(true);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Reduced motion preference
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  // Responsive stage measurement
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Geometry calculations tailored for Desktop & Mobile
  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w > 0 && w < 768;
    const maxWFactor = isMobile ? 0.68 : 0.30;
    const hFactor = isMobile ? 0.32 : 0.28;
    const cardW = Math.max(
      170,
      Math.min(h * hFactor * CARD_RATIO, (w > 0 ? w * maxWFactor : 320))
    );
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * (isMobile ? 1.05 : RING_R);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.85) / (cardW || 1), 0.2, 1)
      : 1;
    const bowFactor = isMobile ? cardH * 0.4 : cardH * BOW;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: bowFactor,
      depth: cardH * LENS,
      title: Math.max(18, Math.min(cardH * TITLE, 36)),
      index: Math.max(11, Math.min(cardH * INDEX, 15)),
      isMobile,
    };
  }, [stage, count]);

  const to = React.useCallback(
    (next) => {
      target.current = clamp(next, 0, count);
      setIsRing(next < 0.3);
    },
    [count]
  );

  // Main 60fps rAF render loop — purely writes transforms straight to DOM
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) {
        turn.current = target.current;
      } else {
        turn.current += gap * (reduced ? 1 : EASE);
      }

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild;
        if (face) {
          face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
        }
      }

      if (labelRef.current) {
        labelRef.current.style.opacity = String(1 - m);
        labelRef.current.style.pointerEvents = m > 0.5 ? "none" : "auto";
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = String(m);
        titleRef.current.style.pointerEvents = m > 0.5 ? "auto" : "none";
      }

      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  // Robust wheel listener: avoids snapping back, cleanly turns card-by-card, and scrolls page at edges
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let accumulatedDelta = 0;
    let scrollTimeout = null;

    const onWheel = (event) => {
      const deltaY = event.deltaY;
      if (!Number.isFinite(deltaY) || deltaY === 0) return;

      const dir = Math.sign(deltaY);

      // Boundary check:
      // If at Ring (target <= 0) and scrolling up, allow normal page scroll up
      if (target.current <= 0 && dir < 0) {
        return;
      }
      // If at last card (target >= count) and scrolling down, allow normal page scroll down
      if (target.current >= count && dir > 0) {
        return;
      }

      // Within wheel range: prevent default page scroll safely
      if (event.cancelable) {
        event.preventDefault();
      }

      accumulatedDelta += deltaY;
      const STEP_THRESHOLD = 85;

      if (Math.abs(accumulatedDelta) >= STEP_THRESHOLD) {
        const step = Math.sign(accumulatedDelta);
        accumulatedDelta = 0;

        if (target.current === 0 && step > 0) {
          // First scroll notch blows the ring open to card 1
          to(1);
        } else if (target.current <= 1 && step < 0) {
          // Scrolling up from card 1 returns to ring
          to(0);
        } else {
          // Advance card by card
          to(clamp(Math.round(target.current + step), 0, count));
        }
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 180);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(scrollTimeout);
    };
  }, [to, count]);

  // Pointer drag handler for touch and mouse
  const drag = React.useRef(null);

  // Fallback image handler
  const handleImageError = (e, fallback) => {
    if (fallback && e.currentTarget.src !== fallback) {
      e.currentTarget.src = fallback;
    } else {
      e.currentTarget.src =
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000";
    }
  };

  const activeItem = items[active] || items[0] || {};

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none flex flex-col justify-between",
        className
      )}
      {...props}
    >
      {/* Top Floating Control Bar — No bounding box, completely floating */}
      <div className="relative z-30 w-full px-4 sm:px-8 pt-1 pb-3 flex items-center justify-between pointer-events-auto">
        {/* Ring / Drum Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => to(0)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md",
              isRing
                ? "bg-[#00B4FF] text-[#040814] shadow-[0_0_15px_rgba(0,180,255,0.6)] font-bold"
                : "bg-white/5 text-[#CBD5E1] border border-white/10 hover:border-[#00B4FF]/40"
            )}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ring View</span>
          </button>

          <button
            type="button"
            onClick={() => to(active + 1 || 1)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md",
              !isRing
                ? "bg-[#00B4FF] text-[#040814] shadow-[0_0_15px_rgba(0,180,255,0.6)] font-bold"
                : "bg-white/5 text-[#CBD5E1] border border-white/10 hover:border-[#00B4FF]/40"
            )}
          >
            <span>Drum View</span>
          </button>
        </div>

        {/* Turn Step Stepper & Prev / Next Arrows */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white/60 hidden sm:inline">
            {isRing ? "ALL 07 SERVICES" : `${activeItem.number || `0${active + 1}`} / 07`}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous Service"
              onClick={() => {
                if (target.current <= 1) to(0);
                else to(target.current - 1);
              }}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#00B4FF] text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
            >
              <ChevronUp className="w-4 h-4 text-[#00B4FF]" />
            </button>
            <button
              type="button"
              aria-label="Next Service"
              onClick={() => {
                if (target.current === 0) to(1);
                else to(Math.min(count, target.current + 1));
              }}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#00B4FF] text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
            >
              <ChevronDown className="w-4 h-4 text-[#00B4FF]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Wheel Interactive Stage — Freely on the background with data-lenis-prevent */}
      <div
        ref={stageRef}
        data-lenis-prevent="wheel"
        tabIndex={0}
        role="region"
        aria-label={label}
        className="relative w-full h-[600px] sm:h-[680px] lg:h-[740px] cursor-grab active:cursor-grabbing outline-none overflow-hidden touch-pan-x"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // ignore
          }
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const deltaY = drag.current - event.clientY;
          const next = target.current + deltaY / 320;

          // If at boundary, release capture so user can scroll page naturally
          if ((next <= 0 && deltaY < 0) || (next >= count && deltaY > 0)) {
            try {
              event.currentTarget.releasePointerCapture(event.pointerId);
            } catch {
              // ignore
            }
            drag.current = null;
            return;
          }

          to(clamp(next, 0, count));
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 0.45) {
            to(clamp(Math.round(target.current), 1, count));
          } else {
            to(0);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            if (target.current === 0) to(1);
            else to(Math.min(count, Math.round(target.current) + 1));
            event.preventDefault();
          } else if (event.key === "ArrowUp") {
            if (target.current <= 1) to(0);
            else to(Math.max(0, Math.round(target.current) - 1));
            event.preventDefault();
          }
        }}
      >
        {/* 3D Rotating Wheel Container */}
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isFront = i === active && !isRing;
            return (
              <div
                key={item.title || item.id}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                onClick={(e) => {
                  if (active !== i || isRing) {
                    e.preventDefault();
                    to(i + 1);
                  }
                }}
                className="group absolute [backface-visibility:hidden] cursor-pointer"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                {/* Scaled Card Face — No transition-all so rAF updates instantly */}
                <div
                  className={cn(
                    "relative w-full h-full rounded-2xl overflow-hidden bg-[#0A1530] shadow-[0_20px_50px_rgba(0,0,0,0.85)]",
                    isFront
                      ? "border-2 border-[#00B4FF] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_45px_rgba(0,180,255,0.4)]"
                      : "border border-white/15 hover:border-[#00B4FF]/80"
                  )}
                >
                  {/* Service Cover Art */}
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    onError={(e) => handleImageError(e, item.fallbackImage)}
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-105 group-hover:brightness-100"
                  />

                  {/* Gradient Overlay for High Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/50 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-[#040814]/90 border border-[#00B4FF]/40 text-[#00B4FF] backdrop-blur-md shadow-[0_0_10px_rgba(0,180,255,0.3)]">
                      {item.number || `0${i + 1}`}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#CBD5E1] bg-[#040814]/80 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Info Row */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 flex flex-col justify-end pointer-events-none">
                    <h4 className="font-['Cinzel'] text-xs sm:text-sm md:text-base font-black text-white leading-tight mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between pt-1.5 border-t border-white/15">
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-[#00B4FF] tracking-tight">
                        {item.metric}
                      </span>

                      <a
                        href="#contact-section"
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.querySelector("#contact-section");
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00B4FF] text-[#040814] text-[10px] sm:text-[11px] font-bold shadow-[0_0_12px_rgba(0,180,255,0.7)] group-hover:scale-105 pointer-events-auto"
                      >
                        <span>{action}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Ring Title at Rest (m = 0) */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center tracking-tight transition-opacity select-none z-10 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A1530]/90 border border-[#2E7BFF]/40 text-[#00B4FF] text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-2.5 shadow-[0_0_20px_rgba(0,180,255,0.3)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D PORTFOLIO WHEEL</span>
          </div>

          <h3 className="font-['Cinzel'] text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider drop-shadow-[0_0_35px_rgba(0,180,255,0.6)]">
            {label}
          </h3>

          <p className="text-xs sm:text-sm text-[#CBD5E1] tracking-wider uppercase mt-2.5 opacity-85 font-mono">
            Scroll or drag to rotate
          </p>
        </div>

        {/* Front-card details on Desktop Left */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute top-1/2 left-[4%] lg:left-[6%] -translate-y-1/2 max-w-[260px] lg:max-w-[300px] transition-opacity duration-300 hidden md:flex flex-col gap-2.5 z-20 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00B4FF]/15 border border-[#00B4FF]/40 text-[#00B4FF] text-[10px] font-bold tracking-widest uppercase w-fit">
            <span>{activeItem.category || "Service"}</span>
          </div>

          <h4 className="font-['Cinzel'] text-xl lg:text-2xl font-black text-white leading-tight">
            {activeItem.title}
          </h4>

          <p className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-3">
            {activeItem.shortDesc}
          </p>

          <div className="pt-1">
            <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Key Impact</div>
            <div className="font-mono text-xs font-bold text-[#00B4FF]">
              {activeItem.metric}
            </div>
          </div>

          <a
            href="#contact-section"
            onClick={(e) => {
              const el = document.querySelector("#contact-section");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00B4FF] text-[#040814] text-xs font-bold shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:bg-white transition-all w-fit pointer-events-auto cursor-pointer"
          >
            <span>Inquire This Service</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right-Hand Index on Desktop — Clean floating list directly on background */}
        <ol className="text-white/60 absolute top-1/2 right-[3%] lg:right-[5%] -translate-y-1/2 text-right leading-[2.2] hidden md:flex flex-col gap-1.5 z-20 pointer-events-auto">
          {items.map((item, i) => {
            const isSelected = i === active && !isRing;
            return (
              <li key={item.title || item.id}>
                <button
                  type="button"
                  onClick={() => to(i + 1)}
                  className={cn(
                    "group flex items-center gap-2.5 justify-end cursor-pointer transition-all duration-300 outline-none text-xs lg:text-sm font-medium",
                    isSelected
                      ? "text-white font-bold scale-105"
                      : "text-[#CBD5E1]/60 hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] transition-colors",
                      isSelected ? "text-[#00B4FF] font-bold" : "text-white/40"
                    )}
                  >
                    {item.number || `0${i + 1}`}
                  </span>
                  <span
                    className={cn(
                      "transition-all duration-300",
                      isSelected
                        ? "text-white drop-shadow-[0_0_12px_rgba(0,180,255,0.7)]"
                        : ""
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      isSelected
                        ? "bg-[#00B4FF] scale-125 shadow-[0_0_10px_#00B4FF]"
                        : "bg-white/20 group-hover:bg-white/50"
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile Bottom Quick-Jump Horizontal Pills & Detail Banner */}
      <div className="block md:hidden w-full px-4 pt-1 pb-4">
        {/* Mobile Active Service Card Details */}
        {!isRing && (
          <div className="p-3 mb-2 rounded-xl bg-white/5 border border-[#00B4FF]/30 backdrop-blur-md flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#00B4FF] font-bold block">
                {activeItem.number} · {activeItem.category}
              </span>
              <h5 className="font-['Cinzel'] text-xs font-bold text-white truncate">
                {activeItem.title}
              </h5>
            </div>

            <a
              href="#contact-section"
              onClick={(e) => {
                const el = document.querySelector("#contact-section");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-[#00B4FF] text-[#040814] text-[11px] font-bold shrink-0 shadow-[0_0_10px_rgba(0,180,255,0.5)]"
            >
              Inquire
            </a>
          </div>
        )}

        {/* Mobile Horizontal Pill Stepper */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-1">
          {items.map((item, i) => {
            const isSelected = i === active && !isRing;
            return (
              <button
                key={item.title || item.id}
                type="button"
                onClick={() => to(i + 1)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer backdrop-blur-md",
                  isSelected
                    ? "bg-[#00B4FF] text-[#040814] shadow-[0_0_12px_rgba(0,180,255,0.6)] font-bold"
                    : "bg-white/5 text-[#CBD5E1] border border-white/10 hover:border-[#00B4FF]/40"
                )}
              >
                {item.number || `0${i + 1}`} {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorksWheel;
