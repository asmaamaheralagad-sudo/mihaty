import React, { useState } from 'react';
import logoImg from '../../../image/logo.png';
import logoImg1 from '../../../image/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import "../../../index.css";
import { loginWithEmail, loginWithGoogle } from './loginService';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const result = await loginWithEmail(email, password);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
      return;
    }

    navigate("/Profile");
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setLoading(true);

    const result = await loginWithGoogle();
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
      return;
    }

    navigate("/Profile");
  };

  return (
    <div className="login-container auth-page-container">

      {/* الجزء الجانبي: اللوغو والنص التعريفي */}
      <div className="login-image-section auth-image-section">
        <img src={logoImg} alt="شعار منحتي" className="login-side-logo" />

        <div className="login-image-text">
          <h2 className="login-image-title">منحتك القادمة على بُعد خطوة واحدة</h2>
          <p className="login-image-desc">
            سجل دخولك لمتابعة المنح المتطابقة لملفك و مواعيد التقديم وحالة طلب صياغة سيرتك الذاتية
          </p>
        </div>
      </div>

      {/* نموذج تسجيل الدخول */}
      <div className="login-form-section auth-form-section">
        <div className="login-box">
          <div className="login-header">
            <div
              className="logo-img">
                 <img src={logoImg1} alt="شعار منحتي"  />
              </div>
            <h1>مرحبًا بعودتك</h1>
            <h2>سجّل الدخول للمتابعة إلى حسابك.</h2>
          </div>

          {errorMsg && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineEmail className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>كلمة المرور</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TbLockPassword className="input-icon" />
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

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>تذكر جهازي</span>
              </label>
              <div className="forgot-password">
                <Link to="/ForgetPassword">هل نسيت كلمة المرور؟</Link>
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="social-section">
            <div className="social-divider">
              <span>أو التسجيل السريع عبر</span>
            </div>
            <div className="social-buttons">
              <button type="button" onClick={handleGoogleSignIn} disabled={loading}>
                <FcGoogle size={18} />
              </button>
              <button type="button" disabled={loading}>
                <FaApple size={18} />
              </button>
              <button type="button" disabled={loading}>
                <FaFacebookF size={16} color="#1877F2" />
              </button>
            </div>
          </div>

          <p className="signup-redirect">
            ليس لديك حساب؟ <Link to="/signup">إنشاء حساب جديد</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
