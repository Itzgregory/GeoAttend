import React from 'react';
import Welcome from "../../src/features/splashOnboardingScreens/screen/welcome"
import useCustomBackHandler from '../../src/constants/hooks/useCustomBackHandler';

const WelcomePage = () => {
  useCustomBackHandler({ replaceRoute: "/main/exit" });
  return (
    <>
      <Welcome />
    </>
  )
}

export default WelcomePage
