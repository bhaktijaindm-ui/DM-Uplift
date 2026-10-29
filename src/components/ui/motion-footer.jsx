"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;600&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables */
  --pill-bg-1: rgba(212, 175, 55, 0.05);
  --pill-bg-2: rgba(112, 66, 180, 0.05);
  --pill-border: rgba(212, 175, 55, 0.2);
  --gold-glow: rgba(212, 175, 55, 0.3);
}

.footer-heading {
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@keyframes footer-star-twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.footer-star {
  position: absolute;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  animation: footer-star-twinkle var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(212, 175, 55, 0.15) 0%, 
    rgba(112, 66, 180, 0.15) 40%, 
    transparent 70%
  );
}

.footer-text-glow {
  background: linear-gradient(180deg, #fff 0%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 15px rgba(212, 175, 55, 0.4));
}

.footer-glass-pill {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
}

.footer-glass-pill:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.5);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------

const MagneticButton = React.forwardRef(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const StarField = () => {
  const [stars, setStars] = React.useState([]);
  
  React.useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="footer-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            '--delay': star.delay,
            '--duration': star.duration,
          }}
        />
      ))}
    </div>
  );
};

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Digital Alignment</span> <span className="text-primary/60">✦</span>
    <span>Astrology Marketing</span> <span className="text-secondary/60">✦</span>
    <span>Cosmic Reach</span> <span className="text-primary/60">✦</span>
    <span>Client Growth</span> <span className="text-secondary/60">✦</span>
    <span>Celestial Impact</span> <span className="text-primary/60">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-footer-wrapper">
          
          {/* Ambient Light, Stars & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <StarField />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-white/5 footer-heading"
          >
            COSMIC
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black footer-text-glow tracking-tighter mb-10 text-center text-white w-full footer-heading"
            >
              Ready to begin?
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-12 w-full max-w-6xl">
              {/* Primary Actions */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as="a" href="#" className="footer-glass-pill px-12 py-6 rounded-full text-white font-bold text-base md:text-lg flex items-center gap-3 group">
                  Book Free Consultation
                </MagneticButton>
              </div>

              {/* Standard Footer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-4 border-t border-white/10 pt-10 text-left">
                {/* Left Side: Info & Contact */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                      <span className="text-primary">✨</span> CosmicReach
                    </h3>
                    <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
                      Elevating spiritual practices through targeted digital marketing. We align your online presence with your cosmic purpose, bringing the right clients into your orbit.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 text-sm text-white/80">
                    <a href="mailto:hello@cosmicreach.com" className="flex items-center gap-3 hover:text-white transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      hello@cosmicreach.com
                    </a>
                    <a href="tel:+18001234567" className="flex items-center gap-3 hover:text-white transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>

                {/* Right Side: Dashboards */}
                <div className="flex flex-col md:items-end gap-4">
                  <h3 className="text-lg font-bold text-white mb-2">Our Dashboards</h3>
                  <nav className="flex flex-col gap-3 md:items-end">
                    <a href="/astrologydashboard/home" className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                      Astrology Dashboard
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </a>
                    <a href="/educationdashboard" className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                      Education Dashboard
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </a>
                    <a href="/doctordashboard" className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                      Doctor Dashboard
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </a>
                    <a href="/dmdashboard" className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                      DM Dashboard
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-white/60 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © 2026 CosmicReach Marketing. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/20">
              <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-red-500">❤</span>
              <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">Volvox</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-white/60 hover:text-white group order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
