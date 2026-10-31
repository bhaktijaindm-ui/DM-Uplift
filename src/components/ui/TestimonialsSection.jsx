import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

const testimonials = [
  {
    id: 1,
    quote: "Bhakti transformed CarGuroo's organic search performance across Australia. Month-over-month conversions skyrocketed by +120.83% and clicks increased by +45.39%, delivering tangible customer calls and quote requests.",
    author: "Leadership Team",
    role: "Managing Director at CarGuroo Australia",
    company: "CarGuroo Australia",
    metric: "+120.8% MoM Conversions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 2,
    quote: "With over 1,100 high-quality backlinks, 91 referring domains, and an SEO health score of 97/100, Bhakti established Foodbiz as Melbourne's top-ranked commercial kitchen and hospitality equipment authority.",
    author: "Client Management",
    role: "Director of Operations at Foodbiz Melbourne",
    company: "Foodbiz Melbourne",
    metric: "97/100 SEO Score · 1.1K Backlinks",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 3,
    quote: "Bhakti custom-developed my medical website on WordPress and executed localized SEO campaigns that filled our appointment schedule with surgical consultations.",
    author: "Dr. Vishal Yadav",
    role: "Lead Surgeon & Consultant at Dr. Vishal Yadav Clinic",
    company: "Dr. Vishal Yadav Clinic",
    metric: "100% Custom Medical CMS & SEO",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 4,
    quote: "Medilenz gained dramatic US search visibility through Bhakti's technical SEO and keyword optimization, boosting clicks by +73.74% (198 to 344) and hitting rank 1-3 across California for critical litigation services.",
    author: "Executive Team",
    role: "VP of Business Development at Medilenz US",
    company: "Medilenz US",
    metric: "+73.7% Clicks · Rank 1-3 CA",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 5,
    quote: "Bhakti's targeted educational SEO propelled Morning Star to the #1 Google ranking in Ratlam for school admissions, nursery, and CBSE searches, dramatically expanding inquiries for the academic session.",
    author: "Administration Board",
    role: "Head of Admissions at Morning Star School",
    company: "Morning Star Senior Secondary School",
    metric: "#1 School Ranking in Ratlam",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 6,
    quote: "From comprehensive keyword mapping to technical meta schemas, Bhakti's organic strategies positioned Vijay Mantra at the forefront of digital educational searches, driving sustained organic inquiries.",
    author: "Leadership Team",
    role: "Founder & Director at Vijay Mantra",
    company: "Vijay Mantra",
    metric: "Top Tier Organic Inquiries",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 7,
    quote: "As SEO Lead, Bhakti restructured our international client acquisition engine and technical site hierarchy, delivering measurable surges in qualified overseas sales inquiries.",
    author: "Executive Board",
    role: "CEO at Valiun Venture IT Company",
    company: "Valiun Venture IT Company",
    metric: "Global Enterprise Search Reach",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 8,
    quote: "Bhakti crafted a bespoke, high-converting digital presence and scrapbook visual architecture that elevated our heritage retail reach and consumer engagement.",
    author: "Retail Leadership",
    role: "Brand Director at Nathu Mal Sons",
    company: "Nathu Mal Sons",
    metric: "Premium Scrapbook & Web Launch",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 9,
    quote: "Our Shopify direct-to-consumer store was built and optimized with blazing-fast checkout flows, mobile responsiveness, and targeted social product video funnels by Bhakti.",
    author: "E-Commerce Team",
    role: "Founder at ClawKit DTC",
    company: "ClawKit DTC",
    metric: "Shopify DTC Custom Build",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 10,
    quote: "Bhakti's WordPress CMS optimizations and structured local search strategy established Seven Hills at top regional search rankings, producing steady weekly bookings.",
    author: "Hospitality Management",
    role: "General Manager at Seven Hills Resort",
    company: "Seven Hills Resort",
    metric: "Top 3 Regional Positions",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 11,
    quote: "Our sports facility booking platform saw an immediate uplift in youth registrations and venue bookings following Bhakti's site speed improvements and local sports SEO.",
    author: "Sports Management",
    role: "Facility Director at Venus Sports Arena",
    company: "Venus Sports Arena",
    metric: "Local Sports Search Dominance",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 12,
    quote: "Patient trust and localized clinical discovery reached new heights with Bhakti's healthcare schema implementation and patient-centric web navigation architecture.",
    author: "Clinical Directorate",
    role: "Head of Patient Care at AIIM Hospital",
    company: "Asian Infertility Institute & Medical",
    metric: "High-Intent Patient Inquiries",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 13,
    quote: "Ranked #1 on Google India for '2022-23 10 latest astronomical telescope' across 21 target keywords. Bhakti's long-form editorial SEO and on-page authority strategy achieved unbelievable visibility.",
    author: "Editorial Team",
    role: "Editor-in-Chief at Microadia",
    company: "Microadia Network",
    metric: "#1 Google India Ranking · 21 Keywords",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 14,
    quote: "With over 2,980 verified directory and high-authority backlink submissions, Bhakti built our domain rating and continuous daily search volume from the ground up.",
    author: "Platform Founders",
    role: "Product Lead at Prashna Kundli",
    company: "Prashna Kundli",
    metric: "2,980+ Verified Backlinks Engine",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 15,
    quote: "Bhakti developed a fast commercial cleaning portal and implemented localized suburban SEO across Australia, converting commercial search traffic into weekly service contracts.",
    author: "Operations Management",
    role: "Operations Director at InfoClean Australia",
    company: "InfoClean Australia",
    metric: "High-Converting B2B Service Leads",
    avatar: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 16,
    quote: "Targeted digital marketing funnels and conversion-optimized landing pages designed by Bhakti enabled Xgrow to expand its corporate service pipeline across major metro regions.",
    author: "Growth Directorate",
    role: "Managing Partner at Xgrow Australia",
    company: "Xgrow Australia",
    metric: "Scaled B2B Acquisition Engine",
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 17,
    quote: "From ergonomic product positioning to orthopedic schema and high-ranking health keywords, Bhakti expanded our posture-care e-commerce customer base nationwide.",
    author: "Brand Management",
    role: "Head of Marketing at SpineMat",
    company: "SpineMat",
    metric: "National E-Commerce Reach",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80",
  },
  {
    id: 18,
    quote: "Bhakti demonstrated exceptional versatility across full-funnel digital marketing, technical CMS implementations, and multi-client organic campaigns during her tenure with us.",
    author: "Technical Leadership",
    role: "Managing Director at Xcoders Pvt. Ltd.",
    company: "Xcoders Pvt. Ltd.",
    metric: "Full-Funnel Organic Strategy",
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
  const scrollTrackRef = useRef(null);

  const isInitialMount = useRef(true);

  // Auto-scroll ONLY the horizontal avatar track into center view without scrolling the window
  useEffect(() => {
    // Guard against running on initial mount to keep page firmly at top
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const track = scrollTrackRef.current;
    if (!track) return;
    const activeBtn = track.querySelector(`[data-index="${activeIndex}"]`);
    if (activeBtn) {
      // Calculate horizontal offset strictly inside the track container
      const scrollLeft =
        activeBtn.offsetLeft - track.clientWidth / 2 + activeBtn.clientWidth / 2;
      track.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [activeIndex]);

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

        {/* Floating Testimonial Wide Card Box */}
        <div className="max-w-5xl lg:max-w-6xl w-full mx-auto rounded-3xl p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#0A1530]/85 via-[#060F2B]/90 to-[#040814]/95 border border-[#2E7BFF]/35 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(0,180,255,0.16)] flex flex-col items-center relative overflow-hidden">
          {/* Inner ambient card glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[radial-gradient(circle,rgba(0,180,255,0.18)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

          {/* Quote Container with Ambient Typography Marks */}
          <div className="relative w-full max-w-4xl px-4 sm:px-12 md:px-16 py-2">
            <Quote className="absolute -left-1 sm:left-2 -top-6 sm:-top-8 w-10 sm:w-14 h-10 sm:h-14 text-[#00B4FF]/18 select-none pointer-events-none transform -scale-x-100" />

            <p
              className={cn(
                "text-lg sm:text-xl md:text-2xl lg:text-[28px] font-light text-white text-center leading-relaxed tracking-tight transition-all duration-400 ease-out min-h-[90px] sm:min-h-[110px] flex items-center justify-center font-['Cinzel'] [text-wrap:balance]",
                isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100"
              )}
            >
              &ldquo;{displayedQuote}&rdquo;
            </p>

            <Quote className="absolute -right-1 sm:right-2 -bottom-6 sm:-bottom-8 w-10 sm:w-14 h-10 sm:h-14 text-[#00B4FF]/18 select-none pointer-events-none" />
          </div>

          {/* Role, Company & Verified Metric Pill */}
          <div className="flex flex-col items-center gap-2.5 mt-5 sm:mt-7">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#040814]/80 border border-[#00B4FF]/40 text-[#00B4FF] text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all duration-400 ease-out backdrop-blur-md",
                isAnimating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
              )}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#00B4FF]" />
              <span>{displayedMetric}</span>
            </div>

            <p
              className={cn(
                "text-xs sm:text-sm text-[#CBD5E1] tracking-[0.22em] uppercase font-bold text-center transition-all duration-400 ease-out",
                isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}
            >
              {displayedRole}
            </p>
          </div>

          {/* Wide Avatar Pill Row (18 DM Clients) */}
          <div className="w-full mt-8 sm:mt-10 flex flex-col items-center gap-5">
            {/* Scrollable / Centered Avatars Track */}
            <div
              ref={scrollTrackRef}
              className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto py-2 px-2 max-w-full scrollbar-none scroll-smooth justify-start md:justify-center w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((t, index) => {
                const isActive = activeIndex === index;
                const isHovered = hoveredIndex === index && !isActive;
                const showName = isActive || isHovered;

                return (
                  <button
                    key={t.id}
                    data-index={index}
                    type="button"
                    onClick={() => handleSelect(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "relative flex items-center gap-0 rounded-full cursor-pointer shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive
                        ? "bg-gradient-to-r from-[#00B4FF] to-[#38bdf8] text-[#040814] shadow-[0_0_25px_rgba(0,180,255,0.55)] scale-105"
                        : "bg-[#040814]/80 hover:bg-[#0A1530] text-white border border-white/10 hover:border-[#00B4FF]/40",
                      showName ? "pr-3.5 pl-1.5 py-1.5" : "p-1"
                    )}
                    aria-label={`Select ${t.author}`}
                  >
                    {/* Avatar with Ring */}
                    <div className="relative shrink-0">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        loading="lazy"
                        decoding="async"
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
            <div className="flex items-center justify-center gap-4 mt-1">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#040814] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                aria-label="Previous Testimonial"
                title="Previous Client"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[#CBD5E1] px-4 py-1.5 rounded-full bg-[#040814]/80 border border-white/10 shadow-sm">
                <span className="text-[#00B4FF] font-bold">{padNum(activeIndex + 1)}</span>
                <span className="text-white/30">/</span>
                <span>{padNum(testimonials.length)} Clients</span>
              </div>

              <button
                type="button"
                onClick={() => handleStep(1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#040814] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
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
