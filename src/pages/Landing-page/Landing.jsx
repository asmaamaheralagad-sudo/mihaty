import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import landingImg from "../../image/landing.jpg";
import Header from "../../components/Header/Header";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import Scholarships from "../../components/Scholarships/Scholarships";
import ScholarshipsSlider from "../../components/Scholarships/ScholarshipsSlider";
import AITools from "../../components/aitool/AiTool";
import AboutUs from "../../components/AboutUs/AboutUs";
import HowItWork from "../../components/HowItWork/HowItWork";
import Footer from "../../components/Footerlanding/Footer";
// import { FaGraduationCap } from 'react-icons/fa';
// import {
//   HiOutlineMagnifyingGlass,
//   HiOutlineSparkles,
//   HiOutlineClock,
// } from "react-icons/hi2";
import { FaArrowLeft, FaRegPlayCircle, FaGraduationCap } from "react-icons/fa";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlineClock,
} from "react-icons/hi2";

import saudiFlag from "../../image/flag2.jpg";
import germanyFlag from "../../image/flag1.jpg";
import ukFlag from "../../image/flag4.jpg";
import turkeyFlag from "../../image/flag3.jpg";

// ✅ تم الإضافة: هنحتاج نعرف حالة تسجيل الدخول عشان نعيد توجيه المستخدم المسجل
import { useAuth } from "../../context/AuthContext";

import "./Landing.css";
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

const features = [
  {
    Icon: FaGraduationCap,
    tone: "gold",
    title: "منح تناسبك بدقة",
    description:
      "محرك توافق ذكي يربط مؤهلاتك الحالية، درجاتك، ومجالك الأكاديمي مباشرة بالمنح العالمية التي تلبي معاييرك وطموحك المستقبلي.",
  },
  {
    Icon: HiOutlineMagnifyingGlass,
    tone: "navy",
    title: "بحث سهل ومرن",
    description:
      "فلاتر بحثية مخصصة بحسب الدولة، التغطية المالية (تمويل كامل أو جزئي)، متطلبات اللغة، والمرحلة الجامعية دون تشتيت.",
  },
  {
    Icon: HiOutlineClock,
    tone: "navy",
    title: "لا تفوّت المواعيد",
    description:
      "تقويم تفاعلي وإشعارات استباقية لمواعيد فتح بوابات القبول والمواعيد النهائية لتسليم الوثائق والتوصيات.",
  },
  {
    Icon: HiOutlineSparkles,
    tone: "gold",
    title: "أدوات ذكية مساندة",
    description:
      "حلول متقدمة مدعومة بالذكاء الاصطناعي لفحص السيرة الذاتية، تدقيق خطابات الدافع، وفهم متطلبات اللجان.",
  },
];

function Landing() {
  const navigate = useNavigate();

  // ✅ تم الإضافة: لو فيه مستخدم مسجل دخول بالفعل، منعرضلوش صفحة اللاندنج الإعلانية
  // ونوديه على طول لصفحته الشخصية (البروفايل)
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/Profile", { replace: true });
    }
  }, [currentUser, loading, navigate]);

  // لحد ما نتأكد من حالة تسجيل الدخول، منعرضش أي حاجة عشان نتجنب "ومضة" اللاندنج
  // قبل التحويل للبروفايل
  if (loading || currentUser) {
    return null;
  }

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
              منصة "منحتي" تجمع لك أحدث الفرص الدراسية المتاحة حول العالم.
              استخدم أدوات الذكاء الاصطناعي لمطابقة ملفك الأكاديمي مع المنح
              المناسبة وتجهيز أوراق التقديم بكل سهولة.
            </p>

            <div className="hero-buttons">
              <button
                className="hero-btn-primary"
                onClick={() => navigate("/scholarships")}
              >
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
      <section className="pf-section" aria-labelledby="pf-title">
        <span className="pf-badge">مزايا المنصة</span>

        <header className="pf-header">
          <h2 id="pf-title" className="pf-title">
            كل ما تحتاجه لتصل إلى فرصتك القادمة
          </h2>
          <p className="pf-subtitle">
            اكتشف المنح المناسبة لك، تابع مواعيد التقديم، واستفد من أدواتنا
            الذكية لتجهيز ملفك الأكاديمي بأعلى معايير التميز والقبول.
          </p>
        </header>

        <div className="pf-grid">
          {features.map(({ Icon, tone, title, description }) => (
            <article className="pf-card" key={title}>
              <span className={`pf-icon pf-icon--${tone}`} aria-hidden="true">
                <Icon />
              </span>
              <h3 className="pf-card-title">{title}</h3>
              <p className="pf-card-desc">{description}</p>
            </article>
          ))}
        </div>
      </section>
      {/* <section className="features-section">
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
      </section> */}

      {/* id="ai-tools" عشان رابط "أدوات الذكاء الاصطناعي" في النافبار ينزل هنا */}
      <section id="ai-tools">
        <AITools />
      </section>

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
          <ScholarshipsSlider items={scholarshipsData} />
        </div>
      </section>

      {/* id="about-us" عشان رابط "من نحن" في النافبار ينزل هنا */}
      <section id="about-us">
        <AboutUs />
      </section>
      <HowItWork />
      <Footer />
    </div>
  );
}

export default Landing;
