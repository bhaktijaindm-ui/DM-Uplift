import { Link } from 'react-router-dom';
import { SolarSystem } from '../../components/ui/SolarSystem';
import ServiceShowcase from '../../components/ui/ServiceShowcase';
import ProcessShowcase from '../../components/ui/ProcessShowcase';
import TypewriterTestimonial from '../../components/ui/TypewriterTestimonial';
import CaseStudy from '../../components/ui/CaseStudy';
import BlogSection from '../../components/ui/BlogSection';
import FAQSection from '../../components/ui/FAQSection';
import AboutUsSection from '../../components/ui/AboutUsSection';
import AstrologyNavbar from '../../components/ui/AstrologyNavbar';
import { Calendar, FileText, Code, User, Clock } from 'lucide-react';
import './Astrology.css';

const astrologyTestimonials = [
  {
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
    text: 'CosmicReach completely transformed my online booking system. I went from 5 readings a week to being fully booked for a month!',
    name: 'Elena R.',
    jobtitle: 'Vedic Astrologer',
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    text: 'Finally, an agency that understands the spiritual niche! Their social media strategy aligns perfectly with lunar cycles. Amazing results.',
    name: 'Marcus T.',
    jobtitle: 'Tarot Reader',
  },
  {
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150',
    text: 'My website was outdated and hard to use. They built a beautiful, mystical site that perfectly captures my aura and converts visitors instantly.',
    name: 'Sarah K.',
    jobtitle: 'Spiritual Guide',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    text: 'The targeted ad campaigns brought in so many new clients looking specifically for relationship chart readings. Highly recommended.',
    name: 'David W.',
    jobtitle: 'Relationship Astrologer',
  },
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    text: 'I trust them completely with my brand. Their approach is authentic, transparent, and incredibly effective for growing a healing business.',
    name: 'Aisha M.',
    jobtitle: 'Energy Healer',
  }
];

const astrologySteps = [
  {
    id: 1,
    title: "Discovery & Analysis",
    date: "Phase 1",
    content: "We dive deep into your astrological niche, target audience, and current digital footprint.",
    category: "Discovery",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Cosmic Strategy",
    date: "Phase 2",
    content: "Defining KPIs, social media channels, and the perfect marketing funnel for your readings.",
    category: "Strategy",
    icon: FileText,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 85,
  },
  {
    id: 3,
    title: "Digital Manifestation",
    date: "Phase 3",
    content: "Building your website, generating SEO content, and producing high-quality social assets.",
    category: "Execution",
    icon: Code,
    relatedIds: [2, 4],
    status: "pending",
    energy: 60,
  },
  {
    id: 4,
    title: "Campaign Launch",
    date: "Phase 4",
    content: "Going live with targeted ads to attract clients looking for birth charts and tarot readings.",
    category: "Launch",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 40,
  },
  {
    id: 5,
    title: "Optimization & Growth",
    date: "Phase 5",
    content: "Tracking analytics, refining ad spend, and ensuring a steady flow of new clients.",
    category: "Optimization",
    icon: Clock,
    relatedIds: [4],
    status: "pending",
    energy: 20,
  },
];

const AstrologyHome = () => {
  return (
    <div className="astrology-container">
      {/* Decorative background elements */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-glow glow-3"></div>

      <AstrologyNavbar />
      
      <header className="agency-hero">
        <SolarSystem />
        <div className="hero-content">
          <div className="badge animate-fade-in-up">DIGITAL MARKETING FOR ASTROLOGERS</div>
          <h1 className="animate-fade-in-up delay-1">
            Illuminate Your Practice.<br />
            <span className="gradient-text">Expand Your Cosmic Reach.</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-2">
            We specialize in building the online presence of astrologers, tarot readers, and spiritual guides. Attract more clients with our tailored digital marketing services.
          </p>
          <div className="hero-cta-group animate-fade-in-up delay-3">
            <button className="primary-btn glow-btn">Get a Free Consultation</button>
            <button className="secondary-btn">View Our Services</button>
          </div>
        </div>
      </header>
      
      <main className="agency-main">
        <section className="services-section">
          <div className="section-header">
            <h2 className="section-title">Our Specialized Services</h2>
            <p className="section-subtitle">Everything you need to grow your astrology business online.</p>
          </div>
          <ServiceShowcase />
        </section>

        <AboutUsSection />



        <CaseStudy />

        <section className="testimonials-section">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Spiritual guides who expanded their cosmic reach with us.</p>
          <TypewriterTestimonial testimonials={astrologyTestimonials} />
        </section>

        <BlogSection />

        <FAQSection />

      </main>
    </div>
  );
};

export default AstrologyHome;
