import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  // إذا لم يكن المستخدم مسجلاً أو لم يقم بتأكيد إيميله، يتم توجيهه للوجن
  if (!currentUser || !currentUser.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;