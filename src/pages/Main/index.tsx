import React from 'react';
import * as s from "./styles";
import LayoutTemplate from '../../components/Common/LayoutTemplate';
import GoogleLoginButton from '../../components/Login/GoogleLoginButton';
import KaKaoLogin from '../../components/Login/KaKaoLogin';
import MainTab from '../../components/Main/MainTab';
import TabImgs from '../../components/Main/TabImgs';
const MainPage = () => {
  return (
    <LayoutTemplate>
      <MainTab></MainTab>
      <TabImgs></TabImgs>
      <s.Wrapper>
        {/* <GoogleLoginButton /> */}
        {/* <KaKaoLogin /> */}
      </s.Wrapper>
    </LayoutTemplate>
  )
}

export default MainPage;