import RegistrationFormData from "../type/registrationTypes";
import { registerUser } from "../api/registrationAuth";

export const handleRegistration = async (data: RegistrationFormData): Promise<any> => {
  if (data.password !== data.confirmPassword) {
    throw new Error("Passwords don't match!");
  }
  if (!data.termsAccepted) {
    throw new Error("Please accept the Terms & Conditions to continue.");
  }

  try {
    const response = await registerUser(data);
    return response.data; 
  } catch (error) {
    console.error("Registration service error:", error);
    if (error && typeof error === "object" && "data" in error && error.data && typeof (error as any).data === "object") {
      throw new Error((error as any).data.message || "Registration failed");
    }
    throw error; 
  }
};