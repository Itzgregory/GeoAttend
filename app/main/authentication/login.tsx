import React from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";
import LoginScreen from "../../../src/features/authentication/screen/login/loginScreen";

const StyledView = styled(View);

export default function LoginPage() {
  useCustomBackHandler({ replaceRoute: "/main/welcome" });
  return ( 
    <>
     <LoginScreen/>
    </>
  );
}

