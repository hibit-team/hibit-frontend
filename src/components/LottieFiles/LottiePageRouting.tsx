import React from 'react';
import { useLottie } from 'lottie-react';
import pageRoutingAnimation from './pageRouting.json';

const LottiePageRouting = () => {
  const options = {
    animationData: pageRoutingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div style={{position:'absolute',width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',
  background:'gray'}}>
    <div style={{ width: 300, height: 300 }}>{View}</div>;
  </div>
};

export default LottiePageRouting;
