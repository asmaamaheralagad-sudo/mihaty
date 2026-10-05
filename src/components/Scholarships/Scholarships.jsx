import React from "react";
import "./Scholarships.css";
import saudiFlag from "../../image/flag2.jpg";
import germanyFlag from "../../image/flag1.jpg";
import ukFlag from "../../image/flag4.jpg";
import turkeyFlag from "../../image/flag3.jpg";
const scholarshipsData = [
  {
    title: "المنحة التركية",
    degrees: "بكالوريوس • ماجستير • دكتوراة",
    deadline: "20 فبراير 2027",
    status: "تفتح قريباً",
    statusType: "warning",
    bgImage: turkeyFlag,
  },

  {
    title: "المنحة البريطانية",
    degrees: "بكالوريوس • ماجستير • دكتوراة",
    deadline: "20 فبراير 2027",
    status: "مفتوحة للتقديم",
    statusType: "success",
    bgImage: ukFlag,
  },

  {
    title: "المنحة السعودية",
    degrees: "بكالوريوس • ماجستير",
    deadline: "20 فبراير 2027",
    status: "مفتوحة للتقديم",
    statusType: "success",
    bgImage: saudiFlag,
  },

  {
    title: "المنحة الألمانية",
    degrees: "بكالوريوس • ماجستير • دكتوراة",
    deadline: "20 فبراير 2027",
    status: "مغلقة",
    statusType: "danger",
    bgImage: germanyFlag,
  },
];

function ScholarshipCard({
  title,
  degrees,
  deadline,
  status,
  statusType,
  bgImage,
}) {
  return (
    <div
      className="scholarship-card"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="card-overlay"></div>

      <div className={`status-badge ${statusType}`}>{status}</div>

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
