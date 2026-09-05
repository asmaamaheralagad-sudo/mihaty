import React from 'react';
import './FeatureCard.css';

function FeatureCard({ icon, title, description, borderColor  }) {
  return (
    <div className={`feature-card-wrapper border-${borderColor}`}>
      <div className="feature-card">
        <div className="icon-wrapper">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        
      </div>
    </div>
  );
}

export default FeatureCard;