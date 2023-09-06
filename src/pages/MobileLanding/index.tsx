/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './styles';
import COLORS from '../../assets/color';
import HIBITLOGO from '../../images/mobile/mobileLogo.svg';
export default function MobileLanding() {
  return (
    <div
      style={{
        background: COLORS.main42,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
      }}
    >
      <s.MobileLanding>
        <img src={HIBITLOGO} alt="hibit-logo"></img>
        {/* <div css={{ margin: 'auto', fontWeight: 500, fontSize: 28 }}>알림 ! </div> */}
        <p css={{ margin: '2rem auto', fontWeight: 700, fontSize: 28 }}> [ HIBIT 모바일 Ver 공개 예정 ]</p>
        <div css={{ color: COLORS.Gray3, margin: '1rem auto', fontWeight: 900, fontSize: 24 }}> 데스크탑에서 이용해주세요!</div>
        <span css={{ margin: 'auto', fontWeight: 600, fontSize: 23, color: COLORS.Gray3 }}>HIBIT은  모바일에서도 편하게 이용할 수 있도록 열심히 노력중입니다! ✨</span>
      </s.MobileLanding>
    </div>
  );
}
