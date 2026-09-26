import React, { useState } from "react";
import "./Notifications.css";

/* -------------------------------------------------------
   Icons (small inline SVGs — swap for your icon library,
   e.g. lucide-react, if the project already uses one)
------------------------------------------------------- */
const IconMarkAllRead = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1.5 8.5 5 12l4.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 8.5 12 12l4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAcademicCap = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3 1 7l9 4 9-4-9-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M5 9v4c0 1.1 2.24 2 5 2s5-.9 5-2V9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v4.5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCheckBadge = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10.2 9 12.5l4.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBookmark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 3.5h10a1 1 0 0 1 1 1V17l-6-4-6 4V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconCalendarExpired = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="3.5" width="15" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 7.5h15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 1.5v3M13.5 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.3 10.3l3.4 3.4M11.7 10.3l-3.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* -------------------------------------------------------
   Data — replace with your API / store data
------------------------------------------------------- */
const FILTERS = [
  { id: "all", label: "الكل", count: null },
  { id: "opportunities", label: "منح مناسبة لك", count: 3 },
  { id: "deadlines", label: "المواعيد", count: 2 },
];

const SECTIONS = [
  {
    id: "today",
    label: "اليوم",
    items: [
      {
        id: 1,
        variant: "info",
        icon: <IconAcademicCap />,
        badge: "مطابقة 98%",
        title: "منحة جديدة تناسبك",
        description: ".تم العثور على منحة جديدة تتوافق مع ملفك الأكاديمي في جامعة أكسفورد",
        time: "منذ ساعتين",
        cta: "عرض المنحة",
      },
      {
        id: 2,
        variant: "warning",
        icon: <IconClock />,
        badge: "ينتهي قريباً",
        title: "تذكير بموعد التقديم",
        description: ".تبقى 7 أيام على انتهاء التقديم لمنحة دراسات عليا في جامعة أكسفورد",
        time: "منذ 5 ساعات",
        cta: "تقديم الآن",
      },
    ],
  },
  {
    id: "this-week",
    label: "هذا الأسبوع",
    items: [
      {
        id: 3,
        variant: "success",
        icon: <IconCheckBadge />,
        badge: "تم بنجاح",
        title: "اكتمال مراجعة المستندات بنجاح",
        description: ".تم التحقق من سيرتك الذاتية ومستنداتك بواسطة الذكاء الاصطناعي وجاهزيتها للتقديم بنجاح",
        time: "منذ يومين",
        cta: "استعراض الملف",
      },
      {
        id: 4,
        variant: "neutral",
        icon: <IconBookmark />,
        badge: "محدّث",
        title: "تحديث المحفوظات",
        description: ".تم تحديث مقاعد التقديم والشروط المطلوبة في منحة الحكومة التركية المحفوظة لديك",
        time: "منذ 3 أيام",
        cta: "عرض التفاصيل",
      },
    ],
  },
  {
    id: "older",
    label: "أقدم",
    items: [
      {
        id: 5,
        variant: "danger",
        icon: <IconCalendarExpired />,
        badge: "منتهية / مغلقة",
        title: "انتهاء موعد التقديم لمنحة الحكومة الكورية GKS",
        description: ".أُغلق باب استلام الطلبات رسمياً لهذه الدورة. يمكنك تصفح فرص بديلة متطابقة مع مؤهلاتك",
        time: "منذ أسبوعين",
        cta: "اكتشف منحاً بديلة",
      },
    ],
  },
];

/* -------------------------------------------------------
   Single notification card
------------------------------------------------------- */
function NotificationCard({ item, onAction }) {
  return (
    <article className={`n-card n-card--${item.variant}`}>
      <div className="n-card__icon">{item.icon}</div>

      <div className="n-card__body">
        <div className="n-card__top">
          <span className="n-card__badge">{item.badge}</span>
          <h3 className="n-card__title">{item.title}</h3>
        </div>
        <p className="n-card__desc">{item.description}</p>
        <span className="n-card__time">{item.time}</span>
      </div>

      <button className="n-card__cta" onClick={() => onAction?.(item)}>
        {item.cta}
      </button>
    </article>
  );
}

/* -------------------------------------------------------
   Page
------------------------------------------------------- */
export default function NotificationsPage({ onCardAction, onMarkAllRead }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleSections = SECTIONS.map((section) => ({
    ...section,
    items:
      activeFilter === "all"
        ? section.items
        : section.items.filter((item) =>
            activeFilter === "deadlines"
              ? item.variant === "warning" || item.variant === "danger"
              : item.variant === "info"
          ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="notifications-page" dir="ltr">
      <header className="notifications-header">
        <div className="notifications-header__row">
          <button className="mark-all-btn" onClick={onMarkAllRead}>
            <span>تحديد الكل كمقروء</span>
            <IconMarkAllRead />
          </button>

          <div className="notifications-header__titles">
            <h1>الإشعارات</h1>
            <p>.تابع آخر التنبيهات المتعلقة بالمنح والفرص المناسبة لك</p>
          </div>
        </div>

        <nav className="notifications-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-tab ${activeFilter === f.id ? "filter-tab--active" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.count != null && <span className="filter-tab__count">{f.count}</span>}
              <span>{f.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="notifications-body">
        {visibleSections.map((section) => (
          <section className="notifications-section" key={section.id}>
            <div className="notifications-section__header">
              <span className="dot" />
              <span>{section.label}</span>
            </div>

            {section.items.map((item) => (
              <NotificationCard key={item.id} item={item} onAction={onCardAction} />
            ))}
          </section>
        ))}

        {visibleSections.length === 0 && (
          <p className="notifications-empty">.لا توجد إشعارات ضمن هذا التصنيف حالياً</p>
        )}
      </div>

      <footer className="notifications-footer">
        <span>.© 2026 منصة منحتي. جميع الحقوق محفوظة</span>
      </footer>
    </div>
  );
}
