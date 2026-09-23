import React from "react";
import SideNavBar from "../../components/Sidenavbar/Sidenavbar";
import logo from "../../image/logo.png";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiBook,
  FiFlag,
  FiHeart,
  FiPlus,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiCircle,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

import turkiyeGrant from "../../image/minhatiTK.jpg";
import daadGrant from "../../image/DAAD2.jpg";
import cheveningGrant from "../../image/chevening.jpg";

import "./DashboardPage.css";

// ===== بيانات وهمية - بتتبدل ببيانات الـ API لاحقاً ====
const suggestedGrants = [
  {
    id: 1,
    title: "المنحة التركية (Türkiye Bursları)",
    degrees: "بكالوريوس، ماجستير",
    funding: "ممولة بالكامل",
    match: 92,
    image: turkiyeGrant,
  },
  {
    id: 2,
    title: "منحة DAAD الألمانية",
    degrees: "ماجستير، هندسة برمجيات",
    funding: "متاحة لملفك",
    match: 88,
    image: daadGrant,
  },
  {
    id: 3,
    title: "منحة تشيفنينغ البريطانية",
    degrees: "ماجستير، سنة واحدة",
    funding: "ممولة بالكامل",
    match: 75,
    image: cheveningGrant,
  },
];

const profileChecklist = [
  { key: "personal", label: "المعلومات الشخصية", done: true },
  { key: "education", label: "التعلم", done: true },
  { key: "major", label: "التخصص", done: true },
  { key: "interests", label: "الاهتمامات", done: false },
];

const personalInfo = [
  { label: "الاسم الكامل", value: "إيهام شعبان" },
  { label: "البريد الإلكتروني", value: "eman@example.com" },
  { label: "البلد", value: "فلسطين" },
  { label: "المدينة", value: "غزة" },
];

const academicInfo = [
  { label: "الدرجة", value: "بكالوريوس" },
  { label: "التخصص", value: "هندسة برمجيات" },
  { label: "الجامعة", value: "جامعة فلسطين" },
  { label: "سنة التخرج", value: "2027" },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "المنحة التركية",
    date: "20 فبراير، متبقي 5 أيام",
    urgency: "high",
  },
  {
    id: 2,
    title: "منحة DAAD",
    date: "15 مارس، متبقي 30 يوماً",
    urgency: "medium",
  },
  {
    id: 3,
    title: "منحة تشيفنينغ",
    date: "30 أبريل، متبقي 75 يوماً",
    urgency: "low",
  },
];

const documents = [
  { id: 1, name: "السيرة الذاتية (CV)", updated: "تم التحديث أمس" },
  { id: 2, name: "رسالة الدافع (عامة)", updated: "منذ أسبوع" },
];

const skillsAndInterests = [
  "Problem Solving",
  "Software Engineering",
  "User Research",
  "Figma",
  "UI/UX Design",
];

// ===== مكونات فرعية =====

function GrantSuggestionCard({ grant }) {
  return (
    <div className="grant-suggestion-card">
      <img src={grant.image} alt="" className="grant-suggestion-logo" />
      <div className="grant-suggestion-body">
        <h4 className="grant-suggestion-title">{grant.title}</h4>
        <p className="grant-suggestion-meta">{grant.degrees}</p>
        <div className="grant-suggestion-footer">
          <span className="grant-suggestion-funding">{grant.funding}</span>
          <span className="grant-suggestion-match">مطابقة {grant.match}%</span>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, rows, action }) {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <h3>{title}</h3>
        <span className="info-card-icon">
          <Icon />
        </span>
      </div>
      <dl className="info-card-list">
        {rows.map((row) => (
          <div className="info-card-row" key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      {action}
    </div>
  );
}

function DeadlineItem({ item }) {
  return (
    <li className="deadline-item">
      <span className={`deadline-dot deadline-dot--${item.urgency}`} />
      <div className="deadline-item-text">
        <span className="deadline-item-title">{item.title}</span>
        <span className="deadline-item-date">{item.date}</span>
      </div>
    </li>
  );
}

function DocumentItem({ doc }) {
  return (
    <li className="document-item">
      <span className="document-icon">
        <FiFileText />
      </span>
      <div className="document-item-text">
        <span className="document-item-name">{doc.name}</span>
        <span className="document-item-updated">{doc.updated}</span>
      </div>
    </li>
  );
}

// ===== الصفحة الرئيسية =====

export default function DashboardPage() {
  const completion = 80;

  return (
    <div className="dashboard-page" dir="rtl">
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-brand">
          <img src={logo} className="university-logo" />
        </div>
        <nav className="dashboard-topbar-nav">
          <a href="#home" className="active">
            الرئيسية
          </a>
          <a href="#grants">المنح الدراسية</a>
          <a href="#tools">الأدوات الذكية</a>
        </nav>
        <div className="dashboard-topbar-actions">
          <button
            type="button"
            className="topbar-icon-btn"
            aria-label="الإشعارات"
          >
            <FiBell />
          </button>
          <button type="button" className="topbar-icon-btn">
            <HiOutlineSparkles />
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        <SideNavBar />

        <main className="dashboard-main">
          <section className="dashboard-welcome">
            <h1>مرحباً، أحمد 👋</h1>
            <p>طالب هندسة برمجيات، فلسطين. جاهز لاكتشاف فرص جديدة؟</p>
          </section>

          <section className="dashboard-top-grid">
            <div className="completion-card">
              <div className="completion-card-header">
                <h3>إكمال الملف الشخصي</h3>
                <span className="completion-percent">{completion}%</span>
              </div>
              <p className="completion-subtitle">
                أكمل ملفك لزيادة فرص تطابق المنح بنسبة 40%
              </p>

              <div className="completion-progress-track">
                <div
                  className="completion-progress-fill"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <ul className="completion-checklist">
                {profileChecklist.map((item) => (
                  <li key={item.key} className="completion-checklist-item">
                    {item.done ? (
                      <FiCheckCircle className="check-icon check-icon--done" />
                    ) : (
                      <FiCircle className="check-icon" />
                    )}
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="complete-profile-btn">
                إكمال الملف
              </button>
            </div>
            <div className="suggested-grants-card">
              <div className="suggested-grants-header">
                <h3>منح مقترحة لك</h3>
                <button type="button" className="see-all-link">
                  عرض الكل
                </button>
              </div>
              <div className="suggested-grants-list">
                {suggestedGrants.map((grant) => (
                  <GrantSuggestionCard grant={grant} key={grant.id} />
                ))}
              </div>
            </div>
          </section>

          <section className="dashboard-mid-grid">
            <InfoCard
              icon={FiBook}
              title="الملف الأكاديمي"
              rows={academicInfo}
              action={
                <div className="gpa-badge">
                  <span className="gpa-value">3.5 / 4.0</span>
                  <span className="gpa-label">المعدل التراكمي</span>
                </div>
              }
            />
            <InfoCard
              icon={FiUser}
              title="المعلومات الشخصية"
              rows={personalInfo}
            />
            <div className="list-card">
              <h3>المواعيد النهائية القادمة</h3>
              <ul className="deadline-list">
                {upcomingDeadlines.map((item) => (
                  <DeadlineItem item={item} key={item.id} />
                ))}
              </ul>
            </div>
            <div className="list-card">
              <h3>المستندات</h3>
              <ul className="document-list">
                {documents.map((doc) => (
                  <DocumentItem doc={doc} key={doc.id} />
                ))}
              </ul>
            </div>
          </section>

          {/* <section className="dashboard-mid-grid">
            <div className="list-card">
              <h3>المستندات</h3>
              <ul className="document-list">
                {documents.map((doc) => (
                  <DocumentItem doc={doc} key={doc.id} />
                ))}
              </ul>
            </div>
          </section> */}
          <section className="dashboard-top-card">
            <section className="skills-card">
              <div className="skills-card-header">
                <h3>المهارات والاهتمامات</h3>
                <FiFlag className="skills-card-icon" />
              </div>
              <div className="skills-tags">
                {skillsAndInterests.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
                <button type="button" className="skill-tag skill-tag--add">
                  <FiPlus /> إضافة مهارة
                </button>
              </div>
              <div></div>
            </section>
            <section className="ai-tools-banner">
              <span className="ai-tools-icon">
                <HiOutlineSparkles />
              </span>
              <div className="ai-tools-text">
                <h3>أدوات الذكاء الاصطناعي</h3>
                <p>طوّر ملفك بأدوات ذكية مخصصة لفرص المنح المستقبلية</p>
              </div>
              <div className="ai-tools-actions">
                <button type="button" className="ai-tool-btn">
                  منشئ السيرة الذاتية
                </button>
                <button
                  type="button"
                  className="ai-tool-btn ai-tool-btn--ghost"
                >
                  مساعد رسالة الدافع
                </button>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}
