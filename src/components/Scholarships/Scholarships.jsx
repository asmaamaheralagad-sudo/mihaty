import React from 'react';
import './Scholarships.css';

function ScholarshipCard({ title, degrees, deadline, status, statusType, bgImage }) {
  return (
    <div 
      className="scholarship-card" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="card-overlay"></div>
      
      <div className={`status-badge ${statusType}`}>
        {status}
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-degrees">{degrees}</p>
        
        <div className="card-footer">
          <span className="deadline-label">أخر موعد للتقديم</span>
          <span className="deadline-date">{deadline}</span>
          <button className="details-btn">عرض التفاصيل</button>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipCard;