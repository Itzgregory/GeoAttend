import React from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";
import RequestEmailOtpScreen from "../../../src/features/authentication/screen/otp/requestEmailOtpScreen";

const StyledView = styled(View);

export default function requestPasswordResetOtpPage() {
  useCustomBackHandler({ replaceRoute: "/main/welcome/login" });
  return ( 
    <>
     <RequestEmailOtpScreen/>
    </>
  );
}

