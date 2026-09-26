import { useState } from "react";

import SideNavBar from "../SideNavBar/SideNavBar";
import TopAppBar from "../TopAppBar/TopAppBar";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  FaCamera,
  FaPencilAlt,
  FaTrash,
  FaPlus,
  FaStar,
  FaLinkedin,
  FaGithub,
  FaBookOpen,
  FaLightbulb,
  FaTimes,
  FaUniversity,
  FaSchool,
  FaCertificate,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";
import "./Academicprofile.css";


/* =========================================================
   البيانات المبدئية
========================================================= */

const initialPersonal = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  nationality: "",
  city: "",
};

const personalFieldsMeta = [
  {
    key: "fullName",
    label: "الاسم الكامل",
    placeholder: "مثال: أحمد محمد عبدالله",
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
    placeholder: "example@email.com",
  },
  {
    key: "phone",
    label: "رقم الهاتف",
    placeholder: "+972 592 772 935",
  },
  {
    key: "birthDate",
    label: "تاريخ الميلاد",
    placeholder: "مثال: 15 مارس 1999",
  },
  {
    key: "nationality",
    label: "الجنسية",
    placeholder: "مثال: فلسطيني",
  },
  {
    key: "city",
    label: "المدينة",
    placeholder: "مثال: نابلس",
  },
];

const initialEducation = [];

const educationTypesMeta = {
  university: {
    label: "جامعة",
    icon: FaUniversity,
    color: "#D1E4FF",
  },

  school: {
    label: "مدرسة",
    icon: FaSchool,
    color: "#FFE9C7",
  },

  diploma: {
    label: "دبلوم",
    icon: FaGraduationCap,
    color: "#D9F2D9",
  },

  course: {
    label: "دورة تدريبية / شهادة",
    icon: FaCertificate,
    color: "#F3D9FA",
  },
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

const availableLanguages = [
  {
    label: "العربية",
    meta: "اللغة الأم",
  },
  {
    label: "الإنجليزية",
    meta: "مستوى متقدم",
  },
  {
    label: "الفرنسية",
    meta: "مستوى متوسط",
  },
  {
    label: "الألمانية",
    meta: "مستوى مبتدئ",
  },
  {
    label: "الإسبانية",
    meta: "مستوى متوسط",
  },
];

const currentYear = new Date().getFullYear();

/* =========================================================
   Modal عام
========================================================= */

function AcademicprofileModal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-box__header">
          <h3>{title}</h3>

          <button
            type="button"
            className="modal-box__close"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="modal-box__body">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Academic Profile
========================================================= */

export default function AcademicProfile() {
  const completion = 85;

  /* =======================================================
     States - المعلومات الشخصية
  ======================================================= */

  const [personal, setPersonal] = useState(initialPersonal);

  const [personalDraft, setPersonalDraft] =
    useState(initialPersonal);

  const [personalErrors, setPersonalErrors] =
    useState({});

  /* =======================================================
     States - التعليم
  ======================================================= */

  const [education, setEducation] =
    useState(initialEducation);

  const emptyEducationDraft = {
    id: null,
    type: "university",
    degree: "",
    year: "",
    grade: "",
    title: "",
    subtitle: "",
  };

  const [educationDraft, setEducationDraft] =
    useState(emptyEducationDraft);

  const [educationErrors, setEducationErrors] =
    useState({});

  /* =======================================================
     States - المهارات
  ======================================================= */

  const [skills, setSkills] =
    useState(initialSkills);

  const [skillsDraft, setSkillsDraft] =
    useState(initialSkills);

  const [newSkill, setNewSkill] =
    useState("");

  /* =======================================================
     States - اللغات
  ======================================================= */

  const [languages, setLanguages] =
    useState(initialLanguages);

  const [languagesDraft, setLanguagesDraft] =
    useState(initialLanguages);

  const [customLanguage, setCustomLanguage] =
    useState("");

  const [customLevel, setCustomLevel] =
    useState("مستوى متوسط");

  /* =======================================================
     States - الروابط المهنية
  ======================================================= */

  const [professionalLinks, setProfessionalLinks] =
    useState([]);

  const [linksDraft, setLinksDraft] =
    useState([]);

  /* =======================================================
     States - أخرى
  ======================================================= */

  const [modal, setModal] =
    useState(null);

  const [avatarImage, setAvatarImage] =
    useState(null);

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

    if (!data.fullName.trim()) {
      errors.fullName = "الاسم الكامل مطلوب";
    }

    if (!data.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (
      !/^\S+@\S+\.\S+$/.test(data.email.trim())
    ) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (
      !data.phone ||
      data.phone.trim().length < 8
    ) {
      errors.phone = "رقم الهاتف مطلوب وغير صحيح";
    }

    if (!data.birthDate) {
      errors.birthDate = "تاريخ الميلاد مطلوب";
    }

    if (!data.nationality.trim()) {
      errors.nationality = "الجنسية مطلوبة";
    }

    if (!data.city.trim()) {
      errors.city = "المدينة مطلوبة";
    }

    return errors;
  };

  const handlePersonalChange = (key, value) => {
    setPersonalDraft((prev) => ({
      ...prev,
      [key]: value,
    }));

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

    setPersonalErrors({});

    setPersonal(personalDraft);

    setModal(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* =======================================================
     الروابط المهنية
  ======================================================= */

  const openLinksModal = () => {
    setLinksDraft(professionalLinks);
    setModal("links");
  };

  const addProfessionalLink = () => {
    setLinksDraft((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "LinkedIn",
        url: "",
      },
    ]);
  };

  const handleLinkChange = (id, key, value) => {
    setLinksDraft((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              [key]: value,
            }
          : link
      )
    );
  };

  const removeProfessionalLink = (id) => {
    setLinksDraft((prev) =>
      prev.filter((link) => link.id !== id)
    );
  };

  const saveProfessionalLinks = () => {
    setProfessionalLinks(linksDraft);
    setModal(null);
  };

  /* =======================================================
     التعليم
  ======================================================= */

  const openAddEducation = () => {
    setEducationDraft({
      ...emptyEducationDraft,
    });

    setEducationErrors({});

    setModal("education");
  };

  const openEditEducation = (item) => {
    setEducationDraft(item);

    setEducationErrors({});

    setModal("education");
  };

  const handleEducationChange = (key, value) => {
    setEducationDraft((prev) => ({
      ...prev,
      [key]: value,
    }));

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

    if (!data.title.trim()) {
      errors.title = "التخصص / العنوان مطلوب";
    }

    if (!data.subtitle.trim()) {
      errors.subtitle = "اسم المؤسسة مطلوب";
    }

    if (
      data.year &&
      !/^\d{4}$/.test(String(data.year))
    ) {
      errors.year =
        "أدخل سنة صحيحة مكوّنة من 4 أرقام";
    } else if (
      data.year &&
      (
        Number(data.year) < 1950 ||
        Number(data.year) > currentYear + 10
      )
    ) {
      errors.year = "سنة غير منطقية";
    }

    return errors;
  };

  const saveEducation = () => {
    const errors =
      validateEducation(educationDraft);

    if (Object.keys(errors).length > 0) {
      setEducationErrors(errors);
      return;
    }

    setEducation((prev) => {
      if (educationDraft.id) {
        return prev.map((e) =>
          e.id === educationDraft.id
            ? educationDraft
            : e
        );
      }

      return [
        ...prev,
        {
          ...educationDraft,
          id: crypto.randomUUID(),
        },
      ];
    });

    setEducationErrors({});

    setModal(null);
  };

  const deleteEducation = (id) => {
    setEducation((prev) =>
      prev.filter((e) => e.id !== id)
    );
  };

  const sortedEducation = [...education].sort(
    (a, b) =>
      (Number(b.year) || 0) -
      (Number(a.year) || 0)
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

    if (skillsDraft.includes(value)) return;

    setSkillsDraft((prev) => [
      ...prev,
      value,
    ]);

    setNewSkill("");
  };

  const removeDraftSkill = (skill) => {
    setSkillsDraft((prev) =>
      prev.filter((s) => s !== skill)
    );
  };

  const saveSkills = () => {
    setSkills(skillsDraft);
    setModal(null);
  };

  const addSuggestedSkill = (skill) => {
    if (skills.includes(skill)) return;

    setSkills((prev) => [
      ...prev,
      skill,
    ]);
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
    setLanguagesDraft((prev) =>
      prev.filter((l) => l.id !== id)
    );
  };

  const addCustomLanguage = () => {
    const value = customLanguage.trim();

    if (!value) return;

    const alreadyExists =
      languagesDraft.some(
        (l) =>
          l.label.toLowerCase() ===
          value.toLowerCase()
      );

    if (alreadyExists) return;

    setLanguagesDraft((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: value,
        meta: customLevel,
      },
    ]);

    setCustomLanguage("");

    setCustomLevel("مستوى متوسط");
  };

  const saveLanguages = () => {
    setLanguages(languagesDraft);

    setModal(null);
  };

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <div className="academic-layout">

      {/* =========================
          المحتوى الرئيسي
      ========================= */}

      <div className="academic-main-content">

        <TopAppBar />

        <div className="academic-body-wrapper">

          {/* =========================
              Header
          ========================= */}

          <section className="academic__header">

            <h1>الملف الأكاديمي</h1>

            <p>
              أكمل ملفك الشخصي لزيادة فرصك بالحصول
              على المنح المناسبة لك
            </p>

          </section>

          {/* =========================
              نسبة اكتمال الملف
          ========================= */}

          <section className="academic__card academic__completion">

            <div className="academic__completion-top">

              <span className="academic__badge">
                {completion}%
              </span>

              <h3>
                الملف الشخصي
              </h3>

            </div>

            <div className="academic__progress-track">

              <div
                className="academic__progress-fill"
                style={{
                  width: `${completion}%`,
                }}
              />

            </div>

            <p className="academic__completion-hint">

              <FaLightbulb
                size={16}
                className="academic__hint-icon"
              />

              أكمل ملفك لزيادة فرص قبولك بنسبة 40%

            </p>

          </section>

          {/* =================================================
              المعلومات الشخصية
          ================================================= */}

          <section className="academic__card">

            <div className="academic__card-header academic__card-header--with-action">

              <h2>
                المعلومات الشخصية
              </h2>

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

              {/* الصورة */}

              <div className="academic__avatar-block">

                <div
                  className="academic__avatar"
                  style={
                    avatarImage
                      ? {
                          backgroundImage:
                            `url(${avatarImage})`,
                          backgroundSize: "cover",
                          backgroundPosition:
                            "center",
                        }
                      : {}
                  }
                >
                  {!avatarImage && (
                    <FaUser
                      size={55}
                      color="#1d4ed8"
                    />
                  )}
                </div>

                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{
                    display: "none",
                  }}
                  onChange={(e) => {
                    const file =
                      e.target.files[0];

                    if (file) {
                      setAvatarImage(
                        URL.createObjectURL(file)
                      );
                    }
                  }}
                />

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() =>
                    document
                      .getElementById("avatarInput")
                      .click()
                  }
                >
                  <FaCamera
                    size={16}
                    style={{
                      marginLeft: "8px",
                    }}
                  />

                  تغيير الصورة
                </button>

              </div>

              {/* البيانات */}

              <div className="academic__personal-grid">

                {personalFieldsMeta.map(
                  ({
                    key,
                    label,
                    placeholder,
                  }) => (

                    <div
                      className="academic__field"
                      key={key}
                    >

                      <span className="academic__field-label">
                        {label}
                      </span>

                      <div
                        className={
                          `academic__field-value ${
                            !personal[key]
                              ? "academic__field-value--placeholder"
                              : ""
                          }`
                        }
                      >
                        {key === "birthDate"
                          ? formatDate(
                              personal[key]
                            ) || placeholder
                          : personal[key] ||
                            placeholder}
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* =========================
                الروابط المهنية
            ========================= */}

            <div className="academic__links-block">

              <div className="academic__subheader">

                <h3>
                  روابط مهنية
                </h3>

                <button
                  type="button"
                  className="academic__link-btn"
                  onClick={openLinksModal}
                >
                  <FaPencilAlt size={12} />
                  تعديل
                </button>

              </div>

              <div className="academic__links-row">

                {professionalLinks.map(
                  (link) => (

                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="academic__link-chip"
                    >

                      {link.type ===
                        "LinkedIn" && (
                        <FaLinkedin
                          size={18}
                        />
                      )}

                      {link.type ===
                        "GitHub" && (
                        <FaGithub
                          size={18}
                        />
                      )}

                      <span>
                        {link.url}
                      </span>

                    </a>

                  )
                )}

              </div>

            </div>

          </section>

          {/* =================================================
              التعليم
          ================================================= */}

          <section className="academic__card">

            <div className="academic__card-header academic__card-header--with-action">

              <h2>
                التعليم
              </h2>

              <button
                type="button"
                className="academic__btn-primary"
                onClick={openAddEducation}
              >
                <FaPlus size={14} />
                إضافة مؤهل
              </button>

            </div>

            {sortedEducation.length === 0 ? (

              <div className="academic__empty-state">

                <FaBookOpen size={22} />

                <p>
                  لم يتم إضافة أي مؤهل تعليمي،
                  اضغط لإضافة مؤهلاتك.
                </p>

              </div>

            ) : (

              <div className="academic__education-list">

                {sortedEducation.map(
                  (item) => {

                    const meta =
                      educationTypesMeta[
                        item.type
                      ] ||
                      educationTypesMeta
                        .university;

                    const Icon = meta.icon;

                    const gradeLabel =
                      item.type ===
                      "university"
                        ? "المعدل التراكمي"
                        : "المعدل";

                    return (

                      <div
                        className="academic__education-card"
                        key={item.id}
                      >

                        <div className="academic__education-meta">

                          <button
                            type="button"
                            className="academic__icon-btn"
                            onClick={() =>
                              openEditEducation(
                                item
                              )
                            }
                          >
                            <FaPencilAlt
                              size={16}
                            />
                          </button>

                          <button
                            type="button"
                            className="academic__icon-btn academic__icon-btn--ghost"
                            onClick={() =>
                              deleteEducation(
                                item.id
                              )
                            }
                          >
                            <FaTrash
                              size={16}
                            />
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

                          <div
                            className="academic__education-icon"
                            style={{
                              background:
                                meta.color,
                            }}
                          >
                            <Icon
                              size={20}
                              color="#0061A4"
                            />
                          </div>

                          <div className="academic__education-text">

                            <h4>
                              {item.title}
                            </h4>

                            {item.degree && (

                              <span className="academic__edu-degree">
                                {item.degree}
                              </span>

                            )}

                            <p>
                              {item.subtitle}
                            </p>

                          </div>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </section>

          {/* =================================================
              المهارات واللغات
          ================================================= */}

          <section className="academic__card">

            <div className="academic__card-header academic__card-header--with-action">

              <h2>
                المهارات واللغات
              </h2>

            </div>

            {/* المهارات */}

            <div className="academic__skills-block">

              <div className="academic__subheader">

                <h3>
                  المهارات التقنية والشخصية
                </h3>

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

                  <span
                    className="academic__tag"
                    key={s}
                  >
                    {s}
                  </span>

                ))}

              </div>

              {/* اقتراحات AI */}

              <div className="academic__ai-box">

                <FaStar
                  size={20}
                  className="academic__ai-icon"
                />

                <div>

                  <h4>
                    اقتراحات الذكاء الاصطناعي بناءً
                    على تخصصك
                  </h4>

                  <div className="academic__tags-row">

                    {suggestedSkills
                      .filter(
                        (s) =>
                          !skills.includes(s)
                      )
                      .map((s) => (

                        <button
                          type="button"
                          className="academic__tag academic__tag--suggested"
                          key={s}
                          onClick={() =>
                            addSuggestedSkill(
                              s
                            )
                          }
                        >

                          {s}

                          <FaPlus size={12} />

                        </button>

                      ))}

                  </div>

                </div>

              </div>

            </div>

            {/* اللغات */}

            <div className="academic__skills-block">

              <div className="academic__subheader">

                <h3>
                  اللغات
                </h3>

                <button
                  type="button"
                  className="academic__link-btn"
                  onClick={
                    openLanguagesModal
                  }
                >
                  <FaPencilAlt size={12} />
                  إضافة لغة
                </button>

              </div>

              <div className="academic__interests-row">

                {languages.map(
                  (lang) => (

                    <div
                      className="academic__interest-box"
                      key={lang.id}
                    >

                      <span className="academic__interest-title">
                        {lang.label}
                      </span>

                      <span className="academic__interest-meta">
                        {lang.meta}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

          {/* =================================================
              Modal المعلومات الشخصية
          ================================================= */}

          {modal === "personal" && (

            <AcademicprofileModal
              title="تعديل المعلومات الشخصية"
              onClose={() =>
                setModal(null)
              }
            >

              <div className="modal-form">

                {personalFieldsMeta.map(
                  ({
                    key,
                    label,
                    placeholder,
                  }) => (

                    <label
                      key={key}
                      className="modal-form__field"
                    >

                      <span>
                        {label}
                      </span>

                      {key ===
                      "birthDate" ? (

                        <input
                          type="date"
                          lang="en-CA"
                          min="1940-01-01"
                          max="2027-12-31"
                          value={
                            personalDraft.birthDate
                          }
                          onChange={(e) =>
                            handlePersonalChange(
                              "birthDate",
                              e.target.value
                            )
                          }
                          className={
                            personalErrors.birthDate
                              ? "input-error"
                              : ""
                          }
                          style={{
                            direction: "ltr",
                            textAlign: "left",
                          }}
                        />

                      ) : key ===
                        "phone" ? (

                        <div
                          className={
                            personalErrors.phone
                              ? "phone-input-wrapper input-error"
                              : "phone-input-wrapper"
                          }
                        >

                          <PhoneInput
                            international
                            defaultCountry="PS"
                            value={
                              personalDraft.phone
                            }
                            onChange={(value) =>
                              handlePersonalChange(
                                "phone",
                                value || ""
                              )
                            }
                          />

                        </div>

                      ) : (

                        <input
                          type={
                            key === "email"
                              ? "email"
                              : "text"
                          }
                          value={
                            personalDraft[key]
                          }
                          placeholder={
                            placeholder
                          }
                          onChange={(e) =>
                            handlePersonalChange(
                              key,
                              e.target.value
                            )
                          }
                          className={
                            personalErrors[key]
                              ? "input-error"
                              : ""
                          }
                        />

                      )}

                      {personalErrors[key] && (

                        <span className="modal-form__error">
                          {
                            personalErrors[
                              key
                            ]
                          }
                        </span>

                      )}

                    </label>

                  )
                )}

              </div>

              <div className="modal-box__footer">

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() =>
                    setModal(null)
                  }
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

          {/* =================================================
              Modal الروابط
          ================================================= */}

          {modal === "links" && (

            <AcademicprofileModal
              title="تعديل الروابط المهنية"
              onClose={() =>
                setModal(null)
              }
            >

              <div className="modal-form">

                {linksDraft.map(
                  (link) => (

                    <div
                      key={link.id}
                      className="professional-link-edit"
                    >

                      <label className="modal-form__field">

                        <span>
                          نوع الرابط
                        </span>

                        <select
                          value={link.type}
                          onChange={(e) =>
                            handleLinkChange(
                              link.id,
                              "type",
                              e.target.value
                            )
                          }
                        >

                          <option value="LinkedIn">
                            LinkedIn
                          </option>

                          <option value="GitHub">
                            GitHub
                          </option>

                          <option value="Portfolio">
                            Portfolio
                          </option>

                          <option value="Behance">
                            Behance
                          </option>

                          <option value="Other">
                            رابط آخر
                          </option>

                        </select>

                      </label>

                      <label className="modal-form__field">

                        <span>
                          الرابط
                        </span>

                        <input
                          type="url"
                          placeholder="https://example.com"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(
                              link.id,
                              "url",
                              e.target.value
                            )
                          }
                        />

                      </label>

                      <button
                        type="button"
                        className="academic__btn-danger"
                        onClick={() =>
                          removeProfessionalLink(
                            link.id
                          )
                        }
                      >

                        <FaTrash size={13} />

                        حذف الرابط

                      </button>

                    </div>

                  )
                )}

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={
                    addProfessionalLink
                  }
                >
                  <FaPlus size={13} />
                  إضافة رابط جديد
                </button>

              </div>

              <div className="modal-box__footer">

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() =>
                    setModal(null)
                  }
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  className="academic__btn-primary"
                  onClick={
                    saveProfessionalLinks
                  }
                >
                  حفظ
                </button>

              </div>

            </AcademicprofileModal>

          )}

          {/* =================================================
              Modal التعليم
          ================================================= */}

          {modal === "education" && (

            <AcademicprofileModal
              title={
                educationDraft.id
                  ? "تعديل المؤهل"
                  : "إضافة مؤهل جديد"
              }
              onClose={() =>
                setModal(null)
              }
            >

              <div className="modal-form">

                {/* النوع */}

                <label className="modal-form__field">

                  <span>
                    النوع
                  </span>

                  <select
                    value={
                      educationDraft.type
                    }
                    onChange={(e) =>
                      handleEducationChange(
                        "type",
                        e.target.value
                      )
                    }
                  >

                    {Object.entries(
                      educationTypesMeta
                    ).map(
                      ([key, meta]) => (

                        <option
                          key={key}
                          value={key}
                        >
                          {meta.label}
                        </option>

                      )
                    )}

                  </select>

                </label>

                {/* المسمى */}

                <label className="modal-form__field">

                  <span>
                    المسمى
                    (مثال: بكالوريوس، ثانوية،
                    شهادة)
                  </span>

                  <input
                    type="text"
                    value={
                      educationDraft.degree
                    }
                    onChange={(e) =>
                      handleEducationChange(
                        "degree",
                        e.target.value
                      )
                    }
                  />

                </label>

                {/* السنة */}

                <label className="modal-form__field">

                  <span>
                    سنة التخرج / الإنجاز
                  </span>

                  <input
                    type="number"
                    placeholder="مثال: 2024"
                    value={
                      educationDraft.year
                    }
                    onChange={(e) =>
                      handleEducationChange(
                        "year",
                        e.target.value
                      )
                    }
                    className={
                      educationErrors.year
                        ? "input-error"
                        : ""
                    }
                  />

                  {educationErrors.year && (

                    <span className="modal-form__error">
                      {
                        educationErrors.year
                      }
                    </span>

                  )}

                </label>

                {/* المعدل */}

                <label className="modal-form__field">

                  <span>
                    المعدل (اختياري)
                  </span>

                  <input
                    type="text"
                    placeholder="مثال: 4.8 / 5.0 أو 99%"
                    value={
                      educationDraft.grade
                    }
                    onChange={(e) =>
                      handleEducationChange(
                        "grade",
                        e.target.value
                      )
                    }
                  />

                </label>

                {/* التخصص */}

                <label className="modal-form__field">

                  <span>
                    التخصص / العنوان
                  </span>

                  <input
                    type="text"
                    value={
                      educationDraft.title
                    }
                    onChange={(e) =>
                      handleEducationChange(
                        "title",
                        e.target.value
                      )
                    }
                    className={
                      educationErrors.title
                        ? "input-error"
                        : ""
                    }
                  />

                  {educationErrors.title && (

                    <span className="modal-form__error">
                      {
                        educationErrors.title
                      }
                    </span>

                  )}

                </label>

                {/* المؤسسة */}

                <label className="modal-form__field">

                  <span>
                    اسم المؤسسة / الجهة المانحة
                  </span>

                  <input
                    type="text"
                    value={
                      educationDraft.subtitle
                    }
                    onChange={(e) =>
                      handleEducationChange(
                        "subtitle",
                        e.target.value
                      )
                    }
                    className={
                      educationErrors.subtitle
                        ? "input-error"
                        : ""
                    }
                  />

                  {educationErrors.subtitle && (

                    <span className="modal-form__error">
                      {
                        educationErrors.subtitle
                      }
                    </span>

                  )}

                </label>

              </div>

              <div className="modal-box__footer">

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() =>
                    setModal(null)
                  }
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

          {/* =================================================
              Modal المهارات
          ================================================= */}

          {modal === "skills" && (

            <AcademicprofileModal
              title="تعديل المهارات"
              onClose={() =>
                setModal(null)
              }
            >

              <div className="modal-tag-input">

                <input
                  type="text"
                  placeholder="أضف مهارة جديدة..."
                  value={newSkill}
                  onChange={(e) =>
                    setNewSkill(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addDraftSkill();
                    }
                  }}
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

                  <span
                    className="academic__tag modal-tag--removable"
                    key={s}
                  >

                    {s}

                    <button
                      type="button"
                      onClick={() =>
                        removeDraftSkill(s)
                      }
                    >
                      <FaTimes size={12} />
                    </button>

                  </span>

                ))}

              </div>

              <div className="modal-box__footer">

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() =>
                    setModal(null)
                  }
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

          {/* =================================================
              Modal اللغات
          ================================================= */}

          {modal === "languages" && (

            <AcademicprofileModal
              title="تعديل اللغات"
              onClose={() =>
                setModal(null)
              }
            >

              <div
                style={{
                  marginBottom: "15px",
                }}
              >

                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "8px",
                  }}
                >
                  اختر لغة وحدد مستواك لإضافتها:
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >

                  {availableLanguages.map(
                    (lang) => {

                      const isAdded =
                        languagesDraft.some(
                          (l) =>
                            l.label ===
                            lang.label
                        );

                      return (

                        <div
                          key={lang.label}
                          style={{
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "space-between",
                            padding:
                              "8px 12px",
                            background:
                              "#f9f9f9",
                            borderRadius:
                              "8px",
                            opacity:
                              isAdded
                                ? 0.6
                                : 1,
                          }}
                        >

                          <span
                            style={{
                              fontWeight: "500",
                            }}
                          >
                            {lang.label}
                          </span>

                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems:
                                "center",
                            }}
                          >

                            <select
                              disabled={
                                isAdded
                              }
                              id={`level-${lang.label}`}
                              defaultValue={
                                lang.meta
                              }
                              style={{
                                padding:
                                  "4px 8px",
                                borderRadius:
                                  "4px",
                                border:
                                  "1px solid #ccc",
                              }}
                            >

                              <option value="اللغة الأم">
                                اللغة الأم
                              </option>

                              <option value="مستوى متقدم">
                                مستوى متقدم
                              </option>

                              <option value="مستوى متوسط">
                                مستوى متوسط
                              </option>

                              <option value="مستوى مبتدئ">
                                مستوى مبتدئ
                              </option>

                            </select>

                            <button
                              type="button"
                              className="academic__btn-primary"
                              style={{
                                padding:
                                  "4px 10px",
                                fontSize:
                                  "12px",
                              }}
                              disabled={
                                isAdded
                              }
                              onClick={() => {

                                const selectElement =
                                  document.getElementById(
                                    `level-${lang.label}`
                                  );

                                const selectedMeta =
                                  selectElement.value;

                                if (!isAdded) {

                                  setLanguagesDraft(
                                    (prev) => [
                                      ...prev,
                                      {
                                        id: Date.now(),
                                        label:
                                          lang.label,
                                        meta:
                                          selectedMeta,
                                      },
                                    ]
                                  );

                                }

                              }}
                            >

                              {isAdded
                                ? "تمت الإضافة"
                                : "إضافة"}

                            </button>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

                {/* لغة مخصصة */}

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems:
                      "center",
                    marginTop: "12px",
                    padding:
                      "8px 12px",
                    background:
                      "#eef6ff",
                    borderRadius:
                      "8px",
                  }}
                >

                  <input
                    type="text"
                    placeholder="لغة غير موجودة؟ اكتبيها هون..."
                    value={
                      customLanguage
                    }
                    onChange={(e) =>
                      setCustomLanguage(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        addCustomLanguage();
                      }
                    }}
                    style={{
                      flex: 1,
                      padding:
                        "6px 10px",
                      borderRadius:
                        "4px",
                      border:
                        "1px solid #ccc",
                    }}
                  />

                  <select
                    value={
                      customLevel
                    }
                    onChange={(e) =>
                      setCustomLevel(
                        e.target.value
                      )
                    }
                    style={{
                      padding:
                        "4px 8px",
                      borderRadius:
                        "4px",
                      border:
                        "1px solid #ccc",
                    }}
                  >

                    <option value="اللغة الأم">
                      اللغة الأم
                    </option>

                    <option value="مستوى متقدم">
                      مستوى متقدم
                    </option>

                    <option value="مستوى متوسط">
                      مستوى متوسط
                    </option>

                    <option value="مستوى مبتدئ">
                      مستوى مبتدئ
                    </option>

                  </select>

                  <button
                    type="button"
                    className="academic__btn-primary"
                    style={{
                      padding:
                        "4px 10px",
                      fontSize:
                        "12px",
                    }}
                    onClick={
                      addCustomLanguage
                    }
                  >
                    إضافة
                  </button>

                </div>

              </div>

              <hr
                style={{
                  border: "0",
                  borderTop:
                    "1px solid #eee",
                  margin:
                    "15px 0",
                }}
              />

              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  marginBottom:
                    "8px",
                }}
              >
                اللغات المضافة في ملفك:
              </p>

              <div className="academic__tags-row modal-tags-list">

                {languagesDraft.map(
                  (lang) => (

                    <span
                      className="academic__tag modal-tag--removable"
                      key={lang.id}
                    >

                      {lang.label} ({lang.meta})

                      <button
                        type="button"
                        onClick={() =>
                          removeDraftLanguage(
                            lang.id
                          )
                        }
                      >
                        <FaTimes size={12} />
                      </button>

                    </span>

                  )
                )}

              </div>

              <div
                className="modal-box__footer"
                style={{
                  marginTop: "20px",
                }}
              >

                <button
                  type="button"
                  className="academic__btn-outline"
                  onClick={() =>
                    setModal(null)
                  }
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

      {/* =====================================================
          Sidebar
      ===================================================== */}

      <div className="academic-sidebar-container">
        <SideNavBar />
      </div>

    </div>
  );
}