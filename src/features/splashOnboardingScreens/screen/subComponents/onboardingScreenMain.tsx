import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import AnimationSection from "../../../../constants/ui/animations/AnimationSection";
import ContentSection from "./ContentSection";
import DotIndicator from "./DotIndicator";
import NavigationSection from "./NavigationSection";
import { useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface OnboardingScreenProps {
  animationSource: object;
  title: string;
  subtitle: string;
  currentStep?: number;
  totalSteps?: number;
  nextPath: string;
  skipPath?: string;
  buttonSize?: number;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  animationSource,
  title,
  subtitle,
  currentStep = 1,
  totalSteps = 3,
  nextPath,
  skipPath,
  buttonSize = 50,
}) => {
  const router = useRouter();

  useEffect(() => {
    StatusBar.setBackgroundColor("#FDFFF2");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/onboarding/onboarding${currentStep - 1}`);
    }
  };

  const isLastStep = currentStep === totalSteps;

  return (
    <View style={styles.container}>
      <AnimationSection 
        animationSource={animationSource} 
        containerStyle={{backgroundColor: '#edfce5', borderRadius: '100%'}}
      />
      <ContentSection title={title} subtitle={subtitle} />
      <DotIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <NavigationSection
        currentStep={currentStep}
        totalSteps={totalSteps}
        nextPath={nextPath}
        buttonSize={buttonSize}
        handleBack={handleBack}
        isLastStep={isLastStep}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFF2",
    paddingTop: StatusBar.currentHeight || 44,
    padding: 10,
    width: screenWidth,
    height: screenHeight,
  },
});

export default OnboardingScreen;