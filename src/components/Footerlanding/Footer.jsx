import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import './Footer.css';

// عدّل الروابط دي حسب الراوتس والحسابات الفعلية عندكم
const exploreLinks = [
  { label: 'تصفح المنح', to: '/scholarships' },
  { label: 'أدوات الذكاء الاصطناعي', href: '/#ai-tools' },
  { label: 'من نحن', href: '/#about-us' },
];

const legalLinks = [
  { label: 'سياسة الخصوصية', to: '/privacy' },
  { label: 'الشروط والأحكام', to: '/terms' },
];

const socials = [
  { label: 'فيسبوك', href: '#', Icon: FaFacebookF },
  { label: 'إنستغرام', href: '#', Icon: FaInstagram },
  { label: 'لينكدإن', href: '#', Icon: FaLinkedinIn },
  { label: 'إكس', href: '#', Icon: FaXTwitter },
];

function FooterLink({ link }) {
  return link.to ? (
    <Link to={link.to}>{link.label}</Link>
  ) : (
    <a href={link.href}>{link.label}</a>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">منحتي</h2>
          <p className="footer-about">
            منصة تجمع لك المنح الدراسية حول العالم، وتساعدك على تجهيز طلب التقديم
            ومتابعة المواعيد في مكان واحد.
          </p>

          <ul className="footer-socials">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-col" aria-label="روابط المنصة">
          <h3 className="footer-heading">المنصة</h3>
          <ul>
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="روابط قانونية">
          <h3 className="footer-heading">معلومات قانونية</h3>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h3 className="footer-heading">تواصل معنا</h3>
          <a className="footer-contact" href="mailto:info@minhiti.com">
            <HiOutlineEnvelope aria-hidden="true" />
            <span dir="ltr">info@minhiti.com</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} منحتي. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}

export default Footer;
