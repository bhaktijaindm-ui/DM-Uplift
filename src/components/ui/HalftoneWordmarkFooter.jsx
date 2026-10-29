"use client";

import { useEffect, useRef } from "react";

const DEFAULT_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "#services-section" },
      { label: "SEO / Local SEO", href: "#services-section" },
      { label: "Social Media Marketing", href: "#services-section" },
      { label: "Professional Shoots", href: "#services-section" },
      { label: "Paid Campaigns", href: "#services-section" },
      { label: "Branding & Identity", href: "#services-section" },
      { label: "Content & Reels", href: "#services-section" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "#intro-section" },
      { label: "Our Services", href: "#services-section" },
      { label: "About UPLIFT", href: "#about-section" },
      { label: "Featured Projects", href: "#projects-section" },
      { label: "FAQ & Inquiries", href: "#faq-section" },
      { label: "Contact Us", href: "#contact-section" },
    ],
  },
  {
    title: "Direct Connect",
    links: [
      { label: "hello@upliftdigital.com", href: "mailto:hello@upliftdigital.com" },
      { label: "+1 (800) 980-3450", href: "tel:+18009803450" },
      { label: "740 Broadway, New York, NY", href: "#contact-section" },
      { label: "Executive Client Portal", href: "#contact-section" },
    ],
  },
];

const SANS_STACK =
  '"Cinzel", "Plus Jakarta Sans", "Inter Tight", "Inter", sans-serif';

/** Dot radius for a cell coverage in [0, 1] */
function hwfRadius(coverage, gap) {
  const c = coverage < 0 ? 0 : coverage > 1 ? 1 : coverage;
  return Math.sqrt(c) * gap * 0.58;
}

/** Physics step towards home position with damping and repulsion */
function hwfStep(x, y, vx, vy, hx, hy, px, py, r) {
  const dx = x - px;
  const dy = y - py;
  const d2 = dx * dx + dy * dy;
  if (r > 0 && d2 < r * r) {
    const d = Math.sqrt(d2) + 0.001;
    const f = (1 - d / r) * 2.8;
    vx += (dx / d) * f;
    vy += (dy / d) * f;
  }
  vx = (vx + (hx - x) * 0.07) * 0.82;
  vy = (vy + (hy - y) * 0.07) * 0.82;
  return [x + vx, y + vy, vx, vy];
}

/** How warm a dot is drawn: 0 at home, 1 once span px away */
function hwfWarmth(x, y, hx, hy, span) {
  const d = Math.hypot(x - hx, y - hy);
  return span > 0 ? Math.min(1, d / span) : 0;
}

/** Font size that sets measured text width to fill target width */
function hwfFitSize(measured, width) {
  return measured > 0 ? (width / measured) * 100 : 0;
}

export function HalftoneWordmarkFooter({
  wordmark = "uplift",
  label = "UPLIFT Digital Agency",
  meta = "© 2026 UPLIFT · All Rights Reserved",
  columns = DEFAULT_COLUMNS,
  backToTop = true,
  dotGap = 6,
  radius = 80,
  interactive = true,
  fontFamily = SANS_STACK,
  fontWeight = 900,
  className = "",
}) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let awake = true;
    let ring = { x: 0, y: 0, t: -1 };

    // Autonomous gliding energy ball
    let ball = {
      x: 100,
      y: 80,
      vx: 2.2,
      vy: 1.4,
      radius: 65,
    };

    let dots = new Float32Array(0);
    let count = 0;

    // Neon blue (#00B4FF) by default, fades to white (#FFFFFF) where balls/cursor pass
    const ink = [0, 180, 255]; // #00B4FF
    const warm = [255, 255, 255]; // #FFFFFF

    const layout = () => {
      const rect = container.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height || 260));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Mask canvas to sample the wordmark
      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;

      const face = fontWeight + " 100px " + fontFamily;
      m.font = face;
      const word = (wordmark || "uplift").toUpperCase();

      // Scale to container width (w * 0.92) so no letters are ever cropped or wider than 100vw
      const fit = Math.max(12, hwfFitSize(m.measureText(word).width, w * 0.92));
      m.font = fontWeight + " " + fit + "px " + fontFamily;
      const box = m.measureText(word);
      const cap = box.actualBoundingBoxAscent || fit * 0.72;

      m.fillStyle = "#000";
      m.textBaseline = "middle";
      // Vertically centered inside canvas
      m.fillText(word, (w - box.width) / 2, h / 2 + cap * 0.08);

      const img = m.getImageData(0, 0, w, h).data;
      const gap = Math.max(3, dotGap);
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const tmp = [];

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3));
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3));
              sum += img[(y * w + x) * 4 + 3];
            }
          }
          const cov = sum / (9 * 255);
          if (cov < 0.05) continue;
          const hx = gx * gap + gap / 2;
          const hy = gy * gap + gap / 2;
          tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap));
        }
      }
      dots = new Float32Array(tmp);
      count = tmp.length / 7;

      ball.x = w * 0.25;
      ball.y = h * 0.5;
      awake = true;
    };

    const draw = (now) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#040814";
      ctx.fillRect(0, 0, w, h);

      // Update autonomous ball animation
      if (!reduced) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -1;
        } else if (ball.x + ball.radius > w) {
          ball.x = w - ball.radius;
          ball.vx *= -1;
        }

        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -1;
        } else if (ball.y + ball.radius > h) {
          ball.y = h - ball.radius;
          ball.vy *= -1;
        }
      }

      const r = interactive && !reduced ? Math.max(0, radius) : 0;
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringR = ringAge * 0.9;
      let moving = false;

      for (let i = 0; i < count; i++) {
        const j = i * 7;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];

        if (!reduced) {
          // 1. Autonomous ball displacement
          const dxB = x - ball.x;
          const dyB = y - ball.y;
          const distB2 = dxB * dxB + dyB * dyB;
          if (distB2 < ball.radius * ball.radius) {
            const distB = Math.sqrt(distB2) + 0.001;
            const fB = (1 - distB / ball.radius) * 2.6;
            vx += (dxB / distB) * fB;
            vy += (dyB / distB) * fB;
          }

          // 2. Click shock ring wave
          if (ringAge < 900) {
            const dx = hx - ring.x;
            const dy = hy - ring.y;
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26);
            if (band > 0) {
              const f = band * 3.2 * (1 - ringAge / 900);
              vx += (dx / d) * f;
              vy += (dy / d) * f;
            }
          }

          // 3. Pointer displacement & spring step
          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r);
          x = s[0];
          y = s[1];
          vx = s[2];
          vy = s[3];

          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) {
            moving = true;
          } else {
            x = hx;
            y = hy;
            vx = 0;
            vy = 0;
          }
          dots[j] = x;
          dots[j + 1] = y;
          dots[j + 2] = vx;
          dots[j + 3] = vy;
        }

        // Color interpolation: neon blue (#00B4FF) by default, smoothly fades to white (#FFFFFF)
        const k = hwfWarmth(x, y, hx, hy, 26);
        if (k > 0.02) {
          const redVal = Math.round(ink[0] + (warm[0] - ink[0]) * k);
          const greenVal = Math.round(ink[1] + (warm[1] - ink[1]) * k);
          const blueVal = 255;
          ctx.fillStyle = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
        } else {
          ctx.fillStyle = "#00B4FF";
        }

        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, 6.2832);
        ctx.fill();
      }

      awake = moving || ringAge < 900 || px > -1e4 || !reduced;
    };

    const loop = (now) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (awake) raf = requestAnimationFrame(loop);
    };

    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const toLocal = (e) => {
      const b = canvas.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };

    const onMove = (e) => {
      if (!interactive) return;
      const p = toLocal(e);
      px = p[0];
      py = p[1];
      wake();
    };

    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      wake();
    };

    const onDown = (e) => {
      if (!interactive || reduced) return;
      const p = toLocal(e);
      ring = { x: p[0], y: p[1], t: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    wake();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    const ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(container);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
      if (visible) wake();
    });
    io.observe(container);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        layout();
        wake();
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [wordmark, dotGap, radius, interactive, fontFamily, fontWeight]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative w-full bg-[#040814] text-white mt-12 pt-8 pb-12 overflow-hidden border-t border-[#2E7BFF]/20 ${className}`}
    >
      <div className="site-container relative z-10">
        {/* Top Header Row with Studio Brand and Back To Top link (ABOVE big text, right-aligned, white 80%) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-10">
          <div className="flex flex-col">
            <span className="font-['Cinzel'] text-xl font-bold tracking-widest text-white uppercase">
              {label}
            </span>
            <span className="text-xs text-white/70 mt-1">
              {meta}
            </span>
          </div>

          {backToTop && (
            <button
              type="button"
              onClick={toTop}
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-[#00B4FF] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Back to top</span>
              <span className="text-[#00B4FF] text-base">↑</span>
            </button>
          )}
        </div>

        {/* Link Columns Row: 14px font size, rgba(255,255,255,0.75), 12px line spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="font-semibold text-xs tracking-widest uppercase text-[#00B4FF] mb-4">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href || "#"}
                      className="text-sm text-white/75 hover:text-[#00B4FF] transition-colors no-underline block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 64px gap above big dotted UPLIFT text: Scaled to container width, fully visible inside viewport */}
        <div
          ref={canvasContainerRef}
          className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden rounded-2xl bg-[#040814]"
        >
          <canvas
            ref={canvasRef}
            className="block w-full h-full cursor-crosshair"
            aria-label={wordmark}
          />
        </div>
      </div>
    </footer>
  );
}

export default HalftoneWordmarkFooter;
