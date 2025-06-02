import React from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";
import RequestPasswordResetOtp from "../../../src/features/authentication/screen/otp/requestPasswordResetOtpWithEmail";

const StyledView = styled(View);

export default function Login() {
  useCustomBackHandler({ replaceRoute: "/main/welcome/login" });
  return ( 
    <>
     <RequestPasswordResetOtp/>
    </>
  );
}

