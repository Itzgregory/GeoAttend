import React from "react";
import OnboardingScreen from "./subComponents/onboardingScreenMain";

export default function OnboardingScreen2() {
  return (
    <OnboardingScreen
      animationSource={require("../../../../assets/onboardingClip2.json")}
      title="Automatically Checkin with Geofence Technology"
      subtitle="Leverage geofencing to ensure attendees are present in the right location at the right time. Boost accuracy  in tracking attendance within set boundaries."
      currentStep={2}
      totalSteps={3}
      nextPath="/onboarding/onboarding3"
      skipPath="/main/welcome"
      buttonSize={30}
    />
  );
}