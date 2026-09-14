import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import { MdOutlineEmail } from "react-icons/md";
import "../../../index.css";

// 1. استيراد وظائف Firebase والدالة المساعدة للأخطاء
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // 2. إرسال رابط إعادة تعيين كلمة المرور عبر Firebase
      await sendPasswordResetEmail(auth, email);
      
      setSuccessMsg("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح، يرجى مراجعة صندوق الوارد.");
    } catch (err) {
      // 3. ترجمة وعرض كود الخطأ القادم من Firebase
      const customErrorMessage = getFirebaseAuthErrorMessage(err.code);
      setErrorMsg(customErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">استعادة كلمة المرور</h1>
      <p className="auth-desc">
        أدخل بريدك الإلكتروني وسنرسل لك رابطاً آمناً لإعادة تعيين كلمة المرور
      </p>

      {/* عرض رسائل الخطأ أو النجاح */}
      {errorMsg && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
      {successMsg && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{successMsg}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>البريد الإلكتروني</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <MdOutlineEmail className="input-icon" />
          </div>
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
        </button>
      </form>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default ForgetPassword;