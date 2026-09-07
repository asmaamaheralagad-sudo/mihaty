import React, { useRef } from 'react';
import Scholarships from './Scholarships';
import './Scholarships.css';

function ScholarshipsSlider({ items }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstChild?.offsetWidth || 300;
      const scrollAmount = cardWidth + 24;
      trackRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="slider-wrapper">
      <button className="slider-arrow arrow-right" onClick={() => scroll('prev')}>
        &#8250;
      </button>

      <div className="slider-track" ref={trackRef}>
        {items.map((s, index) => (
          <div className="slider-item" key={index}>
            <Scholarships {...s} />
          </div>
        ))}
      </div>

      <button className="slider-arrow arrow-left" onClick={() => scroll('next')}>
        &#8249;
      </button>
    </div>
  );
}

export default ScholarshipsSlider;