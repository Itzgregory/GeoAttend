import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, StyleSheet, ScrollView, Text } from "react-native";
import ThemedView from "../../../../constants/ui/themes/themedView";
import React from "react";
import InputField from "../../../../constants/ui/inputs/inputField";
import DynamicButton from "../../../../constants/ui/actionButtons/button";
import MessageModal from "../../../../constants/ui/modals/successModal";
import { getOtpService, requestSubtitles, requestTitles, RequestType } from "../../lib/requestOtpAsset";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");



export default function RequestOtpScreen() {
  const router = useRouter();
  const { requestType } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  // typing the titles and subtitles
  const requestTypeKey = requestType as RequestType;
  const title = requestTitles[requestTypeKey] || "Request OTP";
  const subtitle = requestSubtitles[requestTypeKey] || "Enter your email to proceed.";

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setModalVisible(false);
    setModalType(null);

    try {
      const otpService = getOtpService(requestTypeKey);
      const response = await otpService({ email });
      
      if (response.success) {
        setSuccessMessage(response.message);
        setModalType("success");
        setModalVisible(true);
      } else {
        setError(response.message || "Request failed");
        setModalType("error");
        setModalVisible(true);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while requesting OTP.");
      setModalType("error");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    if (modalType === "success") {
      const nextRoute = requestTypeKey === 'password_reset' 
        ? "main/authentication/verifyPasswordResetOtp"
        : "main/authentication/verifyEmailOtp";
      
      router.replace({
        pathname: nextRoute,
        params: { email },
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <DynamicButton
          isGreen={true}
          label="Next"
          onPress={onSubmit}
          isDisabled={!email.trim() || loading}
        />
      </ScrollView>

      <MessageModal
        visible={modalVisible}
        message={successMessage || error || "An unexpected error occurred"}
        type={modalType || "error"}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FDFFF2",
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});