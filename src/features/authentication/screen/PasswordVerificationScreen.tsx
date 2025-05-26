
import React from "react";
import OTPVerification from "./OtpVerificationScreen";

export default function PasswordResetOtpVerificationScreen() {
  return (
    <OTPVerification 
      title="Reset Password"
      subtitle="Enter the reset code"
      endpoint="/api/auth/verify-reset"
      data={{ email: "user@example.com" }}
      successRoute="/auth/new-password"
    />
  );
}