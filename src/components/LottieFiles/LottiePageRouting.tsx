/** @jsxImportSource @emotion/react */
import React from 'react';
import { useLottie } from 'lottie-react';
import pageRoutingAnimation from './pageRouting.json';
import COLORS from '../../assets/color';
import { css } from '@emotion/react';

const LottiePageRouting = () => {
  const options = {
    animationData: pageRoutingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div
      data-id="modal-overlay"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: COLORS.Gray1,
          borderRadius: 16,
          padding: 16,
          width: 120,
          height: 120,
          boxSizing:'border-box',
          boxShadow: `4px 4px 10px rgba(0, 10, 10, 0.7)`,
        }}
      >
        <div css={{position:'relative',top:5}}>{View}</div>
        <div css={{position:'relative',left:5,top:25,fontSize:16,color:COLORS.main79,fontWeight:800,}}>LOADING...</div>
      </div>
      ;
    </div>
  );
};

export default LottiePageRouting;
