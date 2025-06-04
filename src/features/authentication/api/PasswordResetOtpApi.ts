import axiosInstance from "../../../utils/config/axios";
import { TokenResponse } from "../type/otpTypes";

export const RequestPasswordResetOtp = async (
  data: { email: string },
  endpoint: string = "users/forgot-password-otp"
): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    const responseData = response.data;

    return {
      success: true,
      data: {
        email: responseData.email || data.email,
        userId: responseData.userId,
        ...responseData,
      },
      message: responseData.message || "Password reset otp sent successfully",
    };
  } catch (error) {
    let errorMessage = "Failed to resend verification otp. Please try again.";
    let statusCode = 500;

    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      errorMessage = err.response?.data?.message || errorMessage;
      statusCode = err.response?.status || statusCode;
    } else if (error && typeof error === "object" && "request" in error) {
      const err = error as any;
      console.error("Request made but no response received:", err.request);
      errorMessage = "No response from server. Please check your network.";
    } else if (error instanceof Error) {
      console.error("Error setting up request:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error:", error);
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const validatePasswordResetOtp = async (
  data: { email: string; otp: string },
  endpoint: string = "users/validate-otp"
): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    const responseData = response.data;

    return {
      success: true,
      data: {
        email: responseData.email || data.email,
        userId: responseData.userId,
        ...responseData,
      },
      message: responseData.message || "Token verified successfully",
    };
  } catch (error) {
    let errorMessage = "Token verification failed. Please try again.";
    let statusCode = 500;

    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      errorMessage = err.response?.data?.message || errorMessage;
      statusCode = err.response?.status || statusCode;
    } else if (error && typeof error === "object" && "request" in error) {
      const err = error as any;
      console.error("Request made but no response received:", err.request);
      errorMessage = "No response from server. Please check your network.";
    } else if (error instanceof Error) {
      console.error("Error setting up request:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error:", error);
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const updatePasswordWithOtp = async (
  data: { email: string; otp: string; password:string; newPassword:string },
  endpoint: string = "users/validate-otp"
): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    const responseData = response.data;

    return {
      success: true,
      data: {
        email: responseData.email || data.email,
        userId: responseData.userId,
        ...responseData,
      },
      message: responseData.message || "Token verified successfully",
    };
  } catch (error) {
    let errorMessage = "Token verification failed. Please try again.";
    let statusCode = 500;

    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      errorMessage = err.response?.data?.message || errorMessage;
      statusCode = err.response?.status || statusCode;
    } else if (error && typeof error === "object" && "request" in error) {
      const err = error as any;
      console.error("Request made but no response received:", err.request);
      errorMessage = "No response from server. Please check your network.";
    } else if (error instanceof Error) {
      console.error("Error setting up request:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error:", error);
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};