import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBookmark,
  HiOutlineGlobeAlt,
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineLanguage,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './DiscoverScholarships.css';

const quickFilters = ['منح البكالوريوس', 'منح الماجستير', 'منح ألمانيا', 'منح ممولة بالكامل'];

const countryOptions = ['تركيا', 'ألمانيا', 'المملكة المتحدة'];
const degreeOptions = ['بكالوريوس', 'ماجستير', 'دكتوراه'];
const languageOptions = ['يتطلب آيلتس / توفل', 'لا يشترط شهادة لغة'];

// بيانات وهمية - بتتبدل ببيانات الـ API لاحقاً
const grantsData = [
  {
    id: 1,
    title: 'منح DAAD الألمانية للدراسات العليا',
    status: 'مفتوح',
    statusType: 'success',
    matchType: 'suitable',
    matchValue: null,
    country: 'ألمانيا',
    degrees: 'ماجستير, دكتوراه',
    funding: 'ممولة بالكامل',
    language: 'لا يشترط شهادة لغة',
    deadline: '15 مارس 2024',
    logo: null,
  },
  {
    id: 2,
    title: 'المنحة الحكومية التركية (Türkiye Bursları)',
    status: 'مفتوح',
    statusType: 'success',
    matchType: 'percent',
    matchValue: 92,
    country: 'تركيا',
    degrees: 'بكالوريوس, ماجستير, دكتوراه',
    funding: 'ممولة بالكامل',
    language: 'مطلوب IELTS',
    deadline: '20 فبراير 2027',
    logo: null,
  },
];

function FilterSection({ title, isOpen, onToggle, options, checkedOptions = [] }) {
  return (
    <div className="filter-section">
      <button type="button" className="filter-section-header" onClick={onToggle}>
        <span>{title}</span>
        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </button>
      {isOpen && (
        <div className="filter-section-body">
          {options.map((option) => (
            <label className="filter-checkbox" key={option}>
              <input type="checkbox" defaultChecked={checkedOptions.includes(option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function GrantCard({ grant }) {
  return (
    <div className="grant-card">
      <div className="grant-card-top">
        <span className={`grant-status status-${grant.statusType}`}>
          <span className="status-dot"></span>
          {grant.status}
        </span>
        <button type="button" className="bookmark-btn">
          <HiOutlineBookmark />
        </button>
      </div>

      <div className="grant-card-header">
        <h3 className="grant-title">{grant.title}</h3>
        {grant.logo ? (
          <img src={grant.logo} alt={grant.title} className="grant-logo" />
        ) : (
          <span className="logo-placeholder">
            <HiOutlineAcademicCap />
          </span>
        )}
      </div>

      {grant.matchType === 'percent' && (
        <span className="match-badge">✨ مطابقة بنسبة {grant.matchValue}% لملفك</span>
      )}
      {grant.matchType === 'suitable' && (
        <span className="suitable-badge">✅ مناسبة لملفك</span>
      )}

      <ul className="grant-info-list">
        <li><HiOutlineGlobeAlt /> {grant.country}</li>
        <li><HiOutlineAcademicCap /> {grant.degrees}</li>
        <li><HiOutlineBanknotes /> {grant.funding}</li>
        <li><HiOutlineLanguage /> {grant.language}</li>
      </ul>

      <div className="grant-card-footer">
        <Link to="/GrantDetails" className="details-btn">عرض التفاصيل</Link>
        <div className="deadline-info">
          <span className="deadline-label">الموعد النهائي:</span>
          <span className="deadline-date">{grant.deadline}</span>
        </div>
      </div>
    </div>
  );
}

function DiscoverScholarships() {
  const [openSections, setOpenSections] = useState({
    country: true,
    degree: true,
    major: false,
    funding: false,
    language: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="scholarships-page">
      <Header />

      <section className="discover-hero">
        <h1 className="discover-title">اكتشف المنح</h1>
        <p className="discover-subtitle">
          استكشف آلاف المنح الدراسية المتاحة حول العالم. استخدم أدواتنا الذكية للعثور على المنحة
          <br />
          المثالية التي تتناسب مع طموحك الأكاديمي وملفك الشخصي.
        </p>

        <div className="discover-search">
          <button type="button" className="search-btn">
            <HiOutlineMagnifyingGlass />
            بحث
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="ابحث عن منحة, جامعة, دولة أو تخصص..."
          />
        </div>

        <div className="quick-filters">
          {quickFilters.map((filter) => (
            <button type="button" key={filter} className="quick-filter-btn">
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="discover-body">
        <div className="results-panel">
          <div className="results-header">
            <div className="results-count">124 منحة متاحة</div>

            <div className="results-sort">
              <div className="sort-group">
                <label className="sort-label">ترتيب حسب:</label>
                <select className="sort-select">
                  <option>الأحدث</option>
                  <option>الأقدم</option>
                  <option>الأعلى تطابقاً</option>
                </select>
              </div>

              <div className="active-filter-pill">
                ماجستير
                <span className="remove-filter">×</span>
              </div>
            </div>
          </div>

          <div className="grants-grid">
            {grantsData.map((grant) => (
              <GrantCard grant={grant} key={grant.id} />
            ))}
          </div>

          <div className="pagination">
            <button type="button" className="page-arrow"><FaChevronRight /></button>
            <span className="page-dots">...</span>
            <button type="button" className="page-num">3</button>
            <button type="button" className="page-num">2</button>
            <button type="button" className="page-num active">1</button>
            <button type="button" className="page-arrow"><FaChevronLeft /></button>
          </div>
        </div>

        <aside className="filters-sidebar">
          <div className="filters-sidebar-header">
            <h3>تصفية النتائج</h3>
            <button type="button" className="clear-filters">مسح الكل</button>
          </div>

          <FilterSection
            title="الدولة"
            isOpen={openSections.country}
            onToggle={() => toggleSection('country')}
            options={countryOptions}
          />

          <FilterSection
            title="مستوى الدراسة"
            isOpen={openSections.degree}
            onToggle={() => toggleSection('degree')}
            options={degreeOptions}
            checkedOptions={['ماجستير']}
          />

          <FilterSection
            title="التخصص"
            isOpen={openSections.major}
            onToggle={() => toggleSection('major')}
            options={[]}
          />

          <FilterSection
            title="نوع التمويل"
            isOpen={openSections.funding}
            onToggle={() => toggleSection('funding')}
            options={[]}
          />

          <FilterSection
            title="متطلبات اللغة"
            isOpen={openSections.language}
            onToggle={() => toggleSection('language')}
            options={languageOptions}
          />
        </aside>
      </section>
    </div>
  );
}

export default DiscoverScholarships;