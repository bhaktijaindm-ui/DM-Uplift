import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './CaseStudy.css';

const caseStudies = [
  {
    id: 1,
    title: "The Vedic Renaissance",
    client: "Astra Vedic Readings",
    result: "+300% Booking Growth",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800",
    description: "Rebuilding a legacy brand for the digital age through mystical storytelling and SEO."
  },
  {
    id: 2,
    title: "Lunar Manifestation",
    client: "Moonlight Spirituals",
    result: "50k+ Community Reach",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800",
    description: "Scaling a tarot practice through data-driven social media alignment with lunar phases."
  }
];

const CaseStudy = () => {
  return (
    <section className="casestudy-section">
      <div className="section-container">
        <div className="section-header-left">
          <h2 className="section-title-premium">Celestial Success Stories</h2>
          <p className="section-desc">How we turned mystical wisdom into digital market leadership.</p>
        </div>

        <div className="casestudy-grid">
          {caseStudies.map((study) => (
            <motion.div 
              key={study.id}
              className="casestudy-card"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="card-image-wrapper">
                <img src={study.image} alt={study.title} className="card-image" />
                <div className="card-overlay">
                  <div className="card-stats">{study.result}</div>
                </div>
              </div>
              <div className="card-info">
                <div className="card-meta">{study.client}</div>
                <h3 className="card-title">{study.title}</h3>
                <p className="card-text">{study.description}</p>
                <button className="read-more-link">
                  View Case Study <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
