import { sendVerificationOtp } from "../api/AccountVerificationOtpApi";
import { RequestPasswordResetOtp } from "../api/PasswordResetOtpApi";
import RequestOtpFormData from "../type/RequestOtpType";

export const handleRequestPasswordResetOtp = async (data: RequestOtpFormData): Promise<any> => {
  if (!data.email) {
    throw new Error("Email is required.");
  }

  try {
    const response = await RequestPasswordResetOtp(data);
    return response.data;
  } catch (error) {
    console.error("Request password reset otp service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Request password reset otp failed");
    }
    throw error;
  }
};

export const handleRequestEmailVerificationOtp = async (data: RequestOtpFormData): Promise<any> => {
  if (!data.email) {
    throw new Error("Email is required.");
  }

  try {
    const response = await sendVerificationOtp(data);
    return response.data;
  } catch (error) {
    console.error("Request email verification otp service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Request email verification otp failed");
    }
    throw error;
  }
};