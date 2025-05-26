import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { styles } from "../stylesheet";
import { styled } from "nativewind";
import ThemedView from "../../MyApp/src/shared/ui/components/themedView"

const StyledView = styled(View);

export default function Home() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Testing</Text>
        <StyledView tw="flex-row w-full">
          <View tw="flex-1">
            <Link href='/register'>Register</Link>
          </View>
          <View tw="flex-1 items-end">
            <Link href='/login'>Login</Link>
          </View>
        </StyledView>
      </View>
    </ThemedView>
  );
}



