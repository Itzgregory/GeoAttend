import { RequestPasswordResetOtp, validatePasswordResetOtp } from "../api/RequestPasswordResetOtp";
import RequestPasswordResetOtpFormData, { PasswordResetOtpVerificationFormData } from "../type/passwordResetType";


export const handleRequestPasswordResetOtp = async (data: RequestPasswordResetOtpFormData): Promise<any> => {
  if (!data.email) {
    throw new Error("Email is required.");
  }

  try {
    const response = await RequestPasswordResetOtp(data);
    return response.data;
  } catch (error) {
    console.error("Reqest password reset otp service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Reqest password reset otp failed");
    }
    throw error;
  }
};

export const handleRequestPasswordResetOtpVerification = async (data: PasswordResetOtpVerificationFormData): Promise<any> => {
  if (!data.email || !data.otp ) {
    throw new Error("Email and otp is required.");
  }

  try {
    const response = await validatePasswordResetOtp(data);
    return response.data;
  } catch (error) {
    console.error("Password reset otp verification service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Password reset otp  verification failed");
    }
    throw error;
  }
};