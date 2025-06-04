import React, { useState } from "react";
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
  size = 30,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    if (!isDisabled) {
      setIsDisabled(true);
      onPress ? onPress() : router.back();
    }
  };

  const topPosition = insets.top + 15;

  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        {
          backgroundColor: isDisabled ? "#A9A9A9" : backgroundColor,
          width: size,
          height: size,
          borderRadius: size / 4,
          top: topPosition,
        },
        style,
      ]}
      onPress={handlePress}
      disabled={isDisabled} 
      activeOpacity={isDisabled ? 1 : 0.7} 
    >
      <Text style={[styles.backButtonText, { color: iconColor }]}>
        {"<"}
      </Text>
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
