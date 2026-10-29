import { Link } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = ({ title }) => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-title">{title}</h1>
        <div className="animation-container">
          <div className="pulse-circle"></div>
          <div className="pulse-circle delay-1"></div>
          <div className="pulse-circle delay-2"></div>
        </div>
        <h2 className="soon-text">Coming Soon</h2>
        <p className="soon-desc">We are crafting something amazing. Stay tuned!</p>
        <Link to="/" className="back-link">Return to Dashboard Selection</Link>
      </div>
    </div>
  );
};

export default ComingSoon;
