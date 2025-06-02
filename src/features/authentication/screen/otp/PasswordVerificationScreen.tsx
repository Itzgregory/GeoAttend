import React, { useEffect } from "react";
import OTPVerification from "./OtpVerificationScreen";
import useCustomBackHandler from "../../../../constants/hooks/useCustomBackHandler";


export default function PasswordResetOtpVerificationScreen({ email }: { email: string }) {
  useCustomBackHandler({ replaceRoute: "/main/requestPasswordResetOtpVerification" });

  useEffect(() => {
    console.log("PasswordResetOtpVerificationScreen received email:", email); 
  }, [email]);

  return (
    <OTPVerification 
      title="Enter Authentication Code"
      subtitle={`Enter the 4-digit code we sent to ${email}`}
      purpose="forgot_password"
      data={{ email }}
      successRoute="/main/authentication/resetPassword"
    />
  );
}