import { useEffect, useRef } from "react";
import "./ParticleTextEffect.css";

/**
 * ParticleTextEffect
 * High-resolution canvas-sampled particle text effect.
 * Key properties:
 * - Letters are sharp, crisp, and fully formed.
 * - Particles REST on the text by default so words are readable immediately (<1s).
 * - Multi-line responsive rendering ("Hello," / "Welcome to Uplift" on mobile).
 * - Gentle mouse push (radius ~60px) with fast spring return.
 * - Zero chaotic swirling vortex; high contrast white & light neon-blue.
 * - Pauses when off-screen to preserve battery and maintain 60fps.
 */
export function ParticleTextEffect({ text = "Hello, Welcome to Uplift" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 340;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initCanvas = () => {
      width = Math.max(300, container.clientWidth || 900);
      height = Math.max(220, container.clientHeight || 320);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      buildTextParticles();
    };

    const buildTextParticles = () => {
      // Offscreen canvas for precise sampling
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const isMobile = width < 720;
      let lines;
      let fontSize;
      let lineHeight;

      if (isMobile) {
        // Split on two lines on mobile
        lines = ["Hello,", "Welcome to Uplift"];
        fontSize = Math.max(32, Math.min(width * 0.09, 48));
        lineHeight = fontSize * 1.35;
      } else if (width < 960) {
        lines = ["Hello,", "Welcome to Uplift"];
        fontSize = Math.max(46, Math.min(width * 0.075, 66));
        lineHeight = fontSize * 1.3;
      } else {
        lines = [text];
        fontSize = Math.min(74, Math.max(48, width * 0.065));
        lineHeight = fontSize * 1.2;
      }

      offCtx.font = `800 ${fontSize}px "Cinzel", "Plus Jakarta Sans", sans-serif`;

      const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, index) => {
        offCtx.fillText(line, width / 2, startY + index * lineHeight);
      });

      // Sample pixels: larger step on mobile reduces particle count for 60fps
      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const sampleStep = isMobile ? 3 : 2;
      const newParticles = [];

      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 125) {
            const rand = Math.random();
            let color;
            if (rand < 0.65) {
              color = "rgb(255, 255, 255)"; // Crisp white
            } else if (rand < 0.88) {
              color = "rgb(191, 230, 255)"; // Light neon-blue (#BFE6FF)
            } else {
              color = "rgb(0, 180, 255)"; // Accent neon-blue (#00B4FF)
            }

            // REST on the text by default: spawn directly at target
            newParticles.push({
              x: x,
              y: y,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              radius: isMobile ? 1.4 : Math.random() < 0.2 ? 1.8 : 1.4,
              color: color,
            });
          }
        }
      }

      particlesRef.current = newParticles;
    };

    // Render loop with gentle mouse push and spring physics
    const render = () => {
      if (!isVisibleRef.current) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#040814";
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const pushRadius = 60; // Gentle push radius ~60px
      const pushRadiusSq = pushRadius * pushRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse displacement
        if (mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < pushRadiusSq) {
            const dist = Math.sqrt(distSq) + 0.001;
            const force = (1 - dist / pushRadius) * 4.0;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Fast spring back to target
        const springX = (p.targetX - p.x) * 0.14;
        const springY = (p.targetY - p.y) * 0.14;

        p.vx = (p.vx + springX) * 0.78;
        p.vy = (p.vy + springY) * 0.78;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    initCanvas();
    render();

    // Event listeners
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleResize = () => {
      initCanvas();
    };

    // Pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!animationRef.current) {
            render();
          }
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="particle-container w-full h-full min-h-[240px] md:min-h-[320px] flex items-center justify-center relative select-none"
    >
      <canvas
        ref={canvasRef}
        className="particle-canvas block mx-auto pointer-events-auto"
      />
    </div>
  );
}

export default ParticleTextEffect;
