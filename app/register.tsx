import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styled } from "nativewind";
import RegisterScreen from "../src/features/authentication/screen/registerScreen";

const StyledView = styled(View);

export default function Register() {
  return (
    <>
      <RegisterScreen />
    </>
  );
}

