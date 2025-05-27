import React from "react";
import { Dimensions, StatusBar, View, StyleSheet } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export  const DotPattern = () => {
  const dots = [];
  const dotSize = 4;
  const spacing = 29;
  const rows = Math.ceil(screenHeight / spacing);
  const cols = Math.ceil(screenWidth / spacing);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <View
          key={`dot-${row}-${col}`}
          style={[
            styles.dot,
            {
              left: col * spacing,
              top: row * spacing,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
            },
          ]}
        />
      );
    }
  }

  return <View style={styles.patternOverlay}>{dots}</View>;
};


const styles = StyleSheet.create({
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    // making sure it's behind the content
    zIndex: 0, 
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#00544F',
  },
});