import { useState } from "react";
import { useNavigate } from "react-router-dom";
// استيراد الأيقونات البديلة من مكتبة react-icons (مجموعة Feather Icons - fi)
import {
  FiGrid,
  FiUser,
  FiBookmark,
  FiFileText,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import "./SideNavBar.css";

// روابط قائمة التنقل الرئيسية مع الأيقونات والمسارات (routes)
const navLinks = [
  { key: "overview", label: "نظرة عامة", icon: FiGrid, path: "/" },
  {
    key: "academic",
    label: "الملف الأكاديمي",
    icon: FiUser,
    path: "/AcademicProfile",
  },
  { key: "saved", label: "المحفوظات", icon: FiBookmark, path: "/saved" },
  {
    key: "documents",
    label: "المستندات",
    icon: FiFileText,
    path: "/documents",
  },
  { key: "settings", label: "الإعدادات", icon: FiSettings, path: "/settings" },
];

export default function SideNavBar({
  user = {
    name: "أحمد عبدالله",
    avatarUrl: "",
    completionPercent: 85,
  },
  activeKey = "academic",
  onNavigate = () => {},
  onUpdateProfile = () => {},
  onLogout = () => {},
}) {
  const [active, setActive] = useState(activeKey);
  const navigate = useNavigate();

  const handleNavClick = (key, path) => {
    setActive(key);
    onNavigate(key);
    navigate(path);
  };

  return (
    <aside className="side-nav" dir="rtl">
      {/* الهيدر: صورة المستخدم + الاسم + نسبة الاكتمال + زر التحديث */}
      <div className="side-nav__header-wrapper">
        <div className="side-nav__header">
          <div className="side-nav__avatar-wrapper">
            {user.avatarUrl ? (
              <img
                className="side-nav__avatar"
                src={user.avatarUrl}
                alt={user.name}
              />
            ) : (
              <div className="side-nav__avatar side-nav__avatar--placeholder">
                {user.name?.charAt(0)}
              </div>
            )}
          </div>

          <h2 className="side-nav__name">{user.name}</h2>

          <p className="side-nav__completion">
            مكتمل بنسبة {user.completionPercent}%
          </p>

          <div className="side-nav__button-wrapper">
            <button
              type="button"
              className="side-nav__update-btn"
              onClick={onUpdateProfile}
            >
              تحديث الملف
            </button>
          </div>
        </div>
      </div>

      {/* روابط التنقل */}
      <nav className="side-nav__tabs-wrapper">
        <ul className="side-nav__tabs">
          {navLinks.map(({ key, label, icon: Icon, path }) => (
            <li key={key}>
              <button
                type="button"
                className={`side-nav__link${
                  active === key ? " side-nav__link--active" : ""
                }`}
                onClick={() => handleNavClick(key, path)}
              >
                <span className="side-nav__link-label">{label}</span>
                {/* خاصية size تعمل بنفس الطريقة تقريباً */}
                <Icon className="side-nav__icon" size={18} />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* روابط الفوتر */}
      <div className="side-nav__footer-wrapper">
        <div className="side-nav__footer">
          <button
            type="button"
            className="side-nav__link side-nav__link--footer"
          >
            <span className="side-nav__link-label">مركز المساعدة</span>
            <FiHelpCircle className="side-nav__icon" size={20} />
          </button>

          <button
            type="button"
            className="side-nav__link side-nav__link--footer"
            onClick={onLogout}
          >
            <span className="side-nav__link-label">تسجيل الخروج</span>
            <FiLogOut className="side-nav__icon" size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
