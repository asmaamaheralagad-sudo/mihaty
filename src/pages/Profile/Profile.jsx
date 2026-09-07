import React from "react";
import { Link } from "react-router-dom";
import { FiBell, FiBookmark, FiChevronDown } from "react-icons/fi";
import {
  FaGraduationCap,
  FaWallet,
  FaGlobe,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";
import logoImg from "../../image/logo.png";
import avatarImg from "../../image/avatarImg.jpg";
import japanImg from "../../image/japanImg.jpg";
import ukImg from "../../image/ukImg.jpg";
import usaImg from "../../image/usaImg.jpg";
import ph2Img from "../../image/ph2.png";
import "./Profile.css";
import ProfileScholarshipCard from '../../components/ProfileScholarshipCard/ProfileScholarshipCard';
import turkeyGovImg from "../../image/turkeyGovImg.jpg";
import spainImg from "../../image/spainImg.jpg";
import usaGovImg from "../../image/usaGovImg.jpg";
import UpcomingDeadlineCard from '../../components/UpcomingDeadlineCard/UpcomingDeadlineCard';
const upcomingDeadlines = [
  {
    id: 1,
    bgImage: turkeyGovImg,
    daysLeft: 12,
    title: "منحة الحكومة التركية",
    category: "ماجستير",
    region: "تركيا",
    deadlineDate: "17 سبتمبر 2026",
  },
  {
    id: 2,
    bgImage: spainImg,
    daysLeft: 24,
    title: "منحة الحكومة التركية",
    category: "ماجستير",
    region: "أوروبا",
    deadlineDate: "17 سبتمبر 2026",
  },
  {
    id: 3,
    bgImage: usaGovImg,
    daysLeft: 12,
    title: "منحة الحكومة التركية",
    category: "ماجستير",
    region: "أمريكا",
    deadlineDate: "17 سبتمبر 2026",
  },
];
const recommendedScholarships = [
  {
    id: 3,
    country: "الولايات المتحدة",
    title: "برنامج فولبرايت (Fulbright)",
    degrees: (
      <>
        <span className="card-tag">
          <FaGraduationCap /> دكتوراه
        </span>
        <span className="card-tag">
          <FaWallet /> تمويل جزئي
        </span>
      </>
    ),
    matchPercentage: "88%",
    bgImage: usaImg, // تم تصحيح اسم الصورة لتطابق الولايات المتحدة
  },
  {
    id: 2,
    country: "المملكة المتحدة",
    title: "منحة تشيفينينغ (Chevening)",
    degrees: (
      <>
        <span className="card-tag">
          <FaGraduationCap /> ماجستير
        </span>
        <span className="card-tag">
          <FaWallet /> ممولة بالكامل
        </span>
      </>
    ),
    matchPercentage: "94%",
    bgImage: ukImg, // تم تصحيح اسم الصورة لتطابق المملكة المتحدة
  },
  {
    id: 1,
    country: "اليابان",
    title: "منحة الحكومة اليابانية (MEXT)",
    degrees: (
      <>
        <span className="card-tag">
          <FaGraduationCap /> بكالوريوس
        </span>
        <span className="card-tag">
          <FaWallet /> ممولة بالكامل
        </span>
      </>
    ),
    matchPercentage: "20%",
    bgImage: japanImg,
  },
];
function Profile() {

  return (
    <div className="profile-page">
      {/* Navbar Section */}
      <header className="profile-navbar">
        <div className="profile-navbar-container">
          <div className="profile-logo">
            <Link to="/">
              <img src={logoImg} alt="منحتي" className="logo-img" />
            </Link>
          </div>

          <nav className="profile-nav-links">
            <Link to="/" className="nav-link ">
              الرئيسية
            </Link>
            <Link to="/scholarships" className="nav-link">
              اكتشف المنح
            </Link>
            <Link to="/ai-tools" className="nav-link">
              أدوات الذكاء الاصطناعي
            </Link>
            <Link to="/about" className="nav-link">
              من نحن ؟؟
            </Link>
          </nav>

          <div className="user-profile-section">
            <button className="icon-btn notification-btn" title="الإشعارات">
              <FiBell />
              <span className="notification-dot"></span>
            </button>
            <button className="icon-btn" title="المحفوظات">
              <FiBookmark />
            </button>

            <div className="vertical-divider">|</div>

            <div className="user-info">
              <img src={avatarImg} alt="المستخدم" className="user-avatar" />
              <span className="user-name">المستخدم</span>
              <FiChevronDown className="arrow-icon" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">أهلا بك مجددا محمد</h1>
          <p className="hero-subtitle">
            بناء على ملفك الأكاديمي واهتماماتك، قمنا بتصفية الفرص لتسريع رحلة
            قبولك
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">اكتشف منح </button>
          </div>
        </div>

        {/* Hero Stats Section (Inside Hero Section) */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaGraduationCap size={32} color="#0061A4" />
            </div>
            <div className="stat-value">5,000+</div>
            <div className="stat-label">منحة دراسية</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaGlobe size={32} color="#EAB308" />
            </div>
            <div className="stat-value">50+</div>
            <div className="stat-label">دولة حول العالم</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUniversity size={32} color="#0061A4" />
            </div>
            <div className="stat-value">200+</div>
            <div className="stat-label">جامعة شريكة</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaCheckCircle size={32} color="#2196F3" />
            </div>
            <div className="stat-value">98%</div>
            <div className="stat-label">نسبة الرضا</div>
          </div>
        </div>
      </section>

      <section className="promo-cta-section">
  <div className="promo-cta-content">
    
    {/* العنوان والنص الفرعي */}
    <div className="promo-text-wrapper">
      <h2 className="promo-cta-title">منح مناسبة لك</h2>
      <p className="promo-cta-subtitle">
        منح اخترناها بناءً على تخصصك ومستواك الأكاديمي وبيانات ملفك.
      </p>
    </div>
<div className="scholarships-grid">
  {recommendedScholarships.map((scholarship) => (
    <ProfileScholarshipCard 
      key={scholarship.id}
      title={scholarship.title}
      country={scholarship.country}
      degrees={scholarship.degrees}
      bgImage={scholarship.bgImage}
      matchPercentage={scholarship.matchPercentage}
    />
  ))}
</div>

  </div>
</section>
   
      {/* Language & Documents Prep Section */}
      <section className="prep-section">
        <div className="prep-header">
          <h2 className="prep-title"> جهّز طلبك للتقديم</h2>
          <p className="prep-subtitle">
استخدم أدوات منحتي لمساعدتك في تجهيز مستنداتك قبل موعد التقديم.
          </p>
        </div>
        <div className="prep-cards-grid">
          {/* البطاقة الأولى: مركز اللغات */}
          <div className="prep-card">
            <div className="prep-card-icon">
              <img src={ph2Img} alt="مركز اللغات" width="80" height="80" />
            </div>
            <h3 className="prep-card-title">السيرة الذاتية </h3>
            <p className="prep-card-desc">
              أنشئ سيرتك الذاتية أو حسّنها
              لتكون جاهزًا للتقديم.
            </p>{" "}
          </div>

          {/* البطاقة الثانية: بنك المستندات */}
          <div className="prep-card">
            <div className="prep-card-icon">
              <img
                src={ph2Img}
                alt="مركز رسالة الدافع"
                width="80"
                height="80"
              />
            </div>
            <h3 className="prep-card-title">مركز رسالة الدافع</h3>
            <p className="prep-card-desc">
              أنشئ رسالة دافع مخصصة للمنحة وحسّن محتواها.
            </p>
          </div>
          <div className="prep-card">
            <div className="prep-card-icon">
              <img src={ph2Img} alt="بنك المستندات" width="80" height="80" />
            </div>
            <h3 className="prep-card-title">بنك المستندات</h3>
            <p className="prep-card-desc">
              {" "}
              احفظ مستنداتك المهمة ونظّمها للوصول إليها عند الحاجة.
            </p>
          </div>
        </div>
      </section>
      {/* Upcoming Deadlines Section */}
<section className="upcoming-deadlines-section">
  <div className="upcoming-deadlines-header">
        <h2 className="upcoming-deadlines-title">تذكر مواعيدك القادمة</h2>

    <a href="#" className="view-all-link">عرض الكل</a>
  </div>

  <div className="upcoming-deadlines-list">
    {upcomingDeadlines.map((item) => (
      <UpcomingDeadlineCard
        key={item.id}
        bgImage={item.bgImage}
        daysLeft={item.daysLeft}
        title={item.title}
        category={item.category}
        region={item.region}
        deadlineDate={item.deadlineDate}
      />
    ))}
  </div>
</section>
      
      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="cta-content">
          <h2 className="cta-title">جاهزة لاكتشاف فرصتك القادمة؟</h2>
          <p className="cta-subtitle">
            ابدأ رحلتك نحو التميز الأكاديمي اليوم مع آلاف الفرص المصممة خصيصاً
            لك.
          </p>
          <button className="cta-btn">اكتشف المنح</button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-links">
            <Link to="/contact">اتصل بنا</Link>
            <Link to="/terms">شروط الاستخدام</Link>
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/about">عن المنصة</Link>
          </div>

          <div className="footer-brand">
            <div className="footer-logo-text">منحتي Minhati</div>
            <p className="footer-copy">
              © 2026 منحتي. جميع الحقوق محفوظة. منصة مدعومة بالذكاء الاصطناعي.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Profile;
