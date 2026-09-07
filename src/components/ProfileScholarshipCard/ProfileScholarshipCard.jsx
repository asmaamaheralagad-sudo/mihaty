import React, { useState } from "react";
import "./ProfileScholarshipCard.css";
import {
  FaBookmark,
  FaRegBookmark,
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";

function ProfileScholarshipCard({
  bgImage,
  country,
  title,
  matchPercentage,
  degrees,
}) {
  const [isSaved, setIsSaved] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div
      className="profile-scholarship-card"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="profile-card-overlay"></div>

      {/* الشريط العلوي */}
      <div className="profile-card-header">
        <span className="profile-match-badge">{matchPercentage} مناسبة لك</span>
        <button 
          className={`profile-bookmark-btn ${isSaved ? 'saved' : ''}`} 
          onClick={handleBookmarkClick}
          aria-label="حفظ المنحة"
        >
          {isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {/* محتوى البطاقة في الأسفل */}
      <div className="profile-card-content">
        <span className="profile-card-country">{country}</span>
        <h3 className="profile-card-title">{title}</h3>

        <div className="profile-card-tags">{degrees}</div>

        <div className="profile-card-divider"></div>

        <div className="profile-card-footer">
          <span className="why-fit-text">
            <FaInfoCircle className="info-icon" /> لماذا تناسبني؟
          </span>
          <FaChevronDown className="arrow-icon" />
        </div>
      </div>
    </div>
  );
}

export default ProfileScholarshipCard;