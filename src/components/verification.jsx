import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthCardLayout from '../components/AuthCardLayout';
import './Verification.css';
import "../index.css";

function Verification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "بريدك الإلكتروني";

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // هون لاحقاً بتحط تحقق فعلي من الرمز عبر API
    navigate("/reset-password");
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">تحقق من بريدك الإلكتروني</h1>
      <p className="auth-desc">
        أدخل رمز التحقق المرسل إلى بريدك الإلكتروني<br />
        {email}
      </p>

      <form onSubmit={handleVerify} className="auth-form">
        <div className="otp-container">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="otp-input"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <button type="submit" className="auth-submit-btn">
          تحقق
        </button>
      </form>

      <p className="resend-text">
        لم تستلم الرمز؟ <a href="#">إعادة الإرسال</a>
      </p>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default Verification;