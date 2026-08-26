import React from 'react';
import './GlowCircle.css';

function GlowCircle({ color = 'rgba(217, 164, 65, 0.25)', size = '200px', top, bottom, left, right }) {
  const positionStyle = {
    width: size,
    height: size,
    backgroundColor: color,
    top,
    bottom,
    left,
    right,
  };

  return <div className="glow-circle" style={positionStyle} />;
}

export default GlowCircle;