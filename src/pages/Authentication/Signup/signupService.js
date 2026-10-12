import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase';

// إنشاء حساب جديد بالبريد الإلكتروني وكلمة المرور
export const signUpWithEmail = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (name) {
      await updateProfile(user, { displayName: name });
    }

    await sendEmailVerification(user);

    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      error: getFirebaseAuthErrorMessage(err.code)
    };
  }
};

// إنشاء حساب / تسجيل الدخول عبر Google
export const signUpWithGoogle = async () => {
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