import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import { MdOutlineEmail } from "react-icons/md";
import './verification.css';
import "../../../index.css";
import { resendResetLink } from './verificationService';

function Verification() {
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    const result = await resendResetLink(email);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
      return;
    }

    setSuccessMsg("تم إرسال رابط الاستعادة بنجاح.");
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">تحقق من بريدك الالكتروني</h1>
      <p className="auth-desc">
        أرسلنا رابط إعادة تعيين كلمة المرور إلى<br />
        <span className="email-highlight">{initialEmail || "بريدك الإلكتروني"}</span>
      </p>

      {successMsg && <div className="success-message">{successMsg}</div>}
      {errorMsg && <div className="error-message">{errorMsg}</div>}

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

export default Verification;