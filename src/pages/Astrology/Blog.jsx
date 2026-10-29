import React from 'react';
import AstrologyNavbar from '../../components/ui/AstrologyNavbar';
import BlogSection from '../../components/ui/BlogSection';
import { motion } from 'framer-motion';
import './AstrologyPages.css';

const AstrologyBlog = () => {
  return (
    <div className="astrology-page-container">
      <AstrologyNavbar />
      
      <header className="page-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-title"
        >
          Cosmic <span className="gradient-text">Insights</span>
        </motion.h1>
        <p className="page-subtitle">Expert marketing knowledge tailored for the spiritual and astrological niche.</p>
      </header>

      <main className="page-content">
        <BlogSection />
        
        <section className="newsletter-section">
          <div className="section-container">
            <div className="newsletter-box glass-panel">
              <h3>Subscribe to Cosmic Briefing</h3>
              <p>Receive monthly marketing strategies aligned with lunar cycles.</p>
              <div className="input-group">
                <input type="email" placeholder="Your celestial email" />
                <button className="primary-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AstrologyBlog;
