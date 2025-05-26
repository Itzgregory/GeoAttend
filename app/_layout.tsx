import { Slot, Stack } from 'expo-router';
import React from "react";
import { Colors } from "../src/constants/lib/themes/themes";
import { StatusBar, useColorScheme } from 'react-native';

export default function RootLayout() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
        }}>
          <Stack.Screen name='index' options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen name='onboarding/onboarding1' options={{headerShown: false }} />
          <Stack.Screen name='onboarding/onboarding2' options={{headerShown: false }} />
          <Stack.Screen name='onboarding/onboarding3' options={{headerShown: false }} />
          <Stack.Screen name='main/welcome' options={{headerShown: false }} />
          {/* <Stack.Screen name="main" options={{ headerShown: false }} /> */}
          <Stack.Screen name='login' options={{ title: 'Login', headerShown: true }} />
          <Stack.Screen name='register' options={{headerShown: false }} />
      </Stack>
    </>
  );
}
