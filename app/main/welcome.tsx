import React from 'react';
import Welcome from "../../src/features/splashOnboardingScreens/screen/welcome"
import useCustomBackHandler from '../../src/constants/hooks/useCustomBackHandler';

const onboarding1 = () => {
  useCustomBackHandler({ replaceRoute: "/main/exit" });
  return (
    <>
      <Welcome />
    </>
  )
}

export default onboarding1
