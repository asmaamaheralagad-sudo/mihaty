import React from 'react';
import './GrantDetails.css';
import { FiShare2, FiBookmark, FiExternalLink, FiCheckCircle, FiFileText, FiInfo, FiChevronLeft } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { MdChecklist, MdOutlineAccessTime, MdCardGiftcard, MdVerified } from 'react-icons/md';
import { FaGraduationCap, FaUniversity, FaGlobeAmericas, FaAward, FaPiggyBank, FaPlane, FaWallet } from 'react-icons/fa';

const defaultGrant = {
  title: 'منحة الرئيس لبرامج الدراسات العليا في جامعة هارفارد',
  university: 'جامعة هارفارد',
  country: 'الولايات المتحدة',
  degreeLevel: 'ماجستير / دكتوراه',
  fileMatchPercent: 98,
  tags: ['ذكاء اصطناعي', 'منحة كاملة التمويل'],
  deadlineDate: '17 سبتمبر 2026',
  daysLeft: 12,
  progressPercent: 70,
  about:
    'تُعد منحة الرئيس لجامعة هارفارد واحدة من أكثر المبادرات الأكاديمية مرموقة عالمياً، حيث تستهدف استقطاب ألمع العقول والباحثين من شتى أنحاء العالم لمتابعة دراساتهم العليا في مجالات المستقبل مثل الذكاء الاصطناعي، التكنولوجيا الحيوية، والسياسات العامة. توفر المنحة بيئة بحثية متكاملة ودعماً مالياً غير محدود لتمكين القادة الأكاديميين القادمين.',
  eligibility: [
    'الحصول على درجة البكالوريوس أو الماجستير بتقدير لا يقل عن ممتاز (أو ما يعادله).',
    'إجادة اللغة الإنجليزية بشهادة معتمدة (اختبار توفل بحد أدنى 100 أو آيلتس بحد أدنى 7.5).',
    'تقديم خطة بحثية واضحة ومبتكرة تخدم التحديات العالمية الراهنة.',
    'خلو السجل الأكاديمي من أي عقوبات تأديبية أو سوابق أكاديمية.',
  ],
  majors: [
    { icon: 'ai', label: 'الذكاء الاصطناعي وتعلم الآلة' },
    { icon: 'bio', label: 'علوم البيانات الحيوية' },
    { icon: 'policy', label: 'أخلاقيات التكنولوجيا والسياسات' },
    { icon: 'energy', label: 'الطاقة المتجددة المتقدمة' },
  ],
  documents: [
    { title: 'السيرة الذاتية الأكاديمية (CV)', tag: 'إلزامي (PDF)' },
    { title: 'السجلات الأكاديمية ( transcripts )', tag: 'مترجمة ومعتمدة' },
    { title: 'خطابات التوصية (3 خطابات)', tag: 'من أكاديميين' },
    { title: 'بيان الغرض الشخصي (SOP)', tag: '1000 كلمة' },
  ],
  benefits: [
    {
      icon: 'wallet',
      title: 'تغطية كاملة',
      desc: 'إعفاء كامل من الرسوم الدراسية طوال فترة البرنامج.',
    },
    {
      icon: 'plane',
      title: 'تذاكر السفر',
      desc: 'تذاكر ذهاب وعودة سنوية للبلد الأصلي.',
    },
    {
      icon: 'salary',
      title: 'راتب شهري',
      desc: 'مخصص شهري سخي لتغطية المعيشة والسكن والتأمين الصحي.',
    },
  ],
};

const contents = [
  { id: 'about', label: 'نبذة عن المنحة' },
  { id: 'eligibility', label: 'شروط الأهلية' },
  { id: 'majors', label: 'التخصصات المطلوبة' },
  { id: 'documents', label: 'المستندات المطلوبة' },
  { id: 'benefits', label: 'المزايا / التمويل' },
];

function majorIcon(icon) {
  switch (icon) {
    case 'ai':
      return <MdVerified className="grant-major-icon" />;
    case 'bio':
      return <FaGraduationCap className="grant-major-icon" />;
    case 'policy':
      return <MdChecklist className="grant-major-icon" />;
    case 'energy':
      return <HiSparkles className="grant-major-icon" />;
    default:
      return <FaGraduationCap className="grant-major-icon" />;
  }
}

function benefitIcon(icon) {
  switch (icon) {
    case 'wallet':
      return <FaWallet className="grant-benefit-icon" />;
    case 'plane':
      return <FaPlane className="grant-benefit-icon" />;
    case 'salary':
      return <FaPiggyBank className="grant-benefit-icon" />;
    default:
      return <MdCardGiftcard className="grant-benefit-icon" />;
  }
}

function GrantDetails({ grant = defaultGrant }) {
  return (
    <div className="grant-details-page">
      {/* الهيدر العلوي: مشاركة/حفظ + الفتات */}
      <div className="grant-details-topbar">
        <div className="grant-breadcrumb">
          <span>الرئيسية</span>
          <FiChevronLeft className="grant-breadcrumb-icon" />
          <span>اكتشف المنح</span>
          <FiChevronLeft className="grant-breadcrumb-icon" />
          <span className="grant-breadcrumb-current">{grant.title}</span>
        </div>

        <div className="grant-topbar-actions">
          <button type="button" className="grant-icon-btn" aria-label="مشاركة">
            <FiShare2 />
          </button>
          <button type="button" className="grant-save-btn">
            <FiBookmark />
            احفظ المنحة
          </button>
        </div>
      </div>

      <div className="grant-details-container">
        {/* المحتوى الرئيسي */}
        <main className="grant-details-main">
          {/* بطاقة رأس المنحة */}
          <div className="grant-header-card">
            <div className="grant-header-tags">
              {grant.tags.map((tag, i) => (
                <span key={i} className={i === 0 ? 'grant-tag grant-tag-ai' : 'grant-tag grant-tag-funded'}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="grant-header-top">
              <h1 className="grant-title">{grant.title}</h1>
              <div className="grant-university-logo">
                <FaUniversity />
              </div>
            </div>

            <div className="grant-meta-row">
              <div className="grant-meta-item">
                <span className="grant-meta-label">توافق الملف</span>
                <span className="grant-meta-value">{grant.fileMatchPercent}% ممتاز</span>
                <MdVerified className="grant-meta-icon grant-meta-icon-gold" />
              </div>
              <div className="grant-meta-item">
                <span className="grant-meta-label">المستوى الأكاديمي</span>
                <span className="grant-meta-value">{grant.degreeLevel}</span>
                <FaAward className="grant-meta-icon" />
              </div>
              <div className="grant-meta-item">
                <span className="grant-meta-label">الدولة</span>
                <span className="grant-meta-value">{grant.country}</span>
                <FaGlobeAmericas className="grant-meta-icon" />
              </div>
              <div className="grant-meta-item">
                <span className="grant-meta-label">الجامعة</span>
                <span className="grant-meta-value">{grant.university}</span>
                <FaGraduationCap className="grant-meta-icon" />
              </div>
            </div>
          </div>

          {/* 1. نبذة عن المنحة */}
          <section id="about" className="grant-section-card">
            <h2 className="grant-section-title">
              <span className="grant-section-number">1.</span> نبذة عن المنحة
              <FiInfo className="grant-section-icon" />
            </h2>
            <p className="grant-about-text">{grant.about}</p>
          </section>

          {/* 2. شروط الأهلية */}
          <section id="eligibility" className="grant-section-card">
            <h2 className="grant-section-title">
              <span className="grant-section-number">2.</span> شروط الأهلية
              <MdChecklist className="grant-section-icon" />
            </h2>
            <ul className="grant-eligibility-list">
              {grant.eligibility.map((item, i) => (
                <li key={i} className="grant-eligibility-item">
                  <span>{item}</span>
                  <FiCheckCircle className="grant-eligibility-check" />
                </li>
              ))}
            </ul>
          </section>

          {/* 3. التخصصات المطلوبة */}
          <section id="majors" className="grant-section-card">
            <h2 className="grant-section-title">
              <span className="grant-section-number">3.</span> التخصصات المطلوبة
              <FaGraduationCap className="grant-section-icon" />
            </h2>
            <div className="grant-majors-grid">
              {grant.majors.map((major, i) => (
                <div key={i} className="grant-major-box">
                  <span>{major.label}</span>
                  {majorIcon(major.icon)}
                </div>
              ))}
            </div>
          </section>

          {/* 4. المستندات المطلوبة */}
          <section id="documents" className="grant-section-card">
            <h2 className="grant-section-title">
              <span className="grant-section-number">4.</span> المستندات المطلوبة
              <FiFileText className="grant-section-icon" />
            </h2>
            <div className="grant-documents-list">
              {grant.documents.map((doc, i) => (
                <div key={i} className="grant-document-row">
                  <span className="grant-document-tag">{doc.tag}</span>
                  <div className="grant-document-title">
                    <span>{doc.title}</span>
                    <FiFileText className="grant-document-icon" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. المزايا / التمويل */}
          <section id="benefits" className="grant-section-card">
            <h2 className="grant-section-title">
              <span className="grant-section-number">5.</span> المزايا / التمويل
              <MdCardGiftcard className="grant-section-icon" />
            </h2>
            <div className="grant-benefits-grid">
              {grant.benefits.map((benefit, i) => (
                <div key={i} className="grant-benefit-card">
                  {benefitIcon(benefit.icon)}
                  <h3 className="grant-benefit-title">{benefit.title}</h3>
                  <p className="grant-benefit-desc">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* الشريط الجانبي */}
        <aside className="grant-details-sidebar">
          <div className="grant-deadline-card">
            <div className="grant-deadline-info">
              <div className="grant-deadline-text">
                <span className="grant-deadline-label">آخر موعد للتقديم</span>
                <span className="grant-deadline-date">{grant.deadlineDate}</span>
                <span className="grant-deadline-days">{grant.daysLeft} يوماً متبقياً</span>
              </div>
              <MdOutlineAccessTime className="grant-deadline-icon" />
            </div>
            <div className="grant-progress-track">
              <div
                className="grant-progress-fill"
                style={{ width: `${grant.progressPercent}%` }}
              ></div>
            </div>

            <button type="button" className="grant-apply-btn">
              <FiExternalLink />
              التقديم على المنحة
            </button>

            <button type="button" className="grant-ai-review-btn">
              مراجعة المستندات بالذكاء الاصطناعي
              <HiSparkles />
            </button>
          </div>

          <div className="grant-contents-card">
            <h3 className="grant-contents-title">محتويات الصفحة</h3>
            <nav className="grant-contents-nav">
              {contents.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="grant-contents-link"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {i + 1}. {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* الفوتر الآن خارج حاوية الـ flex الأفقية ويأتي بأسفل الصفحة */}
      <footer className="grant-details-footer">
        <p>© 2024 منحتي. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default GrantDetails;