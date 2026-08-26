import React, { useState } from 'react';
import loginImg from '../../../image/login.png';
import logoImg from '../../../image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "../../../index.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // هون لاحقاً بتحط استدعاء الـ API للتحقق من بيانات الدخول فعلياً
    navigate("/");
  };

  return (
    <div className="login-container auth-page-container">
      
      {/* الجزء الأيمن: الصورة الجانبية */}
      <div className="login-image-section auth-image-section">
        <img src={loginImg} alt="صورة خريجين" className="login-bg-img" />
        <div className="login-image-overlay"></div>

        <div className="login-image-content">
          <div className="login-image-badge">
            منحتك تبدأ بخطوة
          </div>
          <div className="login-image-text">
            <h2 className="login-image-title">مرحباً بعودتك إلى منحتي</h2>
            <p className="login-image-desc">
              مكان واحد يساعدك على ترتيب فرص المنح وخطوات التقديم بثقة
            </p>
          </div>
        </div>
      </div>

      {/* الجزء الأيسر: نموذج تسجيل الدخول */}
      <div className="login-form-section auth-form-section">
        <div className="login-box">
          
          {/* قسم الشعار والعناوين */}
          <div className="login-header">
            <img src={logoImg} alt="شعار منحتي" className="logo-img" />
            <h1>مرحباً بعودتك</h1>
            <h2>سجل الدخول للمتابعة إلى حسابك</h2>
          </div>

          {/* النموذج الرئيسي */}
          <form onSubmit={handleSubmit} className="login-form">
            
            {/* حقل البريد الإلكتروني */}
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                />
                <MdOutlineEmail className="input-icon" />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            <div className="form-group">
              <label>كلمة المرور</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
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

            {/* صف تذكرني + نسيت كلمة المرور */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>تذكرني</span>
              </label>
              <div className="forgot-password">
                <Link to="/ForgetPassword">هل نسيت كلمة المرور؟</Link>
              </div>
            </div>

            {/* زر تسجيل الدخول */}
            <button type="submit" className="login-submit-btn">
              تسجيل الدخول
            </button>
          </form>

          {/* رابط إنشاء حساب */}
          <p className="signup-redirect">
            ليس لديك حساب؟ <Link to="/signup">إنشاء حساب</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;