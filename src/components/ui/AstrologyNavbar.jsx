import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AstrologyNavbar.css';

const AstrologyNavbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="astrology-nav">
      <div className="logo">
        <span className="logo-icon">✨</span>
        <span className="logo-text">CosmicReach</span>
      </div>
      
      <div className="nav-links">
        <Link to="/astrologydashboard/home" className={isActive('/astrologydashboard/home') ? 'active' : ''}>Home</Link>
        <Link to="/astrologydashboard/about" className={isActive('/astrologydashboard/about') ? 'active' : ''}>About Us</Link>
        <Link to="/astrologydashboard/casestudies" className={isActive('/astrologydashboard/casestudies') ? 'active' : ''}>Case Studies</Link>
        <Link to="/astrologydashboard/blog" className={isActive('/astrologydashboard/blog') ? 'active' : ''}>Blog</Link>
        <Link to="/astrologydashboard/contact" className={isActive('/astrologydashboard/contact') ? 'active' : ''}>Contact Us</Link>
      </div>

      <Link to="/" className="back-btn">Exit Portal</Link>
    </nav>
  );
};

export default AstrologyNavbar;
