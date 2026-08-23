import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import { MdOutlineEmail } from "react-icons/md";
import "../../../index.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // هون لاحقاً بتحط استدعاء الـ API لإرسال رابط الاستعادة فعلياً
    navigate("/verification", { state: { email } });
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">استعادة كلمة المرور</h1>
      <p className="auth-desc">
        أدخل بريدك الإلكتروني وسنرسل لك رابط آمن لإعادة تعيين كلمة المرور
      </p>

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
            />
            <MdOutlineEmail className="input-icon" />
          </div>
        </div>

        <button type="submit" className="auth-submit-btn">
          إرسال رابط الاستعادة
        </button>
      </form>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default ForgetPassword;