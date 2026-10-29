import { useState, useEffect, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

const testimonials = [
  {
    id: 1,
    quote: "UPLIFT engineered a complete WebGL showcase and multi-touch search funnel for our autonomous mobility fleet. Enterprise demo bookings surged by 340% in our first quarter.",
    author: "Sarah Chen",
    role: "VP of Growth at Apex Pulse Autonomous",
    company: "Apex Pulse Autonomous",
    metric: "+340% Enterprise Demos",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 2,
    quote: "Our ultra-luxury resorts were hemorrhaging 22% in third-party OTA commissions. UPLIFT redesigned our digital booking experience and generated $42M in direct HNW reservations.",
    author: "Marcus Vance",
    role: "Chief Marketing Officer at Solace Luxury Resorts",
    company: "Solace Luxury Resorts",
    metric: "$42M Direct Bookings",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 3,
    quote: "The programmatic SEO and medical schema architecture built by UPLIFT captured 1.2M active patients. We achieved #1 Google rankings for 85 high-intent clinical diagnostic terms.",
    author: "Dr. Aris Thorne",
    role: "Head of Product at NovaHealth Platform",
    company: "NovaHealth Platform",
    metric: "1.2M Active Patients",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 4,
    quote: "A true masterclass in private wealth client acquisition. Their full-funnel strategy helped us scale institutional AUM to $4.8B while reducing customer acquisition costs by 45%.",
    author: "Elena Rostova",
    role: "Managing Director at Vantage Private Wealth",
    company: "Vantage Private Wealth",
    metric: "$4.8B AUM Scaled",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 5,
    quote: "6.8X DTC return on ad spend during our flagship audio launch. The interactive 3D spatial acoustic visualizer blew our competitors completely out of the water.",
    author: "Julian Kroma",
    role: "Founder & CEO at Kroma Studio Sound",
    company: "Kroma Studio Sound",
    metric: "6.8X DTC Ad ROAS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 6,
    quote: "Their virtual 3D fitting room and Paris Fashion Week digital campaign boosted our average order value by +280%. The attention to luxury craft is unmatched in the agency world.",
    author: "Claire Beauchamp",
    role: "Brand Director at Atelier Haute Couture",
    company: "Atelier Haute Couture",
    metric: "+280% Average Order Value",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 7,
    quote: "Enterprise CISOs ignore generic marketing fluff. UPLIFT created a live interactive threat simulation demo that booked 42% of all Fortune 500 security leaders who visited.",
    author: "David Lindqvist",
    role: "CISO & VP Marketing at Cobalt Cyber",
    company: "Cobalt Cyber Defense",
    metric: "42% CISO Meeting Rate",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 8,
    quote: "They took our 9-month industrial sales cycle and compressed it to 4 months through interactive 3D machinery tours and targeted LinkedIn Account-Based Marketing.",
    author: "Soren Miller",
    role: "Head of Commercial at Prism Spatial",
    company: "Prism Spatial Architecture",
    metric: "4.2X Factory Throughput",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 9,
    quote: "Sub-second MDX documentation and programmatic developer SEO drove 1.2M engineers to our cloud compute cluster. UPLIFT understands developer-first acquisition deeply.",
    author: "Priya Nair",
    role: "VP of Developer Relations at Orbit Cloud",
    company: "Orbit Cloud Infrastructure",
    metric: "1.2M Monthly Devs",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 10,
    quote: "Our Swiss private client timepiece release sold out in under 48 hours, grossing $18M. The headless checkout load speed and VIP exclusivity funnel were flawless.",
    author: "Henri Geneve",
    role: "Master Watchmaker at Aura Haute Horlogerie",
    company: "Aura Haute Horlogerie",
    metric: "$18M Sold-Out Drop",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 11,
    quote: "We contracted 2.4 GWh of utility battery storage. UPLIFT's multi-stakeholder energy portal and regulatory search marketing positioned us as the undisputed market leader.",
    author: "Mateo Silva",
    role: "Director of CleanTech at Zenith Power",
    company: "Zenith Renewable Power",
    metric: "2.4 GWh Storage Contracts",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 12,
    quote: "Inbound freight quote inquiries jumped +390%. The interactive 3D globe container tracker proved to be the single most effective conversion tool our sales team ever had.",
    author: "Amara O'Connor",
    role: "VP Global Operations at Velox Freight",
    company: "Velox Logistics Network",
    metric: "+390% Quote Inquiries",
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 13,
    quote: "From local medical offices to a nationally recognized cosmetic dermatology authority with 850,000 monthly unique readers. Our treatment books are filled 6 months out.",
    author: "Dr. Camille Laurent",
    role: "Founder at Lumina Clinical Dermatology",
    company: "Lumina Dermatology",
    metric: "850K Monthly Readers",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 14,
    quote: "Over 120,000 daily active software teams onboarded through UPLIFT's product-led growth video engine. Their short-form content execution consistently went viral on LinkedIn.",
    author: "Zachary Bloom",
    role: "VP Product Marketing at Novus AI Copilot",
    company: "Novus AI Copilot",
    metric: "120K Active Teams",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 15,
    quote: "+520% direct-to-consumer volume growth across 24 states. Their cinematic botanical video campaigns brought our distillation story to life in a way traditional agencies couldn't.",
    author: "Harrison Cross",
    role: "Founder & Master Distiller at Elysian Spirits",
    company: "Elysian Fine Spirits",
    metric: "+520% DTC Volume",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 16,
    quote: "Deep tech requires both extreme precision and inspiring storytelling. UPLIFT designed an 18ms neural latency visualizer that proved pivotal during our $28M Series B round.",
    author: "Maya Lin",
    role: "Co-Founder & CTO at Synapse NeuroTech",
    company: "Synapse NeuroTech",
    metric: "$28M Series B Funded",
    avatar: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 17,
    quote: "UPLIFT architected our proprietary M&A deal sourcing platform, originating over $12B in high-margin middle-market transaction pipeline. The ROI has been monumental.",
    author: "Christian Becker",
    role: "Managing Partner at Crestview Capital",
    company: "Crestview Capital Partners",
    metric: "$12B M&A Pipeline",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 18,
    quote: "Customer retention increased by +310%, and our technical alpine hardshell sold out completely in 72 hours. UPLIFT's paid TikTok funnels are the best in the industry.",
    author: "Talia Brooks",
    role: "VP of Brand at Terra Outdoor Equipment",
    company: "Terra Outdoor Equipment",
    metric: "+310% Retention Rate",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote);
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role);
  const [displayedMetric, setDisplayedMetric] = useState(testimonials[0].metric);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleSelect = useCallback(
    (index) => {
      if (index === activeIndex || isAnimating) return;
      setIsAnimating(true);

      setTimeout(() => {
        setDisplayedQuote(testimonials[index].quote);
        setDisplayedRole(testimonials[index].role);
        setDisplayedMetric(testimonials[index].metric);
        setActiveIndex(index);
        setTimeout(() => setIsAnimating(false), 380);
      }, 180);
    },
    [activeIndex, isAnimating]
  );

  const handleStep = useCallback(
    (dir) => {
      const nextIdx = (activeIndex + dir + testimonials.length) % testimonials.length;
      handleSelect(nextIdx);
    },
    [activeIndex, handleSelect]
  );

  // Gentle autoplay every 6.5 seconds when user is not hovering
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleStep(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, handleStep]);

  const padNum = (num) => (num < 10 ? `0${num}` : String(num));

  return (
    <section
      id="testimonials-section"
      className="site-section bg-gradient-to-b from-[#040814] via-[#060D24] to-[#040814] text-white relative overflow-hidden py-16 sm:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.16)_0%,rgba(46,123,255,0.08)_45%,transparent_75%)] blur-[100px] pointer-events-none z-0" />

      <div className="site-container relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3.5 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE TESTIMONIALS (18 VERIFIED CLIENTS)</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            TRUSTED BY <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">INDUSTRY LEADERS</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] mt-3 max-w-2xl mx-auto leading-relaxed">
            Over 180+ global brands scaled. Hear directly from the founders, CMOs, and growth leaders who trust UPLIFT with their market dominance.
          </p>
        </div>

        {/* Wide Open Testimonials Display (Borderless, Fluid & Spacious) */}
        <div className="w-full flex flex-col items-center">
          {/* Quote Container with Ambient Typography Marks */}
          <div className="relative w-full max-w-5xl px-6 sm:px-14 md:px-20 py-4">
            <Quote className="absolute -left-1 sm:left-2 -top-6 sm:-top-8 w-12 sm:w-16 h-12 sm:h-16 text-[#00B4FF]/15 select-none pointer-events-none transform -scale-x-100" />

            <p
              className={cn(
                "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-relaxed tracking-tight transition-all duration-400 ease-out min-h-[110px] sm:min-h-[130px] flex items-center justify-center font-['Cinzel'] [text-wrap:balance]",
                isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100"
              )}
            >
              &ldquo;{displayedQuote}&rdquo;
            </p>

            <Quote className="absolute -right-1 sm:right-2 -bottom-6 sm:-bottom-8 w-12 sm:w-16 h-12 sm:h-16 text-[#00B4FF]/15 select-none pointer-events-none" />
          </div>

          {/* Role, Company & Verified Metric Pill */}
          <div className="flex flex-col items-center gap-3 mt-6 sm:mt-8">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1530] border border-[#00B4FF]/40 text-[#00B4FF] text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all duration-400 ease-out",
                isAnimating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
              )}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#00B4FF]" />
              <span>{displayedMetric}</span>
            </div>

            <p
              className={cn(
                "text-xs sm:text-sm text-[#CBD5E1] tracking-[0.25em] uppercase font-bold text-center transition-all duration-400 ease-out",
                isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}
            >
              {displayedRole}
            </p>
          </div>

          {/* Wide Avatar Pill Row (18 DM Clients) */}
          <div className="w-full mt-10 sm:mt-12 flex flex-col items-center gap-6">
            {/* Avatars flex-wrap container - Wide, centered, completely visible and responsive */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto px-2">
              {testimonials.map((t, index) => {
                const isActive = activeIndex === index;
                const isHovered = hoveredIndex === index && !isActive;
                const showName = isActive || isHovered;

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "relative flex items-center gap-0 rounded-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive
                        ? "bg-gradient-to-r from-[#00B4FF] to-[#38bdf8] text-[#040814] shadow-[0_0_25px_rgba(0,180,255,0.55)] scale-105"
                        : "bg-[#0A1530]/80 hover:bg-[#0A1530] text-white border border-white/10 hover:border-[#00B4FF]/40",
                      showName ? "pr-3.5 pl-1.5 py-1.5" : "p-1"
                    )}
                    aria-label={`Select ${t.author}`}
                  >
                    {/* Avatar with Ring */}
                    <div className="relative shrink-0">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
                          isActive ? "ring-2 ring-white/80 scale-105" : "ring-1 ring-white/10",
                          !isActive && "hover:scale-105"
                        )}
                      />
                    </div>

                    {/* Expandable Author Name */}
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <span
                          className={cn(
                            "text-xs sm:text-sm font-bold whitespace-nowrap block transition-colors duration-200",
                            isActive ? "text-[#040814]" : "text-white"
                          )}
                        >
                          {t.author}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls Row: Prev Button, Counter, Next Button */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                className="w-10 h-10 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                aria-label="Previous Testimonial"
                title="Previous Client"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[#CBD5E1] px-4 py-1.5 rounded-full bg-[#0A1530]/80 border border-white/10 shadow-sm">
                <span className="text-[#00B4FF] font-bold">{padNum(activeIndex + 1)}</span>
                <span className="text-white/30">/</span>
                <span>{padNum(testimonials.length)} Clients</span>
              </div>

              <button
                type="button"
                onClick={() => handleStep(1)}
                className="w-10 h-10 rounded-full bg-[#0A1530] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                aria-label="Next Testimonial"
                title="Next Client"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
