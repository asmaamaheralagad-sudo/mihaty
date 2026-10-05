import "./CvShared.css";
import logos from "../../image/logos.jpeg";
import cvphoto from "../../image/cvphoto.jpg";

export const STEPS = [
  { id: 1, label: "المعلومات الشخصية" },
  { id: 2, label: "التعليم" },
  { id: 3, label: "الخبرات" },
  { id: 4, label: "المهارات والإنجازات" },
  { id: 5, label: "المراجعة والتصدير" },
];
export const TOTAL_STEPS = STEPS.length;

const NAV_LINKS = ["الرئيسية", "اكتشف المنح", "أدوات الذكاء الاصطناعي"];
const FOOTER_LINKS = [
  "عن الأداة",
  "دليل التقديم للمنح",
  "سياسة الخصوصية",
  "مركز المساعدة",
];

const ICON_PATHS = {
  bell: "M12 3a6 6 0 0 0-6 6v3.6L4.5 15v1h15v-1L18 12.6V9a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0",
  arrow: "M19 12H5m6-6-6 6 6 6",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
  info: "M12 8v.01M12 11v5M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  globe:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-9 9h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 12h10l1-12M9 7V4h6v3",
};

export function Icon({ name }) {
  return (
    <svg
      className="cv-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className = "",
}) {
  return (
    <div className={`cv-field ${className}`}>
      <label htmlFor={id} className="cv-label">
        {label}
        {required && <span className="cv-required"> *</span>}
      </label>
      {children}
      {(error || hint) && (
        <p className={`cv-hint${error ? " cv-hint--error" : ""}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

/** Page chrome shared by every step: header, title, stepper, banner, footer. */
export function CvShell({
  logoSrc = logos,
  avatarSrc = cvphoto,
  userName = "محمد",
  currentStep = 1,
  children,
}) {
  return (
    <div className="cv-page" dir="rtl" lang="ar">
      <header className="cv-header">
        <div className="cv-header__inner">
          <a href="/" className="cv-logo" aria-label="منحتي">
            <img src={logoSrc} alt="منحتي" />
          </a>

          <nav className="cv-nav" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((l, i) => (
              <a key={l} href="#" className={i === 0 ? "is-active" : ""}>
                {l}
              </a>
            ))}
          </nav>

          <div className="cv-user">
            <button type="button" className="cv-bell" aria-label="الإشعارات">
              <Icon name="bell" />
              <span className="cv-bell__dot" />
            </button>
            <span className="cv-user__name">{userName}</span>
            <img className="cv-avatar" src={avatarSrc} alt={userName} />
          </div>
        </div>
      </header>

      <main className="cv-main">
        <div className="cv-title-wrap">
          <span className="cv-chip">
            <Icon name="globe" /> مساعدة ذكية
          </span>
          <h1 className="cv-title">أنشئ سيرتك الذاتية بالذكاء الاصطناعي</h1>
          <p className="cv-subtitle">
            أنشئ سيرة ذاتية احترافية تبرز مهاراتك وخبراتك وتساعدك على الاستعداد
            لأمثل فرص التقديم والقبول في المنح الدولية.
          </p>
        </div>

        <ol className="cv-stepper" aria-label="خطوات إنشاء السيرة">
          {STEPS.map((s) => {
            const state =
              s.id === currentStep
                ? "active"
                : s.id < currentStep
                  ? "done"
                  : "todo";
            return (
              <li
                key={s.id}
                className={`cv-step cv-step--${state}`}
                aria-current={state === "active" ? "step" : undefined}
              >
                <span className="cv-step__dot">
                  {state === "done" ? <Icon name="check" /> : s.id}
                </span>
                <span className="cv-step__label">{s.label}</span>
              </li>
            );
          })}
        </ol>

        {children}

        <aside className="cv-banner">
          <span className="cv-banner__icon">
            <Icon name="info" />
          </span>
          <div>
            <h3 className="cv-banner__title">لماذا تهم سيرة منحتي الذكية؟</h3>
            <p className="cv-banner__text">
              يقوم مساعد الذكاء الاصطناعي بصياغة سيرتك وفق معايير القبول في
              المنح الكبرى مثل Chevening وDAAD وفولبرايت، لتزيد فرص اختيارك في
              المقابلات الشخصية.
            </p>
          </div>
        </aside>
      </main>

      <footer className="cv-footer">
        <div className="cv-footer__inner">
          <span>© 2026 منحتي — أداة السيرة الذاتية للمنح الدراسية</span>
          <nav className="cv-footer__links" aria-label="روابط التذييل">
            {FOOTER_LINKS.map((l) => (
              <a key={l} href="#">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default CvShell;
