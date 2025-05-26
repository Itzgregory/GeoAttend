
import React from "react";
import OTPVerification from "./OtpVerificationScreen";

export default function EmailOtpVerificationScreen() {
  return (
    <OTPVerification 
      title=""
      subtitle="Enter the verification code"
      endpoint="/api/auth/verify-reset"
      data={{ }}
      successRoute=""
    />
  );
}