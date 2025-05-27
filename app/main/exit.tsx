import { useFocusEffect, useRouter } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { useCallback, useEffect } from "react";

export default function ExitRoute() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.exitApp(); // Close app immediately on Android
    }
    // iOS: Stay on route, no UI rendered
  }, []);

  // Prevent back navigation
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; // Block back navigation
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => subscription.remove();
    }, [])
  );

  // Render nothing
  return null;
}