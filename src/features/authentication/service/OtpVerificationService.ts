import { validateVerificationOtp } from "../api/AccountVerificationOtpApi";
import { validatePasswordResetOtp } from "../api/PasswordResetOtpApi";
import { OtpVerificationFormData } from "../type/verifyOtpType";

export const handleRequestPasswordResetOtpVerification = async (data: OtpVerificationFormData): Promise<any> => {
  if (!data.email || !data.otp) {
    throw new Error("Email and otp are required.");
  }

  try {
    const response = await validatePasswordResetOtp(data);
    return response.data;
  } catch (error) {
    console.error("Password reset otp verification service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Password reset otp verification failed");
    }
    throw error;
  }
};

export const handleEmailVerificationOtpVerification = async (data: OtpVerificationFormData): Promise<any> => {
  if (!data.email || !data.otp) {
    throw new Error("Email and otp are required.");
  }

  try {
    const response = await validateVerificationOtp(data);
    return response.data;
  } catch (error) {
    console.error("Email verification otp verification service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Email verification otp verification failed");
    }
    throw error;
  }
};