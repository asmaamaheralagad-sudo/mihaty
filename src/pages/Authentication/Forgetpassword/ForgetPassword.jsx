import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import { MdOutlineEmail } from "react-icons/md";
import "../../../index.css";
import { sendResetLink } from './forgetPasswordService';

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const result = await sendResetLink(email);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
      return;
    }

    // نجح الإرسال → ننتقل لصفحة التحقق ونمرر الإيميل معها
    navigate('/verification', { state: { email } });
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">استعادة كلمة المرور</h1>
      <p className="auth-desc">
        أدخل بريدك الإلكتروني وسنرسل لك رابطاً آمناً لإعادة تعيين كلمة المرور
      </p>

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

export default ForgetPassword;