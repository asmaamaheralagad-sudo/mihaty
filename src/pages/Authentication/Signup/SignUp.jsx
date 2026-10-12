import React, { useState } from 'react';
import logoImg from '../../../image/logo.png';
import logoBlueImg from '../../../image/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import "../../../index.css";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { signUpWithEmail, signUpWithGoogle } from './signupService';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('كلمة المرور وتأكيدها غير متطابقين');
      return;
    }

    setLoading(true);
    const result = await signUpWithEmail(name, email, password);
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
      return;
    }

    alert('تم إنشاء الحساب بنجاح! تم إرسال رابط تأكيد إلى بريدك الإلكتروني.');
    navigate('/login');
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    const result = await signUpWithGoogle();
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error);
      return;
    }

    navigate('/');
  };

  return (
    <div className="signup-container auth-page-container">

      {/* الجزء الجانبي: اللوغو والبادج والنص التعريفي */}
      <div className="signup-image-section auth-image-section">
        <img src={logoImg} alt="شعار منحتي" className="signup-side-logo" />

        <div className="signup-image-text">
          <h3 className="signup-image-badge">
          منحتك تبدأ بخطوة
          </h3>

          <h2 className="signup-image-title">خطوتك الأولى نحو مستقبل أكاديمي أفضل!</h2>
          <p className="signup-image-desc">
            أنشئ حسابك الآن مجانًا للوصول إلى أحدث المنح الدراسية والتنبيهات المخصصة لخطة دراستك.
          </p>
        </div>
      </div>

      {/* نموذج إنشاء الحساب */}
      <div className="signup-form-section auth-form-section">
        <div className="signup-box">

          <div className="signup-header">
            <img src={logoBlueImg} alt="شعار منحتي" className="logo-img" />
            <h1>أنشئ حسابك في منحتي</h1>
            <h2>ابدأ باكتشاف الفرص الأكاديمية المناسبة لك.</h2>
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

            <div className="form-group">
              <label>تأكيد كلمة المرور</label>
              <div className="input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <TbLockPassword className="input-icon" />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="إظهار/إخفاء تأكيد كلمة المرور"
                >
                  {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              <ul className="password-requirements">
                <li className={hasMinLength ? 'valid' : ''}>أدخل 8 أحرف على الأقل</li>
                <li className={hasUpperLower ? 'valid' : ''}>أحرف كبيرة وأحرف صغيرة</li>
                <li className={hasNumber ? 'valid' : ''}>رقم واحد على الأقل</li>
              </ul>
            </div>

            <div className="terms-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                أوافق على <a href="#">شروط الاستخدام</a> و <a href="#">سياسة الخصوصية</a>.
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب ←'}
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
            لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default SignUp;