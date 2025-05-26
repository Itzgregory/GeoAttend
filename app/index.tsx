import React, { useState } from "react";
import { useRouter } from "expo-router";
import SplashScreenComponent from "../src/features/splashOnboardingScreens/screen/splashScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const handleSplashFinish = () => {
    setIsLoaded(true);
    router.push("/onboarding/onboarding1");
  };

  if (isLoaded) {
    return null;
  }

  return <SplashScreenComponent onFinish={handleSplashFinish} />;
}