import { RequestPasswordResetOtp } from "../api/RequestPasswordResetOtp";
import RequestPasswordResetOtpFormData from "../type/passwordResetType";


export const handleRequestPasswordResetOtp = async (data: RequestPasswordResetOtpFormData): Promise<any> => {
  if (!data.email) {
    throw new Error("Email is required.");
  }

  try {
    const response = await RequestPasswordResetOtp(data);
    return response.data;
  } catch (error) {
    console.error("Login service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Login failed");
    }
    throw error;
  }
};