import { useState } from "react";
import { useRouter } from "expo-router";
import { handleRegistration } from "../service/registrationService";
import RegistrationFormData from "../type/registrationTypes";
import useCustomBackHandler from "../../../constants/hooks/useCustomBackHandler";


interface UseRegisterFormReturn {
  email: string;
  setEmail: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmedPassword: boolean;
  setShowConfirmedPassword: (value: boolean) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
  error: string | null;
  successMessage: string | null;
  loading: boolean;
  allInputFilled: boolean;
  onSubmit: () => Promise<void>;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  modalType: "success" | "error" | null;
  handleModalConfirm: () => Promise<void>;
}

const useRegisterForm = (): UseRegisterFormReturn => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  useCustomBackHandler({ replaceRoute: "/main/welcome" });

  const allInputFilled =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    acceptedTerms;

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmedPassword(false);
    setAcceptedTerms(false);
    setError(null);
    setSuccessMessage(null);
    console.log("Registration form reset");
  };

  const onSubmit = async () => {
    const formData: RegistrationFormData = { email, firstName, lastName, password, confirmPassword, termsAccepted: acceptedTerms };
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setModalVisible(false);
    setModalType(null);

    try {
      const response = await handleRegistration(formData);
      console.log("Registration API response:", response);
      if (response.success) {
        setSuccessMessage(response.message || "Registration successful! Please verify your email.");
        setModalType("success");
        setModalVisible(true);
      } else {
        setError(response.message || "Registration failed");
        setModalType("error");
        setModalVisible(true);
      }
    } catch (err) {
      if (typeof err === "object" && err !== null && "message" in err && typeof (err as any).message === "string") {
        if ((err as any).message.includes("Network Error")) {
          setError("Network error. Please check your internet connection and try again.");
        } else {
          setError((err as any).message || "Registration failed");
        }
      } else {
        setError("Registration failed");
      }
      setModalType("error");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = async () => {
    setModalVisible(false);
    if (modalType === "success" && successMessage) {
      resetForm();
      router.replace({
        pathname: "main/authentication/accountVerification",
        params: { email },
      });
    }
  };

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmedPassword,
    setShowConfirmedPassword,
    acceptedTerms,
    setAcceptedTerms,
    error,
    successMessage,
    loading,
    allInputFilled,
    onSubmit,
    modalVisible,
    setModalVisible,
    modalType,
    handleModalConfirm,
  };
};

export default useRegisterForm;