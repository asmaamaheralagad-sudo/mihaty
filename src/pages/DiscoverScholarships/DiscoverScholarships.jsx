// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../../components/Header/Header';
// import {
//   HiOutlineMagnifyingGlass,
//   HiOutlineBookmark,
//   HiOutlineGlobeAlt,
//   HiOutlineAcademicCap,
//   HiOutlineBanknotes,
//   HiOutlineLanguage,
//   HiChevronDown,
//   HiChevronUp,
// } from 'react-icons/hi2';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import './DiscoverScholarships.css';

// const quickFilters = ['منح البكالوريوس', 'منح الماجستير', 'منح ألمانيا', 'منح ممولة بالكامل'];

// const countryOptions = ['تركيا', 'ألمانيا', 'المملكة المتحدة'];
// const degreeOptions = ['بكالوريوس', 'ماجستير', 'دكتوراه'];
// const languageOptions = ['يتطلب آيلتس / توفل', 'لا يشترط شهادة لغة'];

// // بيانات وهمية - بتتبدل ببيانات الـ API لاحقاً
// const grantsData = [
//   {
//     id: 1,
//     title: 'منح DAAD الألمانية للدراسات العليا',
//     status: 'مفتوح',
//     statusType: 'success',
//     matchType: 'suitable',
//     matchValue: null,
//     country: 'ألمانيا',
//     degrees: 'ماجستير, دكتوراه',
//     funding: 'ممولة بالكامل',
//     language: 'لا يشترط شهادة لغة',
//     deadline: '15 مارس 2024',
//     logo: null,
//   },
//   {
//     id: 2,
//     title: 'المنحة الحكومية التركية (Türkiye Bursları)',
//     status: 'مفتوح',
//     statusType: 'success',
//     matchType: 'percent',
//     matchValue: 92,
//     country: 'تركيا',
//     degrees: 'بكالوريوس, ماجستير, دكتوراه',
//     funding: 'ممولة بالكامل',
//     language: 'مطلوب IELTS',
//     deadline: '20 فبراير 2027',
//     logo: null,
//   },
// ];

// function FilterSection({ title, isOpen, onToggle, options, checkedOptions = [] }) {
//   return (
//     <div className="filter-section">
//       <button type="button" className="filter-section-header" onClick={onToggle}>
//         <span>{title}</span>
//         {isOpen ? <HiChevronUp /> : <HiChevronDown />}
//       </button>
//       {isOpen && (
//         <div className="filter-section-body">
//           {options.map((option) => (
//             <label className="filter-checkbox" key={option}>
//               <input type="checkbox" defaultChecked={checkedOptions.includes(option)} />
//               <span>{option}</span>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function GrantCard({ grant }) {
//   return (
//     <div className="grant-card">
//       <div className="grant-card-top">
//         <span className={`grant-status status-${grant.statusType}`}>
//           <span className="status-dot"></span>
//           {grant.status}
//         </span>
//         <button type="button" className="bookmark-btn">
//           <HiOutlineBookmark />
//         </button>
//       </div>

//       <div className="grant-card-header">
//         <h3 className="grant-title">{grant.title}</h3>
//         {grant.logo ? (
//           <img src={grant.logo} alt={grant.title} className="grant-logo" />
//         ) : (
//           <span className="logo-placeholder">
//             <HiOutlineAcademicCap />
//           </span>
//         )}
//       </div>

//       {grant.matchType === 'percent' && (
//         <span className="match-badge">✨ مطابقة بنسبة {grant.matchValue}% لملفك</span>
//       )}
//       {grant.matchType === 'suitable' && (
//         <span className="suitable-badge">✅ مناسبة لملفك</span>
//       )}

//       <ul className="grant-info-list">
//         <li><HiOutlineGlobeAlt /> {grant.country}</li>
//         <li><HiOutlineAcademicCap /> {grant.degrees}</li>
//         <li><HiOutlineBanknotes /> {grant.funding}</li>
//         <li><HiOutlineLanguage /> {grant.language}</li>
//       </ul>

//       <div className="grant-card-footer">
//         <Link to="/GrantDetails" className="details-btn">عرض التفاصيل</Link>
//         <div className="deadline-info">
//           <span className="deadline-label">الموعد النهائي:</span>
//           <span className="deadline-date">{grant.deadline}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DiscoverScholarships() {
//   const [openSections, setOpenSections] = useState({
//     country: true,
//     degree: true,
//     major: false,
//     funding: false,
//     language: false,
//   });

//   const toggleSection = (key) => {
//     setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="scholarships-page">
//       <Header />

//       <section className="discover-hero">
//         <h1 className="discover-title">اكتشف المنح</h1>
//         <p className="discover-subtitle">
//           استكشف آلاف المنح الدراسية المتاحة حول العالم. استخدم أدواتنا الذكية للعثور على المنحة
//           <br />
//           المثالية التي تتناسب مع طموحك الأكاديمي وملفك الشخصي.
//         </p>

//         <div className="discover-search">
//           <button type="button" className="search-btn">
//             <HiOutlineMagnifyingGlass />
//             بحث
//           </button>
//           <input
//             type="text"
//             className="search-input"
//             placeholder="ابحث عن منحة, جامعة, دولة أو تخصص..."
//           />
//         </div>

//         <div className="quick-filters">
//           {quickFilters.map((filter) => (
//             <button type="button" key={filter} className="quick-filter-btn">
//               {filter}
//             </button>
//           ))}
//         </div>
//       </section>

//       <section className="discover-body">
//         <div className="results-panel">
//           <div className="results-header">
//             <div className="results-count">124 منحة متاحة</div>

//             <div className="results-sort">
//               <div className="sort-group">
//                 <label className="sort-label">ترتيب حسب:</label>
//                 <select className="sort-select">
//                   <option>الأحدث</option>
//                   <option>الأقدم</option>
//                   <option>الأعلى تطابقاً</option>
//                 </select>
//               </div>

//               <div className="active-filter-pill">
//                 ماجستير
//                 <span className="remove-filter">×</span>
//               </div>
//             </div>
//           </div>

//           <div className="grants-grid">
//             {grantsData.map((grant) => (
//               <GrantCard grant={grant} key={grant.id} />
//             ))}
//           </div>

//           <div className="pagination">
//             <button type="button" className="page-arrow"><FaChevronRight /></button>
//             <span className="page-dots">...</span>
//             <button type="button" className="page-num">3</button>
//             <button type="button" className="page-num">2</button>
//             <button type="button" className="page-num active">1</button>
//             <button type="button" className="page-arrow"><FaChevronLeft /></button>
//           </div>
//         </div>

//         <aside className="filters-sidebar">
//           <div className="filters-sidebar-header">
//             <h3>تصفية النتائج</h3>
//             <button type="button" className="clear-filters">مسح الكل</button>
//           </div>

//           <FilterSection
//             title="الدولة"
//             isOpen={openSections.country}
//             onToggle={() => toggleSection('country')}
//             options={countryOptions}
//           />

//           <FilterSection
//             title="مستوى الدراسة"
//             isOpen={openSections.degree}
//             onToggle={() => toggleSection('degree')}
//             options={degreeOptions}
//             checkedOptions={['ماجستير']}
//           />

//           <FilterSection
//             title="التخصص"
//             isOpen={openSections.major}
//             onToggle={() => toggleSection('major')}
//             options={[]}
//           />

//           <FilterSection
//             title="نوع التمويل"
//             isOpen={openSections.funding}
//             onToggle={() => toggleSection('funding')}
//             options={[]}
//           />

//           <FilterSection
//             title="متطلبات اللغة"
//             isOpen={openSections.language}
//             onToggle={() => toggleSection('language')}
//             options={languageOptions}
//           />
//         </aside>
//       </section>
//     </div>
//   );
// }

// export default DiscoverScholarships;

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

import {
  HiOutlineMagnifyingGlass,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineGlobeAlt,
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineLanguage,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./DiscoverScholarships.css";

// ===============================
// Quick Filters
// ===============================

const quickFilters = [
  "منح البكالوريوس",
  "منح الماجستير",
  "منح ألمانيا",
  "منح ممولة بالكامل",
];

// ===============================
// Filter Options
// ===============================

const countryOptions = ["تركيا", "ألمانيا", "المملكة المتحدة"];

const degreeOptions = ["بكالوريوس", "ماجستير", "دكتوراه"];

const languageOptions = ["يتطلب آيلتس / توفل", "لا يشترط شهادة لغة"];

// ===============================
// Dummy Data
// لاحقًا نستبدلها بالـ API
// ===============================

const grantsData = [
  {
    id: 1,
    title: "منح DAAD الألمانية للدراسات العليا",
    status: "مفتوح",
    statusType: "success",
    matchType: "suitable",
    matchValue: null,
    country: "ألمانيا",
    degrees: ["ماجستير", "دكتوراه"],
    funding: "ممولة بالكامل",
    language: "لا يشترط شهادة لغة",
    deadline: "15 مارس 2024",
    deadlineDate: new Date("2024-03-15"),
    logo: null,
  },

  {
    id: 2,
    title: "المنحة الحكومية التركية (Türkiye Bursları)",
    status: "مفتوح",
    statusType: "success",
    matchType: "percent",
    matchValue: 92,
    country: "تركيا",
    degrees: ["بكالوريوس", "ماجستير", "دكتوراه"],
    funding: "ممولة بالكامل",
    language: "مطلوب IELTS",
    deadline: "20 فبراير 2027",
    deadlineDate: new Date("2027-02-20"),
    logo: null,
  },

  {
    id: 3,
    title: "منحة الحكومة البريطانية للدراسات العليا",
    status: "مفتوح",
    statusType: "success",
    matchType: "percent",
    matchValue: 85,
    country: "المملكة المتحدة",
    degrees: ["ماجستير"],
    funding: "ممولة بالكامل",
    language: "مطلوب IELTS",
    deadline: "10 يناير 2027",
    deadlineDate: new Date("2027-01-10"),
    logo: null,
  },

  {
    id: 4,
    title: "منحة تركية للبكالوريوس",
    status: "مفتوح",
    statusType: "success",
    matchType: "percent",
    matchValue: 78,
    country: "تركيا",
    degrees: ["بكالوريوس"],
    funding: "ممولة بالكامل",
    language: "لا يشترط شهادة لغة",
    deadline: "5 فبراير 2027",
    deadlineDate: new Date("2027-02-05"),
    logo: null,
  },
];

// ======================================================
// Filter Section
// ======================================================

function FilterSection({
  title,
  isOpen,
  onToggle,
  options,
  selectedOptions,
  onChange,
}) {
  return (
    <div className="filter-section">
      <button
        type="button"
        className="filter-section-header"
        onClick={onToggle}
      >
        <span>{title}</span>

        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {isOpen && options.length > 0 && (
        <div className="filter-section-body">
          {options.map((option) => (
            <label className="filter-checkbox" key={option}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => onChange(option)}
              />

              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ======================================================
// Grant Card
// ======================================================

function GrantCard({ grant, isSaved, onToggleSave }) {
  return (
    <div className="grant-card">
      {/* Top */}
      <div className="grant-card-top">
        <span className={`grant-status status-${grant.statusType}`}>
          <span className="status-dot"></span>

          {grant.status}
        </span>

        {/* Bookmark */}
        <button
          type="button"
          className={`bookmark-btn ${isSaved ? "saved" : ""}`}
          onClick={() => onToggleSave(grant.id)}
          title={isSaved ? "إزالة من المحفوظات" : "حفظ المنحة"}
        >
          {isSaved ? <HiBookmark /> : <HiOutlineBookmark />}
        </button>
      </div>

      {/* Header */}
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

      {/* Match */}
      {grant.matchType === "percent" && (
        <span className="match-badge">
          ✨ مطابقة بنسبة {grant.matchValue}% لملفك
        </span>
      )}

      {grant.matchType === "suitable" && (
        <span className="suitable-badge">✅ مناسبة لملفك</span>
      )}

      {/* Information */}
      <ul className="grant-info-list">
        <li>
          <HiOutlineGlobeAlt />
          {grant.country}
        </li>

        <li>
          <HiOutlineAcademicCap />
          {grant.degrees.join(", ")}
        </li>

        <li>
          <HiOutlineBanknotes />
          {grant.funding}
        </li>

        <li>
          <HiOutlineLanguage />
          {grant.language}
        </li>
      </ul>

      {/* Footer */}
      <div className="grant-card-footer">
        <Link to={`/GrantDetails/${grant.id}`} className="details-btn">
          عرض التفاصيل
        </Link>

        <div className="deadline-info">
          <span className="deadline-label">الموعد النهائي:</span>

          <span className="deadline-date">{grant.deadline}</span>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// Main Component
// ======================================================

function DiscoverScholarships() {
  // ------------------------------------
  // Search
  // ------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  // ------------------------------------
  // Filters
  // ------------------------------------

  const [selectedCountries, setSelectedCountries] = useState([]);

  const [selectedDegrees, setSelectedDegrees] = useState([]);

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // ------------------------------------
  // Sorting
  // ------------------------------------

  const [sortBy, setSortBy] = useState("الأحدث");

  // ------------------------------------
  // Saved Scholarships
  // ------------------------------------

  const [savedGrants, setSavedGrants] = useState(() => {
    const saved = localStorage.getItem("savedScholarships");

    return saved ? JSON.parse(saved) : [];
  });

  // ------------------------------------
  // Filter sections open/close
  // ------------------------------------

  const [openSections, setOpenSections] = useState({
    country: true,
    degree: true,
    major: false,
    funding: false,
    language: true,
  });

  // ------------------------------------
  // Save to localStorage
  // ------------------------------------

  useEffect(() => {
    localStorage.setItem("savedScholarships", JSON.stringify(savedGrants));
  }, [savedGrants]);

  // ------------------------------------
  // Toggle section
  // ------------------------------------

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ------------------------------------
  // Toggle filter
  // ------------------------------------

  const toggleFilter = (option, selected, setSelected) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  // ------------------------------------
  // Save / Unsave
  // ------------------------------------

  const toggleSave = (id) => {
    setSavedGrants((prev) => {
      if (prev.includes(id)) {
        return prev.filter((savedId) => savedId !== id);
      }

      return [...prev, id];
    });
  };

  // ------------------------------------
  // Quick Filter
  // ------------------------------------

  const handleQuickFilter = (filter) => {
    if (filter === "منح البكالوريوس") {
      setSelectedDegrees(["بكالوريوس"]);
    }

    if (filter === "منح الماجستير") {
      setSelectedDegrees(["ماجستير"]);
    }

    if (filter === "منح ألمانيا") {
      setSelectedCountries(["ألمانيا"]);
    }

    if (filter === "منح ممولة بالكامل") {
      // كل البيانات الحالية ممولة بالكامل
      // لكن لاحقًا نقدر نضيف state خاص بالتمويل
    }
  };

  // ------------------------------------
  // Clear Filters
  // ------------------------------------

  const clearFilters = () => {
    setSelectedCountries([]);

    setSelectedDegrees([]);

    setSelectedLanguages([]);

    setSearchTerm("");
  };

  // ------------------------------------
  // Remove active filter
  // ------------------------------------

  const removeDegreeFilter = () => {
    setSelectedDegrees([]);
  };

  // ------------------------------------
  // Filter + Search + Sort
  // ------------------------------------

  const filteredGrants = useMemo(() => {
    let results = [...grantsData];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.trim().toLowerCase();

      results = results.filter((grant) => {
        return (
          grant.title.toLowerCase().includes(search) ||
          grant.country.toLowerCase().includes(search) ||
          grant.degrees.join(" ").toLowerCase().includes(search) ||
          grant.funding.toLowerCase().includes(search)
        );
      });
    }

    // Country
    if (selectedCountries.length > 0) {
      results = results.filter((grant) =>
        selectedCountries.includes(grant.country),
      );
    }

    // Degree
    if (selectedDegrees.length > 0) {
      results = results.filter((grant) =>
        grant.degrees.some((degree) => selectedDegrees.includes(degree)),
      );
    }

    // Language
    if (selectedLanguages.length > 0) {
      results = results.filter((grant) =>
        selectedLanguages.includes(grant.language),
      );
    }

    // Sort
    if (sortBy === "الأحدث") {
      results.sort((a, b) => b.deadlineDate - a.deadlineDate);
    }

    if (sortBy === "الأقدم") {
      results.sort((a, b) => a.deadlineDate - b.deadlineDate);
    }

    if (sortBy === "الأعلى تطابقاً") {
      results.sort((a, b) => (b.matchValue || 0) - (a.matchValue || 0));
    }

    return results;
  }, [
    searchTerm,
    selectedCountries,
    selectedDegrees,
    selectedLanguages,
    sortBy,
  ]);

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="scholarships-page">
      <Header />

      {/* ================= HERO ================= */}

      <section className="discover-hero">
        <h1 className="discover-title">اكتشف المنح</h1>

        <p className="discover-subtitle">
          استكشف آلاف المنح الدراسية المتاحة حول العالم. استخدم أدواتنا الذكية
          للعثور على المنحة
          <br />
          المثالية التي تتناسب مع طموحك الأكاديمي وملفك الشخصي.
        </p>

        {/* Search */}

        <div className="discover-search">
          <button type="button" className="search-btn">
            <HiOutlineMagnifyingGlass />
            بحث
          </button>

          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن منحة, جامعة, دولة أو تخصص..."
          />
        </div>

        {/* Quick Filters */}

        <div className="quick-filters">
          {quickFilters.map((filter) => (
            <button
              type="button"
              key={filter}
              className="quick-filter-btn"
              onClick={() => handleQuickFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ================= BODY ================= */}

      <section className="discover-body">
        {/* ================= RESULTS ================= */}

        <div className="results-panel">
          {/* Header */}

          <div className="results-header">
            <div className="results-count">
              {filteredGrants.length} منحة متاحة
            </div>

            <div className="results-sort">
              <div className="sort-group">
                <label className="sort-label">ترتيب حسب:</label>

                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>الأحدث</option>

                  <option>الأقدم</option>

                  <option>الأعلى تطابقاً</option>
                </select>
              </div>

              {/* Active Degree Filter */}

              {selectedDegrees.length > 0 && (
                <div className="active-filter-pill">
                  {selectedDegrees[0]}

                  <button
                    type="button"
                    className="remove-filter"
                    onClick={removeDegreeFilter}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cards */}

          <div className="grants-grid">
            {filteredGrants.length > 0 ? (
              filteredGrants.map((grant) => (
                <GrantCard
                  grant={grant}
                  key={grant.id}
                  isSaved={savedGrants.includes(grant.id)}
                  onToggleSave={toggleSave}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>لا توجد منح مطابقة</h3>

                <p>جربي تغيير البحث أو الفلاتر.</p>
              </div>
            )}
          </div>

          {/* Pagination */}

          <div className="pagination">
            <button type="button" className="page-arrow">
              <FaChevronRight />
            </button>

            <span className="page-dots">...</span>

            <button type="button" className="page-num">
              3
            </button>

            <button type="button" className="page-num">
              2
            </button>

            <button type="button" className="page-num active">
              1
            </button>

            <button type="button" className="page-arrow">
              <FaChevronLeft />
            </button>
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}

        <aside className="filters-sidebar">
          <div className="filters-sidebar-header">
            <h3>تصفية النتائج</h3>

            <button
              type="button"
              className="clear-filters"
              onClick={clearFilters}
            >
              مسح الكل
            </button>
          </div>

          {/* Country */}

          <FilterSection
            title="الدولة"
            isOpen={openSections.country}
            onToggle={() => toggleSection("country")}
            options={countryOptions}
            selectedOptions={selectedCountries}
            onChange={(option) =>
              toggleFilter(option, selectedCountries, setSelectedCountries)
            }
          />

          {/* Degree */}

          <FilterSection
            title="مستوى الدراسة"
            isOpen={openSections.degree}
            onToggle={() => toggleSection("degree")}
            options={degreeOptions}
            selectedOptions={selectedDegrees}
            onChange={(option) =>
              toggleFilter(option, selectedDegrees, setSelectedDegrees)
            }
          />

          {/* Major */}

          <FilterSection
            title="التخصص"
            isOpen={openSections.major}
            onToggle={() => toggleSection("major")}
            options={[]}
            selectedOptions={[]}
            onChange={() => {}}
          />

          {/* Funding */}

          <FilterSection
            title="نوع التمويل"
            isOpen={openSections.funding}
            onToggle={() => toggleSection("funding")}
            options={[]}
            selectedOptions={[]}
            onChange={() => {}}
          />

          {/* Language */}

          <FilterSection
            title="متطلبات اللغة"
            isOpen={openSections.language}
            onToggle={() => toggleSection("language")}
            options={languageOptions}
            selectedOptions={selectedLanguages}
            onChange={(option) =>
              toggleFilter(option, selectedLanguages, setSelectedLanguages)
            }
          />
        </aside>
      </section>
    </div>
  );
}

export default DiscoverScholarships;
