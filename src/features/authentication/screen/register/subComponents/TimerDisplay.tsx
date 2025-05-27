import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TimerDisplayProps } from '../../../type/otpTypes';

const formatTimer = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, expiredText = "Code expired. Please resend." }) => {
  if (timer > 0) {
    return <Text style={styles.timerText}>Resend Otp Disabled Until Code Expires In: {formatTimer(timer)}</Text>;
  }
  return <Text style={styles.errorText}>{expiredText}</Text>;
};

const styles = StyleSheet.create({
  timerText: {
    color: "#374151",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});