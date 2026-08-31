import React from 'react';
import './DecorativeCircle.css';

function DecorativeCircle({ color = 'blue', size, opacity, top, bottom, left, right }) {
  const style = {
    top,
    bottom,
    left,
    right,
    width: size,
    height: size,
    opacity: opacity,
  };

  return (
    <div
      className={`decorative-circle circle-${color}`}
      style={style}
    ></div>
  );
}

export default DecorativeCircle;