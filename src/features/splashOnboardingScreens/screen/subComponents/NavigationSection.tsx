import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import DynamicButton from "../../../../constants/ui/button";

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

  const renderActionButton = () => {
    if (isLastStep) {
      return (
        <DynamicButton
          isGreen={false}
          label="Get Started"
          onPress={() => router.push("/main/welcome")}
          style={{}} 
          isDisabled={false}        
        />
      );
    }
    return (
      <TouchableOpacity
        style={[styles.nextButton, { width: buttonSize, height: buttonSize }]}
        onPress={() => router.push(nextPath)}
        activeOpacity={0.8}
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
          onPress={() => router.push("/main/welcome")} 
          isDisabled={false}        
          />

        {/* Navigation container for the Back button (replacing Skip) */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.skipButton}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Back</Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <View style={styles.navigationContainer}>
        {isFirstStep ? (
          <TouchableOpacity
            onPress={() => router.push("/main/welcome")}
            style={styles.skipButton}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.skipButton}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Back</Text>
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
  lastStepContainer: {
    width: "100%",
    alignItems: "center",
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
  },
});

export default NavigationSection;