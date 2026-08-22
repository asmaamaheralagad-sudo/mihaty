import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCardLayout from '../components/AuthCardLayout';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import './ResetPassword.css';
import "../index.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasMinLength) {
      setErrorMessage("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل");
      return;
    }
    if (!hasUpperCase) {
      setErrorMessage("كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل");
      return;
    }
    if (!hasNumber) {
      setErrorMessage("كلمة المرور يجب أن تحتوي على رقم واحد على الأقل");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return;
    }

    setErrorMessage("");
    // هون لاحقاً بتحط استدعاء الـ API لحفظ كلمة المرور الجديدة
    navigate("/reset-success");
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">إنشاء كلمة مرور جديدة</h1>
      <p className="auth-desc">
        يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، ورقم
      </p>

      <form onSubmit={handleSubmit} className="auth-form">

        <div className="form-group">
          <label>كلمة المرور الجديدة</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="إظهار/إخفاء كلمة المرور"
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>تأكيد كلمة المرور</label>
          <div className="input-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••"
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label="إظهار/إخفاء تأكيد كلمة المرور"
            >
              {showConfirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="error-box">{errorMessage}</div>
        )}

        <button type="submit" className="auth-submit-btn">
          حفظ كلمة المرور الجديدة
        </button>
      </form>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default ResetPassword;