export default interface RequestPasswordResetOtpFormData {
    email: string;
};

export  interface PasswordResetOtpVerificationFormData {
    email: string;
    otp: string;
};