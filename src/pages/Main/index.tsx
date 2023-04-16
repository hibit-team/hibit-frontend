import React from 'react';
import * as s from "./styles";
import LayoutTemplate from '../../components/LayoutTemplate';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import KaKaoLogin from '../../components/KaKaoLogin';

const MainPage = () => {
  return (
    <LayoutTemplate>
      <s.Wrapper>
        {/* <GoogleLoginButton /> */}
        <KaKaoLogin />
      </s.Wrapper>
    </LayoutTemplate>
  )
}

export default MainPage;