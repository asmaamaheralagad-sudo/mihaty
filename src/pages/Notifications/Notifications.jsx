import { useMemo, useState } from "react";
import "./Notifications.css";
import SideNavBar from "../../components/SideNavBar/SideNavBar"; // عدّل المسار حسب مكان ملفك

/* =========================================================
   مهم (عشان ما ينقلب):
   1) dir="rtl" مرة وحدة بس (هون على الـ root، أو الأفضل على <html dir="rtl" lang="ar">)
   2) ترتيب العناصر في الـ JSX = ترتيب القراءة من اليمين لليسار.
      يعني أول عنصر يظهر عالـ يمين. (Figma بيصدّر "order" من اليسار لليمين، فأنا عاكسته.)
   3) الأسهم مرسومة أصلاً باتجاه RTL، فما في rotate.
   ========================================================= */

const ICONS = {
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  bell: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"],
  search: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "m21 21-4.3-4.3"],
  filter: ["M21 4h-7", "M10 4H3", "M21 12h-9", "M8 12H3", "M21 20h-5", "M12 20H3", "M14 2v4", "M8 10v4", "M16 18v4"],
  sort: ["m3 16 4 4 4-4", "M7 20V4", "m21 8-4-4-4 4", "M17 4v16"],
  chevron: ["m15 18-6-6 6-6"], // ‹ (يشير لليسار = "التالي" في RTL)
  arrow: ["m12 19-7-7 7-7", "M19 12H5"], // ← (اتجاه RTL)
  checkAll: ["M18 6 7 17l-5-5", "m22 10-7.5 7.5L13 16"],
  trash: ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
  archive: ["M4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2z", "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", "M10 12h4"],
  cap: ["M22 10 12 5 2 10l10 5 10-5z", "M6 12v5c3 3 9 3 12 0v-5"],
  clock: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"],
  shield: ["M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z", "m9 12 2 2 4-4"],
  bookmark: ["m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"],
  calendarX: ["M8 2v4", "M16 2v4", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M3 10h18", "m14 14-4 4", "m10 14 4 4"],
};

function Icon({ name, size = 16, stroke = 2 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ---------- بيانات تجريبية (استبدلها بالـ API) ---------- */
const GROUPS = [
  { key: "today", label: "اليوم", dot: "#1b4d79", ring: "#dce8f4" },
  { key: "week", label: "هذا الأسبوع", dot: "#10b981", ring: "#d1fae5" },
  { key: "older", label: "أقدم", dot: "#94a3b8", ring: "#f1f5f9" },
];

const NOTIFICATIONS = [
  { id: 1, group: "today", category: "new", unread: true, variant: "info", icon: "cap",
    badge: "توصية جديدة", title: "منحة جديدة تناسبك",
    text: "ظهرت منحة جديدة تطابق تخصصك ومعدلك الدراسي.", time: "منذ ١٠ دقائق", action: "عرض المنحة" },
  { id: 2, group: "today", category: "deadline", unread: true, variant: "warning", icon: "clock",
    badge: "تذكير", title: "اقتراب الموعد النهائي",
    text: "تبقّت ٣ أيام على إغلاق باب التقديم لإحدى منحك المحفوظة.", time: "منذ ساعتين", action: "أكمل الآن" },
  { id: 3, group: "week", category: "docs", unread: false, variant: "success", icon: "shield",
    badge: "تم التحقق", title: "اكتمل التحقق من مستنداتك",
    text: "تمت مراجعة جميع مستنداتك وهي جاهزة للتقديم.", time: "أمس", action: "عرض المستندات" },
  { id: 4, group: "week", category: "new", unread: false, variant: "neutral", icon: "bookmark",
    badge: "محفوظة", title: "تحديث على منحة محفوظة",
    text: "تم تعديل شروط التقديم على المنحة التي حفظتها.", time: "قبل ٣ أيام", action: "عرض التحديث" },
  { id: 5, group: "older", category: "deadline", unread: false, variant: "danger", icon: "calendarX",
    badge: "انتهى الموعد", title: "انتهى موعد التقديم على منحة محفوظة",
    text: "أُغلق باب التقديم، يمكنك متابعة المنح المشابهة المتاحة.", time: "قبل أسبوع", action: "منح مشابهة" },
];

const TABS = [
  { key: "all", label: "الكل" },
  { key: "new", label: "منح جديدة ومقترحة" },
  { key: "deadline", label: "مواعيد ومتابعات" },
  { key: "docs", label: "مراجعات الذكاء والمستندات", alert: true },
];

/* ---------- Card ---------- */
function NotificationCard({ n, selected, onToggle }) {
  return (
    <article
      className={`notif-card notif-card--${n.variant}`}
      aria-pressed={selected}
      onClick={() => onToggle(n.id)}
    >
      {/* 1) المحتوى (يمين) */}
      <div className="notif-card__main">
        <div className="notif-card__icon">
          <Icon name={n.icon} size={20} stroke={1.75} />
        </div>
        <div className="notif-card__body">
          <div className="notif-card__head">
            <h3 className="notif-card__title">{n.title}</h3>
            <span className="notif-card__badge">{n.badge}</span>
          </div>
          <p className="notif-card__text">{n.text}</p>
          <span className="notif-card__time">{n.time}</span>
        </div>
      </div>

      {/* 2) الزر (يسار) — نص ثم سهم */}
      <button
        type="button"
        className="notif-card__action"
        onClick={(e) => e.stopPropagation()}
      >
        <span>{n.action}</span>
        <Icon name="arrow" size={14} />
      </button>
    </article>
  );
}

/* ---------- Page ---------- */
function NotificationsContent() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSelected = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const visible = useMemo(
    () =>
      NOTIFICATIONS.filter(
        (n) =>
          (tab === "all" || n.category === tab) &&
          (!unreadOnly || n.unread) &&
          (!query || (n.title + n.text).includes(query))
      ),
    [tab, query, unreadOnly]
  );

  const countFor = (key) =>
    key === "all" ? NOTIFICATIONS.length : NOTIFICATIONS.filter((n) => n.category === key).length;

  return (
    <main className="notif-page" dir="rtl">
      {/* ===== Header ===== */}
      <header className="notif-header">
        {/* يمين: العنوان */}
        <div>
          <nav className="breadcrumb" aria-label="مسار التنقل">
            <span>الرئيسية</span>
            <Icon name="chevron" size={12} />
            <span className="breadcrumb__current">الإشعارات</span>
          </nav>
          <h1 className="notif-title">الإشعارات</h1>
          <p className="notif-subtitle">تابع آخر المنح والمواعيد وحالة مستنداتك.</p>
        </div>

        {/* يسار: الإجراء السريع — أيقونة ثم نص */}
        <button type="button" className="btn-quick">
          <Icon name="checkAll" size={16} stroke={2.2} />
          <span>تعليم الكل كمقروء</span>
        </button>
      </header>

      {/* ===== Toolbar ===== */}
      <section className="toolbar" aria-label="البحث والتصفية">
        <div className="toolbar__row">
          {/* يمين: البحث */}
          <div className="search">
            <span className="search__icon">
              <Icon name="search" size={16} />
            </span>
            <input
              className="search__input"
              type="search"
              placeholder="ابحث في الإشعارات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* يسار: الفرز ثم التصفية */}
          <div className="toolbar__controls">
            <button type="button" className="chip-btn">
              <Icon name="sort" size={14} />
              <span>ترتيب:</span>
              <strong>الأحدث أولاً</strong>
            </button>
            <button type="button" className="chip-btn">
              <Icon name="filter" size={14} />
              <span>تصفية متقدمة</span>
            </button>
          </div>
        </div>

        <div className="toolbar__filters">
          {/* يمين: التبويبات (الكل أول واحد) */}
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className={`tab ${t.alert ? "tab--alert" : ""}`}
                onClick={() => setTab(t.key)}
              >
                <span>{t.label}</span>
                <span className="tab__count">{countFor(t.key)}</span>
              </button>
            ))}
          </div>

          {/* يسار: خيارات سريعة — checkbox ثم نص */}
          <div className="toggles">
            <label className="notif-toggle">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(e) => setUnreadOnly(e.target.checked)}
              />
              <span>غير المقروءة فقط</span>
            </label>
            <label className="notif-toggle">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
              />
              <span>عرض المؤرشفة</span>
            </label>
          </div>
        </div>
      </section>

      {/* ===== Bulk banner (يظهر لما في تحديد) ===== */}
      {selected.length > 0 && (
        <section className="bulk" aria-live="polite">
          <span>{selected.length} محدد</span>

          <div className="bulk__actions">
            <button type="button" className="bulk__btn bulk__btn--ok">
              <Icon name="checkAll" size={14} />
              <span>مقروء</span>
            </button>
            <button type="button" className="bulk__btn bulk__btn--muted">
              <Icon name="archive" size={14} />
              <span>أرشفة</span>
            </button>
            <button type="button" className="bulk__btn bulk__btn--danger">
              <Icon name="trash" size={14} />
              <span>حذف</span>
            </button>
          </div>

          <button type="button" className="bulk__cancel" onClick={() => setSelected([])}>
            إلغاء
          </button>
        </section>
      )}

      {/* ===== Timeline ===== */}
      <section className="feed" aria-label="قائمة الإشعارات">
        {visible.length === 0 && <p className="empty">ما في إشعارات مطابقة.</p>}

        {GROUPS.map((g) => {
          const items = visible.filter((n) => n.group === g.key);
          if (!items.length) return null;
          return (
            <div className="group" key={g.key}>
              <div className="group__head" style={{ "--dot": g.dot, "--dot-ring": g.ring }}>
                <span className="group__dot" />
                <span>{g.label}</span>
              </div>
              {items.map((n) => (
                <NotificationCard
                  key={n.id}
                  n={n}
                  selected={selected.includes(n.id)}
                  onToggle={toggleSelected}
                />
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
}

/* ---------- TopNavBar ---------- */
function TopNavBar() {
  return (
    <header className="topbar">
      {/* يمين → يسار (ترتيب القراءة) */}
      <button type="button" className="topbar__btn" aria-label="الإشعارات">
        <Icon name="bell" size={20} stroke={1.75} />
      </button>
      <button type="button" className="topbar__btn" aria-label="القائمة">
        <Icon name="menu" size={22} stroke={1.75} />
      </button>
    </header>
  );
}

/* ---------- الصفحة الكاملة ---------- */
export default function NotificationsPage() {
  return (
    <div className="notif-app" dir="rtl" lang="ar">
      <TopNavBar />

      {/* Application Shell: الـ Sidebar أول عنصر = على اليمين */}
      <div className="notif-shell">
        <SideNavBar activeKey="notifications" />
        <NotificationsContent />
      </div>

      <footer className="site-footer">
        <p>© ٢٠٢٦ منحتي. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
