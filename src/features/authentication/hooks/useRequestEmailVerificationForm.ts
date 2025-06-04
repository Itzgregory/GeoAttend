import { useState } from "react";
import { useRouter } from "expo-router";
import useCustomBackHandler from "../../../constants/hooks/useCustomBackHandler";
import RequestOtpFormData from "../type/RequestOtpType";
import { handleRequestEmailVerificationOtp } from "../service/OtpRequestService";

interface UseRequestEmailVerificationOtpFormReturn {
  email: string;
  setEmail: (value: string) => void;
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

const UseRequestEmailVerificationOtp = (): UseRequestEmailVerificationOtpFormReturn => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  useCustomBackHandler({ replaceRoute: "/main/login" });

  const allInputFilled = email.trim() !== "";

  const resetForm = () => {
    setEmail("");
    setError(null);
    setSuccessMessage(null);
    console.log("Request email verification otp form reset");
  };

  const onSubmit = async () => {
    const formData: RequestOtpFormData = { email };
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setModalVisible(false);
    setModalType(null);

    try {
      const response = await handleRequestEmailVerificationOtp(formData);
      console.log("Request email verification otp API response:", response);
      if (response.success) {
        setSuccessMessage(response.message || "Request email verification otp successful! Please verify your email.");
        setModalType("success");
        setModalVisible(true);
      } else {
        setError(response.message || "Request email verification otp failed");
        setModalType("error");
        setModalVisible(true);
      }
    } catch (err) {
      if (typeof err === "object" && err !== null && "message" in err && typeof (err as any).message === "string") {
        if ((err as any).message.includes("Network Error")) {
          setError("Network error. Please check your internet connection and try again.");
        } else {
          setError((err as any).message || "Request email verification otp failed");
        }
      } else {
        setError("Request email verification otp failed");
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
        pathname: "main/authentication/verifyEmailOtp",
        params: { email },
      });
    }
  };

  return {
    email,
    setEmail,
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

export default UseRequestEmailVerificationOtp;