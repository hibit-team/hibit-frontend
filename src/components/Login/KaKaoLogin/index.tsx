import React from 'react';
import * as s from "./styles";
import KakaoIcon from "../../../images/components/Login/KakaoIcon.png"

const KaKaoLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log(window.location.href);
  };

  return (
    <s.Wrapper onClick={kakaoLogin}>
      <s.KakaoIcon src={KakaoIcon} alt='kakao icon' />
      <s.Text>Kakao 계정으로 로그인</s.Text>
    </s.Wrapper>
  )
};

export default KaKaoLogin;
