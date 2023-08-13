import React from "react";
import { useLottie } from "lottie-react";
import LottiePostLoadingAnimation from "./postLoading.json"

const LottiePostLoading = () => {
  const options = {
    animationData: LottiePostLoadingAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return <div style={{margin:'30px auto',width:150,height:150}}>{View}</div>;
};

export default LottiePostLoading;
