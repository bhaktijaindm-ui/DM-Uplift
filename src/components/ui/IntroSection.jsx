import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import ParticleTextEffect from "./ParticleTextEffect";
import { content } from "../../data/content";

export default function IntroSection() {
  const introContainerRef = useRef(null);
  const particleBoxRef = useRef(null);

  return (
    <section
      id="intro-section"
      ref={introContainerRef}
      className="site-section bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] flex flex-col items-center justify-center select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.12)_0%,transparent_65%)] pointer-events-none z-0" />

      {/* Ambient Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="site-container relative z-10 flex flex-col items-center justify-center">
        {/* Main Interactive Particle Box (centered, equal padding around text) */}
        <div
          ref={particleBoxRef}
          className="relative w-full max-w-5xl min-h-[50vh] sm:min-h-[55vh] flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl bg-[#0A1530]/40 border border-[#2E7BFF]/25 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(0,180,255,0.12)]"
        >
          <div className="w-full flex items-center justify-center">
            <ParticleTextEffect text={content.intro.welcomeWords[0] || "Hello, Welcome to Uplift"} />
          </div>
        </div>

        {/* Scroll Down Indicator placed clearly below the box with 32px spacing (mt-8) */}
        <div className="mt-8 flex flex-col items-center gap-2 cursor-pointer pointer-events-none select-none">
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#CBD5E1]">
            {content.intro.hint || "Scroll down to explore"}
          </span>
          <ChevronDown className="w-4 h-4 text-[#00B4FF] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
