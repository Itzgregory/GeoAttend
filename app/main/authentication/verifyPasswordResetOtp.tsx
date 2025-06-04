import React from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";
import PasswordResetOtpVerificationScreen from "../../../src/features/authentication/screen/otp/verifyPasswordResetOtpScreen";
import { useLocalSearchParams } from "expo-router";

const StyledView = styled(View);

export default function PasswordResetOtpVerificationPage() {
   const { email } = useLocalSearchParams<{ email: string }>();
  useCustomBackHandler({ replaceRoute: "/main/welcome/requestPasswordResetOtp" });
  return ( 
    <>
     <PasswordResetOtpVerificationScreen email={email || ""}/>
    </>
  );
}

