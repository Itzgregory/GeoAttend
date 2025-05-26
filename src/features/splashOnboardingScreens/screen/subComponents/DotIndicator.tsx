import React from "react";
import { View, StyleSheet } from "react-native";

interface DotIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ currentStep, totalSteps }) => {
  const renderDots = () => {
    const dots = [];
    for (let i = 1; i <= totalSteps; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i === currentStep ? "#00544F" : "#E5E5E5",
              transform: [{ scale: i === currentStep ? 1.2 : 1 }],
            },
          ]}
        />
      );
    }
    return dots;
  };

  return <View style={styles.dotContainer}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 32,
    marginBottom: 20,
  },
  dot: {
    width: 17,
    height: 10,
    borderRadius: 4,
  },
});

export default DotIndicator;