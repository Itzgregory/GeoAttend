import React from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";
import PasswordResetOtpVerificationScreen from "../../../src/features/authentication/screen/otp/PasswordVerificationScreen";

const StyledView = styled(View);

export default function Login() {
  useCustomBackHandler({ replaceRoute: "/main/welcome/requestPasswordResetOtp" });
  return ( 
    <>
     <PasswordResetOtpVerificationScreen email={""}/>
    </>
  );
}

