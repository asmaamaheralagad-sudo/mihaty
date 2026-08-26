import React from 'react';
import logoImg from '../../image/logo.png';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logoImg} alt="منحتي" className="logo-img" />
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-link active">الرئيسية</Link>
          <Link to="/scholarships" className="nav-link">اكتشف المنح</Link>
          <Link to="/ai-tools" className="nav-link">أدوات الذكاء الاصطناعي</Link>
          <Link to="/about" className="nav-link">من نحن ؟</Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/login" className="btn-login">تسجيل الدخول</Link>
          <Link to="/register" className="btn-register">ابدأ الآن</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;