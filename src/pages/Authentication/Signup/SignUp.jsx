import React, { useState } from 'react';
import signupImg from '../../../image/sign_up.png';
import logoImg from '../../../image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import "../../../index.css";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import API from '../../../api';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // نرسل password_confirmation مطابقة لـ password لتجاوز شرط السيرفر
      const response = await API.post('/register', { 
        name, 
        email, 
        password,
        password_confirmation: password 
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setLoading(false);
      alert('تم إنشاء الحساب بنجاح!');
      navigate('/login');
    } catch (err) {
      setLoading(false);
      
      // استخراج رسائل الأخطاء القادمة من الباك إند وعرضها بأسلوب واضح
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        const firstErrorKey = Object.keys(serverErrors)[0];
        setErrorMsg(serverErrors[firstErrorKey][0]);
      } else if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى');
      }
    }
  };

  return (
    <div className="signup-container auth-page-container">

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

      <div className="signup-form-section auth-form-section">
        <div className="signup-box">
          
          <div className="signup-header">
            <img src={logoImg} alt="شعار منحتي" className="logo-img" />
            <h1>أنشئ حسابك في منحتي</h1>
            <h2>ابدأ باكتشاف الفرص الأكاديمية المناسبة لك</h2>
          </div>

          {errorMsg && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            
            <div className="form-group">
              <label>الاسم الكامل</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="الاسم الكامل" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FiUser className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="example@gmail.com" 
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

            <div className="terms-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                أوافق على <a href="#">شروط الاستخدام</a> و <a href="#">سياسة الخصوصية</a>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب ←'}
            </button>
          </form>

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