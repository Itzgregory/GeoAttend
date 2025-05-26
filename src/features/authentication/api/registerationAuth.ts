import axiosInstance from "../../../utils/config/axios";
import RegistrationFormData from "../type/registerationTypes";

export const registerUser = async (data: RegistrationFormData): Promise<any> => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    console.log("Registration API response:", response.data);
    return response; 
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration API error:", error.message);
    } else {
      console.error("Registration API error:", error);
    }
    if (error && typeof error === "object" && "response" in error) {
      const err = error as any;
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
      throw err.response; 
    } else if (error && typeof error === "object" && "request" in error) {
      const err = error as any;
      console.error("Request made but no response received:", err.request);
      throw err;
    } else if (error instanceof Error) {
      console.error("Error setting up request:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw error;
    }
  }
};