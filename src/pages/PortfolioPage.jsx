import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IntroSection from "../components/ui/IntroSection";
import HeroSection from "../components/ui/HeroSection";
import ServicesSection from "../components/ui/ServicesSection";
import AboutSection from "../components/ui/AboutSection";
import ExperienceSection from "../components/ui/ExperienceSection";
import ProjectsSection from "../components/ui/ProjectsSection";
import CTASection from "../components/ui/CTASection";
import FAQFormSection from "../components/ui/FAQFormSection";
import ContactSection from "../components/ui/ContactSection";
import HalftoneWordmarkFooter from "../components/ui/HalftoneWordmarkFooter";
import { content } from "../data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  // Initialize Lenis smooth scroll and connect to GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Call ScrollTrigger.refresh after fonts/images load
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#040814] text-white selection:bg-[#00B4FF] selection:text-[#040814] overflow-x-hidden">
      {/* 
        1. INTRO / WELCOME (Full screen)
        Text: "Hello, Welcome to Uplift"
        Sharp high-contrast canvas text, gentle push radius, smooth fade on first scroll
      */}
      <IntroSection />


      {/* 
        2. HERO BANNER (Compact)
        Short punchy headline, one-line subtext, 2 buttons, 3D floating elements with mouse parallax
      */}
      <HeroSection />

      {/* 
        3. OUR SERVICES
        3D interactive layout: list on one side, 3D rotating stack of image cards on the other
      */}
      <ServicesSection />

      {/* 
        4. ABOUT US
        Who we are, mission, 4 animated metric counters, 3D tilt cards
      */}
      <AboutSection />

      {/* 
        5. EXPERIENCE (Isolated placeholder timeline section)
        Scroll-based timeline ready for custom timeline code replacement
      */}
      <ExperienceSection />

      {/* 
        6. OUR PROJECTS (3D showcase)
        Tilt cards with depth & parallax, video loops on hover, category tags, result metrics
      */}
      <ProjectsSection />

      {/* 
        7. CTA SECTION
        Maintains the existing site layout and elegance, updated to navy/white theme
      */}
      <CTASection />

      {/* 
        8. ANY QUESTIONS? (FAQ + FORM)
        Left: Accordion FAQ (6 real digital marketing questions)
        Right: Inquiry form with neon-blue glow, validation, and success message
      */}
      <FAQFormSection />

      {/* 
        9. CONTACT DETAILS
        Email, phone, address, and social links in glass cards with hover glow
      */}
      <ContactSection />

      {/* 
        10. FOOTER (Halftone Wordmark Animation)
        Brand wordmark "UPLIFT" sitting higher, neon blue & white with warm gradient
      */}
      <HalftoneWordmarkFooter
        wordmark={content.footer.wordmark}
        label={content.footer.label}
        meta={content.footer.meta}
        columns={content.footer.columns}
      />
    </div>
  );
}
