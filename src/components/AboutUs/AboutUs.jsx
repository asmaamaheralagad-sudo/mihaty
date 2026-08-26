import React from 'react';
import aboutImg from '../../image/about.jpg';  
import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* صورة الكرة الأرضية */}
        <div className="about-image-wrapper">
          <img src={aboutImg} alt="من نحن - منحتي" className="about-img" />
        </div>

        {/* محتوى النص */}
        <div className="about-content">
          <h2 className="about-title">من نحن؟</h2>
          <p className="about-subtitle">منحتي... نقرّبك من فرصتك الأكاديمية المثالية.</p>
          
          <p className="about-description">
            منحتي هي منصة تساعد الطلاب على اكتشاف المنح والفرص الأكاديمية المناسبة لهم. نسهّل عليك البحث عن الفرص، معرفة شروطها، متابعة مواعيدها وتجهيز طلب التقديم.
          </p>

          <p className="about-highlight">
            نؤمن أن الوصول إلى الفرصة المناسبة يبدأ بالمعلومة الصحيحة.
          </p>

          <a href="#scholarships" className="about-link">اكتشف المنح</a>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;