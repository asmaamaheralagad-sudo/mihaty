import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCardLayout from '../../../components/AuthCardLayout';
import { MdOutlineEmail } from "react-icons/md";
import "../../../index.css";
import API from '../../../api';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // إرسال طلب استعادة كلمة المرور للباك إند
      const response = await API.post('/forgot-password', { email });
      
      setSuccessMsg(response.data.message || "تم إرسال رابط الاستعادة إلى بريدك الإلكتروني بنجاح");
      
      // توجيه المستخدم لصفحة التحقق بعد ثانيتين من النجاح
      setTimeout(() => {
        navigate("/verification", { state: { email } });
      }, 2000);

    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMsg(err.response.data.message || "حدث خطأ أثناء إرسال الطلب");
      } else {
        setErrorMsg("تعذر الاتصال بالسيرفر، تأكدي من الاتصال بالإنترنت");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardLayout>
      <h1 className="auth-title">استعادة كلمة المرور</h1>
      <p className="auth-desc">
        أدخل بريدك الإلكتروني وسنرسل لك رابط آمن لإعادة تعيين كلمة المرور
      </p>

      {/* عرض رسائل الخطأ أو النجاح */}
      {errorMsg && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
      {successMsg && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{successMsg}</div>}

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
              disabled={loading}
            />
            <MdOutlineEmail className="input-icon" />
          </div>
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
        </button>
      </form>

      <Link to="/login" className="auth-back-link">
        ← تسجيل الدخول
      </Link>
    </AuthCardLayout>
  );
}

export default ForgetPassword;