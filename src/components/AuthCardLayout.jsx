import React from 'react';
import authBgImg from '../image/primary.jpg';
import logoImg from '../image/logo.png';
import { MdOutlineHeadsetMic, MdOutlineLock } from "react-icons/md";
import './AuthCardLayout.css';
import "../index.css";

function AuthCardLayout({ children }) {
  return (
    <div className="auth-layout">
      <img src={authBgImg} alt="خلفية" className="auth-bg-img" />
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <img src={logoImg} alt="شعار منحتي" className="auth-logo" />
        {children}
      </div>

      <div className="auth-footer">
        <span className="auth-footer-item">
          <MdOutlineHeadsetMic /> دعم 24/7
        </span>
        <span className="auth-footer-dot">•</span>
        <span className="auth-footer-item">
          <MdOutlineLock /> اتصال آمن
        </span>
      </div>
    </div>
  );
}

export default AuthCardLayout;