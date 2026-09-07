import React from 'react';
import landingImg from '../../image/landing.jpg';
import Header from '../../components/Header/Header';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Scholarships from '../../components/Scholarships/Scholarships';
import ScholarshipsSlider from '../../components/Scholarships/ScholarshipsSlider';
import AITools from "../../components/aitool/AiTool";
import AboutUs from '../../components/AboutUs/AboutUs';
import HowItWork from '../../components/HowItWork/HowItWork';

import { FaArrowLeft, FaRegPlayCircle, FaGraduationCap } from 'react-icons/fa';
import { HiOutlineMagnifyingGlass, HiOutlineAcademicCap, HiOutlineSparkles, HiOutlineClock } from 'react-icons/hi2';

import saudiFlag from '../../image/flag2.jpg';
import germanyFlag from '../../image/flag1.jpg';
import ukFlag from '../../image/flag4.jpg';
import turkeyFlag from '../../image/flag3.jpg';



import './Landing.css';
import "../../index.css";

const plans = [
  {
    name: "طوّر فرصك مع منحتي",
    price: "9.99$",
    period: "/ شهرياً",
    highlighted: true,
    features: [
      "وصول كامل لجميع المنح الحصرية والمرشّحة لتخصصك",
      "بحث ذكي وفلترة متقدمة حسب الدولة والتخصص",
      "أدوات الذكاء الاصطناعي لإعداد السيرة وخطاب الدافع",
      "تنبيهات فورية بمواعيد التقديم النهائية",
      "دعم أولوية ومتابعة شخصية لطلبك",
    ],
    cta: "اشترك الآن",
  },
  {
    name: "ابدأ رحلتك مجاناً",
    price: "0$",
    period: "/ شهرياً",
    highlighted: false,
    features: [
      "تصفح قاعدة بيانات المنح الأساسية",
      "حفظ عدد محدود من المنح المفضّلة",
      "الاطلاع على تفاصيل ومتطلبات المنح",
      "نشرة أسبوعية بأحدث الفرص المتاحة",
    ],
    cta: "ابدأ مجاناً",
  },
];

// ✅ بيانات المنح - معرّفة مرة وحدة برا الدالة
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
    title: "Chevening",
    degrees: "بكالوريوس • ماجستير • دكتوراة",
    deadline: "20 فبراير 2027",
    status: "مفتوحة للتقديم",
    statusType: "success",
    bgImage: ukFlag,
  },
  {
    title: "DAAD",
    degrees: "بكالوريوس • ماجستير • دكتوراة",
    deadline: "20 فبراير 2027",
    status: "مغلقة",
    statusType: "danger",
    bgImage: germanyFlag,
  },
  {
    title: "المنحة السعودية",
    degrees: "بكالوريوس • ماجستير",
    deadline: "20 فبراير 2027",
    status: "مفتوحة للتقديم",
    statusType: "success",
    bgImage: saudiFlag,
  },
];

function Landing() {
  return (
    <div className="landing-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-card">
          <img src={landingImg} alt="طالب متخرج" className="hero-bg-img" />
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <div className="hero-badge">
              <FaGraduationCap className="badge-icon" />
              <span>فرصتك الأكاديمية تبدأ من هنا</span>
            </div>

            <h1 className="hero-title">
              اكتشف المنحة التي <br />
              <span className="hero-title-highlight">تناسب طموحك</span>
            </h1>

            <p className="hero-desc">
              منصة "منحتي" تجمع لك أحدث الفرص الدراسية المتاحة حول العالم. استخدم أدوات الذكاء الاصطناعي لمطابقة ملفك الأكاديمي مع المنح المناسبة وتجهيز أوراق التقديم بكل سهولة.
            </p>

            <div className="hero-buttons">
              <button className="hero-btn-primary">
                <span>اكتشف المنح الآن</span>
                <FaArrowLeft className="btn-icon" />
              </button>

              <button className="hero-btn-secondary">
                <span>تعرف على منحتي</span>
                <FaRegPlayCircle className="btn-icon play-icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <h3 className="stat-number">1000 +</h3>
            <p className="stat-label">منحة متاحة</p>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item">
            <h3 className="stat-number">15 +</h3>
            <p className="stat-label">دولة</p>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item">
            <h3 className="stat-number">30 +</h3>
            <p className="stat-label">تخصص</p>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item">
            <h3 className="stat-number">500 +</h3>
            <p className="stat-label">طالب وطالبة</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-grid">
            <FeatureCard 
            icon={<HiOutlineMagnifyingGlass />}
            title="بحث سهل ومرن"
            description="ابحث عن المنحة حسب معايير مختلفة."
            borderColor="#FDD34D"
            offsetDirection="left"/>
          
            <FeatureCard  
            icon={<HiOutlineAcademicCap />} 
            title="منح تناسبك" 
            description="اكتشف فرَصاً توافق مع اهتماماتك." 
            borderColor="#14335E"
             offsetDirection="right"/>
            <FeatureCard 
            icon={<HiOutlineSparkles />} 
            title="أدوات ذكية" 
            description="استخدم الذكاء الاصطناعي لتجهيز مستنداتك." 
            borderColor="#14335E" 
            offsetDirection="left"/>
             
            <FeatureCard  
            icon={<HiOutlineClock />} 
            title="لا تفوّت المواعيد" 
            description="تابع مواعيد التقديم واحفظ الفرص المهمة." 
           borderColor="#FDD34D"
           offsetDirection="right"/></div>

          <div className="features-text">
            <h2 className="features-title">
              كل ما تحتاجه لتصل إلى <span className="highlight-text">فرصتك القادمة</span>
            </h2>
            <p className="features-desc">
              اكتشف المنح المناسبة لك، تابع مواعيد التقديم، واستفد من أدواتنا الذكية لتجهيز طلبك بثقة.
            </p>
          </div>
        </div>
      </section>
        <AITools />
     

      {/* Scholarships Section */}
      <section className="Scholarships-Section">
        <div className="scholarships-header">
          <h1 className="scholarships-title">اكتشف فرصتك القادمة</h1>
          <p className="scholarships-subtitle">
            استكشف مجموعة من المنح الدراسية المميزة <br />
            واكتشف الفرص التي قد تكون مناسبة لطموحك الأكاديمي.
          </p>
        </div>
        <div className="Scholarships-container">
          {/* ✅ صار سلايدر بدل التكرار اليدوي */}
          <ScholarshipsSlider items={scholarshipsData} />
        </div>
      </section>

      <AboutUs />
      <HowItWork/>

    
    </div>
  );
}

export default Landing;
