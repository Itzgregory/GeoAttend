import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import LottieView from "lottie-react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const svgContent = `
<svg width="100%" height="100%" viewBox="0 0 ${screenWidth} ${screenHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#00544F"/>
  
  <!-- Top-left ellipse -->
  <ellipse cx="${-screenWidth * 0.15}" cy="${screenHeight * 0.1}" rx="${screenWidth * 0.45}" ry="${screenHeight * 0.3}" fill="url(#goldGradient)" opacity="0.8" transform-origin="${-screenWidth * 0.15} ${screenHeight * 0.1}">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 ${-screenWidth * 0.15} ${screenHeight * 0.1}"
      to="360 ${-screenWidth * 0.15} ${screenHeight * 0.1}"
      dur="8s"
      repeatCount="indefinite"
    />
  </ellipse>
  
  <!-- Bottom-right ellipse -->
  <ellipse cx="${screenWidth * 1.15}" cy="${screenHeight * 0.9}" rx="${screenWidth * 0.55}" ry="${screenHeight * 0.35}" fill="url(#goldGradient)" opacity="0.6" transform-origin="${screenWidth * 1.15} ${screenHeight * 0.9}">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 ${screenWidth * 1.15} ${screenHeight * 0.9}"
      to="-360 ${screenWidth * 1.15} ${screenHeight * 0.9}"
      dur="10s"
      repeatCount="indefinite"
    />
  </ellipse>
  
  <defs>
    <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#F5E8C7;stop-opacity:0.8" />
      <stop offset="50%" style="stop-color:#F5E8C7;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#F5E8C7;stop-opacity:0" />
    </radialGradient>
  </defs>
</svg>
`;

export default function SplashScreenComponent({ onFinish }: { onFinish: () => void }) {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    if (animationFinished) {
      const timer = setTimeout(() => {
        onFinish();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animationFinished, onFinish]);

  return (
    <View style={styles.container}>
      <SvgXml
        xml={svgContent}
        style={styles.background}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
      <LottieView
        source={require("../../../../assets/LogoAnimate.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => setAnimationFinished(true)}
        style={styles.animation}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00544F",
  },
  animation: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    position: "absolute",
    alignSelf: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});