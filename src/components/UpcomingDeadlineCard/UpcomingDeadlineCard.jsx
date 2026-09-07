import React from "react";
import "./UpcomingDeadlineCard.css";
function UpcomingDeadlineCard({ bgImage, daysLeft, title, category, region, deadlineDate }) {
  return (
    <div
      className="deadline-card"
    >
      <img src={bgImage} alt={title} className="deadline-card-img" />
      <div className="deadline-overlay">
         <div className="deadline-header">
    <h3 className="deadline-title">{title}</h3>
        <span className="days-left-badge">باقي {daysLeft} يوم</span>

  </div>

  <div className="deadline-info">
    <p className="deadline-meta">{category} · {region}</p>
  </div>
          <div className="deadline-footer">
              <span className="deadline-date">آخر موعد للتقديم : {deadlineDate}</span>

  <a href="#" className="deadline-link">التفاصيل</a>
</div>
        </div>

      
      </div>
  );
}

export default UpcomingDeadlineCard;
