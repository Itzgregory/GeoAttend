import React from "react";
import OnboardingScreen from "./subComponents/onboardingScreenMain";

export default function OnboardingScreen1() {
  return (
    <OnboardingScreen
      animationSource={require("../../../../assets/onboardingClip1.json")}
      title="Track Attendance within your Geofence"
      subtitle="Effortless attendance anytime, anywhere with smart geofencing, real-time tracking, and seamless reporting."
      currentStep={1}
      totalSteps={3}
      nextPath="/onboarding/onboarding2"
      skipPath="/main/welcome"
      buttonSize={30}
    />
  );
}