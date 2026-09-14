import React, { useState } from 'react';
import loginImg from '../../../image/login.png';
import logoImg from '../../../image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "../../../index.css";

// 1. استيراد Firebase SDK ودالة ترجمة الأخطاء
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase'; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // دالة التسجيل العادي بالبريد والباسورد
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setLoading(false);
        setErrorMsg('يرجى تأكيد بريدك الإلكتروني أولاً عبر الرابط المرسل لبريدك.');
        return;
      }

      setLoading(false);
      // ✅ تم التصحيح: التوجيه للبروفايل بدل الصفحة الرئيسية
      navigate("/Profile");
    } catch (err) {
      setLoading(false);
      const customErrorMessage = getFirebaseAuthErrorMessage(err.code);
      setErrorMsg(customErrorMessage);
    }
  };

  // 2. دالة تسجيل الدخول عبر Google
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      setLoading(false);
      // ✅ تم التصحيح: التوجيه للبروفايل بدل الصفحة الرئيسية
      navigate("/Profile");
    } catch (err) {
      setLoading(false);
      const customErrorMessage = getFirebaseAuthErrorMessage(err.code);
      setErrorMsg(customErrorMessage);
    }
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

          {/* إظهار رسالة الخطأ إن وجدت */}
          {errorMsg && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontSize: '14px' }}>
              {errorMsg}
            </div>
          )}

          {/* النموذج الرئيسي */}
          <form onSubmit={handleSubmit} className="login-form">
            
            {/* حقل البريد الإلكتروني */}
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* زر تسجيل الدخول مع حالة التحميل */}
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* خيارات تسجيل الدخول بـ Google و Apple */}
          <div className="social-section" style={{ marginTop: '20px' }}>
            <div className="social-buttons">
              <button type="button" disabled={loading}>
                <FaApple size={18} />
              </button>
              <button type="button" onClick={handleGoogleSignIn} disabled={loading}>
                <FcGoogle size={18} />
              </button>
            </div>
          </div>

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