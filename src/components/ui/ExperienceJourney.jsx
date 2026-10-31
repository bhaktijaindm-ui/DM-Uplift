import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

/**
 * Metallic Glowing Pin Icon
 */
const Pin = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

/**
 * Pinned Milestone Card
 */
const MilestoneCard = ({
  number,
  period,
  company,
  outlet,
  title,
  description,
  metric,
  rotate = "",
  className = "",
}) => {
  return (
    <div
      className={`relative w-full md:w-[330px] lg:w-[350px] transition-all duration-300 hover:z-30 hover:scale-[1.03] ${rotate} ${className}`}
    >
      {/* Outer Pinned Glass Frame */}
      <div className="bg-[#0A1530]/85 border border-[#2E7BFF]/35 hover:border-[#00B4FF] p-2.5 rounded-[26px] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,180,255,0.12)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,180,255,0.3)] backdrop-blur-xl transition-all">
        {/* Glowing Pushpin */}
        <div className="flex justify-center -mt-1 mb-2">
          <div className="relative">
            <Pin className="w-8 h-8 text-[#00B4FF] drop-shadow-[0_0_12px_rgba(0,180,255,0.8)]" />
            <div className="w-2.5 h-1 bg-black/60 rounded-full mx-auto blur-[1px] -mt-0.5" />
          </div>
        </div>

        {/* Inner Card Content */}
        <div className="bg-gradient-to-b from-[#060F26] to-[#040814] border border-white/10 rounded-[18px] p-5 flex flex-col relative overflow-hidden">
          {/* Subtle Ambient Glow in Corner */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[radial-gradient(circle,rgba(0,180,255,0.2)_0%,transparent_70%)] blur-[20px] pointer-events-none" />

          {/* Top Row: Number & Timeline Period */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-['Cinzel'] font-black text-3xl sm:text-4xl text-[#00B4FF] tracking-tight drop-shadow-[0_0_15px_rgba(0,180,255,0.4)]">
              {number}
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#0A1530] border border-[#2E7BFF]/35 text-[#CBD5E1]">
              {period}
            </span>
          </div>

          {/* Company & Outlets Header */}
          <h4 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white leading-tight mb-1">
            {company}
          </h4>

          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4FF] shadow-[0_0_6px_#00B4FF]" />
            <span className="text-[#00B4FF] text-[11px] font-semibold uppercase tracking-wider">
              {outlet}
            </span>
          </div>

          {/* Milestone Title */}
          <h5 className="text-white text-xs font-semibold mb-1.5 tracking-tight flex items-center justify-between">
            <span>{title}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00B4FF]/70" />
          </h5>

          {/* Description */}
          <p className="text-[#CBD5E1] text-xs leading-relaxed font-normal mb-3">
            {description}
          </p>

          {/* Bottom Metric Badge */}
          <div className="mt-auto pt-2.5 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">Result Achieved</span>
            <span className="font-mono text-xs font-bold text-[#00B4FF]">{metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExperienceJourney() {
  // 4 Core Milestones from Bhakti Jain's Professional Track Record
  const milestones = [
    {
      number: "01",
      period: "April 2026 – Present",
      company: "Uplift Digi",
      outlet: "SEO & Website Head",
      title: "Full-Funnel Organic Growth & Web Architecture",
      description:
        "Directing end-to-end SEO, technical website builds, and multi-channel marketing campaigns across global clients. Leading high-impact organic traffic scaling, CRO, and analytics tracking.",
      metric: "Agency Leadership & Scale",
      rotate: "md:rotate-2 md:hover:rotate-0",
      position: "md:absolute md:top-0 md:left-[6%] lg:left-[10%]",
    },
    {
      number: "02",
      period: "Nov 2025 – April 2026",
      company: "Valiun Venture IT Company",
      outlet: "SEO Lead",
      title: "Global Technical SEO & International Positioning",
      description:
        "Formulated technical SEO architecture, on-page optimization, and high-authority link strategies across Australian & US accounts. Scaled organic impressions and keyword visibility.",
      metric: "+120% Conversion Surge",
      rotate: "md:-rotate-2 md:hover:rotate-0",
      position: "md:absolute md:top-[220px] md:right-[6%] lg:right-[10%]",
    },
    {
      number: "03",
      period: "Feb 2025 – Nov 2025",
      company: "Seven Hills",
      outlet: "WordPress & SEO Junior",
      title: "Custom CMS Architecture & Organic Acquisition",
      description:
        "Engineered responsive WordPress portals, optimized page speed and core web vitals, and implemented local SEO targeting to capture top search engine positions.",
      metric: "Top 3 Search Rankings",
      rotate: "md:rotate-2 md:hover:rotate-0",
      position: "md:absolute md:top-[460px] md:left-[6%] lg:left-[10%]",
    },
    {
      number: "04",
      period: "Sep 2024 – Feb 2025",
      company: "Prashna Kundli",
      outlet: "SEO & WordPress Specialist",
      title: "E-Commerce SEO & Scaled Link Engineering",
      description:
        "Developed and managed custom e-commerce web platform, executed high-volume verified link building (2,980+ submissions), and boosted keyword rankings across high-intent queries.",
      metric: "2,980+ Backlink Engine",
      rotate: "md:-rotate-2 md:hover:rotate-0",
      position: "md:absolute md:top-[680px] md:right-[6%] lg:right-[10%]",
    },
  ];

  const height = 980;

  return (
    <div id="experience-section" className="relative w-full py-10 sm:py-14">
      {/* Sub-Header inside About Us */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/40 text-[#00B4FF] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(0,180,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAREER & TRACK RECORD</span>
        </div>

        <h3 className="font-['Cinzel'] text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight uppercase leading-tight mb-2.5">
          PROFESSIONAL JOURNEY OF <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">EXPONENTIAL GROWTH</span>
        </h3>

        <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed max-w-lg">
          From foundational SEO sprints to leading digital agency web & organic scale: a relentless track record of measurable technical performance and client ROI.
        </p>
      </div>

      {/* Main Zig-Zag Interactive Canvas Container */}
      <div className="relative w-full max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* Mobile vertical dashed connector line */}
        <div className="block md:hidden absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-[#00B4FF]/40 pointer-events-none z-0" />

        {/* Desktop Container with SVG Animated Zig-Zag Path */}
        <div
          className="relative w-full flex flex-col space-y-8 md:space-y-0 md:block"
          style={{ minHeight: `${height}px` }}
        >
          {/* Animated Connecting SVG Path (Desktop only) */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
            viewBox={`0 0 1000 ${height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="experience-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#2E7BFF" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#00B4FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.85" />
              </linearGradient>
              <filter id="experience-line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#00B4FF" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Smooth Zig-Zag Bezier Path linking Cards 1 -> 2 -> 3 -> 4 */}
            <motion.path
              d="M 330 140 C 560 140, 520 320, 720 320 C 500 340, 500 560, 310 560 C 500 580, 500 780, 710 780"
              stroke="url(#experience-line-grad)"
              filter="url(#experience-line-glow)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -140 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>

          {/* Render 4 Zig-Zag Milestone Cards */}
          {milestones.map((m) => (
            <MilestoneCard
              key={m.number}
              number={m.number}
              period={m.period}
              company={m.company}
              outlet={m.outlet}
              title={m.title}
              description={m.description}
              metric={m.metric}
              rotate={m.rotate}
              className={m.position}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
