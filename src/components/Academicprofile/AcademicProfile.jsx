import { useState } from "react";
import SideNavBar from "../SideNavBar/SideNavBar";

import {
  FaCamera, // الكاميرا
  FaPencilAlt, // أيقونة القلم
  FaTrash, // سلة المهملات
  FaPlus, // علامة +
  FaStar,
  FaLinkedin,
  FaGithub,
  FaGraduationCap,
  FaBookOpen,
  FaLightbulb,
  FaTimes,
  FaUniversity,
  FaSchool,
} from "react-icons/fa";
import "./AcademicProfile.css";
import TopAppBar from "../TopAppBar/TopAppBar";

/* ============ بيانات مبدئية ============ */

const initialPersonal = {
  fullName: "أحمد محمد عبدالله",
  email: "ahmed.m@example.com",
  phone: "+966 50 123 4567",
  birthDate: "15 مارس 1999",
  nationality: "سعودي",
  city: "الرياض",
};

const personalFieldsMeta = [
  { key: "fullName", label: "الاسم الكامل" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "phone", label: "رقم الهاتف" },
  { key: "birthDate", label: "تاريخ الميلاد" },
  { key: "nationality", label: "الجنسية" },
  { key: "city", label: "المدينة" },
];

const professionalLinks = [
  { icon: FaLinkedin, label: "linkedin.com/in/ahmed-abdullah" },
  { icon: FaGithub, label: "Github" },
];

const initialEducation = [
  {
    id: 1,
    type: "university",
    degree: "بكالوريوس",
    year: "2024",
    grade: "4.8 / 5.0",
    title: "هندسة البرمجيات",
    subtitle: "جامعة الملك سعود",
    iconBg: "#D1E4FF",
  },
  {
    id: 2,
    type: "school",
    degree: "ثانوية",
    year: "2020",
    grade: "99%",
    title: "الثانوية العامة",
    subtitle: "مدرسة الرياض النموذجية",
    iconBg: "#E6E8EA",
  },
];

const educationIcons = {
  university: FaUniversity,
  school: FaSchool,
};

const initialSkills = [];
const suggestedSkills = [
  "Python",
  "التواصل",
  "إدارة المشاريع الرشيقة (Agile)",
  "JavaScript",
  "Node.js",
];
const initialLanguages = [];

/* 🆕 قائمة اللغات المقترحة للإضافة السريعة */
const availableLanguages = [
  { label: "العربية", meta: "اللغة الأم" },
  { label: "الإنجليزية", meta: "مستوى متقدم" },
  { label: "الفرنسية", meta: "مستوى متوسط" },
  { label: "الألمانية", meta: "مستوى مبتدئ" },
  { label: "الإسبانية", meta: "مستوى متوسط" },
];

/* ============ مكوّن Modal عام ============ */

function AcademicprofileModal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-box__header">
          <h3>{title}</h3>
          <button type="button" className="modal-box__close" onClick={onClose}>
            <FaTimes size={18} />
          </button>
        </div>
        <div className="modal-box__body">{children}</div>
      </div>
    </div>
  );
}

export default function AcademicProfile() {
  const completion = 85;

  const [personal, setPersonal] = useState(initialPersonal);
  const [education, setEducation] = useState(initialEducation);
  const [skills, setSkills] = useState(initialSkills);
  const [languages, setLanguages] = useState(initialLanguages);
  const [modal, setModal] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  /* ---------- تعديل المعلومات الشخصية ---------- */
  const [personalDraft, setPersonalDraft] = useState(initialPersonal);

  const openPersonalModal = () => {
    setPersonalDraft(personal);
    setModal("personal");
  };

  const savePersonal = () => {
    setPersonal(personalDraft);
    setModal(null);
  };

  /* ---------- إضافة / تعديل مؤهل تعليمي ---------- */
  const emptyEducationDraft = {
    id: null,
    type: "university",
    degree: "",
    year: "",
    grade: "",
    title: "",
    subtitle: "",
    iconBg: "#D1E4FF",
  };
  const [educationDraft, setEducationDraft] = useState(emptyEducationDraft);

  const openAddEducation = () => {
    setEducationDraft(emptyEducationDraft);
    setModal("education");
  };

  const openEditEducation = (item) => {
    setEducationDraft(item);
    setModal("education");
  };

  const saveEducation = () => {
    if (!educationDraft.title.trim()) return;
    setEducation((prev) => {
      if (educationDraft.id) {
        return prev.map((e) =>
          e.id === educationDraft.id ? educationDraft : e,
        );
      }
      return [...prev, { ...educationDraft, id: Date.now() }];
    });
    setModal(null);
  };

  const deleteEducation = (id) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  };

  /* ---------- المهارات ---------- */
  const [skillsDraft, setSkillsDraft] = useState(skills);
  const [newSkill, setNewSkill] = useState("");

  const openSkillsModal = () => {
    setSkillsDraft(skills);
    setNewSkill("");
    setModal("skills");
  };

  const addDraftSkill = () => {
    const value = newSkill.trim();
    if (!value || skillsDraft.includes(value)) return;
    setSkillsDraft((prev) => [...prev, value]);
    setNewSkill("");
  };

  const removeDraftSkill = (skill) => {
    setSkillsDraft((prev) => prev.filter((s) => s !== skill));
  };

  const saveSkills = () => {
    setSkills(skillsDraft);
    setModal(null);
  };

  const addSuggestedSkill = (skill) => {
    if (skills.includes(skill)) return;
    setSkills((prev) => [...prev, skill]);
  };

  /* ---------- اللغات (مُحدّث) ---------- */
  const [languagesDraft, setLanguagesDraft] = useState(languages);

  // 🆕 حقل إضافة لغة غير موجودة بالقائمة الجاهزة
  const [customLanguage, setCustomLanguage] = useState("");
  const [customLevel, setCustomLevel] = useState("مستوى متوسط");

  const openLanguagesModal = () => {
    setLanguagesDraft(languages);
    setCustomLanguage("");
    setCustomLevel("مستوى متوسط");
    setModal("languages");
  };

  const removeDraftLanguage = (id) => {
    setLanguagesDraft((prev) => prev.filter((l) => l.id !== id));
  };

  // 🆕 إضافة لغة مخصّصة كتبها المستخدم يدويًا
  const addCustomLanguage = () => {
    const value = customLanguage.trim();
    if (!value) return;

    const alreadyExists = languagesDraft.some(
      (l) => l.label.toLowerCase() === value.toLowerCase(),
    );
    if (alreadyExists) return;

    setLanguagesDraft((prev) => [
      ...prev,
      { id: Date.now(), label: value, meta: customLevel },
    ]);

    setCustomLanguage("");
    setCustomLevel("مستوى متوسط");
  };

  const saveLanguages = () => {
    setLanguages(languagesDraft);
    setModal(null);
  };

  return (
    <div className="academic-layout">
      {/* المحتوى الرئيسي */}
      <div className="academic-main-content">
        <TopAppBar />

        <div className="academic-body-wrapper">
          <section className="academic__header">
            <h1>الملف الأكاديمي</h1>
            <p>أكمل ملفك الشخصي لزيادة فرصك بالحصول على المنح المناسبة لك</p>
          </section>

          {/* مؤشر اكتمال الملف */}
          <section className="academic__card academic__completion">
            <div className="academic__completion-top">
              <span className="academic__badge">{completion}%</span>
              <h3> الملف الشخصي</h3>
            </div>
            <div className="academic__progress-track">
              <div
                className="academic__progress-fill"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="academic__completion-hint">
              <FaLightbulb size={16} className="academic__hint-icon" /> أكمل
              ملفك لزيادة فرص قبولك بنسبة 40%
            </p>
          </section>

          {/* المعلومات الشخصية */}
          <section className="academic__card">
            <div className="academic__card-header academic__card-header--with-action">
              <h2>المعلومات الشخصية</h2>
              <button
                type="button"
                className="academic__link-btn"
                onClick={openPersonalModal}
              >
                <FaPencilAlt size={12} />
                تعديل
              </button>
            </div>
            <div className="academic__personal-row">
              <div className="academic__avatar-block">
                {/* عرض الصورة لو تم اختيارها، أو الشكل الافتراضي لو مفيش */}
                <div
                  className="academic__avatar"
                  style={
                    avatarImage
                      ? {
                          backgroundImage: `url(${avatarImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                />

                {/*input مخفي لرفع الصور*/}
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setAvatarImage(imageUrl);
                    }
                  }}
                />

                {/* الزر اللي بيضغط عليه المستخدم */}
                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() => document.getElementById("avatarInput").click()}
                >
                  <FaCamera size={16} />
                  تغيير الصورة
                </button>
              </div>

              <div className="academic__personal-grid">
                {personalFieldsMeta.map(({ key, label }) => (
                  <div className="academic__field" key={key}>
                    <span className="academic__field-label">{label}</span>
                    <div className="academic__field-value">{personal[key]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="academic__links-block">
              <h3>روابط مهنية</h3>
              <div className="academic__links-row">
                {professionalLinks.map(({ icon: Icon, label }) => (
                  <a key={label} href="#" className="academic__link-chip">
                    <Icon size={18} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* المؤهلات التعليمية */}
          <section className="academic__card">
            <div className="academic__card-header academic__card-header--with-action">
              <h2> التعليم</h2>
              <button
                type="button"
                className="academic__btn-primary"
                onClick={openAddEducation}
              >
                <FaPlus size={14} />
                إضافة درجة علمية
              </button>
            </div>

            <div className="academic__education-list">
              {education.map((item) => {
                const Icon = educationIcons[item.type] || FaBookOpen;
                const gradeLabel =
                  item.type === "university" ? "المعدل التراكمي" : "المعدل";

                return (
                  <div className="academic__education-card" key={item.id}>
                    <div className="academic__education-meta">
                      <button
                        type="button"
                        className="academic__icon-btn"
                        onClick={() => openEditEducation(item)}
                      >
                        <FaPencilAlt size={16} />
                      </button>

                      {item.grade && (
                        <div className="academic__edu-stat">
                          <span className="academic__edu-stat-label">
                            {gradeLabel}
                          </span>
                          <span className="academic__edu-stat-value">
                            {item.grade}
                          </span>
                        </div>
                      )}

                      {item.year && (
                        <div className="academic__edu-stat">
                          <span className="academic__edu-stat-label">
                            سنة التخرج
                          </span>
                          <span className="academic__edu-stat-value">
                            {item.year}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="academic__education-info">
                      <div className="academic__education-text">
                        <h4>{item.title}</h4>
                        <p>{item.subtitle}</p>
                      </div>
                      <div
                        className="academic__education-icon"
                        style={{ background: item.iconBg }}
                      >
                        <Icon size={20} color="#0061A4" />
                      </div>
                      <button
                        type="button"
                        className="academic__icon-btn academic__icon-btn--ghost"
                        onClick={() => deleteEducation(item.id)}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* المهارات واللغات */}
          <section className="academic__card">
            <div className="academic__card-header academic__card-header--with-action">
              <h2> المهارات واللغات</h2>
            </div>

            <div className="academic__skills-block">
              <div className="academic__subheader">
                <h3>المهارات التقنية والشخصية</h3>
                <button
                  type="button"
                  className="academic__link-btn"
                  onClick={openSkillsModal}
                >
                  <FaPencilAlt size={12} />
                  تعديل المهارات
                </button>
              </div>
              <div className="academic__tags-row">
                {skills.map((s) => (
                  <span className="academic__tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="academic__ai-box">
                <FaStar size={20} className="academic__ai-icon" />
                <div>
                  <h4> اقتراحات الذكاء الاصطناعي بناءً على تخصصك</h4>
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
                          <FaPlus size={12} />
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="academic__skills-block">
              <div className="academic__subheader">
                <h3>اللغات</h3>
                <button
                  type="button"
                  className="academic__link-btn"
                  onClick={openLanguagesModal}
                >
                  <FaPencilAlt size={12} />
                  إضافة لغة
                </button>
              </div>
              <div className="academic__interests-row">
                {languages.map((lang) => (
                  <div className="academic__interest-box" key={lang.id}>
                    <span className="academic__interest-title">
                      {lang.label}
                    </span>
                    <span className="academic__interest-meta">{lang.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ المودالات ============ */}

          {modal === "personal" && (
            <AcademicprofileModal
              title="تعديل المعلومات الشخصية"
              onClose={() => setModal(null)}
            >
              <div className="modal-form">
                {personalFieldsMeta.map(({ key, label }) => (
                  <label key={key} className="modal-form__field">
                    <span>{label}</span>
                    <input
                      type="text"
                      value={personalDraft[key]}
                      onChange={(e) =>
                        setPersonalDraft((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="modal-box__footer">
                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() => setModal(null)}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="academic__btn-primary"
                  onClick={savePersonal}
                >
                  حفظ
                </button>
              </div>
            </AcademicprofileModal>
          )}

          {modal === "education" && (
            <AcademicprofileModal
              title={educationDraft.id ? "تعديل المؤهل" : "إضافة مؤهل جديد"}
              onClose={() => setModal(null)}
            >
              <div className="modal-form">
                <label className="modal-form__field">
                  <span>النوع</span>
                  <select
                    value={educationDraft.type}
                    onChange={(e) =>
                      setEducationDraft((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  >
                    <option value="university">جامعة</option>
                    <option value="school">مدرسة</option>
                  </select>
                </label>

                <label className="modal-form__field">
                  <span>المسمى (مثال: بكالوريوس، ثانوية)</span>
                  <input
                    type="text"
                    value={educationDraft.degree}
                    onChange={(e) =>
                      setEducationDraft((prev) => ({
                        ...prev,
                        degree: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="modal-form__field">
                  <span>سنة التخرج</span>
                  <input
                    type="text"
                    value={educationDraft.year}
                    onChange={(e) =>
                      setEducationDraft((prev) => ({
                        ...prev,
                        year: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="modal-form__field">
                  <span>المعدل</span>
                  <input
                    type="text"
                    placeholder="مثال: 4.8 / 5.0 أو 99%"
                    value={educationDraft.grade}
                    onChange={(e) =>
                      setEducationDraft((prev) => ({
                        ...prev,
                        grade: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="modal-form__field">
                  <span>التخصص / العنوان</span>
                  <input
                    type="text"
                    value={educationDraft.title}
                    onChange={(e) =>
                      setEducationDraft((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="modal-form__field">
                  <span>اسم المؤسسة</span>
                  <input
                    type="text"
                    value={educationDraft.subtitle}
                    onChange={(e) =>
                      setEducationDraft((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <div className="modal-box__footer">
                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() => setModal(null)}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="academic__btn-primary"
                  onClick={saveEducation}
                >
                  حفظ
                </button>
              </div>
            </AcademicprofileModal>
          )}

          {modal === "skills" && (
            <AcademicprofileModal
              title="تعديل المهارات"
              onClose={() => setModal(null)}
            >
              <div className="modal-tag-input">
                <input
                  type="text"
                  placeholder="أضف مهارة جديدة..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addDraftSkill()}
                />
                <button
                  type="button"
                  className="academic__btn-primary"
                  onClick={addDraftSkill}
                >
                  إضافة
                </button>
              </div>
              <div className="academic__tags-row modal-tags-list">
                {skillsDraft.map((s) => (
                  <span className="academic__tag modal-tag--removable" key={s}>
                    {s}
                    <button type="button" onClick={() => removeDraftSkill(s)}>
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="modal-box__footer">
                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() => setModal(null)}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="academic__btn-primary"
                  onClick={saveSkills}
                >
                  حفظ
                </button>
              </div>
            </AcademicprofileModal>
          )}

          {modal === "languages" && (
            <AcademicprofileModal
              title="تعديل اللغات"
              onClose={() => setModal(null)}
            >
              <div style={{ marginBottom: "15px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "8px",
                  }}
                >
                  اختر لغة وحدد مستواك لإضافتها:
                </p>

                {/* شبكة اللغات المتاحة مع قائمة منسدلة للمستوى */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {availableLanguages.map((lang) => {
                    const isAdded = languagesDraft.some(
                      (l) => l.label === lang.label,
                    );

                    return (
                      <div
                        key={lang.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          background: "#f9f9f9",
                          borderRadius: "8px",
                          opacity: isAdded ? 0.6 : 1,
                        }}
                      >
                        <span style={{ fontWeight: "500" }}>{lang.label}</span>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          {/* القائمة المنسدلة لاختيار المستوى */}
                          <select
                            disabled={isAdded}
                            id={`level-${lang.label}`}
                            defaultValue={lang.meta}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <option value="اللغة الأم">اللغة الأم</option>
                            <option value="مستوى متقدم">مستوى متقدم</option>
                            <option value="مستوى متوسط">مستوى متوسط</option>
                            <option value="مستوى مبتدئ">مستوى مبتدئ</option>
                          </select>

                          {/* زر الإضافة */}
                          <button
                            type="button"
                            className="academic__btn-primary"
                            style={{ padding: "4px 10px", fontSize: "12px" }}
                            disabled={isAdded}
                            onClick={() => {
                              const selectElement = document.getElementById(
                                `level-${lang.label}`,
                              );
                              const selectedMeta = selectElement.value;

                              if (!isAdded) {
                                setLanguagesDraft((prev) => [
                                  ...prev,
                                  {
                                    id: Date.now(),
                                    label: lang.label,
                                    meta: selectedMeta,
                                  },
                                ]);
                              }
                            }}
                          >
                            {isAdded ? "تمت الإضافة" : "إضافة"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 🆕 لو اللغة يلي بدها المستخدمة مش موجودة بالقائمة أعلاه */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginTop: "12px",
                    padding: "8px 12px",
                    background: "#eef6ff",
                    borderRadius: "8px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="لغة غير موجودة؟ اكتبيها هون..."
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomLanguage()}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />

                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="اللغة الأم">اللغة الأم</option>
                    <option value="مستوى متقدم">مستوى متقدم</option>
                    <option value="مستوى متوسط">مستوى متوسط</option>
                    <option value="مستوى مبتدئ">مستوى مبتدئ</option>
                  </select>

                  <button
                    type="button"
                    className="academic__btn-primary"
                    style={{ padding: "4px 10px", fontSize: "12px" }}
                    onClick={addCustomLanguage}
                  >
                    إضافة
                  </button>
                </div>
              </div>

              <hr
                style={{
                  border: "0",
                  borderTop: "1px solid #eee",
                  margin: "15px 0",
                }}
              />

              <p
                style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}
              >
                اللغات المضافة في ملفك:
              </p>
              <div className="academic__tags-row modal-tags-list">
                {languagesDraft.map((lang) => (
                  <span
                    className="academic__tag modal-tag--removable"
                    key={lang.id}
                  >
                    {lang.label} ({lang.meta})
                    <button
                      type="button"
                      onClick={() => removeDraftLanguage(lang.id)}
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="modal-box__footer" style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() => setModal(null)}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="academic__btn-primary"
                  onClick={saveLanguages}
                >
                  حفظ
                </button>
              </div>
            </AcademicprofileModal>
          )}
        </div>
      </div>
      {/* القائمة الجانبية */}
      <div className="academic-sidebar-container">
        <SideNavBar />
      </div>
    </div>
  );
}
