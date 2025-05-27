import { loginUser } from "../api/loginAuth";
import LoginFormData from "../type/loginTypes";

export const handleLogin = async (data: LoginFormData): Promise<any> => {
  if (!data.email || !data.password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await loginUser(data);
    return response.data;
  } catch (error) {
    console.error("Login service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Login failed");
    }
    throw error;
  }
};