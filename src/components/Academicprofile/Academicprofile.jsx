import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import SideNavBar from "../SideNavBar/SideNavBar";
import TopAppBar from "../TopAppBar/TopAppBar";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  FaCamera,
  FaPencilAlt,
  FaTrash,
  FaPlus,
  FaStar,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaBookOpen,
  FaLightbulb,
  FaTimes,
  FaUniversity,
  FaSchool,
  FaCertificate,
  FaGraduationCap,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import "./Academicprofile.css";

/* =========================================================
   ثوابت وبيانات مبدئية
========================================================= */

const todayISO = () => new Date().toISOString().split("T")[0];
const currentYear = new Date().getFullYear();

const initialPersonal = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  nationality: "",
  city: "",
};

const personalFieldsMeta = [
  { key: "fullName", label: "الاسم الكامل", placeholder: "مثال: أحمد محمد عبدالله" },
  { key: "email", label: "البريد الإلكتروني", placeholder: "example@email.com" },
  { key: "phone", label: "رقم الهاتف", placeholder: "+972 592 772 935" },
  { key: "birthDate", label: "تاريخ الميلاد", placeholder: "مثال: 15 مارس 1999" },
  { key: "nationality", label: "الجنسية", placeholder: "مثال: فلسطيني" },
  { key: "city", label: "المدينة", placeholder: "مثال: نابلس" },
];

const emptyEducationDraft = {
  id: null,
  type: "university",
  degree: "",
  year: "",
  grade: "",
  title: "",
  subtitle: "",
};

const educationTypesMeta = {
  university: { label: "جامعة", icon: FaUniversity, color: "#D1E4FF" },
  school: { label: "مدرسة", icon: FaSchool, color: "#FFE9C7" },
  diploma: { label: "دبلوم", icon: FaGraduationCap, color: "#D9F2D9" },
  course: { label: "دورة تدريبية / شهادة", icon: FaCertificate, color: "#F3D9FA" },
};

const suggestedSkills = [
  "Python",
  "التواصل",
  "إدارة المشاريع الرشيقة (Agile)",
  "JavaScript",
  "Node.js",
];

const LANGUAGE_LEVELS = [
  "اللغة الأم",
  "مستوى متقدم",
  "مستوى متوسط",
  "مستوى مبتدئ",
];

const availableLanguages = [
  { label: "العربية", meta: "اللغة الأم" },
  { label: "الإنجليزية", meta: "مستوى متقدم" },
  { label: "الفرنسية", meta: "مستوى متوسط" },
  { label: "الألمانية", meta: "مستوى مبتدئ" },
  { label: "الإسبانية", meta: "مستوى متوسط" },
];

const LINK_TYPES = [
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "GitHub", label: "GitHub" },
  { value: "Portfolio", label: "Portfolio" },
  { value: "Behance", label: "Behance" },
  { value: "Other", label: "رابط آخر" },
];

/* =========================================================
   دوال مساعدة
========================================================= */

const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// يمنع روابط خطيرة مثل javascript:
const isSafeUrl = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const LinkIcon = ({ type }) => {
  if (type === "LinkedIn") return <FaLinkedin size={18} aria-hidden="true" />;
  if (type === "GitHub") return <FaGithub size={18} aria-hidden="true" />;
  return <FaGlobe size={18} aria-hidden="true" />;
};

/* =========================================================
   Modal عام (Escape + قفل السكرول + Accessibility)
========================================================= */

function AcademicprofileModal({ title, onClose, children }) {
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-box__header">
          <h3 id={titleId}>{title}</h3>
          <button
            type="button"
            className="modal-box__close"
            aria-label="إغلاق"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="modal-box__body">{children}</div>
      </div>
    </div>
  );
}

function ModalFooter({ onCancel, onSave, saveLabel = "حفظ", saveClass = "academic__btn-primary" }) {
  return (
    <div className="modal-box__footer">
      <button type="button" className="academic__btn-outline" onClick={onCancel}>
        إلغاء
      </button>
      <button type="button" className={saveClass} onClick={onSave}>
        {saveLabel}
      </button>
    </div>
  );
}

/* صف لغة واحد داخل المودال (كل صف يحتفظ بمستواه بنفسه) */
function LanguageOption({ lang, isAdded, onAdd }) {
  const [level, setLevel] = useState(lang.meta);

  return (
    <div className={`lang-option ${isAdded ? "lang-option--added" : ""}`}>
      <span className="lang-option__name">{lang.label}</span>

      <div className="lang-option__controls">
        <select
          disabled={isAdded}
          value={level}
          aria-label={`مستوى ${lang.label}`}
          onChange={(e) => setLevel(e.target.value)}
        >
          {LANGUAGE_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="academic__btn-primary academic__btn-sm"
          disabled={isAdded}
          onClick={() => onAdd(lang.label, level)}
        >
          {isAdded ? "تمت الإضافة" : "إضافة"}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   Academic Profile
========================================================= */

export default function AcademicProfile() {
  /* ---------- المعلومات الشخصية ---------- */
  const [personal, setPersonal] = useState(initialPersonal);
  const [personalDraft, setPersonalDraft] = useState(initialPersonal);
  const [personalErrors, setPersonalErrors] = useState({});

  /* ---------- التعليم ---------- */
  const [education, setEducation] = useState([]);
  const [educationDraft, setEducationDraft] = useState(emptyEducationDraft);
  const [educationErrors, setEducationErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------- المهارات ---------- */
  const [skills, setSkills] = useState([]);
  const [skillsDraft, setSkillsDraft] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  /* ---------- اللغات ---------- */
  const [languages, setLanguages] = useState([]);
  const [languagesDraft, setLanguagesDraft] = useState([]);
  const [customLanguage, setCustomLanguage] = useState("");
  const [customLevel, setCustomLevel] = useState("مستوى متوسط");

  /* ---------- الروابط ---------- */
  const [professionalLinks, setProfessionalLinks] = useState([]);
  const [linksDraft, setLinksDraft] = useState([]);
  const [linksErrors, setLinksErrors] = useState({});

  /* ---------- أخرى ---------- */
  const [modal, setModal] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [toast, setToast] = useState("");
  const avatarInputRef = useRef(null);

  const closeModal = useCallback(() => setModal(null), []);

  /* ---------- نسبة الاكتمال (محسوبة فعلياً) ---------- */
  const completion = useMemo(() => {
    const checks = [
      personal.fullName,
      personal.email,
      personal.phone,
      personal.birthDate,
      personal.nationality,
      personal.city,
      avatarImage,
      professionalLinks.length > 0,
      education.length > 0,
      skills.length > 0,
      languages.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [personal, avatarImage, professionalLinks, education, skills, languages]);

  /* ---------- تنظيف رابط الصورة (منع تسريب الذاكرة) ---------- */
  useEffect(() => {
    return () => {
      if (avatarImage) URL.revokeObjectURL(avatarImage);
    };
  }, [avatarImage]);

  /* ---------- Toast ---------- */
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  /* =======================================================
     المعلومات الشخصية
  ======================================================= */

  const openPersonalModal = () => {
    setPersonalDraft(personal);
    setPersonalErrors({});
    setModal("personal");
  };

  const validatePersonal = (data) => {
    const errors = {};

    if (!data.fullName.trim()) errors.fullName = "الاسم الكامل مطلوب";

    if (!data.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (!data.phone || !isValidPhoneNumber(data.phone)) {
      errors.phone = "رقم الهاتف مطلوب وغير صحيح";
    }

    if (!data.birthDate) {
      errors.birthDate = "تاريخ الميلاد مطلوب";
    } else if (data.birthDate > todayISO()) {
      errors.birthDate = "تاريخ الميلاد لا يمكن أن يكون في المستقبل";
    }

    if (!data.nationality.trim()) errors.nationality = "الجنسية مطلوبة";
    if (!data.city.trim()) errors.city = "المدينة مطلوبة";

    return errors;
  };

  const handlePersonalChange = (key, value) => {
    setPersonalDraft((prev) => ({ ...prev, [key]: value }));

    if (personalErrors[key]) {
      setPersonalErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const savePersonal = () => {
    const errors = validatePersonal(personalDraft);

    if (Object.keys(errors).length > 0) {
      setPersonalErrors(errors);
      return;
    }

    setPersonal({
      ...personalDraft,
      fullName: personalDraft.fullName.trim(),
      email: personalDraft.email.trim(),
      nationality: personalDraft.nationality.trim(),
      city: personalDraft.city.trim(),
    });
    setPersonalErrors({});
    setModal(null);
    setToast("تم حفظ المعلومات الشخصية");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast("الرجاء اختيار ملف صورة");
      return;
    }

    setAvatarImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  /* =======================================================
     الروابط المهنية
  ======================================================= */

  const openLinksModal = () => {
    setLinksDraft(professionalLinks);
    setLinksErrors({});
    setModal("links");
  };

  const addProfessionalLink = () => {
    setLinksDraft((prev) => [...prev, { id: newId(), type: "LinkedIn", url: "" }]);
  };

  const handleLinkChange = (id, key, value) => {
    setLinksDraft((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [key]: value } : link))
    );

    if (linksErrors[id]) {
      setLinksErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const removeProfessionalLink = (id) => {
    setLinksDraft((prev) => prev.filter((link) => link.id !== id));
  };

  const saveProfessionalLinks = () => {
    const errors = {};

    linksDraft.forEach((link) => {
      const url = link.url.trim();
      if (!url) errors[link.id] = "الرابط مطلوب";
      else if (!isSafeUrl(url)) errors[link.id] = "أدخل رابطاً صحيحاً يبدأ بـ https://";
    });

    if (Object.keys(errors).length > 0) {
      setLinksErrors(errors);
      return;
    }

    setProfessionalLinks(linksDraft.map((l) => ({ ...l, url: l.url.trim() })));
    setModal(null);
    setToast("تم حفظ الروابط المهنية");
  };

  /* =======================================================
     التعليم
  ======================================================= */

  const openAddEducation = () => {
    setEducationDraft({ ...emptyEducationDraft });
    setEducationErrors({});
    setModal("education");
  };

  const openEditEducation = (item) => {
    setEducationDraft(item);
    setEducationErrors({});
    setModal("education");
  };

  const handleEducationChange = (key, value) => {
    setEducationDraft((prev) => ({ ...prev, [key]: value }));

    if (educationErrors[key]) {
      setEducationErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const validateEducation = (data) => {
    const errors = {};

    if (!data.title.trim()) errors.title = "التخصص / العنوان مطلوب";
    if (!data.subtitle.trim()) errors.subtitle = "اسم المؤسسة مطلوب";

    if (data.year) {
      if (!/^\d{4}$/.test(String(data.year))) {
        errors.year = "أدخل سنة صحيحة مكوّنة من 4 أرقام";
      } else if (Number(data.year) < 1950 || Number(data.year) > currentYear + 10) {
        errors.year = "سنة غير منطقية";
      }
    }

    return errors;
  };

  const saveEducation = () => {
    const errors = validateEducation(educationDraft);

    if (Object.keys(errors).length > 0) {
      setEducationErrors(errors);
      return;
    }

    const isEdit = Boolean(educationDraft.id);

    setEducation((prev) =>
      isEdit
        ? prev.map((e) => (e.id === educationDraft.id ? educationDraft : e))
        : [...prev, { ...educationDraft, id: newId() }]
    );

    setEducationErrors({});
    setModal(null);
    setToast(isEdit ? "تم تحديث المؤهل" : "تمت إضافة المؤهل");
  };

  const confirmDeleteEducation = () => {
    setEducation((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
    setModal(null);
    setToast("تم حذف المؤهل");
  };

  const sortedEducation = useMemo(
    () => [...education].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0)),
    [education]
  );

  /* =======================================================
     المهارات
  ======================================================= */

  const openSkillsModal = () => {
    setSkillsDraft(skills);
    setNewSkill("");
    setModal("skills");
  };

  const addDraftSkill = () => {
    const value = newSkill.trim();
    if (!value) return;

    const exists = skillsDraft.some((s) => s.toLowerCase() === value.toLowerCase());
    if (exists) {
      setNewSkill("");
      return;
    }

    setSkillsDraft((prev) => [...prev, value]);
    setNewSkill("");
  };

  const removeDraftSkill = (skill) => {
    setSkillsDraft((prev) => prev.filter((s) => s !== skill));
  };

  const saveSkills = () => {
    setSkills(skillsDraft);
    setModal(null);
    setToast("تم حفظ المهارات");
  };

  const addSuggestedSkill = (skill) => {
    setSkills((prev) => (prev.includes(skill) ? prev : [...prev, skill]));
  };

  /* =======================================================
     اللغات
  ======================================================= */

  const openLanguagesModal = () => {
    setLanguagesDraft(languages);
    setCustomLanguage("");
    setCustomLevel("مستوى متوسط");
    setModal("languages");
  };

  const removeDraftLanguage = (id) => {
    setLanguagesDraft((prev) => prev.filter((l) => l.id !== id));
  };

  const addLanguageToDraft = (label, meta) => {
    setLanguagesDraft((prev) => {
      if (prev.some((l) => l.label.toLowerCase() === label.toLowerCase())) return prev;
      return [...prev, { id: newId(), label, meta }];
    });
  };

  const addCustomLanguage = () => {
    const value = customLanguage.trim();
    if (!value) return;

    addLanguageToDraft(value, customLevel);
    setCustomLanguage("");
    setCustomLevel("مستوى متوسط");
  };

  const saveLanguages = () => {
    setLanguages(languagesDraft);
    setModal(null);
    setToast("تم حفظ اللغات");
  };

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <div className="academic-layout">
      <div className="academic-main-content">
        <TopAppBar />

        <main className="academic-body-wrapper">
          {/* ---------- Header ---------- */}
          <section className="academic__header">
            <h1>الملف الأكاديمي</h1>
            <p>أكمل ملفك الشخصي لزيادة فرصك بالحصول على المنح المناسبة لك</p>
          </section>

          {/* ---------- نسبة الاكتمال ---------- */}
          <section className="academic__card academic__completion">
            <div className="academic__completion-top">
              <span className="academic__badge">{completion}%</span>
              <h2 className="academic__completion-title">الملف الشخصي</h2>
            </div>

            <div
              className="academic__progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completion}
              aria-label="نسبة اكتمال الملف"
            >
              <div
                className="academic__progress-fill"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="academic__completion-hint">
              {completion < 100 ? (
                <>
                  <FaLightbulb size={16} className="academic__hint-icon" aria-hidden="true" />
                  أكمل ملفك لزيادة فرص قبولك
                </>
              ) : (
                <>
                  <FaCheckCircle size={16} className="academic__hint-icon" aria-hidden="true" />
                  ملفك مكتمل، بالتوفيق في التقديم
                </>
              )}
            </p>
          </section>

          {/* ---------- المعلومات الشخصية ---------- */}
          <section className="academic__card">
            <div className="academic__card-header">
              <h2>المعلومات الشخصية</h2>

              <button type="button" className="academic__link-btn" onClick={openPersonalModal}>
                <FaPencilAlt size={12} aria-hidden="true" />
                تعديل
              </button>
            </div>

            <div className="academic__personal-row">
              <div className="academic__avatar-block">
                <div
                  className="academic__avatar"
                  style={
                    avatarImage
                      ? {
                          backgroundImage: `url(${avatarImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  {!avatarImage && <FaUser size={55} color="#1d4ed8" aria-hidden="true" />}
                </div>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <FaCamera size={16} aria-hidden="true" />
                  تغيير الصورة
                </button>
              </div>

              <div className="academic__personal-grid">
                {personalFieldsMeta.map(({ key, label, placeholder }) => {
                  const value =
                    key === "birthDate" ? formatDate(personal[key]) : personal[key];

                  return (
                    <div className="academic__field" key={key}>
                      <span className="academic__field-label">{label}</span>
                      <div
                        className={`academic__field-value ${
                          !value ? "academic__field-value--placeholder" : ""
                        }`}
                        dir={key === "email" || key === "phone" ? "ltr" : undefined}
                      >
                        {value || placeholder}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* الروابط المهنية */}
            <div className="academic__links-block">
              <div className="academic__subheader">
                <h3>روابط مهنية</h3>

                <button type="button" className="academic__link-btn" onClick={openLinksModal}>
                  <FaPencilAlt size={12} aria-hidden="true" />
                  تعديل
                </button>
              </div>

              {professionalLinks.length === 0 ? (
                <p className="academic__muted">لم تتم إضافة أي رابط مهني بعد.</p>
              ) : (
                <div className="academic__links-row">
                  {professionalLinks.map((link) => (
                    <a
                      key={link.id}
                      href={isSafeUrl(link.url) ? link.url : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="academic__link-chip"
                    >
                      <LinkIcon type={link.type} />
                      <span dir="ltr">{link.url}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ---------- التعليم ---------- */}
          <section className="academic__card">
            <div className="academic__card-header">
              <h2>التعليم</h2>

              <button type="button" className="academic__btn-primary" onClick={openAddEducation}>
                <FaPlus size={14} aria-hidden="true" />
                إضافة مؤهل
              </button>
            </div>

            {sortedEducation.length === 0 ? (
              <div className="academic__empty-state">
                <FaBookOpen size={22} aria-hidden="true" />
                <p>لم يتم إضافة أي مؤهل تعليمي، اضغط على "إضافة مؤهل" لإضافة مؤهلاتك.</p>
              </div>
            ) : (
              <div className="academic__education-list">
                {sortedEducation.map((item) => {
                  const meta = educationTypesMeta[item.type] || educationTypesMeta.university;
                  const Icon = meta.icon;
                  const gradeLabel = item.type === "university" ? "المعدل التراكمي" : "المعدل";

                  return (
                    <div className="academic__education-card" key={item.id}>
                      <div className="academic__education-meta">
                        <button
                          type="button"
                          className="academic__icon-btn"
                          aria-label={`تعديل ${item.title}`}
                          onClick={() => openEditEducation(item)}
                        >
                          <FaPencilAlt size={16} />
                        </button>

                        <button
                          type="button"
                          className="academic__icon-btn academic__icon-btn--danger"
                          aria-label={`حذف ${item.title}`}
                          onClick={() => {
                            setDeleteTarget(item);
                            setModal("deleteEducation");
                          }}
                        >
                          <FaTrash size={16} />
                        </button>

                        {item.grade && (
                          <div className="academic__edu-stat">
                            <span className="academic__edu-stat-label">{gradeLabel}</span>
                            <span className="academic__edu-stat-value">{item.grade}</span>
                          </div>
                        )}

                        {item.year && (
                          <div className="academic__edu-stat">
                            <span className="academic__edu-stat-label">سنة التخرج</span>
                            <span className="academic__edu-stat-value">{item.year}</span>
                          </div>
                        )}
                      </div>

                      <div className="academic__education-info">
                        <div
                          className="academic__education-icon"
                          style={{ background: meta.color }}
                        >
                          <Icon size={20} color="#0061A4" aria-hidden="true" />
                        </div>

                        <div className="academic__education-text">
                          <h4>{item.title}</h4>
                          {item.degree && (
                            <span className="academic__edu-degree">{item.degree}</span>
                          )}
                          <p>{item.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ---------- المهارات واللغات ---------- */}
          <section className="academic__card">
            <div className="academic__card-header">
              <h2>المهارات واللغات</h2>
            </div>

            <div className="academic__skills-block">
              <div className="academic__subheader">
                <h3>المهارات التقنية والشخصية</h3>

                <button type="button" className="academic__link-btn" onClick={openSkillsModal}>
                  <FaPencilAlt size={12} aria-hidden="true" />
                  تعديل المهارات
                </button>
              </div>

              {skills.length === 0 ? (
                <p className="academic__muted">لم تتم إضافة أي مهارة بعد.</p>
              ) : (
                <div className="academic__tags-row">
                  {skills.map((s) => (
                    <span className="academic__tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {suggestedSkills.some((s) => !skills.includes(s)) && (
                <div className="academic__ai-box">
                  <FaStar size={20} className="academic__ai-icon" aria-hidden="true" />

                  <div className="academic__ai-content">
                    <h4>اقتراحات الذكاء الاصطناعي بناءً على تخصصك</h4>

                    <div className="academic__tags-row">
                      {suggestedSkills
                        .filter((s) => !skills.includes(s))
                        .map((s) => (
                          <button
                            type="button"
                            className="academic__tag academic__tag--suggested"
                            key={s}
                            onClick={() => addSuggestedSkill(s)}
                          >
                            {s}
                            <FaPlus size={12} aria-hidden="true" />
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="academic__skills-block">
              <div className="academic__subheader">
                <h3>اللغات</h3>

                <button type="button" className="academic__link-btn" onClick={openLanguagesModal}>
                  <FaPencilAlt size={12} aria-hidden="true" />
                  إضافة لغة
                </button>
              </div>

              {languages.length === 0 ? (
                <p className="academic__muted">لم تتم إضافة أي لغة بعد.</p>
              ) : (
                <div className="academic__interests-row">
                  {languages.map((lang) => (
                    <div className="academic__interest-box" key={lang.id}>
                      <span className="academic__interest-title">{lang.label}</span>
                      <span className="academic__interest-meta">{lang.meta}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* =================================================
            Modals
        ================================================= */}

        {modal === "personal" && (
          <AcademicprofileModal title="تعديل المعلومات الشخصية" onClose={closeModal}>
            <div className="modal-form">
              {personalFieldsMeta.map(({ key, label, placeholder }) => (
                <label key={key} className="modal-form__field">
                  <span>{label}</span>

                  {key === "birthDate" ? (
                    <input
                      type="date"
                      lang="en-CA"
                      min="1940-01-01"
                      max={todayISO()}
                      value={personalDraft.birthDate}
                      onChange={(e) => handlePersonalChange("birthDate", e.target.value)}
                      className={`input-ltr ${personalErrors.birthDate ? "input-error" : ""}`}
                    />
                  ) : key === "phone" ? (
                    <div
                      className={`phone-input-wrapper ${
                        personalErrors.phone ? "input-error" : ""
                      }`}
                    >
                      <PhoneInput
                        international
                        defaultCountry="PS"
                        value={personalDraft.phone}
                        onChange={(value) => handlePersonalChange("phone", value || "")}
                      />
                    </div>
                  ) : (
                    <input
                      type={key === "email" ? "email" : "text"}
                      dir={key === "email" ? "ltr" : "auto"}
                      value={personalDraft[key]}
                      placeholder={placeholder}
                      onChange={(e) => handlePersonalChange(key, e.target.value)}
                      className={personalErrors[key] ? "input-error" : ""}
                    />
                  )}

                  {personalErrors[key] && (
                    <span className="modal-form__error" role="alert">
                      {personalErrors[key]}
                    </span>
                  )}
                </label>
              ))}
            </div>

            <ModalFooter onCancel={closeModal} onSave={savePersonal} />
          </AcademicprofileModal>
        )}

        {modal === "links" && (
          <AcademicprofileModal title="تعديل الروابط المهنية" onClose={closeModal}>
            <div className="modal-form">
              {linksDraft.map((link) => (
                <div key={link.id} className="professional-link-edit">
                  <label className="modal-form__field">
                    <span>نوع الرابط</span>
                    <select
                      value={link.type}
                      onChange={(e) => handleLinkChange(link.id, "type", e.target.value)}
                    >
                      {LINK_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="modal-form__field">
                    <span>الرابط</span>
                    <input
                      type="url"
                      dir="ltr"
                      placeholder="https://example.com"
                      value={link.url}
                      onChange={(e) => handleLinkChange(link.id, "url", e.target.value)}
                      className={linksErrors[link.id] ? "input-error" : ""}
                    />
                    {linksErrors[link.id] && (
                      <span className="modal-form__error" role="alert">
                        {linksErrors[link.id]}
                      </span>
                    )}
                  </label>

                  <button
                    type="button"
                    className="academic__btn-danger"
                    onClick={() => removeProfessionalLink(link.id)}
                  >
                    <FaTrash size={13} aria-hidden="true" />
                    حذف الرابط
                  </button>
                </div>
              ))}

              <button type="button" className="academic__btn-outline" onClick={addProfessionalLink}>
                <FaPlus size={13} aria-hidden="true" />
                إضافة رابط جديد
              </button>
            </div>

            <ModalFooter onCancel={closeModal} onSave={saveProfessionalLinks} />
          </AcademicprofileModal>
        )}

        {modal === "education" && (
          <AcademicprofileModal
            title={educationDraft.id ? "تعديل المؤهل" : "إضافة مؤهل جديد"}
            onClose={closeModal}
          >
            <div className="modal-form">
              <label className="modal-form__field">
                <span>النوع</span>
                <select
                  value={educationDraft.type}
                  onChange={(e) => handleEducationChange("type", e.target.value)}
                >
                  {Object.entries(educationTypesMeta).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="modal-form__field">
                <span>المسمى (مثال: بكالوريوس، ثانوية، شهادة)</span>
                <input
                  type="text"
                  dir="auto"
                  value={educationDraft.degree}
                  onChange={(e) => handleEducationChange("degree", e.target.value)}
                />
              </label>

              <label className="modal-form__field">
                <span>سنة التخرج / الإنجاز</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  dir="ltr"
                  placeholder="مثال: 2024"
                  value={educationDraft.year}
                  onChange={(e) =>
                    handleEducationChange("year", e.target.value.replace(/\D/g, ""))
                  }
                  className={educationErrors.year ? "input-error" : ""}
                />
                {educationErrors.year && (
                  <span className="modal-form__error" role="alert">
                    {educationErrors.year}
                  </span>
                )}
              </label>

              <label className="modal-form__field">
                <span>المعدل (اختياري)</span>
                <input
                  type="text"
                  dir="auto"
                  placeholder="مثال: 4.8 / 5.0 أو 99%"
                  value={educationDraft.grade}
                  onChange={(e) => handleEducationChange("grade", e.target.value)}
                />
              </label>

              <label className="modal-form__field">
                <span>التخصص / العنوان</span>
                <input
                  type="text"
                  dir="auto"
                  value={educationDraft.title}
                  onChange={(e) => handleEducationChange("title", e.target.value)}
                  className={educationErrors.title ? "input-error" : ""}
                />
                {educationErrors.title && (
                  <span className="modal-form__error" role="alert">
                    {educationErrors.title}
                  </span>
                )}
              </label>

              <label className="modal-form__field">
                <span>اسم المؤسسة / الجهة المانحة</span>
                <input
                  type="text"
                  dir="auto"
                  value={educationDraft.subtitle}
                  onChange={(e) => handleEducationChange("subtitle", e.target.value)}
                  className={educationErrors.subtitle ? "input-error" : ""}
                />
                {educationErrors.subtitle && (
                  <span className="modal-form__error" role="alert">
                    {educationErrors.subtitle}
                  </span>
                )}
              </label>
            </div>

            <ModalFooter onCancel={closeModal} onSave={saveEducation} />
          </AcademicprofileModal>
        )}

        {modal === "deleteEducation" && deleteTarget && (
          <AcademicprofileModal
            title="حذف المؤهل"
            onClose={() => {
              setDeleteTarget(null);
              closeModal();
            }}
          >
            <p className="modal-confirm-text">
              هل أنت متأكد من حذف "{deleteTarget.title}"؟ لا يمكن التراجع عن هذا الإجراء.
            </p>

            <ModalFooter
              onCancel={() => {
                setDeleteTarget(null);
                closeModal();
              }}
              onSave={confirmDeleteEducation}
              saveLabel="حذف"
              saveClass="academic__btn-danger"
            />
          </AcademicprofileModal>
        )}

        {modal === "skills" && (
          <AcademicprofileModal title="تعديل المهارات" onClose={closeModal}>
            <div className="modal-tag-input">
              <input
                type="text"
                dir="auto"
                placeholder="أضف مهارة جديدة..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addDraftSkill();
                  }
                }}
              />
              <button type="button" className="academic__btn-primary" onClick={addDraftSkill}>
                إضافة
              </button>
            </div>

            <div className="academic__tags-row modal-tags-list">
              {skillsDraft.map((s) => (
                <span className="academic__tag modal-tag--removable" key={s}>
                  {s}
                  <button
                    type="button"
                    aria-label={`إزالة ${s}`}
                    onClick={() => removeDraftSkill(s)}
                  >
                    <FaTimes size={12} />
                  </button>
                </span>
              ))}
            </div>

            <ModalFooter onCancel={closeModal} onSave={saveSkills} />
          </AcademicprofileModal>
        )}

        {modal === "languages" && (
          <AcademicprofileModal title="تعديل اللغات" onClose={closeModal}>
            <div>
              <p className="modal-hint">اختر لغة وحدد مستواك لإضافتها:</p>

              <div className="lang-list">
                {availableLanguages.map((lang) => (
                  <LanguageOption
                    key={lang.label}
                    lang={lang}
                    isAdded={languagesDraft.some((l) => l.label === lang.label)}
                    onAdd={addLanguageToDraft}
                  />
                ))}
              </div>

              <div className="lang-custom">
                <input
                  type="text"
                  dir="auto"
                  placeholder="لغة غير موجودة؟ اكتبها هنا..."
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomLanguage();
                    }
                  }}
                />

                <select
                  value={customLevel}
                  aria-label="مستوى اللغة"
                  onChange={(e) => setCustomLevel(e.target.value)}
                >
                  {LANGUAGE_LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="academic__btn-primary academic__btn-sm"
                  onClick={addCustomLanguage}
                >
                  إضافة
                </button>
              </div>
            </div>

            <hr className="modal-divider" />

            <p className="modal-hint">اللغات المضافة في ملفك:</p>

            <div className="academic__tags-row modal-tags-list">
              {languagesDraft.map((lang) => (
                <span className="academic__tag modal-tag--removable" key={lang.id}>
                  {lang.label} ({lang.meta})
                  <button
                    type="button"
                    aria-label={`إزالة ${lang.label}`}
                    onClick={() => removeDraftLanguage(lang.id)}
                  >
                    <FaTimes size={12} />
                  </button>
                </span>
              ))}
            </div>

            <ModalFooter onCancel={closeModal} onSave={saveLanguages} />
          </AcademicprofileModal>
        )}

        {toast && (
          <div className="toast" role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>

      <div className="academic-sidebar-container">
        <SideNavBar completion={completion} />
      </div>
    </div>
  );
}
