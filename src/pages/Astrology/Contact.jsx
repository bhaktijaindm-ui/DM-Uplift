import React from 'react';
import AstrologyNavbar from '../../components/ui/AstrologyNavbar';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './AstrologyPages.css';

const AstrologyContact = () => {
  return (
    <div className="astrology-page-container">
      <AstrologyNavbar />
      
      <header className="page-hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-title"
        >
          Connect With <span className="gradient-text">The Source</span>
        </motion.h1>
        <p className="page-subtitle">Ready to align your digital destiny? Our cosmic consultants are waiting.</p>
      </header>

      <main className="page-content">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title-premium">Get in Touch</h2>
              <div className="contact-methods">
                <div className="method">
                  <Mail className="method-icon" />
                  <div>
                    <h4>Email Us</h4>
                    <p>hello@cosmicreach.com</p>
                  </div>
                </div>
                <div className="method">
                  <Phone className="method-icon" />
                  <div>
                    <h4>Call Us</h4>
                    <p>+1 (888) COSMIC-0</p>
                  </div>
                </div>
                <div className="method">
                  <MapPin className="method-icon" />
                  <div>
                    <h4>Global Hub</h4>
                    <p>Digital Ether, Global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container glass-panel">
              <form className="cosmic-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Your Practice</label>
                  <select>
                    <option>Vedic Astrologer</option>
                    <option>Tarot Reader</option>
                    <option>Energy Healer</option>
                    <option>Other Spiritual Guide</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell us about your cosmic goals..."></textarea>
                </div>
                <button type="button" className="primary-btn full-width">
                  Send Manifestation <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AstrologyContact;
