import React, { useState, useRef } from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import {
  FiUpload,
  FiTrash2,
  FiDownload,
  FiPlus,
  FiFileText,
} from "react-icons/fi";
import "./DocumentsPage.css";

export default function Documentspage() {
  // استخدام State لإدارة المستندات لكي يتم التحديث (إضافة وحذف) بشكل حي
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Transcripts_BSc.pdf",
      uploadDate: "20 ديسمبر 2023",
      size: "5.6 MB",
      type: "سجل أكاديمي",
      badgeBg: "#E0E3E5",
      badgeText: "#404752",
      fileUrl: null, // رابط الملف الحقيقي (إن وجد)
    },
    {
      id: 2,
      name: "Motivation_Letter.docx",
      uploadDate: "05 نوفمبر 2023",
      size: "1.1 MB",
      type: "خطاب دافع",
      badgeBg: "#FFE087",
      badgeText: "#191C1E",
      fileUrl: null,
    },
    {
      id: 3,
      name: "Eman_CV_2024.pdf",
      uploadDate: "12 أكتوبر 2023",
      size: "2.4 MB",
      type: "سيرة ذاتية",
      badgeBg: "#F0F3FA",
      badgeText: "#122669",
      fileUrl: null,
    },
  ]);

  // States الخاصة بالنافذة المنبثقة (Modal) لتأكيد الحذف
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocToDelete, setSelectedDocToDelete] = useState(null);

  // مرجع (Ref) لمدخل الملفات المخفي لفتح نافذة الجهاز
  const fileInputRef = useRef(null);

  const handleUpdateProfile = () => {
    console.log("تحديث الملف الشخصي");
  };

  const handleLogout = () => {
    console.log("تسجيل الخروج");
  };

  // فتح نافذة اختيار الملفات من الجهاز
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // معالجة اختيار ملف جديد ورفعه
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // حساب الحجم بالميجابايت
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";

    // تنسيق التاريخ الحالي بالعربية
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString("ar-EG", options);

    // تحديد النوع بناءً على اسم الملف
    let docType = "مستند آخر";
    let badgeBg = "#E0E3E5";
    let badgeText = "#404752";

    if (file.name.toLowerCase().includes("cv") || file.name.toLowerCase().includes("سيرة")) {
      docType = "سيرة ذاتية";
      badgeBg = "#F0F3FA";
      badgeText = "#122669";
    } else if (file.name.toLowerCase().includes("letter") || file.name.toLowerCase().includes("خطاب")) {
      docType = "خطاب دافع";
      badgeBg = "#FFE087";
      badgeText = "#191C1E";
    }

    // إنشاء كائن الملف الجديد
    const newDoc = {
      id: Date.now(), // رقم تعريفي فريد
      name: file.name,
      uploadDate: currentDate,
      size: fileSizeMB,
      type: docType,
      badgeBg: badgeBg,
      badgeText: badgeText,
      fileUrl: URL.createObjectURL(file), // رابط مؤقت لتحميل الملف من المتصفح
    };

    // إضافته للقائمة
    setDocuments([newDoc, ...documents]);
    
    // إعادة تعيين الـ input
    event.target.value = null;
  };

  // فتح الـ Modal الخاص بتأكيد الحذف
  const openDeleteModal = (doc) => {
    setSelectedDocToDelete(doc);
    setDeleteModalOpen(true);
  };

  // تنفيذ الحذف الفعلي بعد التأكيد من الـ Modal
  const confirmDelete = () => {
    if (selectedDocToDelete) {
      setDocuments(documents.filter((doc) => doc.id !== selectedDocToDelete.id));
      setDeleteModalOpen(false);
      setSelectedDocToDelete(null);
    }
  };

  // تحميل المستند لجهاز المستخدم
  const handleDownload = (doc) => {
    if (doc.fileUrl) {
      const a = document.createElement("a");
      a.href = doc.fileUrl;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert(`جاري بدء تحميل الملف الأساسي: ${doc.name}`);
    }
  };

  return (
    <div className="documents-page">
      {/* إدخال ملفات مخفي لفتح تصفح الجهاز */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
      />

      {/* منطقة المحتوى الرئيسية للمستندات */}
      <main className="documents-main">
        {/* هيدر الصفحة */}
        <div className="documents-header">
          <button
            type="button"
            className="documents-header__upload-btn"
            onClick={triggerFileSelect}
          >
            <span>رفع مستند جديد</span>
            <FiUpload size={16} />
          </button>

          <div className="documents-header__content">
            <h1 className="documents-header__title">المستندات المرفقة</h1>
            <p className="documents-header__desc">
              أرفق ملفاتك الهامة (السيرة الذاتية، خطاب الدافع) لتكون جاهزة للتقديم السريع.
            </p>
          </div>
        </div>

        {/* شبكة عرض المستندات (Bento Grid) */}
        <div className="documents-grid-wrapper">
          <div className="documents-grid">
            {documents.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="document-card__top">
                  <div className="document-card__actions-row">
                    <div className="document-card__icons">
                      <div className="document-card__file-icon">
                        <FiFileText size={24} />
                      </div>
                      <button
                        type="button"
                        className="document-card__action-btn delete"
                        title="حذف"
                        onClick={() => openDeleteModal(doc)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="document-card__action-btn download"
                        title="تحميل"
                        onClick={() => handleDownload(doc)}
                      >
                        <FiDownload size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="document-card__info">
                  <h3 className="document-card__title">{doc.name}</h3>
                  <p className="document-card__date">
                    تم الرفع: {doc.uploadDate}
                  </p>
                </div>

                <div className="document-card__footer">
                  <span
                    className="document-card__badge"
                    style={{ background: doc.badgeBg, color: doc.badgeText }}
                  >
                    {doc.type}
                  </span>
                  <span className="document-card__size">{doc.size}</span>
                </div>
              </div>
            ))}

            {/* كارت الإضافة */}
            <div className="document-card--add" onClick={triggerFileSelect} style={{ cursor: "pointer" }}>
              <div className="document-card--add-icon-wrapper">
                <FiPlus size={24} />
              </div>
              <h3 className="document-card--add-title">إضافة مستند جديد</h3>
              <p className="document-card--add-desc">
                انقر هنا لاختيار الملف من جهازك وتجميعه
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* نافذة تأكيد الحذف المخصصة (Custom Modal) */}
      {deleteModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-box">
            <h3>تأكيد الحذف</h3>
            <p>هل أنت متأكد من رغبتك في حذف المستند: "{selectedDocToDelete?.name}"؟</p>
            <div className="custom-modal-actions">
              <button type="button" className="btn-confirm-delete" onClick={confirmDelete}>
                نعم، حذف
              </button>
              <button type="button" className="btn-cancel-delete" onClick={() => setDeleteModalOpen(false)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الشريط الجانبي */}
      <SideNavBar
        activeKey="documents"
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
      />
    </div>
  );
}