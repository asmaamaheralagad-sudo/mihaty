import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./SavedGrants.css";
import save from "../../image/save.png";

export default function SavedGrants() {
  const [savedGrants, setSavedGrants] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="saved-grants-page" dir="rtl">
      <SideNavBar />

      <main className="saved-grants-main">
        <header className="saved-grants-header">
          <h1 className="saved-grants-title">المنح المحفوظة</h1>
          <p className="saved-grants-subtitle">
            تابع حالة المنح التي قمت بحفظها ومواعيد التقديم النهائية. نحن نساعدك في البقاء منظماً لتحقيق أهدافك الأكاديمية.
          </p>
        </header>

        {savedGrants.length > 0 ? (
          <div className="saved-grants-grid">
            {/* بطاقات المنح المحفوظة */}
          </div>
        ) : (
          <div className="empty-state">
            <h2>لا يوجد منح محفوظة</h2>
            <p>احفظ منحك المفضلة لتعرضها لك</p>

            <button
              type="button"
              className="browse-btn"
              onClick={() => navigate("/scholarships")}
            >
              تصفح المنح
            </button>

            <div className="empty-state-illustration">
              <img
                src={save} alt="المنح المحفوظة"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}