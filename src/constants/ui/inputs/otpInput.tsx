import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface OTPInputProps {
  length?: number;
  type: "numeric" | "alphanumeric";
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, type, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (type === "numeric" && isNaN(Number(text))) return; 

    if (text.length > 1) {
      const newOtp = text.slice(0, length).split("").filter((char) => type === "numeric" ? !isNaN(Number(char)) : true);
      setOtp(newOtp);
      onChange(newOtp.join(""));
      inputs.current[Math.min(newOtp.length, length - 1)]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputs.current[index - 1]?.focus(); 
        setFocusedIndex(index - 1);
      }

      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputs.current[index] = ref; }}
          style={[
            styles.inputBox,
            { borderColor: focusedIndex === index ? "#00A86B" : "#A9A9A9" } 
          ]}
          keyboardType={type === "numeric" ? "numeric" : "default"}
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 2,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
  },
});

export default OTPInput;
