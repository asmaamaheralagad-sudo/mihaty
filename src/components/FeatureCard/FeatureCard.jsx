import React from "react";
import "./FeatureCard.css";
import {
  // FaPhone,
  // FaEnvelope,
  FaGraduationCap,
  // FaFacebookF,
  // FaTwitter,
  // FaInstagram,
  FaArrowLeft,
  FaSearch,
  FaClock,
  FaUserGraduate,
  FaMagic,
  FaRegBookmark,
} from "react-icons/fa";

function FeatureCard({
  icon,
  title,
  description,
  borderColor = "#4A90D9",
  offsetDirection = "left",
}) {
  return (
    <section className="opportunities" id="discover">
      <div className="section-heading">
        <h2>كل ما تحتاجه لتصل إلى فرصتك القادمة</h2>

        <p>
          من البحث عن المنح إلى تجهيز ملفك الأكاديمي، بوصلة تجمع لك كل الأدوات
          التي تحتاجها في مكان واحد.
        </p>
      </div>

      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">
            <FaGraduationCap />
          </div>

          <h3>منح تناسبك بدقة</h3>

          <p>منح مختارة وفق تخصصك ومستواك الأكاديمي وأهدافك المستقبلية.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaUserGraduate />
          </div>

          <h3>بحث شامل ومرن</h3>

          <p>تصفح المنح بسهولة وحدد الدولة والتخصص والدرجة العلمية المناسبة.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaClock />
          </div>

          <h3>لا تفوت المواعيد</h3>

          <p>تتبع مواعيد التقديم واحصل على تنبيهات مهمة قبل انتهاء الفرصة.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaMagic />
          </div>

          <h3>أدوات ذكية تساعدك</h3>

          <p>مساعدات ذكية لتحسين سيرتك الذاتية وخطاب الدافع والطلبات.</p>
        </div>
      </div>
    </section>
  );
}

export default FeatureCard;
