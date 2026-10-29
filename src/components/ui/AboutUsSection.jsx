import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Target, Zap } from 'lucide-react';
import './AboutUsSection.css';

const AboutUsSection = () => {
  const benefits = [
    {
      icon: <Shield className="benefit-icon" />,
      title: "Industry-Specific",
      desc: "Deep understanding of spiritual nuances and cosmic alignment."
    },
    {
      icon: <Zap className="benefit-icon" />,
      title: "Rapid Growth",
      desc: "Scaling practices from local orbits to global market reach."
    },
    {
      icon: <Target className="benefit-icon" />,
      title: "Targeted Results",
      desc: "Connecting you with clients seeking exactly your wisdom."
    }
  ];

  return (
    <section className="about-premium-section">
      <div className="section-container">
        <div className="about-layout">
          <div className="about-content-box">
            <span className="about-badge">Why CosmicReach?</span>
            <h2 className="about-title">ILLUMINATING YOUR <br /><span className="gold-text">DIGITAL PATHWAY</span></h2>
            <p className="about-description">
              General marketing agencies don't understand the nuances of the spiritual and astrological industry. We do. 
              We know how to speak your language and connect with your specific audience, ensuring your marketing is as authentic as your readings.
            </p>

            <div className="benefits-stack">
              {benefits.map((item, index) => (
                <motion.div 
                  key={index}
                  className="benefit-item-premium"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="benefit-icon-box">{item.icon}</div>
                  <div className="benefit-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="about-visual-box">
            <div className="mystical-orb-container">
              <div className="orb-glow"></div>
              <motion.div 
                className="main-orb"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: 360 
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                <div className="orb-inner-rings">
                  <div className="ring-1"></div>
                  <div className="ring-2"></div>
                  <div className="ring-3"></div>
                </div>
                <Sparkles className="orb-center-icon" />
              </motion.div>
              
              {/* Floating Decorative Elements */}
              <motion.div 
                className="floating-shard shard-1"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="floating-shard shard-2"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
