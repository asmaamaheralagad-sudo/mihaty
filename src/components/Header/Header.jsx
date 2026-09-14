import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiBookmark, FiChevronDown, FiLogOut } from 'react-icons/fi';
import logoImg from '../../image/logo.png';
import avatarImg from '../../image/avatarImg.jpg';
import './Header.css';

// عشان نعرف هل فيه مستخدم مسجل دخول ولا لأ
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'المستخدم';
  const userPhoto = currentUser?.photoURL || avatarImg;

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to={currentUser ? '/Profile' : '/'}>
            <img src={logoImg} alt="منحتي" className="logo-img" />
          </Link>
        </div>

        <nav className="nav-links">
          <Link to={currentUser ? '/Profile' : '/'} className="nav-link">
            الرئيسية
          </Link>
          <Link to="/#scholarships-section" className="nav-link">
            اكتشف المنح
          </Link>
          <a href="#ai-tools" className="nav-link">
            أدوات الذكاء الاصطناعي
          </a>
          <a href="#about-us" className="nav-link">
            من نحن ؟
          </a>
        </nav>

        {/* ✅ لو المستخدم مسجل دخول: نافبار البروفايل - بالكامل inline styles عشان منلمسش أي CSS تاني */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              title="الإشعارات"
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#14335E',
              }}
            >
              <FiBell />
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#EAB308',
                }}
              ></span>
            </button>

            <button
              title="المحفوظات"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#14335E',
              }}
            >
              <FiBookmark />
            </button>

            <span style={{ color: '#e0e0e0' }}>|</span>

            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={userPhoto}
                  alt={userName}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span style={{ fontWeight: 600, color: '#14335E', fontSize: '14px' }}>
                  {userName}
                </span>
                <FiChevronDown style={{ color: '#14335E' }} />
              </div>

              {showDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    padding: '8px',
                    zIndex: 100,
                    marginTop: '8px',
                    minWidth: '150px',
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'none',
                      border: 'none',
                      color: '#d9534f',
                      cursor: 'pointer',
                      fontSize: '14px',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '4px',
                    }}
                  >
                    <FiLogOut /> تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // ✅ لو مفيش مستخدم مسجل دخول: تفضل زراير الزائر زي ما هي (كلاسات Header.css الأصلية)
          <div className="navbar-actions">
            <Link to="/login" className="btn-login">تسجيل الدخول</Link>
            <Link to="/Signup" className="btn-register">ابدأ الآن</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;