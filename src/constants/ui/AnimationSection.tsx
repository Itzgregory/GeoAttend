import React from "react";
import { View, StyleSheet, Dimensions, StyleProp, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

const { width: screenWidth } = Dimensions.get("window");

interface AnimationSectionProps {
  animationSource: object;
  animationStyle?: StyleProp<ViewStyle>; 
  containerStyle?: StyleProp<ViewStyle>;
  loop?: boolean;
  width?: number | string;
  height?: number | string;
}

const AnimationSection: React.FC<AnimationSectionProps> = ({ 
  animationSource, 
  animationStyle, 
  containerStyle,
  loop = false,
  width,
  height
}) => {
  return (
    <View style={[styles.animationContainer, containerStyle]}>
      <LottieView
        source={animationSource}
        autoPlay
        loop={loop}
        style={[
          styles.animation, 
          animationStyle,
          width && { width },
          height && { height }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 0.45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  animation: {
    width: "100%",
    height: "100%",
    maxWidth: screenWidth * 0.8,
  },
});

export default AnimationSection;