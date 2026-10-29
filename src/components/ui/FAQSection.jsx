import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQSection.css';

const faqs = [
  {
    question: "How long does it take to see results from digital marketing?",
    answer: "Typically, SEO results manifest within 3-6 months, while paid campaigns can generate leads almost immediately. For spiritual practices, we focus on sustainable growth and alignment."
  },
  {
    question: "Do you specialize in specific astrological traditions?",
    answer: "Yes, we work with Vedic, Western, Chinese, and Evolutionary astrologers. We understand the unique language and audience for each tradition."
  },
  {
    question: "Can you help with personal brand building for tarot readers?",
    answer: "Absolutely. We specialize in taking individual readers and building them into recognized spiritual authorities through professional branding and social strategy."
  },
  {
    question: "Is my data and client list secure with your agency?",
    answer: "Security and confidentiality are paramount. We use industry-standard encryption and never share your client lists or data with third parties."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Schema.org Structured Data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="faq-section">
      {/* Inject JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className="section-container">
        <div className="faq-layout">
          <div className="faq-info">
            <h2 className="section-title-premium">Common Enquiries</h2>
            <p className="section-desc">Clear your doubts about our cosmic marketing process.</p>
            <div className="faq-cta-box">
              <p>Still have questions?</p>
              <button className="contact-btn">Contact Our Team</button>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-icon" />
                </div>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div 
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
