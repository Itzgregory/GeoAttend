import React from "react";
import { View, Text, StyleSheet, Dimensions, StyleProp, ViewStyle, TextStyle } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  // Allows overriding/adding styles
  containerStyle?: StyleProp<ViewStyle>; 
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<TextStyle>;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, subtitle, containerStyle, titleStyle, subtitleStyle, textContainerStyle }) => {
  return (
    <View style={[styles.contentSection, containerStyle]}>
      <View style={[styles.textContainer, textContainerStyle]}> 
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  contentSection: {
    flex: 0.35,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 32,
    width: '100%',
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    color: "#090a0a",
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 30,
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#72777A",
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "justify",
    maxWidth: screenWidth * 0.8,
  },
});

export default ContentSection;
