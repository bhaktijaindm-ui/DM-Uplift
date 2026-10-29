import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";

// #region Helper Logic
function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
function stringY(x, w, y0, sag) {
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
}

/** One step of a critically damped spring toward target. */
function springStep(x, v, target, dt, k = 70) {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}

/** One step of a print's swing with velocity lag, gravity pullback, and damping. */
function swingStep(a, w, lineVel, dt, gain) {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
  return [clamp(a + nw * dt, -0.6, 0.6), nw];
}

/** Infinite circular loop wrapped relative offset from current center */
function getWrappedDelta(itemIndex, off, spacing, n) {
  if (n <= 0) return 0;
  const L = n * spacing;
  let d = ((itemIndex * spacing - off) % L + L) % L;
  if (d > L / 2) d -= L;
  return d;
}

/** Normalized circular index [0, n - 1] nearest the center for line offset */
function nearestAt(off, spacing, n) {
  if (n <= 0) return 0;
  const L = n * spacing;
  const normOff = ((off % L) + L) % L;
  return Math.round(normOff / spacing) % n;
}

function pad2(n) {
  return n < 10 ? "0" + n : String(n);
}

const PALETTES = {
  dawn: { top: "#0a1931", bottom: "#152642", sun: "#00B4FF", far: "#1e3a8a", near: "#040814", mist: "0,180,255" },
  alpine: { top: "#061226", bottom: "#0c1f3d", sun: "#ffffff", far: "#2563eb", near: "#040814", mist: "46,123,255" },
  dusk: { top: "#070d1e", bottom: "#102347", sun: "#38bdf8", far: "#1d4ed8", near: "#030712", mist: "56,189,248" },
  mist: { top: "#081329", bottom: "#13274f", sun: "#93c5fd", far: "#1e40af", near: "#020617", mist: "147,197,253" },
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexRgb(h) {
  const v = parseInt(h.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function mixRgb(a, b, t) {
  const A = hexRgb(a);
  const B = hexRgb(b);
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",") + ")";
}

function paintLandscape(seed, palette = "alpine", w = 1200, h = 750) {
  if (typeof document === "undefined") return "";
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return "";
  const P = PALETTES[palette] || PALETTES.alpine;
  const r = mulberry32(seed * 104729 + 7);

  const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
  sky.addColorStop(0, P.top);
  sky.addColorStop(1, P.bottom);
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);

  const sx = w * (0.25 + r() * 0.5);
  const sy = h * (0.2 + r() * 0.15);
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.4);
  halo.addColorStop(0, "rgba(" + hexRgb(P.sun).join(",") + ",.7)");
  halo.addColorStop(1, "rgba(" + hexRgb(P.sun).join(",") + ",0)");
  g.fillStyle = halo;
  g.fillRect(0, 0, w, h);

  const layers = 4;
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1);
    const base = h * (0.45 + k * 0.38);
    const amp = h * (0.06 + k * 0.08);
    const ridge = (x) => {
      const u = x / w;
      return base - amp * (0.6 * Math.sin(u * 3 + 1) + 0.3 * Math.sin(u * 7 + 2));
    };

    const body = g.createLinearGradient(0, base - amp, 0, h);
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)));
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.2)));
    g.fillStyle = body;
    g.beginPath();
    g.moveTo(0, h);
    for (let x = 0; x <= w; x += 8) g.lineTo(x, ridge(x));
    g.lineTo(w, h);
    g.closePath();
    g.fill();
  }

  return c.toDataURL("image/jpeg", 0.85);
}

const PL_STYLES = `
  .pl-root {
    position: relative;
    width: 100%;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-y;
    outline: none;
    cursor: grab;
  }
  .pl-root[data-drag='1'] {
    cursor: grabbing;
  }
  .pl-string {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }
  .pl-card {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--pl-cw);
    transform-origin: 50% 0;
    will-change: transform;
    cursor: inherit;
  }
  .pl-print {
    margin-top: 12px;
    background: #0A1530;
    border: 1px solid rgba(46, 123, 255, 0.35);
    border-radius: 20px;
    padding: 12px 12px 14px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.75);
    transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.45s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .pl-card[data-on='1'] .pl-print {
    transform: scale(1.03);
    border-color: #00B4FF;
    box-shadow: 0 0 35px rgba(0, 180, 255, 0.35), 0 20px 50px rgba(0, 0, 0, 0.9);
  }
  .pl-card[data-on='0'] .pl-print {
    transform: scale(0.92);
    filter: brightness(0.7) saturate(0.8);
    opacity: 0.65;
  }
  .pl-card[data-on='0'] .pl-print:hover {
    filter: brightness(0.85) saturate(0.9);
    opacity: 0.85;
  }
  .pl-shot {
    position: relative;
    aspect-ratio: 16/10;
    border-radius: 12px;
    overflow: hidden;
    background: #040814;
  }
  .pl-shot img, .pl-shot video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }
  .pl-note {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px 0;
  }
  .pl-peg {
    position: absolute;
    left: 50%;
    top: 0;
    width: 12px;
    height: 28px;
    margin-left: -6px;
    border-radius: 3px;
    background: linear-gradient(90deg, #1e3a8a, #00B4FF 50%, #2E7BFF);
    box-shadow: 0 0 12px rgba(0, 180, 255, 0.6), 0 3px 6px rgba(0, 0, 0, 0.6);
  }
  .pl-peg::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    width: 2px;
    height: 8px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 1px;
  }
`;

export default function PolaroidLineCarousel({
  slides = [],
  cardWidth = 330,
  sag = 44,
  swing = 1,
  autoplay = 4500,
  stringColor = "#00B4FF",
  className = "",
  onChange,
  onSelectProject,
}) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ w: 1200, h: 480, cw: cardWidth });

  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const cards = useRef([]);
  const sim = useRef({ off: 0, vel: 0, target: 0, a: [], w: [] });
  const drag = useRef(null);
  const lastTouch = useRef(0);
  const activeRef = useRef(0);
  const opts = useRef({ sag, swing });

  useEffect(() => {
    opts.current = { sag, swing };
  }, [sag, swing]);

  // Generate fallback painted landscapes for slides without an image
  const [fallbackImages] = useState(() =>
    slides.map((s, i) => s.image || paintLandscape(i + 1, s.palette || "alpine"))
  );

  const spacing = size.cw * 1.1;

  const goTo = useCallback(
    (i) => {
      if (n <= 0) return;
      const d = getWrappedDelta(i, sim.current.off, spacing, n);
      const targetStep = Math.round((sim.current.off + d) / spacing);
      sim.current.target = targetStep * spacing;
    },
    [n, spacing]
  );

  // Resize listener ensuring optimal responsive card dimensions
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect();
      const cw = Math.round(Math.max(220, Math.min(cardWidth, r.width * 0.75, r.height * 0.68)));
      setSize({ w: r.width, h: r.height, cw });
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [cardWidth]);

  // Adjust simulation when spacing changes
  useEffect(() => {
    sim.current.target = activeRef.current * spacing;
    sim.current.off = activeRef.current * spacing;
  }, [spacing]);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  // Frame simulation loop updating card transforms and sagging string curve
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    let prev = performance.now();
    const S = sim.current;

    const frame = (now) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;

      const { w, h, cw } = size;
      const y0 = Math.max(30, h * 0.16);
      const d = drag.current;
      let lineVel;

      if (d && d.moved) {
        lineVel = d.v * 1000;
      } else {
        const before = S.off;
        [S.off, S.vel] = springStep(S.off, S.vel, S.target, dt);
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }

      const o = opts.current;
      const g = reduce ? 0 : o.swing;
      const near = nearestAt(S.off, spacing, n);

      const L = n * spacing;
      for (let i = 0; i < n; i++) {
        const el = cards.current[i];
        if (!el) continue;

        let d = ((i * spacing - S.off) % L + L) % L;
        if (d > L / 2) d -= L;

        const x = w / 2 + d;
        if (x < -cw * 1.6 || x > w + cw * 1.6) {
          el.style.visibility = "hidden";
          continue;
        }

        el.style.visibility = "visible";
        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g;

        S.a[i] = a;
        S.w[i] = av;

        const y = stringY(x, w, y0, o.sag) - 6;
        el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px,${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`;
        const distSteps = Math.round(Math.abs(d) / spacing);
        el.style.zIndex = String(Math.max(1, n + 2 - distSteps));
      }

      pathRef.current?.setAttribute(
        "d",
        `M0 ${y0} Q${w / 2} ${y0 + 2 * o.sag} ${w} ${y0}`
      );

      if (near !== activeRef.current) {
        activeRef.current = near;
        setActive(near);
      }

      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });

    io.observe(root);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, spacing, n]);

  // Seamless infinite autoplay loop
  useEffect(() => {
    if (!autoplay || n < 2) return;
    const t = window.setInterval(() => {
      if (document.hidden || drag.current || performance.now() - lastTouch.current < autoplay) return;
      const currentStep = Math.round(sim.current.target / spacing);
      sim.current.target = (currentStep + 1) * spacing;
    }, autoplay);
    return () => window.clearInterval(t);
  }, [autoplay, n, spacing]);

  const onDown = (e) => {
    if (e.target.closest(".pl-bar") || e.target.closest("button") || e.target.closest("a")) return;
    lastTouch.current = performance.now();
    drag.current = {
      x: e.clientX,
      off: sim.current.off,
      lx: e.clientX,
      lt: e.timeStamp,
      v: 0,
      moved: false,
    };
  };

  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;

    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      rootRef.current?.setPointerCapture(e.pointerId);
    }

    if (!d.moved) return;
    const dt = Math.max(1, e.timeStamp - d.lt);
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
    d.lx = e.clientX;
    d.lt = e.timeStamp;

    // Endless infinite loop drag without boundaries
    sim.current.off = d.off - dx;
  };

  const onUp = (e) => {
    const d = drag.current;
    drag.current = null;
    lastTouch.current = performance.now();

    if (!d) return;

    if (d.moved) {
      setDragging(false);
      sim.current.vel = -d.v * 1000;
      const landingOff = sim.current.off - d.v * 180;
      const nearestStep = Math.round(landingOff / spacing);
      sim.current.target = nearestStep * spacing;
      return;
    }

    const card = e.target.closest("[data-i]");
    if (card) {
      const idx = Number(card.getAttribute("data-i"));
      if (idx === activeRef.current) {
        if (onSelectProject && slides[idx]) {
          onSelectProject(slides[idx]);
        }
      } else {
        goTo(idx);
      }
    }
  };

  const step = (dir) => {
    lastTouch.current = performance.now();
    const currentStep = Math.round(sim.current.target / spacing);
    sim.current.target = (currentStep + dir) * spacing;
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  const currentProject = slides[active] || slides[0] || {};

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <style>{PL_STYLES}</style>

      {/* Main Drag & Sway Stage */}
      <div
        ref={rootRef}
        className="pl-root h-[380px] sm:h-[420px] md:h-[450px]"
        style={{
          "--pl-cw": `${size.cw}px`,
        }}
        data-drag={dragging ? "1" : "0"}
        role="region"
        aria-roledescription="carousel"
        aria-label="3D Polaroid Line Projects Showcase"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {/* Sagging Glowing Cord */}
        <svg className="pl-string" aria-hidden="true">
          <defs>
            <filter id="string-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00B4FF" floodOpacity="0.7" />
            </filter>
          </defs>
          <path
            ref={pathRef}
            fill="none"
            stroke={stringColor}
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#string-glow)"
          />
        </svg>

        {/* Pegged Polaroid Cards */}
        {slides.map((proj, i) => {
          const isCurrent = i === active;
          const imageSrc = proj.image || fallbackImages[i];

          return (
            <div
              key={proj.id || i}
              className="pl-card cursor-pointer"
              data-i={i}
              data-on={isCurrent ? "1" : "0"}
              ref={(el) => {
                cards.current[i] = el;
              }}
              aria-hidden={!isCurrent}
              title={isCurrent ? `Open ${proj.name || proj.title} Case Study` : `Switch to ${proj.name || proj.title}`}
              onClick={() => {
                if (!dragging && isCurrent && onSelectProject) {
                  onSelectProject(proj);
                }
              }}
            >
              <div className="pl-print">
                {/* Photo Viewport */}
                <div className="pl-shot">
                  {proj.videoUrl && isCurrent ? (
                    <video
                      src={proj.videoUrl}
                      poster={imageSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={imageSrc}
                      alt={proj.name || proj.title || "Project preview"}
                      draggable={false}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Interactive Reel Pill */}
                  {proj.videoUrl && (
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/40 text-[9px] font-bold text-[#00B4FF] flex items-center gap-1 backdrop-blur-md shadow-sm">
                      <Play className="w-2.5 h-2.5 fill-[#00B4FF]" />
                      <span>Reel</span>
                    </div>
                  )}

                  {/* Result Metric Banner */}
                  {proj.metric && (
                    <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-[#040814]/85 border border-[#00B4FF]/50 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(0,180,255,0.35)] backdrop-blur-md">
                      <span className="text-[#00B4FF] mr-1">✦</span>
                      <span>{proj.metric}</span>
                    </div>
                  )}
                </div>

                {/* Print Lower Note */}
                <div className="pl-note">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#00B4FF] block truncate">
                      {proj.category}
                    </span>
                    <h3 className="font-['Cinzel'] text-xs sm:text-sm font-bold text-white truncate">
                      {proj.name || proj.title}
                    </h3>
                  </div>

                  <Link
                    to={`/project/${proj.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectProject) onSelectProject(proj);
                    }}
                    className="w-7 h-7 rounded-full bg-[#040814] border border-[#2E7BFF]/40 hover:border-[#00B4FF] hover:bg-[#00B4FF] hover:text-[#040814] text-[#00B4FF] flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-[0_0_10px_rgba(0,180,255,0.2)] text-decoration-none"
                    title={`Open ${proj.name || proj.title} Case Study`}
                    aria-label={`Open ${proj.name || proj.title} Case Study`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Glowing Titanium Peg */}
              <div className="pl-peg" />
            </div>
          );
        })}
      </div>

      {/* Synchronized Showcase Control Bar with UPLIFT Dark Aesthetics */}
      <div className="mt-8 p-6 rounded-3xl bg-[#0A1530]/75 border border-[#2E7BFF]/35 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,180,255,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Side: Active Project Details */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040814] border border-[#00B4FF]/40 text-[#00B4FF] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3 text-[#00B4FF]" />
            <span>{currentProject.category || "Digital Showcase"}</span>
          </div>

          <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
            {currentProject.name || currentProject.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2 max-w-2xl leading-relaxed mb-4">
            {currentProject.desc || currentProject.caption}
          </p>

          {/* Tags */}
          {currentProject.tags && (
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md text-[11px] font-medium bg-[#040814]/80 text-[#CBD5E1] border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Navigation & Sub-Page Trigger */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
          <Link
            to={`/project/${currentProject.id || "proj-1"}`}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#040814] bg-gradient-to-r from-[#00B4FF] to-[#38bdf8] hover:from-white hover:to-white transition-all duration-300 shadow-[0_0_20px_rgba(0,180,255,0.5)] flex items-center gap-1.5 cursor-pointer font-sans text-decoration-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#040814]" />
            <span>Explore Case Study</span>
          </Link>

          <a
            href="#contact-section"
            className="px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#CBD5E1] border border-white/15 bg-[#040814] hover:text-white hover:border-[#00B4FF] transition-all duration-300 flex items-center gap-1.5 cursor-pointer text-decoration-none"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2.5 ml-1">
            {/* Counter */}
            <span className="font-mono text-xs tracking-wider text-[#CBD5E1] mr-1">
              <b className="text-[#00B4FF] font-bold text-sm">{pad2(active + 1)}</b> / {pad2(n)}
            </span>

            {/* Prev Button */}
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-white/15 bg-[#040814] text-[#CBD5E1] hover:text-[#00B4FF] hover:border-[#00B4FF] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
              aria-label="Previous Project (Infinite Loop)"
              onClick={() => step(-1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-white/15 bg-[#040814] text-[#CBD5E1] hover:text-[#00B4FF] hover:border-[#00B4FF] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
              aria-label="Next Project (Infinite Loop)"
              onClick={() => step(1)}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
