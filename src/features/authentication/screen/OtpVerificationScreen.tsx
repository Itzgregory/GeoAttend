import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import InputField from "../../../constants/ui/inputField";
import ThemedView from "../../../constants/ui/themedView";
import DynamicButton from "../../../constants/ui/button";
import { useState } from "react";
import axiosInstance from "../../../utils/config/axios";
import React from "react";

interface OTPVerificationProps {
  title: string;
  subtitle?: string;
  endpoint: string;
  data?: Record<string, any>;
  onVerifySuccess?: (response?: any) => void;
  onError?: (error: string) => void;
  successRoute: string;
}

interface VerifyResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export default function OTPVerification({
  title,
  subtitle,
  endpoint,
  data = {},
  onVerifySuccess,
  onError,
  successRoute
}: OTPVerificationProps) {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mergedData = { ...params, ...data };

  const handleVerify = async () => {
    if (!otp.trim()) {
      const errorMsg = "Please enter the verification code";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = { ...mergedData, otp };
      const response = await axiosInstance.post(endpoint, payload);
      const result: VerifyResponse = response.data;

      if (result.success) {
        setError(null);
        
        if (onVerifySuccess) {
          onVerifySuccess(result.data);
        } else if (successRoute) {
          router.push(successRoute);
        }
      } else {
        const errorMsg = result.message || "Verification failed";
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Verification failed. Please try again.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}

        <InputField
          placeholder="Enter verification code"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
        />

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <DynamicButton
          onPress={handleVerify}
          isDisabled={isLoading || !otp.trim()}
          label={isLoading ? "Verifying..." : "Verify"} 
          isGreen={false}        
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFF2",
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold" as const,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});