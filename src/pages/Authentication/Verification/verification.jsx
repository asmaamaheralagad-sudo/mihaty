import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import './verification.css';
import "../../../index.css";

// 1. استيراد وظائف Firebase وترجمة الأخطاء
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase';

function Verification() {
  const location = useLocation();
  const email = location.state?.email || "";

  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const handleOpenEmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  // 2. دالة إعادة إرسال رابط استعادة كلمة المرور عبر Firebase
  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      setResendError("لم يتم العثور على البريد الإلكتروني لتأكيده.");
      return;
    }

    setResendLoading(true);
    setResendMessage("");
    setResendError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setResendMessage("تمت إعادة إرسال رابط الاستعادة بنجاح.");
    } catch (err) {
      const customErrorMessage = getFirebaseAuthErrorMessage(err.code);
      setResendError(customErrorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">تحقق من بريدك الإلكتروني</h1>
      <p className="auth-desc">
        أرسلنا رابط إعادة تعيين كلمة المرور إلى<br />
        <span className="email-highlight">{email || "بريدك الإلكتروني"}</span>
      </p>

      {/* عرض رسائل التأكيد أو الخطأ عند إعادة الإرسال */}
      {resendMessage && <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>{resendMessage}</div>}
      {resendError && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{resendError}</div>}

      <button
        type="button"
        className="auth-submit-btn"
        onClick={handleOpenEmail}
      >
        فتح البريد الإلكتروني
      </button>

      <p className="resend-text">
        لم يصلك الرابط؟{" "}
        <button 
          type="button" 
          onClick={handleResend} 
          disabled={resendLoading}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
        >
          {resendLoading ? "جاري الإرسال..." : "إعادة الإرسال"}
        </button>
      </p>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default Verification;