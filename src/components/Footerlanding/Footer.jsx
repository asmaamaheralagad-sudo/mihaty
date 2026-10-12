import React from "react";
import { Link } from "react-router-dom";
import loges from "../../image/logos.jpeg";
import { IoLocationOutline } from "react-icons/io5";

import {
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaFacebookF,
  FaInstagram,
  // FaArrowLeft,
  // FaSearch,
  // FaClock,
  // FaUserGraduate,
  // FaLinkedinIn,
  // FaMagic,
  FaTwitter,
  // FaRegBookmark,
} from "react-icons/fa";

import { HiOutlineEnvelope } from "react-icons/hi2";
import "./Footer.css";

// عدّل الروابط دي حسب الراوتس والحسابات الفعلية عندكم
const exploreLinks = [
  { label: "تصفح المنح", to: "/scholarships" },
  { label: "أدوات الذكاء الاصطناعي", href: "/#ai-tools" },
  { label: "من نحن", href: "/#about-us" },
];

const legalLinks = [
  { label: "سياسة الخصوصية", to: "/privacy" },
  { label: "الشروط والأحكام", to: "/terms" },
];

const socials = [
  { label: "فيسبوك", href: "#", Icon: FaFacebookF },
  { label: "إنستغرام", href: "#", Icon: FaInstagram },
  { label: "إكس", href: "#", Icon: FaTwitter },
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
    <footer className="bawsala-footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="brand-logo">
            <img src={loges} alt="بوصلة" />

            <h3>بوصلة</h3>
          </div>

          <p className="brand-desc">
            نرشدك نحو الفرص التعليمية والمنح الدراسية المتاحة حول العالم بذكاء
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

        <div className="footer-col">
          <h4>خدماتنا</h4>

          <ul>
            <li>المنح الدراسية</li>
            <li>الاستشارة والتوجيه الأكاديمي</li>
            <li>كتابة السيرة الذاتية</li>
            <li>التقديم على المنح</li>
            <li>الكتابة ومراجعة الخطاب التحفيزي</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>روابط سريعة</h4>

          <ul>
            <li>الرئيسية</li>
            <li>المنح الدراسية</li>
            <li>من نحن</li>
            <li>كيف نعمل</li>
            <li>اتصل بنا</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>تواصل معنا</h4>
          <ul>
            <li>
              <IoLocationOutline />
              مستقبل - قطاع غزة
            </li>

            <li>
              <FaEnvelope />
              contact@bawsala.com
            </li>

            <li>
              <FaPhone />
              0599929966
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 منصة بوصلة - جميع الحقوق محفوظة. تصميم وتطوير الفريق التقني.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
