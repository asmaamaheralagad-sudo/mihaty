import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCardLayout from '../components/AuthCardLayout';
import { MdCheck } from "react-icons/md";
import './ResetSuccess.css';
import "../index.css";

function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <AuthCardLayout>
      <h1 className="success-title">تم تغيير كلمة المرور بنجاح</h1>

      <div className="success-icon">
        <MdCheck />
      </div>

      <p className="auth-desc">
        يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة
      </p>

      <button
        type="button"
        className="auth-submit-btn"
        onClick={() => navigate("/login")}
      >
        الذهاب لتسجيل الدخول
      </button>
    </AuthCardLayout>
  );
}

export default ResetSuccess;