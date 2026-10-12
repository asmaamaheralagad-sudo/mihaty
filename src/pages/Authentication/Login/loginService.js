import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase';

// تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      return {
        success: false,
        error: 'يرجى تأكيد بريدك الإلكتروني أولاً عبر الرابط المرسل لبريدك.'
      };
    }

    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      error: getFirebaseAuthErrorMessage(err.code)
    };
  }
};

// تسجيل الدخول عبر Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (err) {
    return {
      success: false,
      error: getFirebaseAuthErrorMessage(err.code)
    };
  }
};