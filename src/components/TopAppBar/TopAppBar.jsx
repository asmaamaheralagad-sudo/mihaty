import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";
import "./TopAppBar.css";

export default function TopAppBar({
  user = {
    name: "أحمد عبدالله",
    avatarUrl: "",
  },
  onSearchClick = () => {},
  onNotificationClick = () => {},
  onHelpClick = () => {},
  onProfileClick = () => {},
}) {
  return (
    <header className="top-app-bar" dir="rtl">
      {/* حاوية الأيقونات وصورة المستخدم */}
      <div className="top-app-bar__container">
        
        {/* زر البحث */}
        <button 
          type="button" 
          className="top-app-bar__icon-btn" 
          onClick={onSearchClick}
          aria-label="بحث"
        >
          <FiSearch className="top-app-bar__icon" size={18} />
        </button>

        {/* زر الإشعارات */}
        <button 
          type="button" 
          className="top-app-bar__icon-btn" 
          onClick={onNotificationClick}
          aria-label="الإشعارات"
        >
          <FiBell className="top-app-bar__icon" size={18} />
        </button>

        {/* زر المساعدة */}
        <button 
          type="button" 
          className="top-app-bar__icon-btn" 
          onClick={onHelpClick}
          aria-label="المساعدة"
        >
          <FiHelpCircle className="top-app-bar__icon" size={20} />
        </button>

        {/* صورة أو أيقونة حساب المستخدم */}
        <button 
          type="button" 
          className="top-app-bar__avatar-btn" 
          onClick={onProfileClick}
          aria-label="حساب المستخدم"
        >
          {user.avatarUrl ? (
            <img
              className="top-app-bar__avatar"
              src={user.avatarUrl}
              alt={user.name}
            />
          ) : (
            <div className="top-app-bar__avatar top-app-bar__avatar--placeholder">
              {user.name?.charAt(0)}
            </div>
          )}
        </button>

      </div>
    </header>
  );
}