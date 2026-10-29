import React from 'react';
import AstrologyNavbar from '../../components/ui/AstrologyNavbar';
import CaseStudy from '../../components/ui/CaseStudy';
import { motion } from 'framer-motion';
import './AstrologyPages.css';

const AstrologyCaseStudies = () => {
  return (
    <div className="astrology-page-container">
      <AstrologyNavbar />
      
      <header className="page-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-title"
        >
          Celestial <span className="gradient-text">Success</span>
        </motion.h1>
        <p className="page-subtitle">Real results for practitioners who dared to align their brand with the stars.</p>
      </header>

      <main className="page-content">
        <CaseStudy />
        
        <section className="more-results">
          <div className="section-container">
            <div className="results-banner">
              <h2>Ready to be our next success story?</h2>
              <button className="primary-btn glow-btn">Start Your Alignment</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AstrologyCaseStudies;
