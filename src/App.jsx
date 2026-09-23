import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 1. استيراد AuthProvider و useAuth
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/Signup/SignUp";
import ForgetPassword from "./pages/Authentication/Forgetpassword/ForgetPassword";
import Verification from "./pages/Authentication/Verification/verification";
import ResetPassword from "./pages/Authentication/Resetpassword/ResetPassword";
import ResetSuccess from "./pages/Authentication/Resetsuccess/ResetSuccess";
import Landing from "./pages/Landing-page/Landing";
import GrantDetails from "./components/GrantDetails/GrantDetails";
import Profile from "./pages/Profile/Profile";
import DiscoverScholarships from "./pages/DiscoverScholarships/DiscoverScholarships";
import DashboardPage from "./pages/DashboradPage/DashboardPage";
import AcademicProfile from "./components/Academicprofile/Academicprofile";
import SavedGrants from "./pages/SavedGrants/SavedGrants";

// 2. مكون حماية المسارات الخاصة (Protected Routes)
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  // الانتظار لحين انتهاء التأكد من حالة Firebase
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        جاري التحميل...
      </div>
    );
  }

  // إذا لم يكن المستخدم مسجلاً، يتم توجيهه لصفحة تسجيل الدخول
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      {/* تغليف جميع المسارات بـ AuthProvider */}
      <AuthProvider>
        <Routes>
          {/* مسارات عامة (تفتح طبيعي عند الضغط عليها) */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-success" element={<ResetSuccess />} />
          <Route path="/GrantDetails" element={<GrantDetails />} />
          <Route path="/scholarships" element={<DiscoverScholarships />} />

          {/* مسارات محمية (Protected Routes) - تتطلب تسجيل دخول للوصول إليها */}
          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/AcademicProfile"
            element={
              <PrivateRoute>
                <AcademicProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/SavedGrants"
            element={
              <PrivateRoute>
                <SavedGrants />
              </PrivateRoute>
            }
          />

          {/* إعادة التوجيه لأي مسار غير معروف */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
