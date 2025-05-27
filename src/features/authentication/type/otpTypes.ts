export interface TokenResponse {
  success: boolean;
  data?: {
    email?: string;
    userId?: string;
    [key: string]: any;
  };
  message?: string;
}


export interface TokenRequestData {
  email?: string;
  userId?: string;
  [key: string]: any;
}

export interface OTPVerificationProps {
  title: string;
  subtitle?: string;
  purpose: string;
  data?: Record<string, any>;
  onVerifySuccess?: (response?: any) => void;
  onError?: (error: string) => void;
  successRoute: string;
}

export interface TimerDisplayProps {
  timer: number;
  expiredText?: string;
}

export interface ResendButtonProps {
  isLoading: boolean;
  timer: number;
  onPress: () => void;
}

export interface VerificationButtonProps {
  isLoading: boolean;
  otp: string;
  timer: number;
  onPress: () => void;
}

export interface MessageDisplayProps {
  error: string | null;
  resendMessage: string | null;
}