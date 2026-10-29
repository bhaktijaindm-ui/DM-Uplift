import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TypewriterTestimonial.css';

export default function TypewriterTestimonial({ testimonials }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasBeenHovered, setHasBeenHovered] = useState(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  
  const typewriterTimeoutRef = useRef(null);
  const currentTextRef = useRef('');

  const startTypewriter = useCallback((text) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;
    
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 50);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []); 

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
    
    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, startTypewriter]); 
  
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopTypewriter]);

  useEffect(() => {
    return () => {
      stopTypewriter(); 
    };
  }, [stopTypewriter]); 

  return (
    <div className="tt-container">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="tt-item"
          onMouseEnter={() => handleMouseEnter(index)} 
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={testimonial.image}
            alt={testimonial.name}
            className="tt-avatar"
            animate={{ 
              borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#ACA0FB' : '#475569'
            }}
            transition={{ duration: 0.3 }}
          />
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className="tt-card"
              >
                <div className="tt-text-container">
                  {typedText}
                  <span className="tt-blink">|</span>
                </div>
                <p className="tt-name">{testimonial.name}</p>
                <p className="tt-job">{testimonial.jobtitle}</p>
                <div className="tt-tail-container">
                  <div className="tt-tail-dot-1"></div>
                  <div className="tt-tail-dot-2"></div>
                  <div className="tt-tail-dot-3"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
