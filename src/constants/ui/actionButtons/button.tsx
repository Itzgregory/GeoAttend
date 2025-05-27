import React from "react";
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface DynamicButtonProps {
  style?: StyleProp<ViewStyle>; 
  isGreen?: boolean; 
  isRed?: boolean;  
  label: string;
  onPress: () => Promise<void> | void; 
  isDisabled?: boolean;
  loading?: boolean;  
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  isGreen = false,
  isRed = false,
  label,
  onPress,
  isDisabled = false,
  loading = false,
  style = {},
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = async () => {
    if (isPressed || isDisabled || loading) return;

    setIsPressed(true);
    try {
      await onPress();
    } catch (error) {
      console.error("Button press failed:", error);
    } finally {
      setTimeout(() => setIsPressed(false), 1000);
    }
  };

  const buttonDisabled = isDisabled || isPressed || loading;

  const backgroundStyle = isGreen
    ? styles.greenBg
    : isRed
    ? styles.redBg
    : styles.transparentBg;
  const textStyle = isGreen
    ? styles.greenText
    : isRed
    ? styles.redText
    : styles.transparentText;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundStyle,
        buttonDisabled && styles.disabledButton,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
      disabled={buttonDisabled}
    >
      {loading ? (
        <Text style={[styles.text, textStyle, styles.loadingText]}>Loading...</Text>
      ) : (
        <Text style={[styles.text, textStyle, buttonDisabled && styles.disabledText]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#00544F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  greenBg: {
    backgroundColor: "#00544F",
  },
  redBg: {
    backgroundColor: "#ff4d4d",
  },
  transparentBg: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00544F",
  },
  disabledButton: {
    opacity: 0.5,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: "600" as const,
    fontFamily: "Lato",
  },
  greenText: {
    color: "#FFFFFF",
  },
  redText: {
    color: "#FFFFFF",
  },
  transparentText: {
    color: "#00544F",
  },
  disabledText: {
    opacity: 0.7,
  },
  loadingText: {
    opacity: 1, 
  },
});

export default DynamicButton;