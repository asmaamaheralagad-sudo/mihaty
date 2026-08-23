import React, { useState } from 'react';
import signupImg from '../../../image/sign_up.png';
import logoImg from '../../../image/logo.png';
import { Link } from 'react-router-dom';
import './SignUp.css';
import "../../../index.css";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-container auth-page-container">

      {/* القسم الأيمن: صورة الطائرة (مكتوب أولاً حتى يظهر يمين الشاشة بالـ RTL) */}
      <div className="signup-image-section auth-image-section">
        <img src={signupImg} alt="صورة طائرة" />
        <div className="signup-image-overlay"></div>

        <div className="signup-image-content">
          <div className="signup-image-badge">
            منحتك تبدأ بخطوة
          </div>
          <div className="signup-image-text">
            <h2 className="signup-image-title">
              خطوتك الأولى نحو مستقبل أكاديمي أفضل!
            </h2>
            <p className="signup-image-desc">
              أنشئ حسابك الآن مجاناً للوصول إلى أحدث المنح الدراسية والتنبيهات المخصصة لخطة دراستك.
            </p>
          </div>
        </div>

        <p className="signup-image-caption">
          منصة عربية للطلاب والباحثين عن المنح
        </p>
      </div>

      {/* القسم الأيسر: نموذج إنشاء حساب */}
      <div className="signup-form-section auth-form-section">
        <div className="signup-box">
          
          {/* الشعار والعنوان */}
          <div className="signup-header">
            <img src={logoImg} alt="شعار منحتي" className="logo-img" />
            <h1>أنشئ حسابك في منحتي</h1>
            <h2>ابدأ باكتشاف الفرص الأكاديمية المناسبة لك</h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="signup-form">
            
            {/* حقل الاسم الكامل */}
            <div className="form-group">
              <label>الاسم الكامل</label>
              <div className="input-wrapper">
                <input type="text" placeholder="الاسم الكامل" />
                <FiUser className="input-icon" />
              </div>
            </div>

            {/* حقل البريد الإلكتروني */}
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-wrapper">
                <input type="email" placeholder="example@gmail.com" />
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

            {/* موافقة الشروط */}
            <div className="terms-container">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                أوافق على <a href="#">شروط الاستخدام</a> و <a href="#">سياسة الخصوصية</a>
              </label>
            </div>

            {/* زر إنشاء الحساب */}
            <button type="submit" className="submit-btn">
              إنشاء الحساب ←
            </button>
          </form>

          {/* أزرار التواصل الاجتماعي */}
          <div className="social-section">
            <span className="social-prompt">
              لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
            </span>
            
            <div className="social-buttons">
              <button type="button">
                <FaApple size={18} /> 
              </button>
              <button type="button">
                <FcGoogle size={18} /> 
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default SignUp;