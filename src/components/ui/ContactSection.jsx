import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { content } from "../../data/content";

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

export default function ContactSection() {
  const { contact } = content;

  const iconMap = {
    Mail: Mail,
    Phone: Phone,
    MapPin: MapPin,
    Globe: Globe,
    Linkedin: LinkedinIcon,
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    Youtube: YoutubeIcon,
    Github: GithubIcon,
  };

  return (
    <section
      id="contact-section"
      className="site-section bg-[#040814] text-white"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(46,123,255,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none z-0" />

      <div className="site-container relative z-10">
        {/* Section Header: Heading fully visible, 24px gap before subtext (mb-6), 48px gap to cards (mb-12) */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1530] border border-[#2E7BFF]/30 text-[#00B4FF] text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{contact.badge}</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight mb-3">
            LET'S BUILD <span className="bg-gradient-to-r from-white via-[#00B4FF] to-[#2E7BFF] bg-clip-text text-transparent">SOMETHING ICONIC</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] font-normal leading-relaxed">
            {contact.subheading}
          </p>
        </div>

        {/* 4 Cards Grid: 2x2 tablet (sm:grid-cols-2), 1 col mobile, 4-col desktop, 24px gap (gap-6), 24px padding (p-6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contact.methods.map((method) => {
            const Icon = iconMap[method.icon] || Mail;
            return (
              <a
                key={method.type}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group p-6 rounded-3xl bg-[#0A1530]/60 border border-white/10 hover:border-[#00B4FF] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,180,255,0.25)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 text-decoration-none"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#040814] border border-[#2E7BFF]/30 group-hover:border-[#00B4FF] flex items-center justify-center text-[#00B4FF] mb-5 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,180,255,0.2)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CBD5E1]/70 block mb-1">
                    {method.type}
                  </span>
                  <p className={`font-['Cinzel'] font-bold text-white group-hover:text-[#00B4FF] transition-colors [overflow-wrap:anywhere] leading-snug ${
                    method.type === "Direct Email"
                      ? "text-sm sm:text-[16px] md:text-[17px]"
                      : "text-base sm:text-[18px]"
                  }`}>
                    {method.value}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#00B4FF]">
                  <span>{method.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Social Connect Bar strictly 32px below cards (mt-8), padding 24px (p-6), and border */}
        <div className="mt-8 p-6 rounded-3xl bg-[#0A1530]/40 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="font-['Cinzel'] text-lg font-bold text-white">
              Connect Across Digital Channels
            </span>
            <span className="text-xs text-[#CBD5E1] mt-1">
              Daily insights, 4K production reels, and client case studies
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {contact.socials.map((soc) => {
              const Icon = iconMap[soc.icon] || Globe;
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-[#040814] border border-white/15 hover:border-[#00B4FF] text-[#CBD5E1] hover:text-[#00B4FF] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,180,255,0.4)]"
                  aria-label={soc.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
