import { handleRequestEmailVerificationOtp, handleRequestPasswordResetOtp } from "../service/OtpRequestService";

export type RequestType = 'password_reset' | 'email_verification' | 'two_factor';

export const getOtpService = (requestType: string) => {
  switch (requestType) {
    case 'password_reset':
      return handleRequestPasswordResetOtp;
    case 'email_verification':
      return handleRequestEmailVerificationOtp;
    default:
      throw new Error(`Unknown request type: ${requestType}`);
  }
};

 export const requestTitles = {
    password_reset: "Forgot your password?",
    email_verification: "Verify your email",
    two_factor: "Two-Factor Authentication",
  };

export const requestSubtitles = {
    password_reset: "Enter your email to receive a password reset code.",
    email_verification: "Enter your email to receive a verification code.",
    two_factor: "Enter your email to receive a 2FA authentication code.",
  };