export const prepareOtpData = (email: string, purpose: string) => {
  return { email, purpose };
};

const expirationTimes: Record<string, number> = {
  verification: 300, 
  forgot_password: 600, 
};

export const getExpirationTime = (purpose: string) => expirationTimes[purpose] || 300;

export const startOtpCountdown = (purpose: string, setTimer: (time: number) => void) => {
  const expiryTime = getExpirationTime(purpose);
  setTimer(expiryTime);

  let current = expiryTime;
  const interval = setInterval(() => {
    if (current <= 1) {
      clearInterval(interval);
      current = 0;
    } else {
      current -= 1;
    }
    setTimer(current);
  }, 1000);

  return interval;
};
