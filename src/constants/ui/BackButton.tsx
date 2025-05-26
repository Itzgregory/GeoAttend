import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BackButtonProps {
  onPress?: () => void;
  style?: object;
  iconColor?: string;
  backgroundColor?: string;
  size?: number;
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  iconColor = "#FFFFFF",
  backgroundColor = "#00544F",
  size = 44,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    onPress ? onPress() : router.back();
  };

  const topPosition = insets.top + 20; 

  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        {
          backgroundColor,
          width: size,
          height: size,
          borderRadius: size / 2,
          top: topPosition,
        },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={[styles.backButtonText, { color: iconColor }]}>←</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BackButton;