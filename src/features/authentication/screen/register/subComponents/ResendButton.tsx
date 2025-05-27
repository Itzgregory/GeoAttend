import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ResendButtonProps } from '../../../type/otpTypes';

export const ResendButton: React.FC<ResendButtonProps> = ({ isLoading, timer, onPress }) => (
  <TouchableOpacity onPress={onPress} disabled={isLoading || timer > 0}>
    <Text style={[styles.resendText, (isLoading || timer > 0) && styles.disabledText]}>
      Resend Code
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  resendText: {
    color: "#00544F",
    textAlign: "center",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  disabledText: {
    color: "#6B7280",
    textDecorationLine: "none",
  },
});