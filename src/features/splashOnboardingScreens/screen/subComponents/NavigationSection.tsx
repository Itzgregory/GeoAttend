import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import DynamicButton from "../../../../constants/ui/actionButtons/button";

const { width: screenWidth } = Dimensions.get("window");

interface NavigationSectionProps {
  currentStep: number;
  totalSteps: number;
  nextPath: string;
  buttonSize: number;
  handleBack: () => void;
  isLastStep: boolean;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({
  currentStep,
  totalSteps,
  nextPath,
  buttonSize,
  handleBack,
  isLastStep,
}) => {
  const isFirstStep = currentStep === 1;
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isBackDisabled, setIsBackDisabled] = useState(false);
  const [isGetStartedDisabled, setIsGetStartedDisabled] = useState(false);

  useEffect(() => {
    setIsNextDisabled(false);
    setIsBackDisabled(false);
    setIsGetStartedDisabled(false);
  }, [currentStep]);

  const handleNextPress = () => {
    setIsNextDisabled(true);
    router.push(nextPath);
  };

  const handleBackPress = () => {
    setIsBackDisabled(true);
    handleBack();
  };

  const handleSkipPress = () => {
    setIsBackDisabled(true); 
    router.replace("/main/welcome"); 
  };

  const handleGetStartedPress = () => {
    setIsGetStartedDisabled(true);
    router.replace("/main/welcome"); 
  };

  const renderActionButton = () => {
    if (isLastStep) {
      return (
        <DynamicButton
          isGreen={false}
          label="Get Started"
          onPress={handleGetStartedPress}
          style={{}}
          isDisabled={isGetStartedDisabled}
        />
      );
    }
    return (
      <TouchableOpacity
        style={[styles.nextButton, { width: buttonSize, height: buttonSize }]}
        onPress={handleNextPress}
        activeOpacity={0.8}
        disabled={isNextDisabled}
      >
        <Text style={styles.arrowText}>{">"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomSection}>
      {isLastStep ? (
        <>
          {/* Get Started button on its own row */}
          <DynamicButton
            style={styles.getStartedButton}
            isGreen={true}
            label="Get Started"
            onPress={handleGetStartedPress}
            isDisabled={isGetStartedDisabled}
          />

          {/* Navigation container for the Back button (replacing Skip) */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={[styles.skipButton, isBackDisabled && styles.disabledButton]}
              activeOpacity={0.7}
              disabled={isBackDisabled}
            >
              <Text style={[styles.skipText, isBackDisabled && styles.disabledText]}>Back</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.navigationContainer}>
          {isFirstStep ? (
            <TouchableOpacity
              onPress={handleSkipPress}
              style={[styles.skipButton, isBackDisabled && styles.disabledButton]}
              activeOpacity={0.7}
              disabled={isBackDisabled}
            >
              <Text style={[styles.skipText, isBackDisabled && styles.disabledText]}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleBackPress}
              style={[styles.skipButton, isBackDisabled && styles.disabledButton]}
              activeOpacity={0.7}
              disabled={isBackDisabled}
            >
              <Text style={[styles.skipText, isBackDisabled && styles.disabledText]}>Back</Text>
            </TouchableOpacity>
          )}
          {renderActionButton()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    color: "#72777A",
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#00544F",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00544F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  getStartedButton: {
    width: "100%",
    marginBottom: 16, 
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#B0B0B0",
  },
});

export default NavigationSection;