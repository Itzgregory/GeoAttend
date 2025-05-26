import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";
import { styles } from "../stylesheet";

const StyledView = styled(View);

export default function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Register</Text>
        <StyledView tw="flex-row w-full">
          <View tw="flex-1">
            <Link href='/login'> Already have an account? Login</Link>
          </View>
        </StyledView>
      </View>
    </View>
  );
}

