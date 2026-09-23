// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // sendEmailVerification,
  // sendPasswordResetEmail,
  // signOut,
  // onAuthStateChanged
} from "firebase/auth";

// بيانات مشروع Firebase من وثيقة التسليم
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyCtxPquVEJFXr2EXbvhZ-aelya_waAlyGM",
  authDomain: "minhati-7eca6.firebaseapp.com",
  projectId: "minhati-7eca6",
  storageBucket: "minhati-7eca6.firebasestorage.app",
  messagingSenderId: "495032354253",
  appId: "1:495032354253:web:11366bc0a034af74fd7084",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// دالة مساعدة لترجمة أخطاء Firebase للعربية
export const getFirebaseAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "البريد الإلكتروني مُستخدم بالفعل في حساب آخر.";
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-credential":
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    case "auth/weak-password":
      return "كلمة المرور ضعيفة جداً، يجب أن تكون 6 أحرف على الأقل.";
    case "auth/invalid-email":
      return "صيغة البريد الإلكتروني غير صحيحة.";
    case "auth/too-many-requests":
      return "تم حظر المحاولات مؤقتاً بسبب تكرار الطلبات، يرجى المحاولة لاحقاً.";
    default:
      return "حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً.";
  }
};
