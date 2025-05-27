import React, { useEffect } from "react";
import OTPVerification from "./OtpVerificationScreen";
import useCustomBackHandler from "../../../../constants/hooks/useCustomBackHandler";


export default function EmailOtpVerificationScreen({ email }: { email: string }) {
  useCustomBackHandler({ replaceRoute: "/main/welcome" });

  useEffect(() => {
    console.log("EmailOtpVerificationScreen received email:", email); 
  }, [email]);

  return (
    <OTPVerification 
      title="Enter Authentication Code"
      subtitle={`Enter the 4-digit code we sent to ${email}`}
      purpose="verification"
      data={{ email }}
      successRoute="/main/authentication/login"
    />
  );
}