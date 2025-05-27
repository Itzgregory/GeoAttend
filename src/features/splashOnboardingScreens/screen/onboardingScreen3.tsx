import React from "react";
import OnboardingScreen from "./subComponents/onboardingScreenMain";

export default function OnboardingScreen3() {
  return (
    <OnboardingScreen
      animationSource={require("../../../../assets/onboardingClip1.json")}
      title="Monitor in Real-Time"
      subtitle="Stay updated with live attendance tracking and instant notifications."
      currentStep={3}
      totalSteps={3}
       nextPath="/main/welcome"
      buttonSize={30}
    />
  );
}