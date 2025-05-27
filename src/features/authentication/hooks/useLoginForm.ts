import { useState } from "react";
import { useRouter } from "expo-router";
import LoginFormData from "../type/loginTypes";
import useCustomBackHandler from "../../../constants/hooks/useCustomBackHandler";
import { handleLogin } from "../service/loginService";


interface UseLoginFormReturn {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
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

const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  useCustomBackHandler({ replaceRoute: "/main/welcome" });

  const allInputFilled =
    email.trim() !== "" &&
    password.trim() !== "" ;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError(null);
    setSuccessMessage(null);
    console.log("Login form reset");
  };

  const onSubmit = async () => {
    const formData: LoginFormData = { email, password, };
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setModalVisible(false);
    setModalType(null);

    try {
      const response = await handleLogin(formData);
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
        pathname: "main/authentication/role",
        params: { email },
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
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

export default useLoginForm;