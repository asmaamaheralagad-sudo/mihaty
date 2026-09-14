import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import './ResetPassword.css';
import "../../../index.css";

// 1. استيراد وظائف Firebase والدالة المساعدة للأخطاء
import { confirmPasswordReset } from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. قراءة oobCode من رابط Firebase المنسوخ من الإيميل
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const handleSubmit = async (e) => {
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

    if (!oobCode) {
      setErrorMessage("رابط إعادة التعيين غير صالح أو منتهي الصلاحية");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      // 3. تأكيد وتغيير كلمة المرور عبر Firebase
      await confirmPasswordReset(auth, oobCode, password);

      setLoading(false);
      navigate("/reset-success");
    } catch (err) {
      setLoading(false);
      // ترجمة خطأ Firebase (مثل انتهاء صلاحية الرابط)
      const customErrorMessage = getFirebaseAuthErrorMessage(err.code);
      setErrorMessage(customErrorMessage);
    }
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
              disabled={loading}
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
              disabled={loading}
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

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? "جاري الحفظ..." : "حفظ كلمة المرور الجديدة"}
        </button>
      </form>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default ResetPassword;