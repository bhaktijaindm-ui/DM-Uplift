import React from 'react';
import AstrologyNavbar from '../../components/ui/AstrologyNavbar';
import AboutUsSection from '../../components/ui/AboutUsSection';
import { motion } from 'framer-motion';
import './AstrologyPages.css';

const AstrologyAbout = () => {
  return (
    <div className="astrology-page-container">
      <AstrologyNavbar />
      
      <header className="page-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-title"
        >
          About <span className="gradient-text">CosmicReach</span>
        </motion.h1>
        <p className="page-subtitle">We are the bridge between ancient wisdom and modern digital growth.</p>
      </header>

      <main className="page-content">
        <AboutUsSection />
        
        <section className="mission-section">
          <div className="section-container">
            <div className="mission-grid">
              <div className="mission-text">
                <h2 className="section-title-premium">Our Divine Mission</h2>
                <p>At CosmicReach, we believe that every spiritual guide has a unique aura that deserves to be seen by the world. Our mission is to amplify your voice through data-backed strategies that respect the sanctity of your practice.</p>
                <div className="stat-row">
                  <div className="stat-item">
                    <h3>150+</h3>
                    <p>Astrologers Scaled</p>
                  </div>
                  <div className="stat-item">
                    <h3>5M+</h3>
                    <p>Reach Generated</p>
                  </div>
                </div>
              </div>
              <div className="mission-visual">
                <div className="abstract-glow-box"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AstrologyAbout;
