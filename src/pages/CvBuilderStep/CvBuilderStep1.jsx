import { useState } from "react";
import "./CvBuilderStep1.css";
import logos from "../../image/logos.jpeg";
import cvphoto from "../../image/cvphoto.jpg";

const STEPS = [
  { id: 1, label: "المعلومات الشخصية" },
  { id: 2, label: "التعليم" },
  { id: 3, label: "الخبرة" },
  { id: 4, label: "المهارات والإنجازات" },
];

const NAV_LINKS = ["الرئيسية", "اكتشف المنح", "أدوات الذكاء الاصطناعي"];
const FOOTER_LINKS = [
  "عن الأداة",
  "دليل التقديم للمنح",
  "سياسة الخصوصية",
  "مركز المساعدة",
];

const Icon = ({ name }) => {
  const paths = {
    bell: "M12 3a6 6 0 0 0-6 6v3.6L4.5 15v1h15v-1L18 12.6V9a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0",
    arrow: "M19 12H5m6-6-6 6 6 6",
    arrowRight: "M5 12h14m-6-6 6 6-6 6",
    spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
    info: "M12 8v.01M12 11v5M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    globe:
      "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-9 9h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z",
    check: "M5 12.5l4.5 4.5L19 7.5",
  };
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
      <path d={paths[name]} />
    </svg>
  );
};

function Field({ id, label, hint, required, children, className = "" }) {
  return (
    <div className={`cv-field ${className}`}>
      <label htmlFor={id} className="cv-label">
        {label}
        {required && <span className="cv-required"> *</span>}
      </label>
      {children}
      {hint && <p className="cv-hint">{hint}</p>}
    </div>
  );
}

export default function CvBuilderStep1({
  logoSrc = logos,
  avatarSrc = cvphoto,
  userName = "محمد",
  currentStep = 1,
  totalSteps = 5,
  onNext = () => {},
  onBack = () => {},
}) {
  const [form, setForm] = useState({
    fullNameAr: "",
    fullNameEn: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    bio: "",
  });
  const [errors, setErrors] = useState({});

  const BIO_MAX = 500;

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.fullNameAr.trim()) er.fullNameAr = "الاسم بالعربية مطلوب";
    if (!form.fullNameEn.trim()) er.fullNameEn = "الاسم بالإنجليزية مطلوب";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      er.email = "أدخل بريدًا إلكترونيًا صحيحًا";
    if (!form.phone.trim()) er.phone = "رقم الهاتف مطلوب";
    if (!form.location.trim()) er.location = "الدولة أو المدينة مطلوبة";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  const inputProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    className: `cv-input${errors[name] ? " cv-input--error" : ""}`,
    "aria-invalid": errors[name] ? "true" : undefined,
  });

  return (
    <div className="cv-page" dir="rtl" lang="ar">
      {/* Header */}
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
            <img className="cv-avatar" src={avatarSrc} alt={userName} />
            <span className="cv-user__name">{userName}</span>
          </div>
        </div>
      </header>

      <main className="cv-main">
        {/* Title */}
        <div className="cv-title-wrap">
          <h1 className="cv-title">أنشئ سيرتك الذاتية بالذكاء الاصطناعي</h1>
          <p className="cv-subtitle">
            أنشئ سيرة ذاتية احترافية تبرز مهاراتك وخبراتك وتساعدك على الاستعداد
            لأمثل فرص التقديم والقبول في المنح الدولية.
          </p>
          <span className="cv-chip">
            <Icon name="globe" /> مساعدة ذكية
          </span>
        </div>

        {/* Stepper */}
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

        {/* Form card */}
        <form className="cv-card" onSubmit={handleSubmit} noValidate>
          <div className="cv-card__head">
            <div className="cv-card__title-group">
              <h2 className="cv-card__title">المعلومات الشخصية</h2>
              <span className="cv-badge">
                الخطوة {currentStep} من {totalSteps}
              </span>
            </div>
            <span className="cv-autosave">
              <Icon name="check" /> حفظ تلقائي للمسودات
            </span>
          </div>

          <p className="cv-card__intro">
            ادخل بياناتك الأساسية، فهذه هي أول ما تطلع عليه لجان تقييم المنح
            الدراسية.
          </p>

          <div className="cv-grid">
            <Field
              id="fullNameAr"
              label="الاسم الكامل باللغة العربية (رباعي)"
              required
              className="cv-col-2"
              hint={
                errors.fullNameAr ||
                "اكتب الاسم كما هو في جواز السفر أو الهوية."
              }
            >
              <input
                {...inputProps("fullNameAr")}
                placeholder="أحمد محمد سالم"
                autoComplete="name"
              />
            </Field>

            <Field
              id="fullNameEn"
              label="الاسم الكامل باللغة الإنجليزية (رباعي)"
              required
              className="cv-col-2"
              hint={errors.fullNameEn || "اكتب الاسم كما هو في جواز السفر."}
            >
              <input
                {...inputProps("fullNameEn")}
                dir="ltr"
                placeholder="Ahmed Mohammed Salem"
                autoComplete="name"
              />
            </Field>

            <Field
              id="email"
              label="البريد الإلكتروني الرئيسي"
              required
              hint={errors.email}
            >
              <input
                {...inputProps("email")}
                type="email"
                dir="ltr"
                placeholder="ahmed.salem@example.com"
                autoComplete="email"
              />
            </Field>

            <Field
              id="phone"
              label="رقم الهاتف (مع المفتاح الدولي)"
              required
              hint={errors.phone}
            >
              <input
                {...inputProps("phone")}
                type="tel"
                dir="ltr"
                placeholder="+970 59 952 3456"
                autoComplete="tel"
              />
            </Field>

            <Field
              id="location"
              label="الدولة / المدينة الحالية"
              required
              className="cv-col-2"
              hint={errors.location}
            >
              <input
                {...inputProps("location")}
                placeholder="مثال: غزة، فلسطين"
              />
            </Field>

            <Field id="linkedin" label="رابط حساب لينكد إن (LinkedIn)">
              <input
                {...inputProps("linkedin")}
                dir="ltr"
                placeholder="linkedin.com/in/ahmed-salem"
              />
            </Field>

            <Field
              id="portfolio"
              label="رابط المعرض أو الموقع الشخصي (Portfolio)"
            >
              <input
                {...inputProps("portfolio")}
                dir="ltr"
                placeholder="ahmedsalem.dev"
              />
            </Field>

            <div className="cv-field cv-col-2">
              <div className="cv-bio-head">
                <label htmlFor="bio" className="cv-label">
                  نبذة شخصية وأكاديمية عنك
                </label>
                <button type="button" className="cv-ai-btn">
                  <Icon name="spark" /> ساعدني في الكتابة بالذكاء
                </button>
              </div>
              <textarea
                id="bio"
                name="bio"
                rows={6}
                maxLength={BIO_MAX}
                value={form.bio}
                onChange={update}
                className="cv-input cv-textarea"
                placeholder="طالب هندسة برمجيات شغوف بالذكاء الاصطناعي وعلوم البيانات، أمتلك خبرة عملية في تطوير تطبيقات الويب والمشاريع البحثية، وأطمح لمتابعة دراستي العليا بمنحة دراسية متقدمة للإسهام في رقعة الخدمات التعليمية."
              />
              <p className="cv-hint cv-hint--row">
                <span>يفضّل أن تكون النبذة بين 100 و300 كلمة.</span>
                <span className="cv-counter">
                  {form.bio.length} / {BIO_MAX}
                </span>
              </p>
            </div>
          </div>

          <div className="cv-actions">
            <button
              type="button"
              className="cv-btn cv-btn--ghost"
              onClick={onBack}
              disabled={currentStep === 1}
            >
              <Icon name="arrowRight" /> السابق
            </button>
            <span className="cv-actions__count">
              الخطوة {currentStep} من {totalSteps}
            </span>
            <button type="submit" className="cv-btn cv-btn--primary">
              التالي <Icon name="arrow" />
            </button>
          </div>
        </form>

        {/* Info banner */}
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

      {/* Footer */}
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
