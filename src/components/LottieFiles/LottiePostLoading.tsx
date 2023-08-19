import React from "react";
import { useLottie } from "lottie-react";
import LottiePostLoadingAnimation from "./postLoading.json"
import COLORS from "../../assets/color";

const LottiePostLoading = () => {
  const options = {
    animationData: LottiePostLoadingAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return <div style={{background:COLORS.Gray2,borderRadius:16,
    margin:'30px auto',width:100,height:100}}>{View}</div>;
};

export default LottiePostLoading;
