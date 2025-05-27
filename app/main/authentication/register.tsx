import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styled } from "nativewind";
import RegisterScreen from "../../../src/features/authentication/screen/register/registerScreen";
import useCustomBackHandler from "../../../src/constants/hooks/useCustomBackHandler";

const StyledView = styled(View);

export default function Register() {
  useCustomBackHandler({ replaceRoute: "/main/welcome" });
  return ( 
    <>
      <RegisterScreen />
    </>
  );
}

