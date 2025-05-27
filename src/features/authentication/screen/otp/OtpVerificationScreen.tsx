import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedView from "../../../../constants/ui/themes/themedView";
import DynamicButton from "../../../../constants/ui/actionButtons/button";
import { useState, useEffect, useMemo } from "react";
import { sendVerificationOtp, validateVerificationOtp } from "../../api/otpApi";
import OTPInput from "../../../../constants/ui/inputs/otpInput";
import { DotPattern } from "../../../../constants/ui/backgrounds/patternBg";
import { getExpirationTime, startOtpCountdown } from "../../lib/otpAssets";
import { OTPVerificationProps, TokenResponse } from "../../type/otpTypes";
import { useMessageModal } from "../../hooks/useMessageModal";
import { TimerDisplay } from "../register/subComponents/TimerDisplay";
import { ResendButton } from "../register/subComponents/ResendButton";
import MessageModal from "../../../../constants/ui/modals/successModal";
import React from "react";
import BackButton from "../../../../constants/ui/navigation/BackButton";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function OTPVerification({
  title,
  subtitle,
  purpose,
  data = {},
  onVerifySuccess,
  onError,
  successRoute,
}: OTPVerificationProps) {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(getExpirationTime(purpose));

  const {
    modalVisible,
    modalMessage,
    modalType,
    onModalConfirm,
    showMessage,
    hideMessage,
  } = useMessageModal();
  
  const mergedData = useMemo(() => ({ ...params, ...data }), [params, data]);

  useEffect(() => {
    console.log("Merged data in OTPVerification:", mergedData); 
    const interval = startOtpCountdown(purpose, setTimer);
    return () => {
      clearInterval(interval);
      setOtp("");
      setIsLoading(false);
      setResendMessage(null);
      setTimer(0);
      console.log("OTPVerification unmounted, state cleared"); 
    };
  }, [purpose]);

  const handleVerify = async () => {
    if (!otp.trim()) {
      showMessage("Please enter the verification code", "error");
      return;
    }

    if (!mergedData.email) {
      showMessage("Email is required for verification", "error", () => {
        router.replace("/main/welcome");
      });
      return;
    }

    setIsLoading(true);

    try {
      const email = mergedData.email as string;
      const payload = { email, otp }; 
      console.log("Verification payload:", payload); 
      const result: TokenResponse = await validateVerificationOtp(payload);

      if (result.success) {
        showMessage(result.message || "Verification successful!", "success", () => {
          if (onVerifySuccess) {
            onVerifySuccess(result.data);
          } else if (successRoute) {
            router.replace(successRoute); 
          }
        });
      } else {
        showMessage(result.message || "Verification failed", "error");
      }
    } catch (err: any) {
      showMessage(err.message || "Verification failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!mergedData.email) {
      showMessage("Email is required to resend code", "error", () => {
        router.replace("/main/welcome");
      });
      return;
    }

    setIsLoading(true);

    try {
      const email = mergedData.email as string;
      const payload = { email };
      console.log("Resend payload:", payload); 
      const result: TokenResponse = await sendVerificationOtp(payload);

      if (result.success) {
        showMessage(result.message || "New verification code sent!", "success");
        setTimer(getExpirationTime(purpose)); // Reset timer
      } else {
        showMessage(result.message || "Failed to resend code", "error");
      }
    } catch (err: any) {
      showMessage(err.message || "Failed to resend code. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    router.replace('/main/welcome');
  };

  return (
    <ThemedView style={styles.container}>
      <DotPattern /> 
      <BackButton onPress={handleBack}/>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        <OTPInput
          length={4}
          type="numeric"
          onChange={setOtp}
        />

        <DynamicButton
          onPress={handleVerify}
          isDisabled={isLoading || !otp.trim() || timer === 0}
          label={isLoading ? "Verifying..." : "Verify"} 
          isGreen={true}        
        />

        <TimerDisplay timer={timer} />

        <ResendButton isLoading={isLoading} timer={timer} onPress={handleResend} />

        <MessageModal
          visible={modalVisible}
          message={modalMessage}
          type={modalType}
          onClose={hideMessage}
          onConfirm={onModalConfirm}
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
    marginTop: 50,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  title: {
    color: "#090a0a",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 25,
    lineHeight: 30,
    textAlign: "justify",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#72777A",
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "justify",
    maxWidth: screenWidth * 0.8,
  },
});