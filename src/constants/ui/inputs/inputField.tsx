import React from "react";
import {View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, TouchableOpacity,} from "react-native";

export interface InputFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  multiline?: boolean;
  maxLength?: number;
  value?: string;
  onChangeText?: (value: string) => void;
  labelIcon?: React.ReactNode;
  labelIconPosition?: "left" | "right";
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onIconPress?: () => void;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder = "Enter text",
  icon,
  iconPosition = "left",
  style,
  inputStyle,
  labelStyle,
  disabled = false,
  multiline = false,
  maxLength,
  value,
  onChangeText,
  labelIcon,
  labelIconPosition = "left",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  onIconPress,
}) => {
  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <View
            style={[
              styles.labelContent,
              labelIconPosition === "right" && styles.labelContentReverse,
            ]}
          >
            {labelIcon && (
              <View style={styles.labelIconContainer}>
                {labelIcon}
              </View>
            )}
            <Text style={[styles.labelText, labelStyle]}>
              {label}
            </Text>
          </View>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        {icon && iconPosition === "left" && (
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={onIconPress}
            disabled={!onIconPress}
            activeOpacity={onIconPress ? 0.7 : 1}
          >
            {icon}
          </TouchableOpacity>
        )}
        
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          style={[
            styles.input,
            icon && iconPosition === "left" ? styles.inputWithLeftIcon : undefined,
            icon && iconPosition === "right" ? styles.inputWithRightIcon : undefined,
            multiline && styles.multilineInput,
            disabled && styles.disabledInput,
            inputStyle,
          ]}
          editable={!disabled}
          multiline={multiline}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#9CA3AF"
        />
        
        {icon && iconPosition === "right" && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onIconPress}
            disabled={!onIconPress}
            activeOpacity={onIconPress ? 0.7 : 1}
          >
            {icon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 6,
  },
  labelContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  labelContentReverse: {
    flexDirection: "row-reverse",
  },
  labelIconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },
  inputWithLeftIcon: {
    paddingLeft: 48,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  disabledInput: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 12,
    zIndex: 1,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InputField;