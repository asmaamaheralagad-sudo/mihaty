import { confirmPasswordReset } from "firebase/auth";
import { auth, getFirebaseAuthErrorMessage } from "../../../firebase";

/**
 * دالة تأكيد وتغيير كلمة المرور عبر Firebase
 * @param {string} oobCode - رمز التحقق القادم من الرابط
 * @param {string} newPassword - كلمة المرور الجديدة
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const confirmPasswordResetApi = async (oobCode, newPassword) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { success: true };
  } catch (err) {
    const customErrorMessage = getFirebaseAuthErrorMessage(err?.code);
    return {
      success: false,
      error: customErrorMessage || "حدث خطأ أثناء تغيير كلمة المرور",
    };
  }
};