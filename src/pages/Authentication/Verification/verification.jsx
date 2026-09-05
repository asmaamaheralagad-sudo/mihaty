import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import './verification.css';
import "../../../index.css";

function Verification() {
  const location = useLocation();
  const email = location.state?.email || "بريدك الإلكتروني";

  const handleOpenEmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">تحقق من بريدك الإلكتروني</h1>
      <p className="auth-desc">
        أرسلنا رابط إعادة تعيين كلمة المرور إلى<br />
        <span className="email-highlight">{email}</span>
      </p>

      <button
        type="button"
        className="auth-submit-btn"
        onClick={handleOpenEmail}
      >
        فتح البريد الإلكتروني
      </button>

      <p className="resend-text">
        لم يصلك الرابط؟ <a href="#">إعادة الإرسال</a>
      </p>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default Verification;