import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { content } from "../../data/content";

export default function Navbar({ isScrolled = false, miniBadgeText = "" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services-section" },
    { label: "About", href: "#about-section" },
    { label: "Experience", href: "#experience-section" },
    { label: "Projects", href: "#projects-section" },
    { label: "FAQ", href: "#faq-section" },
    { label: "Contact", href: "#contact-section" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#040814]/85 backdrop-blur-xl border-b border-[#2E7BFF]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Pinned Badge */}
        <a
          href="#intro-section"
          className="flex items-center gap-3 group text-white text-decoration-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7BFF] to-[#00B4FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,180,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,180,255,0.8)] transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Cinzel'] text-xl md:text-2xl font-black tracking-widest text-white uppercase group-hover:text-[#00B4FF] transition-colors">
              {content.brand.name}
            </span>
            {miniBadgeText && (
              <span className="text-[10px] tracking-wider text-[#00B4FF] uppercase font-semibold hidden sm:inline-block">
                {miniBadgeText}
              </span>
            )}
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 bg-[#0a1530]/60 px-6 py-2 rounded-full border border-[#2E7BFF]/20 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#CBD5E1] hover:text-white transition-colors relative py-1 hover:drop-shadow-[0_0_8px_rgba(0,180,255,0.6)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact-section"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF] hover:from-[#00B4FF] hover:to-[#2E7BFF] transition-all duration-300 shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:shadow-[0_0_30px_rgba(0,180,255,0.8)] hover:scale-105"
          >
            <span>Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-[#0a1530] border border-[#2E7BFF]/30 hover:border-[#00B4FF] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#040814]/95 border-b border-[#2E7BFF]/25 backdrop-blur-2xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#CBD5E1] hover:text-[#00B4FF] py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2E7BFF] to-[#00B4FF]"
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
