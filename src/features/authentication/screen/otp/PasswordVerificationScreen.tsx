import React from "react";
import OTPVerification from "./OtpVerificationScreen";

export default function PasswordResetOtpVerificationScreen({ email }: { email: string }){
  return (
    <OTPVerification 
      title="Reset Password"
      subtitle={`Enter the 4-digit code we sent to ${email}`}
      purpose="forgot_password"
      data={{ email: "user@example.com" }}
      successRoute="/main/authentication/newPassword"
    />
  );
}