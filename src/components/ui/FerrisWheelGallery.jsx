"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ImageIcon, Pause, Play, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TURN_MS = 650;
const SWAY_MS = 340;

function wrap(index, total) {
  return total > 0 ? ((Math.trunc(Number.isFinite(index) ? index : 0) % total) + total) % total : 0;
}

function Photo({ item, thumbnail = false }) {
  const [failed, setFailed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [currentSrc, setCurrentSrc] = React.useState(item?.src);

  const handleError = () => {
    if (item?.fallbackSrc && currentSrc !== item.fallbackSrc) {
      setCurrentSrc(item.fallbackSrc);
    } else {
      setFailed(true);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && !failed && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#0A1530] animate-pulse"
        />
      )}
      {!failed && currentSrc && (
        <img
          src={currentSrc}
          alt={thumbnail ? "" : (item?.alt || "Service")}
          draggable={false}
          onLoad={() => setLoading(false)}
          onError={handleError}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            loading ? "opacity-0" : "opacity-100",
            thumbnail ? "filter brightness-90 contrast-105" : "filter brightness-95"
          )}
        />
      )}
      {failed && (
        <span
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#0A1530] text-[#CBD5E1]"
          role={thumbnail ? undefined : "img"}
          aria-label={thumbnail ? undefined : `${item?.alt || "Image"} — unavailable`}
        >
          <ImageIcon className={thumbnail ? "w-3.5 h-3.5 text-[#00B4FF]" : "w-6 h-6 text-[#00B4FF]"} />
          {!thumbnail && <span className="text-xs">Image unavailable</span>}
        </span>
      )}
    </>
  );
}

/**
 * FerrisWheelGallery
 * A vertical rotating Ferris wheel with physically upright, swaying gondolas.
 * Tailored for UPLIFT Services Section with dark luxury theme, glowing LED rim lights,
 * responsive detail showcase, and smooth interactive controls.
 */
export function FerrisWheelGallery({
  items = [],
  active,
  defaultActive = 0,
  onActiveChange,
  direction = "cw",
  autoplay = false,
  interval = 3200,
  className = "",
  onKeyDown,
  onFocusCapture,
  ...rest
}) {
  const total = items.length;
  const [localActive, setLocalActive] = React.useState(() => wrap(defaultActive, total));
  const selected = wrap(active ?? localActive, total);
  const sign = direction === "cw" ? 1 : -1;
  const slot = total > 0 ? 360 / total : 0;
  const initAngle = selected * slot * sign;

  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [paused, setPaused] = React.useState(!autoplay);
  const [view, setView] = React.useState(() => ({ index: selected, previous: selected }));
  const [announcement, setAnnouncement] = React.useState("");

  const angle = React.useRef(initAngle);
  const wheelRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const counters = React.useRef([]);
  const gondolas = React.useRef([]);
  const photoRef = React.useRef(null);
  const previousRef = React.useRef(null);
  const captionRef = React.useRef(null);
  const command = React.useRef(null);
  const requestRef = React.useRef(null);
  const drag = React.useRef(null);
  const suppressClickUntil = React.useRef(0);
  const latest = React.useRef({ selected, active, onActiveChange, items });

  React.useEffect(() => {
    latest.current = { selected, active, onActiveChange, items };
  });

  const labelId = React.useId();
  const helpId = React.useId();

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Frame clock writes both transforms: counter-rotation stays 100% in sync with wheel
  React.useEffect(() => {
    let shown = latest.current.selected;
    let target = shown;
    let frame = 0;
    let sways = [];
    let settleTimer = 0;
    let disposed = false;

    const paint = (value) => {
      angle.current = value;
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${value}deg)`;
      }
      counters.current.forEach((node) => {
        if (node) node.style.transform = `rotate(${-value}deg)`;
      });
    };

    const stopSway = () => {
      window.clearTimeout(settleTimer);
      sways.forEach((animation) => animation?.cancel?.());
      sways = [];
    };

    const sway = (turn) => {
      // Natural decaying pendulum oscillations
      const swing = [0, -2.6, 0, 1.7, 0, -0.9, 0, 0.35, 0];
      sways = gondolas.current.flatMap((node) =>
        node
          ? [
              node.animate(
                swing.map((value) => ({ transform: `rotate(${value * turn}deg)` })),
                { duration: SWAY_MS, easing: "ease-in-out" }
              ),
            ]
          : []
      );
      settleTimer = window.setTimeout(() => {
        if (!disposed) {
          // settled
        }
      }, SWAY_MS);
    };

    const announce = () => {
      const item = latest.current.items[shown];
      if (item) setAnnouncement(`${shown + 1} of ${total}: ${item.title}`);
    };

    const begin = () => {
      if (shown === target || total < 2) return;
      stopSway();
      let distance = wrap(target - shown, total);
      if (distance > total / 2) distance -= total;
      const step = Math.sign(distance);
      const next = wrap(shown + step, total);
      const from = angle.current;
      const to = from + step * slot * sign;
      const started = performance.now();
      setView({ index: next, previous: shown });

      const tick = (now) => {
        const progress = Math.min(1, (now - started) / TURN_MS);
        const tail = progress - 1;
        const spring = 1 + 2.2 * tail ** 3 + 1.2 * tail ** 2;
        paint(from + (to - from) * spring);
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }
        frame = 0;
        paint(to);
        shown = next;
        if (shown !== target) {
          begin();
        } else {
          announce();
          sway(step * sign);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    paint(shown * slot * sign);
    setView({ index: shown, previous: shown });

    command.current = (index) => {
      target = wrap(index, total);
      if (reducedMotion) {
        cancelAnimationFrame(frame);
        frame = 0;
        stopSway();
        shown = target;
        paint(shown * slot * sign);
        setView({ index: shown, previous: shown });
        announce();
      } else if (!frame) {
        begin();
      }
    };

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      stopSway();
      command.current = null;
    };
  }, [total, slot, sign, reducedMotion]);

  React.useEffect(() => {
    command.current?.(selected);
  }, [selected, total, direction, reducedMotion]);

  // Crossfade animations for detail photo
  React.useEffect(() => {
    if (reducedMotion || view.index === view.previous) return;
    const options = { duration: 360, easing: "ease-out" };
    const fades = [
      photoRef.current?.animate?.([{ opacity: 0 }, { opacity: 1 }], options),
      previousRef.current?.animate?.([{ opacity: 1 }, { opacity: 0 }], options),
      captionRef.current?.animate?.([{ opacity: 0 }, { opacity: 1 }], options),
    ];
    return () => fades.forEach((animation) => animation?.cancel?.());
  }, [view, reducedMotion]);

  const request = React.useCallback(
    (index, user = true) => {
      if (user) setPaused(true);
      const next = wrap(index, total);
      if (next === latest.current.selected || total < 2) return;
      if (latest.current.active === undefined) setLocalActive(next);
      latest.current.onActiveChange?.(next);
    },
    [total]
  );

  React.useEffect(() => {
    requestRef.current = request;
  }, [request]);

  // Gentle wheel interaction on stage with cancelable check
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage || total < 2) return;
    let lastWheel = -Infinity;
    let amount = 0;

    const wheel = (event) => {
      if (event.ctrlKey) return;
      if (event.cancelable) {
        event.preventDefault();
      }
      const now = performance.now();
      if (now - lastWheel < TURN_MS + 80) return;
      amount +=
        (Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX) *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1);
      if (Math.abs(amount) < 14) return;
      requestRef.current?.(latest.current.selected + Math.sign(amount));
      amount = 0;
      lastWheel = now;
    };

    stage.addEventListener("wheel", wheel, { passive: false });
    return () => stage.removeEventListener("wheel", wheel);
  }, [total]);

  // Autoplay option
  React.useEffect(() => {
    if (!autoplay || paused || reducedMotion || total < 2) return;
    const delay = Number.isFinite(interval) ? Math.max(TURN_MS + SWAY_MS, interval) : 3200;
    const timer = window.setInterval(
      () => requestRef.current?.(latest.current.selected + 1, false),
      delay
    );
    return () => window.clearInterval(timer);
  }, [autoplay, paused, reducedMotion, total, interval]);

  const current = items[wrap(view.index, total)];
  const previous = items[wrap(view.previous, total)];

  return (
    <div
      {...rest}
      data-ferris-gallery
      data-active={selected}
      data-visible={view.index}
      className={cn("w-full text-white select-none", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={rest["aria-label"] ?? "Ferris wheel services gallery"}
      onFocusCapture={(event) => {
        onFocusCapture?.(event);
        if (
          !event.defaultPrevented &&
          !(event.target instanceof Element && event.target.closest("[data-autoplay-control]"))
        ) {
          setPaused(true);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          request(selected + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      {!current ? (
        <div
          className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-[#CBD5E1]"
          role="status"
        >
          Add services to start your collection.
        </div>
      ) : (
        <div className="grid items-center gap-8 lg:gap-14 grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Left Column: Interactive 3D Ferris Wheel Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={stageRef}
              data-wheel-stage
              data-lenis-prevent="wheel"
              tabIndex={0}
              aria-label="Browse the services wheel"
              aria-describedby={helpId}
              className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] select-none outline-none cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#00B4FF] rounded-full"
              style={{ touchAction: "none" }}
              onPointerDown={(event) => {
                if (!event.isPrimary || event.button !== 0) return;
                setPaused(true);
                drag.current = {
                  id: event.pointerId,
                  x: event.clientX,
                  y: event.clientY,
                  captured: false,
                };
              }}
              onPointerMove={(event) => {
                const start = drag.current;
                if (!start || start.id !== event.pointerId) return;
                if (!start.captured && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) {
                  try {
                    event.currentTarget.setPointerCapture(event.pointerId);
                  } catch {
                    // ignore
                  }
                  start.captured = true;
                }
              }}
              onPointerUp={(event) => {
                const start = drag.current;
                drag.current = null;
                if (!start || start.id !== event.pointerId) return;
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  try {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                  } catch {
                    // ignore
                  }
                }
                const x = event.clientX - start.x;
                const y = event.clientY - start.y;
                const delta = Math.abs(x) >= Math.abs(y) ? x : y;
                if (start.captured) suppressClickUntil.current = performance.now() + 300;
                if (Math.abs(delta) >= 25) request(selected - Math.sign(delta));
              }}
              onPointerCancel={() => {
                drag.current = null;
              }}
              onLostPointerCapture={() => {
                drag.current = null;
              }}
            >
              <div className="relative aspect-square w-full">
                {/* Top ON VIEW indicator arrow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-1 flex flex-col items-center gap-0.5 text-[#00B4FF] z-30"
                >
                  <span className="text-[10px] font-mono font-bold tracking-[0.24em] drop-shadow-[0_0_8px_rgba(0,180,255,0.8)]">
                    ON VIEW
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#00B4FF]" />
                </div>

                {/* Realistic A-Frame Legs SVG Structure */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 w-full h-full text-[#2E7BFF]/25 z-0"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <path
                    d="M200 184 146 362M200 184 254 362M124 362H276"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="184" r="8" fill="#00B4FF" fillOpacity="0.3" />
                </svg>

                {/* Rotating Wheel Ring */}
                <div
                  ref={wheelRef}
                  data-wheel
                  className="absolute left-[15%] top-[12%] size-[70%] rounded-full border-2 border-[#2E7BFF]/35 shadow-[0_0_35px_rgba(0,180,255,0.15)] [transform-origin:50%_50%]"
                  style={{ transform: `rotate(${initAngle}deg)` }}
                >
                  {/* Inner decorative rim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-[6%] rounded-full border border-white/10"
                  />

                  {/* 24 Glowing LED Rim Lights */}
                  {Array.from({ length: 24 }, (_, light) => (
                    <span
                      key={`light-${light}`}
                      aria-hidden="true"
                      data-rim-light
                      className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B4FF] shadow-[0_0_6px_#00B4FF]"
                      style={{
                        left: `${50 + (Math.sin((light * Math.PI) / 12) * 50)}%`,
                        top: `${50 - (Math.cos((light * Math.PI) / 12) * 50)}%`,
                      }}
                    />
                  ))}

                  {/* Spokes & Gondolas */}
                  {items.map((item, index) => {
                    const radians = (-sign * index * slot * Math.PI) / 180;
                    const isActive = index === view.index;

                    return (
                      <React.Fragment key={item.id ?? `${item.title}-${index}`}>
                        {/* Spoke connecting center to gondola */}
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-gradient-to-r from-transparent via-[#2E7BFF]/30 to-[#00B4FF]/40 pointer-events-none"
                          style={{
                            transform: `rotate(${-90 - sign * index * slot}deg)`,
                          }}
                        />

                        {/* Gondola Anchor positioned at rim radius */}
                        <div
                          data-gondola-anchor={index}
                          className="absolute z-10 w-[32%]"
                          style={{
                            left: `${50 + Math.sin(radians) * 50}%`,
                            top: `${50 - Math.cos(radians) * 50}%`,
                            zIndex: isActive ? 30 : 15,
                          }}
                        >
                          {/* Counter-rotation node ensures gondola stays upright */}
                          <div
                            ref={(node) => {
                              counters.current[index] = node;
                            }}
                            data-counter={index}
                            className="relative origin-top-left"
                            style={{
                              transform: `rotate(${-initAngle}deg)`,
                            }}
                          >
                            <div className="absolute left-0 top-0 w-full -translate-x-1/2">
                              {/* Pendulum Node provides dynamic swaying animation */}
                              <div
                                ref={(node) => {
                                  gondolas.current[index] = node;
                                }}
                                data-pendulum={index}
                                className="relative origin-top"
                              >
                                {/* Hanging Bracket Rod */}
                                <span
                                  aria-hidden="true"
                                  className="mx-auto block h-3 w-0.5 rounded-full bg-[#00B4FF]/60 shadow-[0_0_5px_rgba(0,180,255,0.5)]"
                                />

                                {/* Gondola Card Button */}
                                <button
                                  type="button"
                                  data-gondola={index}
                                  aria-label={`View ${item.title}, ${index + 1} of ${total}`}
                                  aria-current={isActive ? "true" : undefined}
                                  aria-controls={labelId}
                                  onClick={() => {
                                    if (performance.now() >= suppressClickUntil.current) {
                                      request(index);
                                    }
                                  }}
                                  className={cn(
                                    "relative block w-full rounded-xl border p-1 shadow-lg cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]",
                                    isActive
                                      ? "border-[#00B4FF] bg-[#0A1530] shadow-[0_0_20px_rgba(0,180,255,0.5)] ring-2 ring-[#00B4FF]/30 scale-110 z-30"
                                      : "border-white/10 bg-[#0A1530]/80 hover:border-[#00B4FF]/50 hover:scale-105"
                                  )}
                                >
                                  {/* Gondola Photo Preview */}
                                  <span className="relative block aspect-[1.4] overflow-hidden rounded-lg bg-[#060F26]">
                                    <Photo key={item.src} item={item} thumbnail />
                                  </span>

                                  {/* Gondola Number Tag */}
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      "mt-1 block text-center font-mono text-[10px] font-bold leading-none tracking-wider",
                                      isActive ? "text-[#00B4FF]" : "text-[#CBD5E1]/70"
                                    )}
                                  >
                                    {item.number || String(index + 1).padStart(2, "0")}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Center Hub Emblem */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[46%] flex size-[20%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-[#00B4FF]/40 bg-[#040814] shadow-[0_0_30px_rgba(0,180,255,0.35)] backdrop-blur-xl z-20"
                >
                  <span className="font-['Cinzel'] text-base sm:text-lg font-black text-white leading-none tracking-tight">
                    {String(total).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[8px] font-bold leading-none tracking-[0.16em] uppercase text-[#00B4FF]">
                    SERVICES
                  </span>
                </div>
              </div>
            </div>

            {/* Hint subtitle */}
            <p
              id={helpId}
              className="mt-3 text-center text-[11px] font-medium tracking-wide text-[#CBD5E1]/70"
            >
              Drag or click cars to rotate <span aria-hidden="true" className="px-1 text-white/20">/</span> Use ← → keys
            </p>
          </div>

          {/* Right Column: Active Service Details Panel */}
          <div
            data-detail-panel
            id={labelId}
            className="lg:col-span-5 flex flex-col gap-5 bg-[#0A1530]/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,180,255,0.1)]"
          >
            {/* Active Service Big Photo Preview */}
            <div className="relative aspect-[16/10] w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#060F26] shadow-inner">
              {previous && view.previous !== view.index && (
                <div
                  ref={previousRef}
                  data-previous-photo
                  aria-hidden="true"
                  className="absolute inset-0 z-0"
                  style={{ opacity: 0 }}
                >
                  <Photo key={`prev-${previous.src}`} item={previous} />
                </div>
              )}
              <div
                ref={photoRef}
                data-current-photo
                className="absolute inset-0 z-10"
              >
                <Photo key={`curr-${current.src}`} item={current} />
              </div>

              {/* High Contrast Ambient Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent z-15 pointer-events-none" />

              {/* Top Badge: Number and Category */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#040814]/85 border border-[#00B4FF]/40 text-[#00B4FF] backdrop-blur-md shadow-[0_0_10px_rgba(0,180,255,0.3)]">
                  {current.number || String(view.index + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#CBD5E1] bg-[#040814]/75 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                  {current.discipline}
                </span>
              </div>
            </div>

            {/* Active Service Information */}
            <div className="min-w-0 flex flex-col">
              <div ref={captionRef} data-caption>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00B4FF] shadow-[0_0_8px_#00B4FF]" />
                  <p className="font-mono text-xs font-bold tracking-wider uppercase text-[#00B4FF]">
                    SERVICE {String(view.index + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}
                  </p>
                </div>

                <h3 className="font-['Cinzel'] text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight mb-2.5">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed mb-4">
                  {current.shortDesc}
                </p>

                {/* Key Impact Metric Tag */}
                {current.metric && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#060F26] border border-[#00B4FF]/30 text-[#00B4FF] text-xs font-mono font-bold mb-5 shadow-[0_0_15px_rgba(0,180,255,0.15)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{current.metric}</span>
                  </div>
                )}
              </div>

              {/* Bottom Action Row: Inquiry Link & Navigation Buttons */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <a
                  href="#contact-section"
                  onClick={(e) => {
                    const el = document.querySelector("#contact-section");
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00B4FF] text-[#040814] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,180,255,0.5)] hover:bg-white hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Inquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {/* Controls: Prev, Next, Counter & Autoplay Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-previous
                    aria-label="Previous service"
                    disabled={total < 2}
                    onClick={() => request(selected - 1)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#060F26] text-white hover:border-[#00B4FF] hover:text-[#00B4FF] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    data-next
                    aria-label="Next service"
                    disabled={total < 2}
                    onClick={() => request(selected + 1)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#00B4FF] text-[#040814] hover:bg-white disabled:opacity-40 shadow-[0_0_15px_rgba(0,180,255,0.5)] transition-all cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Optional Autoplay toggle */}
                  {autoplay && !reducedMotion && total > 1 && (
                    <button
                      data-autoplay-control
                      type="button"
                      aria-label={paused ? "Resume automatic rotation" : "Pause automatic rotation"}
                      onClick={() => setPaused(!paused)}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#060F26] text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
                    >
                      {paused ? <Play className="w-3.5 h-3.5 text-[#00B4FF]" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}

export default FerrisWheelGallery;
