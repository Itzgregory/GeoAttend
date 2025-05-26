import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "../stylesheet";
import { styled } from "nativewind";
import { Link } from "expo-router";

const StyledView = styled(View);

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Login</Text>
        <StyledView tw="flex-row w-full">
          <View tw="flex-1">
            <Link href='/register'> Do not have an account? Register</Link>
          </View>
        </StyledView>
      </View>
    </View>
  );
}

