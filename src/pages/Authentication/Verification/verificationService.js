import { sendPasswordResetEmail } from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from '../../../firebase';

export const resendResetLink = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: getFirebaseAuthErrorMessage(err.code)
    };
  }
};