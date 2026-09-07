import React from 'react';
import './FeatureCard.css';

function FeatureCard({ icon, title, description, borderColor = '#4A90D9', offsetDirection = 'left' }) {
  return (
    <div className={`feature-card-wrapper ${offsetDirection}`}>
      <div className="feature-card-bg" style={{ backgroundColor: borderColor }} />
      <div className="feature-card">
        <div className="icon-wrapper">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;