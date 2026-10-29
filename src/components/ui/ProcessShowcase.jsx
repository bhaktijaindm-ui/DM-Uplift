import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Sparkles } from 'lucide-react';
import './ProcessShowcase.css';

const ProcessShowcase = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <div className="process-showcase-container">
      <div className="process-showcase-layout">
        {/* Left Side: Interactive Circle */}
        <div className="process-circle-side">
          <div className="process-circle-wrapper">
            {/* Ambient Background Glows */}
            <div className="circle-glow"></div>
            
            {/* The Main Orbit Path */}
            <div className="orbit-path"></div>

            {/* Central Brand Core */}
            <div className="center-core">
              <div className="core-inner">
                <Sparkles className="core-icon" />
              </div>
              <div className="core-rings">
                <div className="ring"></div>
                <div className="ring"></div>
              </div>
            </div>

            {/* Steps / Nodes on Orbit */}
            {steps.map((step, index) => {
              const angle = (index / steps.length) * 360 - 90; // Start from top
              const radius = 160; // Distance from center
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              const isActive = activeStep.id === step.id;

              return (
                <motion.div
                  key={step.id}
                  className={`process-node ${isActive ? 'active' : ''}`}
                  initial={false}
                  animate={{
                    x,
                    y,
                    scale: isActive ? 1.2 : 1,
                  }}
                  onMouseEnter={() => setActiveStep(step)}
                  whileHover={{ scale: 1.3 }}
                >
                  <div className="node-icon-wrapper">
                    <step.icon size={20} />
                  </div>
                  <div className="node-label">{step.title}</div>
                  
                  {isActive && (
                    <motion.div 
                      className="node-active-ring"
                      layoutId="active-ring"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Details Card */}
        <div className="process-details-side">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              className="details-card"
              initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="card-header">
                <div className="step-badge">Phase {activeStep.id}</div>
                <h3 className="step-title">{activeStep.title}</h3>
              </div>

              <div className="card-body">
                <p className="step-content">{activeStep.content}</p>
                
                <div className="step-metrics">
                  <div className="metric-item">
                    <div className="metric-header">
                      <Zap size={14} className="metric-icon" />
                      <span>Impact Level</span>
                    </div>
                    <div className="metric-bar-bg">
                      <motion.div 
                        className="metric-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeStep.energy}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="status-indicator">
                    <div className={`status-dot ${activeStep.status}`}></div>
                    <span className="status-text">{activeStep.status.replace('-', ' ')}</span>
                  </div>
                  <button className="learn-more-btn">
                    Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProcessShowcase;
