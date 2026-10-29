import { Link } from 'react-router-dom';
import { ParticleTextEffect } from '../components/ui/ParticleTextEffect';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="star-field-bg"></div>
      <div className="landing-content">
        <div className="branding-section">
          <span className="sparkle-icon">✨</span>
          <h1 className="main-logo-text">CosmicReach</h1>
        </div>
        
        <div className="effect-wrapper">
          <ParticleTextEffect words={[
            "Hello,Welcome!",
            "We are here to",
            "Grow your business",
            "Strategies which help",
            "You to reach your Goal!!!",
            "Service we provide is",
            "Website Development",
            "Social Media Marketing",
            "Branding Strategies",
            "SEO/GEO/SXO/AIO/AEO",
            "Paid-Campaigns",
            "Professional Shoots",
          ]} />
        </div>

        <p className="landing-subtitle">The ultimate management portal for modern astrologers and spiritual guides.</p>
        
        <div className="dashboard-entrance">
          <Link to="/astrologydashboard/home" className="enter-dashboard-card astrology-theme">
            <div className="card-glow"></div>
            <div className="card-icon">🌟</div>
            <h2>Enter Astrology Dashboard</h2>
            <p>Access your readings, client data, and marketing tools in one celestial space.</p>
            <div className="enter-badge">CLICK TO ENTER</div>
          </Link>
        </div>

        <footer className="portal-footer">
          © 2026 CosmicReach Marketing • Astrology Excellence
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
