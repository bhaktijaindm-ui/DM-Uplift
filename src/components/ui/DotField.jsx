import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

/**
 * FLOW: Generates flowing vector angles for the dots flocking physics
 */
const FLOW = (x, y, t) =>
  (Math.sin(x * 0.004 + t * 0.7) +
    Math.cos(y * 0.005 - t * 0.5) +
    Math.sin((x + y) * 0.002 + t * 0.3)) *
  Math.PI;

export const DotField = forwardRef(function DotField(
  {
    headline,
    eyebrow,
    description,
    actions,
    accent = "#00B4FF",
    grid = [20, 13],
    fontFamily = "Geist, 'Cinzel', ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontWeight = 700,
    repelRadius = 120,
    scrollScatter = false,
    scrollHint = false,
    onReady,
    className = "",
    style,
    ...rest
  },
  ref
) {
  const outerRef = useRef(null);
  const stageRef = useRef(null);
  const dotsRef = useRef(null);
  const glowRef = useRef(null);
  const spotRef = useRef(null);
  const copyRef = useRef(null);
  const hintRef = useRef(null);
  const hintLabelRef = useRef(null);
  const [ready, setReady] = useState(true);
  const readyRef = useRef(true);

  // Everything the 60fps render loop needs lives in one mutable ref object
  const S = useRef({
    W: 0,
    H: 0,
    N: 0,
    P: new Float32Array(0),
    t0: 0,
    scrollP: 0,
    btnP: 0,
    btnT: 0,
    scatter: 0,
    last: 0,
    kick: 0,
    mouse: { x: -9999, y: -9999, on: false },
    restart: () => {},
  });

  const opts = useRef({
    headline,
    fontFamily,
    fontWeight,
    grid,
    repelRadius,
    accent,
    onReady,
  });

  opts.current = {
    headline,
    fontFamily,
    fontWeight,
    grid,
    repelRadius,
    accent,
    onReady,
  };

  useImperativeHandle(
    ref,
    () => ({
      replay: () => S.current.restart(true),
      setScattered: (v) => {
        S.current.btnT = v ? 1 : 0;
      },
    }),
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    const cv = dotsRef.current;
    const gl = glowRef.current;
    if (!stage || !cv || !gl) return;

    const ctx = cv.getContext("2d");
    const gtx = gl.getContext("2d");
    if (!ctx || !gtx) return;

    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = S.current;
    let raf = 0;
    let visible = true;
    let alive = true;
    let readyTimer = 0;
    let fg = "#ffffff";
    let frameNo = 0;

    const readFg = () => {
      fg = getComputedStyle(stage).color || "#ffffff";
    };

    /* Lay the headline out on an offscreen canvas and sample its dot coordinates */
    const sample = () => {
      const { W, H } = s;
      const o = opts.current;
      const c = document.createElement("canvas");
      const g = c.getContext("2d", { willReadFrequently: true });
      if (!g) return [];

      c.width = W;
      c.height = H;
      const font = (px) => `${o.fontWeight} ${px}px ${o.fontFamily}`;
      const words = (o.headline || "").split(/\s+/);
      let size = Math.min(W * 0.115, H * 0.2, 168);
      let lines;

      for (;;) {
        g.font = font(size);
        lines = [];
        let cur = "";
        for (const w of words) {
          const t = cur ? cur + " " + w : w;
          if (g.measureText(t).width > W * 0.88 && cur) {
            lines.push(cur);
            cur = w;
          } else {
            cur = t;
          }
        }
        lines.push(cur);
        if (
          (lines.length <= 3 &&
            lines.every((l) => g.measureText(l).width <= W * 0.92)) ||
          size < 28
        ) {
          break;
        }
        size *= 0.9;
      }

      g.font = font(size);
      g.textAlign = "center";
      g.textBaseline = "middle";
      try {
        g.letterSpacing = `${-size * 0.05}px`;
      } catch {
        // letterSpacing fallback
      }

      const lh = size * 0.98;
      const top = H * 0.44 - ((lines.length - 1) * lh) / 2;
      lines.forEach((l, i) => g.fillText(l, W / 2, top + i * lh));

      const d = g.getImageData(0, 0, W, H).data;
      const pts = [];
      const step = Math.max(3, Math.round(size / 30));

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (d[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
        }
      }
      return pts;
    };

    /* One Float32Array, 10 slots per dot: x y vx vy homeX homeY textX textY delay isText */
    const build = () => {
      const r = stage.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      s.W = Math.max(1, Math.round(r.width));
      s.H = Math.max(1, Math.round(r.height));

      for (const c of [cv, gl]) {
        c.width = s.W * dpr;
        c.height = s.H * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const [GX, GY] = opts.current.grid;
      const tgt = sample();
      const cols = Math.ceil(s.W / GX) + 1;
      const rows = Math.ceil(s.H / GY) + 1;
      const cells = cols * rows;
      const nText = tgt.length / 2;

      s.N = Math.max(cells, nText);
      const P = new Float32Array(s.N * 10);

      for (let i = 0; i < s.N; i++) {
        const cell = i < cells ? i : (Math.random() * cells) | 0;
        const hx = (cell % cols) * GX - 6;
        const hy = Math.floor(cell / cols) * GY - 1;
        const o = i * 10;
        P[o] = hx;
        P[o + 1] = hy;
        P[o + 4] = hx;
        P[o + 5] = hy;
      }

      const ids = Array.from({ length: s.N }, (_, i) => i);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }

      const diag = Math.hypot(s.W, s.H);
      for (let k = 0; k < nText; k++) {
        const o = ids[k] * 10;
        const tx = tgt[k * 2];
        const ty = tgt[k * 2 + 1];
        P[o + 6] = tx;
        P[o + 7] = ty;
        P[o + 9] = 1;
        // Fast snap assembly: dots land swiftly within 0.04s to 0.22s
        P[o + 8] =
          0.02 +
          Math.min(0.18, (Math.hypot(tx - s.W / 2, ty - s.H * 0.44) / diag) * 0.16) +
          Math.random() * 0.04;
      }
      s.P = P;
    };

    const setCopy = () => {
      const p = scrollScatter ? s.scrollP : 0;
      const show = readyRef.current;
      if (copyRef.current) {
        copyRef.current.style.opacity = show
          ? String(Math.max(0, 1 - p * 1.6))
          : "";
      }
      if (hintRef.current && hintLabelRef.current && scrollHint && scrollScatter) {
        const up = p > 0.85;
        hintRef.current.dataset.up = up ? "true" : "false";
        hintLabelRef.current.textContent = up
          ? scrollHint.gather
          : scrollHint.scatter;
        hintRef.current.style.opacity = show
          ? String(up ? 1 : Math.max(0, 1 - p * 5))
          : "0";
      }
    };

    const restart = (isUserAction = false) => {
      if (isUserAction && scrollScatter && s.scrollP > 0) {
        outerRef.current?.scrollIntoView({ block: "start" });
      }
      s.btnP = s.btnT = 0;
      s.kick = 0;
      readFg();
      build();
      s.t0 = performance.now();
      readyRef.current = true;
      setReady(true);
      setCopy();
      opts.current.onReady?.();
    };
    s.restart = restart;

    const frame = (now) => {
      raf = 0;
      if (!alive) return;
      if (visible) {
        const t = (now - s.t0) / 1000;
        const { W, H, N, P } = s;
        const R = opts.current.repelRadius;
        const R2 = R * R;

        if (++frameNo % 30 === 0) readFg();
        s.btnP += (s.btnT - s.btnP) * 0.06;
        const SC = Math.max(s.scrollP, s.btnP);
        s.kick = s.kick * 0.93 + Math.abs(SC - s.last) * 6;
        s.last = SC;
        const q = Math.min(1, SC);
        const sweep = ((t * 0.35) % 1.6) - 0.3;
        const m = s.mouse;

        ctx.clearRect(0, 0, W, H);
        gtx.clearRect(0, 0, W, H);
        ctx.fillStyle = fg;
        gtx.fillStyle = opts.current.accent;

        for (let i = 0; i < N; i++) {
          const o = i * 10;
          const isT = P[o + 9] === 1;
          let tx = P[o + 4];
          let ty = P[o + 5];
          let k = 0.06;
          let fl = 0;
          const local = t - P[o + 8];

          if (isT) {
            if (local > 0) {
              const d = Math.min(1, SC * (0.8 + P[o + 8] * 0.6));
              tx = P[o + 6] + (P[o + 4] - P[o + 6]) * d;
              ty = P[o + 7] + (P[o + 5] - P[o + 7]) * d;
              k = Math.min(0.24, 0.08 + local * 0.22);
            }
            fl = local > -1 ? Math.max(0, 1 - Math.max(0, local) * 2.2) : 0;
          }
          if (s.kick > 0.01) fl = Math.max(fl, Math.min(1, s.kick) * 0.9);

          if (reduce) {
            const d = isT ? 1 - q : 0;
            P[o] = P[o + 4] + ((isT ? P[o + 6] : P[o + 4]) - P[o + 4]) * d;
            P[o + 1] = P[o + 5] + ((isT ? P[o + 7] : P[o + 5]) - P[o + 5]) * d;
          } else {
            let ax = (tx - P[o]) * k;
            let ay = (ty - P[o + 1]) * k;
            if (fl > 0) {
              const a = FLOW(P[o], P[o + 1], t);
              ax += Math.cos(a) * 2.2 * fl;
              ay += Math.sin(a) * 2.2 * fl;
            }
            if (m.on && R > 0) {
              const dx = P[o] - m.x;
              const dy = P[o + 1] - m.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < R2) {
                const d = Math.sqrt(d2) || 1;
                const f = (1 - d / R) * 6;
                ax += (dx / d) * f;
                ay += (dy / d) * f;
              }
            }
            P[o + 2] = (P[o + 2] + ax) * 0.82;
            P[o + 3] = (P[o + 3] + ay) * 0.82;
            P[o] += P[o + 2];
            P[o + 1] += P[o + 3];
          }

          const x = P[o];
          const y = P[o + 1];
          const sp = Math.abs(P[o + 2]) + Math.abs(P[o + 3]);
          const gridA = Math.min(0.5, 0.12 + sp * 0.05);

          if (isT) {
            const settle = reduce
              ? 1 - q
              : Math.min(1, Math.max(0, local * 1.2)) * (1 - q);
            const a = (0.34 + settle * 0.6) * (1 - q) + gridA * q;
            const r = 1 - q * 0.25;
            ctx.globalAlpha = a;
            ctx.fillRect(x - r, y - r, r * 2, r * 2);
            if (q < 1 && !reduce) {
              const w = Math.max(0, 1 - Math.abs(x / W - sweep) * 7);
              const ga = (w * 0.9 + (1 - settle) * 0.25) * (1 - q);
              if (ga > 0.02) {
                gtx.globalAlpha = ga;
                gtx.fillRect(x - 2, y - 2, 4, 4);
              }
            }
          } else {
            ctx.globalAlpha = gridA;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
        ctx.globalAlpha = 1;
        gtx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    };

    /* Scroll progress of the whole section: 0 at the top, 1 after 70% of a screen */
    const onScroll = () => {
      if (!scrollScatter || !outerRef.current) return;
      const r = outerRef.current.getBoundingClientRect();
      s.scrollP = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.7)));
      setCopy();
    };

    const move = (e) => {
      const r = stage.getBoundingClientRect();
      s.mouse.x = e.clientX - r.left;
      s.mouse.y = e.clientY - r.top;
      s.mouse.on = true;
      spotRef.current?.style.setProperty("--x", `${s.mouse.x}px`);
      spotRef.current?.style.setProperty("--y", `${s.mouse.y}px`);
    };

    const leave = () => {
      s.mouse.on = false;
    };

    let rt = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        build();
        s.t0 = performance.now() - 3000;
      }, 150);
    });

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 }
    );

    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });

    // Start immediately on frame 0 without blocking on font network requests
    restart();
    onScroll();
    ro.observe(stage);
    io.observe(stage);
    raf = requestAnimationFrame(frame);

    // If web fonts finish loading later, smoothly re-sample text coordinates
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!alive) return;
        build();
      });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(readyTimer);
      window.clearTimeout(rt);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [headline, fontFamily, fontWeight, grid, scrollScatter, scrollHint]);

  const fade = `transition-[opacity,transform] duration-300 ease-out ${
    ready ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
  }`;

  return (
    <section
      ref={outerRef}
      className={`relative w-full ${scrollScatter ? "" : "h-[100svh] min-h-[560px]"} bg-[#040814] text-white ${className}`}
      style={{
        height: scrollScatter ? "calc(100svh + 90vh)" : undefined,
        ...style,
      }}
      {...rest}
    >
      <div
        ref={stageRef}
        className={`group w-full overflow-hidden ${
          scrollScatter
            ? "sticky top-0 h-[100svh] min-h-[560px]"
            : "relative h-full w-full"
        }`}
        style={{ fontFamily }}
      >
        {/* Glow & Dots Canvases */}
        <canvas
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60 mix-blend-screen blur-[10px]"
        />
        <canvas
          ref={dotsRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />

        {/* Dynamic Cursor Light Spotlight */}
        <div
          ref={spotRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at var(--x, 50%) var(--y, 40%), rgba(0, 180, 255, 0.16), transparent 70%)`,
          }}
        />

        {/* Screen Reader Accessible Heading */}
        <h1 className="sr-only">{headline}</h1>

        {/* Overlay Content (Eyebrow, Description & Actions) */}
        <div ref={copyRef} className="pointer-events-none absolute inset-0">
          {eyebrow && (
            <div
              className={`absolute inset-x-0 top-[8vh] sm:top-[10vh] flex justify-center px-4 ${fade}`}
            >
              <span className="inline-flex h-[32px] items-center gap-2 rounded-full border border-[#2E7BFF]/35 bg-[#0A1530]/80 px-3.5 text-[12px] sm:text-[13px] font-bold tracking-wider text-[#CBD5E1] backdrop-blur-md shadow-[0_0_15px_rgba(0,180,255,0.2)]">
                <i
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: accent,
                    boxShadow: `0 0 10px ${accent}`,
                  }}
                />
                {eyebrow}
              </span>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-8 sm:pb-12 md:pb-14 text-center">
            {description && (
              <p
                className={`m-0 max-w-[640px] text-sm sm:text-base md:text-[17px] leading-relaxed sm:leading-[26px] text-[#CBD5E1] ${fade} delay-100 font-sans`}
              >
                {description}
              </p>
            )}

            {actions && (
              <div
                className={`pointer-events-auto mt-5 sm:mt-6 flex flex-wrap justify-center gap-3 ${fade} delay-200`}
              >
                {actions}
              </div>
            )}
          </div>
        </div>

        {/* Scroll To Scatter / Gather Hint */}
        {scrollScatter && scrollHint && (
          <div
            ref={hintRef}
            aria-hidden="true"
            data-up="false"
            className="group/hint pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-[#CBD5E1] opacity-0 transition-opacity duration-700"
          >
            <div className="relative h-[34px] w-[22px] rounded-[11px] border-[1.5px] border-white/30 transition-transform duration-500 group-data-[up=true]/hint:rotate-180">
              <span
                className="absolute left-1/2 top-[7px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm motion-safe:animate-[dotfield-wheel_1.8s_cubic-bezier(.6,0,.3,1)_infinite]"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
              />
            </div>
            <span ref={hintLabelRef}>{scrollHint.scatter}</span>
          </div>
        )}

        <style>{`@keyframes dotfield-wheel{0%{transform:translateY(0);opacity:0}20%{opacity:1}70%{transform:translateY(10px);opacity:0}100%{opacity:0}}`}</style>
      </div>
    </section>
  );
});

export default DotField;
