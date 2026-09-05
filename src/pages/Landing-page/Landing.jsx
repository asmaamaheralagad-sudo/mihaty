import React from 'react';
import landingImg from '../../image/landing.png.png';
import Header from '../../components/Header/Header';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Scholarships from '../../components/Scholarships/Scholarships';
import AboutUs from '../../components/AboutUs/AboutUs';
import HowItWorks from '../../components/HowItWork/HowItWork';


import { FaArrowLeft, FaRegPlayCircle, FaGraduationCap } from 'react-icons/fa';
import { HiOutlineMagnifyingGlass, HiOutlineAcademicCap, HiOutlineSparkles, HiOutlineClock } from 'react-icons/hi2';

// استيراد صور الأعلام بالأسماء الصحيحة الموجودة في مجلد image
import saudiFlag from '../../image/flag2.jpg';
import germanyFlag from '../../image/flag1.jpg';
import ukFlag from '../../image/flag4.jpg';
import turkeyFlag from '../../image/flag3.jpg';

import ph1 from "../../image/ph1.png";
import ph2 from "../../image/ph2.png";
import ph3 from "../../image/ph3.png";
import pho1 from "../../image/pho1.jpg";
import pho2 from "../../image/pho2.jpg";
import pho3 from "../../image/pho3.jpg";

import './Landing.css';
import "../../index.css";
import HowItWork from '../../components/HowItWork/HowItWork';

const aiTools = [
  {
    image: ph1,
    title: "أنشئ سيرة ذاتية احترافية",
    text: "أنشئ سيرتك الذاتية بمساعدة الذكاء الاصطناعي بما يناسب تخصصك وأهدافك وكل دقائق.",
  },
  {
    image: ph2,
    title: "جهّز خطاب دافع",
    text: "أنشئ وطوّر خطاب دافع مخصص للمنحة يعكس مهاراتك وأهدافك بطريقة احترافية.",
  },
  {
    image: ph3,
    title: "اعثر على المنح المناسبة",
    text: "أعثر على المنح المناسبة لتخصصاتك واهتماماتك وزد فرصك في النجاح.",
  },
];

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

const testimonials = [
  {
    name: "أسيل صرصور",
    role: "فلسطين ",
    image: pho1,
    jop: "خريجة بكالوريوس",
    text: "أكملت السيرة الذاتية بمساعدة أدوات منحتي، وأعجبني إنجاز طلبي بطريقة أسهل وأسرع بكثير من المحاولة وحدي.",
  },
  {
    name: "محمد رمضان",
    role: "مصر",
    jop: "خريج ماجستير",
    image: pho2,
    text: "لأول مرة أشعر أنني أعرف بالضبط أي المنح تناسب تخصصي، وحرصت منحتي على متابعة كل موعد تقديم أولاً بأول.",
  },
  {
    name: "سعد أحمد",
    role: "السعودية",
    jop: "خريج بكالوريوس",
    image: pho3,
    text: "منحتي وفّرت وقتي  في البحث عن الفرص المناسبة، وساعدتني أدوات الذكاء الاصطناعي على تجهيز خطاب دافع مميز.",
  },
];

const footerLinks = {
  quick: [
    { label: "الرئيسية", href: "#home" },
    { label: "المنح الدراسية", href: "#scholarships" },
    { label: "أدوات الذكاء الاصطناعي", href: "#tools" },
    { label: "من نحن؟", href: "#about" },
  ],
  support: [
    { label: "الأسئلة الشائعة", href: "#faq" },
    { label: "سياسة الخصوصية", href: "#privacy" },
    { label: "الشروط والأحكام", href: "#terms" },
  ],
};
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
              title="بحث سهل ومَرِن" 
              description="ابحث عن المنحة حسب معايير مختلفة."
              borderColor='#FDD34D'
            />
            <FeatureCard 
              icon={<HiOutlineAcademicCap />} 
              title="منح تناسبك" 
              description="اكتشف فرَصاً توافق مع اهتماماتك." 
            />
            <FeatureCard 
              icon={<HiOutlineSparkles />} 
              title="أدوات ذكية" 
              description="استخدم الذكاء الاصطناعي لتجهيز مستنداتك." 
            />
            <FeatureCard 
              icon={<HiOutlineClock />} 
              title="لا تفوّت المواعيد" 
              description="تابع مواعيد التقديم واحفظ الفرص المهمة." 
            />
          </div>

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
        <Scholarships 
          title="المنحة التركية"
          degrees="بكالوريوس • ماجستير • دكتوراة"
          deadline="20 فبراير 2027"
          status="تفتح قريباً"
          statusType="warning"
          bgImage={turkeyFlag}
        />
        <Scholarships
          title="Chevening"
          degrees="بكالوريوس • ماجستير • دكتوراة"
          deadline="20 فبراير 2027"
          status="مفتوحة للتقديم"
          statusType="success"
          bgImage={ukFlag}
        />
        <Scholarships
          title="DAAD"
          degrees="بكالوريوس • ماجستير • دكتوراة"
          deadline="20 فبراير 2027"
          status="مغلقة"
          statusType="danger"
          bgImage={germanyFlag}
        />
        <Scholarships
          title="المنحة السعودية"
          degrees="بكالوريوس • ماجستير"
          deadline="20 فبراير 2027"
          status="مفتوحة للتقديم"
          statusType="success"
          bgImage={saudiFlag}
        />
        </div>
        </section>
        <AboutUs />
        <HowItWork/>
        <section className="ai-tools-section" id="tools">
           <div className="section-heading">
          <h1>أدوات ذكية تجعل التقديم أسهل</h1>
          <p>
            استفد من الذكاء الاصطناعي لتجد المنح الأنسب لك، وجهّز طلبك، وزد فرصك
            في النجاح
          </p>
        </div>
        <div className="ai-tools-grid">
          {aiTools.map((tool) => (
            <article className="ai-tool-card" key={tool.title}>
              <div className="ai-tool-icon">
                <img src={tool.image} alt={tool.title} />
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <div className="scholarships-header">
          <h2>تجارب حقيقية، وفرص بدأت مع منحتي</h2>
          <p>
            اكتشف كيف ساعدت منحتي طلابًا وباحثين عن الفرص في الوصول إلى المنح
            المناسبة والاستعداد وترجمة التقديم
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <img
                className="testimonial-avatar"
                src={item.image}
                alt={item.name}
              />
              <div className="testimonial-stars">★★★★★</div>
              <h3>{item.name}</h3>
              <p className="testimonial-text">{item.text}</p>
              <div>
                <span className="testimonial-badge">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.role}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section cta-photo">
        <div className="cta-overlay" />
        <div className="cta-photo-content">
          <h2 >مستعد تبدأ رحلتك؟</h2>
          <p>
            انضم لآلاف الطلاب الذين اكتشفوا المنحة المناسبة لهم عبر منحتي
            واستعدوا للتقديم بثقة
          </p>
          <a href="#scholarships" className="primary-button">
            اكتشف فرصك الآن <span>←</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>منحتي</h3>
            <p>
              منحتي منصة عربية للمنح والفرص الأكاديمية، نساعدك على اكتشاف الفرصة
              المناسبة ومتابعتها والاستعداد للتقديم بثقة.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="Instagram">
                ◎
              </a>
              <a href="#" aria-label="Facebook">
                f
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <ul>
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>الدعم</h4>
            <ul>
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>معلومات التواصل</h4>
            <ul className="footer-contact">
              <li>📞 966500000</li>
              <li>✉️ hello@menhaty.app</li>
              <li>📍 الرياض، السعودية</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2027 منحتي. جميع الحقوق محفوظة</span>
        </div>
      </footer>
         

</div>
    
  );
}

export default Landing;