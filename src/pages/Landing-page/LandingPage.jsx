import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/Footerlanding/Footer";
import HowItWork from "../../components/HowItWork/HowItWork";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import saudiFlag from "../../image/flag2.jpg";
import germanyFlag from "../../image/flag1.jpg";
import ukFlag from "../../image/flag4.jpg";
import turkeyFlag from "../../image/flag3.jpg";
import Markups from "../../image/Markups.png";
import graduate from "../../image/graduate.jpg";
import logos from "../../image/logos.jpeg";
import heroImage from "../../image/LandingPage.jpg";

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

import { IoLocationOutline } from "react-icons/io5";

import "./LandingPage.css";

const scholarships = [
  {
    id: 1,
    country: "المنحة التركية",
    type: "بكالوريوس - ماجستير - دكتوراه",
    date: "آخر موعد للتقديم 20 فبراير 2027",
    status: "منحة ممولة بالكامل",
    statusClass: "gold",
    image: turkeyFlag,
  },
  {
    id: 2,
    country: "المنحة البريطانية",
    type: "بكالوريوس - ماجستير",
    date: "آخر موعد للتقديم 10 يناير 2025",
    status: "تخصصات متنوعة",
    statusClass: "blue",
    image: ukFlag,
  },
  {
    id: 3,
    country: "المنحة السعودية",
    type: "بكالوريوس - ماجستير - دكتوراه",
    date: "آخر موعد للتقديم 15 نوفمبر 2027",
    status: "ممولة بالكامل",
    statusClass: "green",
    image: saudiFlag,
  },
  {
    id: 4,
    country: "المنحة الألمانية",
    type: "بكالوريوس - ماجستير - دكتوراه",
    date: "آخر موعد للتقديم 29 يوليو 2027",
    status: "DAAD",
    statusClass: "red",
    image: germanyFlag,
  },
];

function LandingPage() {
  const navigate = useNavigate();

  const { currentUser, loading } = useAuth();

  // ================= حفظ المنح =================

  const [savedScholarships, setSavedScholarships] = useState(() => {
    const saved = localStorage.getItem("savedScholarships");

    return saved ? JSON.parse(saved) : [];
  });

  // حفظ البيانات في localStorage
  useEffect(() => {
    localStorage.setItem(
      "savedScholarships",
      JSON.stringify(savedScholarships),
    );
  }, [savedScholarships]);

  // حفظ أو إلغاء حفظ المنحة
  const toggleSave = (item) => {
    const isSaved = savedScholarships.some(
      (savedItem) => savedItem.id === item.id,
    );

    if (isSaved) {
      // إزالة المنحة
      setSavedScholarships(
        savedScholarships.filter((savedItem) => savedItem.id !== item.id),
      );
    } else {
      // حفظ المنحة
      setSavedScholarships([...savedScholarships, item]);
    }
  };

  // تحويل المستخدم المسجل إلى Profile
  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/Profile", { replace: true });
    }
  }, [currentUser, loading, navigate]);

  if (loading || currentUser) {
    return null;
  }

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="home-page" dir="rtl">
      {/* ================= Navbar ================= */}

      <nav className="navbar">
        <div className="nav-logo">
          <img src={logos} alt="بوصلة" />
          <span>بوصلة</span>
        </div>

        <div className="nav-links">
          <a href="#home">الرئيسية</a>
          <a href="#discover">اكتشف المنح</a>
          <a href="#how">كيف تعمل</a>
          <a href="#about">من نحن؟</a>
        </div>

        <div className="nav-buttons">
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            إنشاء حساب جديد
          </button>

          <button className="login-btn" onClick={() => navigate("/login")}>
            تسجيل الدخول
          </button>
        </div>
      </nav>

      {/* ================= Hero ================= */}

      <section
        className="hero-section"
        id="home"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="hero-content">
          <h1>
            كانت المنحة مجرد حلم... مع
            <br />
            <span>بوصلة أصبحت واقعًا أفضل</span>
          </h1>

          <div className="hero-line"></div>

          <p>
            كل يوم يمر يمثل فرصة جديدة لبداية مختلفة. مع بوصلة نساعدك على الوصول
            إلى المنح المناسبة، ونقدم لك الأدوات التي تحتاجها لبناء مستقبلك
            الأكاديمي والمهني.
          </p>

          <div className="hero-buttons">
            <button
              className="discover-btn"
              onClick={() => scrollTo("scholarships-list")}
            >
              <FaSearch />
              اكتشف المنح الآن
            </button>

            <button className="about-btn" onClick={() => scrollTo("how")}>
              <FaArrowLeft />
              تعرف على بوصلة
            </button>
          </div>
        </div>
      </section>

      {/* ================= Statistics ================= */}

      <section className="statistics" id="about">
        <div className="stat-item">
          <h3>+ 1,850</h3>
          <p>منحة متاحة الآن</p>
          <span>نختار لك الأفضل حول العالم</span>
        </div>

        <div className="stat-item">
          <h3>$94M</h3>
          <p>إجمالي التمويل المعروض</p>
          <span>منح مجانية بالكامل</span>
        </div>

        <div className="stat-item">
          <h3>142</h3>
          <p>جامعة شريكة</p>
          <span>نضم أفضل الجامعات العالمية</span>
        </div>

        <div className="stat-item">
          <h3>96.8%</h3>
          <p>معدل قبول المستخدمين</p>
          <span>بعد ترشيح الفرص المناسبة</span>
        </div>
      </section>

      {/* ================= Feature card ================= */}
      <FeatureCard />
      {/* ================= Scholarships ================= */}

      <section className="scholarships-section" id="scholarships-list">
        <div className="scholarships-header">
          <h2>اكتشف فرصتك القادمة</h2>

          <p>
            استكشف مجموعة من الفرص الدراسية المجانية والاستثنائية القادمة لك في
            كل مكان بمنصة بوصلة بذكاء
          </p>
        </div>

        <div className="cards-grid">
          {scholarships.map((item) => {
            const isSaved = savedScholarships.some(
              (savedItem) => savedItem.id === item.id,
            );

            return (
              <div
                className="sch-card"
                key={item.id}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="card-overlay"></div>

                <div className="card-top">
                  <span className={`status-badge ${item.statusClass}`}>
                    {item.status}
                  </span>

                  {/* زر الحفظ */}

                  <button
                    type="button"
                    className={`save-btn ${isSaved ? "saved" : ""}`}
                    aria-label={
                      isSaved ? "إزالة المنحة من المحفوظات" : "حفظ المنحة"
                    }
                    onClick={() => toggleSave(item)}
                  >
                    <FaRegBookmark />
                  </button>
                </div>

                <div className="card-bottom">
                  <h3>{item.country}</h3>

                  <p className="type">{item.type}</p>

                  <div className="date-row">
                    <span>◷ {item.date}</span>
                  </div>

                  <a
                    href="/GrantDetails"
                    className="details-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/GrantDetails");
                    }}
                  >
                    عرض التفاصيل ←
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= How it works ================= */}

      <HowItWork />

      {/* ================= CTA ================= */}

      <section className="cta-section">
        <div className="cta-image">
          <img src={graduate} alt="طالب سعيد" />
        </div>

        <div className="cta-text">
          <span className="badge">ابدأ اليوم مجانا</span>

          <h2>مستعد تبدأ رحلتك الأكاديمية؟</h2>

          <p>
            اختصر آلاف الساعات من البحث والتحضير واكتشف المنح الدراسية المناسبة
            التي تنتظرك من خلال منصة بوصلة.
          </p>

          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              اكتشف المنح الآن ←
            </button>

            <button
              className="btn-secondary"
              onClick={() => scrollTo("scholarships-list")}
            >
              استكشف المنح الدراسية
            </button>
          </div>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <Footer />
    </div>
  );
}

export default LandingPage;
