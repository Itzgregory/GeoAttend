import React from "react";
import { useLocalSearchParams } from "expo-router";
import EmailOtpVerificationScreen from "../../../src/features/authentication/screen/otp/verifyEmailOtpScreen";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";



export default function AccountVerificationPage() {
  const { email } = useLocalSearchParams<{ email: string }>();
  useCustomBackHandler({ replaceRoute: "/main/welcome" });

  return (
      <EmailOtpVerificationScreen email={email || ""} />
  );
}
