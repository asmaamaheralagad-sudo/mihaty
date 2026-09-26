import { useState } from "react";
import "./SettingsPage.css";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { FiBell } from "react-icons/fi";
// أيقونة تبديل بسيطة (Toggle Switch)
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`toggle ${checked ? "toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="toggle__thumb" />
    </button>
  );
}

export default function SettingsPage() {
  // حالة نموذج كلمة المرور
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // حالة تبديلات الخصوصية والأمان
  const [publicProfile, setPublicProfile] = useState(true);
  const [shareDataWithUniversities, setShareDataWithUniversities] =
    useState(false);

  // حالة تنبيهات البريد
  const [newMatches, setNewMatches] = useState(true);
  const [applicationUpdates, setApplicationUpdates] = useState(true);
  const [newsAndUpdates, setNewsAndUpdates] = useState(false);

  // حالة اللغة والمنطقة
  const [language, setLanguage] = useState("ar");
  const [timezone, setTimezone] = useState("ast");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log({ currentPassword, newPassword, confirmPassword });
  };

  const handleSaveChanges = () => {
    console.log({ language, timezone });
  };

  return (
    /* 1. حاوية رئيسية لتوزيع السايد بار والمحتوى جنباً إلى جنب */
    <div className="app-layout" dir="rtl">
      {/* استدعاء الشريط الجانبي */}
      <SideNavBar />

      {/* محتوى صفحة الإعدادات */}
      <div className="settings-page">
        <div className="settings-page__main">
          {/* Header */}
          <header className="settings-header">
            <h1 className="settings-header__title">الإعدادات</h1>
            <p className="settings-header__subtitle">
              إدارة تفضيلات الحساب والأمان الخاص بك.
            </p>
          </header>

          {/* Bento Grid */}
          <div className="settings-grid">
            {/* العمود الأول: الحساب والخصوصية */}
            <div className="settings-grid__col settings-grid__col--main">
              {/* بطاقة إعدادات الحساب */}
              <section className="card">
                <div className="card__header">
                  <h2 className="card__title">إعدادات الحساب</h2>
                </div>

                <form className="password-form" onSubmit={handleUpdatePassword}>
                  <label className="field">
                    <span className="field__label">تغيير كلمة المرور</span>
                    <input
                      type="password"
                      className="field__input"
                      placeholder="كلمة المرور الحالية"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <input
                      type="password"
                      className="field__input"
                      placeholder="كلمة المرور الجديدة"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>

                  <label className="field">
                    <input
                      type="password"
                      className="field__input field__input--focused"
                      placeholder="تأكيد كلمة المرور الجديدة"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>

                  <p className="field__hint">
                    كلمة المرور يجب أن تكون 8 أحرف على الأقل، وتحتوي على رقم
                    ورمز خاص.
                  </p>

                  <button type="submit" className="btn btn--primary">
                    تحديث كلمة المرور
                  </button>
                </form>
              </section>

              {/* بطاقة الخصوصية والأمان */}
              <section className="card">
                <div className="card__header">
                  <h2 className="card__title">الخصوصية والأمان</h2>
                </div>

                <div className="toggle-list">
                  <div className="toggle-item">
                    <Toggle
                      checked={publicProfile}
                      onChange={setPublicProfile}
                    />
                    <div className="toggle-item__text">
                      <span className="toggle-item__title">
                        ظهور الملف الشخصي
                      </span>
                      <span className="toggle-item__desc">
                        السماح للجامعات بالعثور على ملفي الشخصي.
                      </span>
                    </div>
                  </div>

                  <div className="toggle-item">
                    <Toggle
                      checked={shareDataWithUniversities}
                      onChange={setShareDataWithUniversities}
                    />
                    <div className="toggle-item__text">
                      <span className="toggle-item__title">
                        مشاركة البيانات مع الجامعات
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* بطاقة الجلسات والأجهزة النشطة */}
              <section className="card">
                <div className="card__header">
                  <h2 className="card__title">الجلسات والأجهزة النشطة</h2>
                </div>

                <div className="sessions-list">
                  <div className="session-item">
                    <span className="session-item__badge">
                      <span className="session-item__dot" />
                      النشطة الآن
                    </span>
                    <div className="session-item__info">
                      <span className="session-item__name">
                        Chrome (Windows)
                      </span>
                      <span className="session-item__meta">
                        الرياض، السعودية • قبل دقيقتين
                      </span>
                    </div>
                  </div>

                  <div className="session-item">
                    <div className="session-item__info">
                      <span className="session-item__name">
                        iPhone SE (iOS)
                      </span>
                      <span className="session-item__meta">
                        الرياض، السعودية • قبل 5 ساعات
                      </span>
                    </div>
                  </div>
                </div>

                <button type="button" className="btn btn--outline">
                  تسجيل الخروج من كافة الأجهزة
                </button>
              </section>
            </div>

            {/* العمود الثاني: التفضيلات ومنطقة الخطر */}
            <div className="settings-grid__col settings-grid__col--side">
              {/* بطاقة تنبيهات البريد */}
              <section className="card">
                <div className="card__header">
                  <FiBell size={20} color="#122669" />
                  <h2 className="card__title">تنبيهات البريد</h2>
                </div>

                <div className="toggle-list toggle-list--compact">
                  <div className="toggle-row">
                    <Toggle checked={newMatches} onChange={setNewMatches} />
                    <span className="toggle-row__label">تطابق منح جديدة</span>
                  </div>

                  <div className="toggle-row">
                    <Toggle
                      checked={applicationUpdates}
                      onChange={setApplicationUpdates}
                    />
                    <span className="toggle-row__label">
                      تحديثات حالة الطلب
                    </span>
                  </div>

                  <div className="toggle-row">
                    <Toggle
                      checked={newsAndUpdates}
                      onChange={setNewsAndUpdates}
                    />
                    <span className="toggle-row__label">أخبار وتحديثات</span>
                  </div>
                </div>
              </section>

              {/* بطاقة اللغة والمنطقة */}
              <section className="card">
                <div className="card__header">
                  <h2 className="card__title">اللغة والمنطقة</h2>
                </div>

                <div className="select-list">
                  <label className="select-field">
                    <span className="select-field__label">لغة الواجهة</span>
                    <select
                      className="select-field__input"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="ar">العربية (Arabic)</option>
                      <option value="en">English</option>
                    </select>
                  </label>

                  <label className="select-field">
                    <span className="select-field__label">المنطقة الزمنية</span>
                    <select
                      className="select-field__input"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="ast">توقيت السعودية (AST)</option>
                      <option value="utc">UTC</option>
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  className="btn btn--outline-primary"
                  onClick={handleSaveChanges}
                >
                  حفظ التغييرات
                </button>
              </section>

              {/* بطاقة منطقة الخطر */}
              <section className="card card--danger">
                <div className="card__header card__header--danger">
                  <h2 className="card__title card__title--danger">
                    منطقة الخطر
                  </h2>
                </div>

                <div className="danger-item">
                  <div className="danger-item__text">
                    <span className="danger-item__title">
                      تعطيل الحساب مؤقتاً
                    </span>
                    <span className="danger-item__desc">
                      تعطيل مؤقت للحساب، يمكنك استعادته لاحقاً.
                    </span>
                  </div>
                  <button type="button" className="btn btn--danger-outline">
                    تعطيل الحساب مؤقتاً
                  </button>
                </div>

                <div className="danger-item danger-item--bordered">
                  <div className="danger-item__text">
                    <span className="danger-item__title">
                      حذف الحساب نهائياً
                    </span>
                    <span className="danger-item__desc">
                      حذف نهائي لا يمكن التراجع عنه لجميع بياناتك.
                    </span>
                  </div>
                  <button type="button" className="btn btn--danger">
                    حذف الحساب نهائياً
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

