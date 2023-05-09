import React from 'react';
import * as s from "./styles";
import LayoutTemplate from '../../components/LayoutTemplate';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import KaKaoLogin from '../../components/KaKaoLogin';
import MainTab from '../../components/Main/MainTab';
import TabImgs from '../../components/Main/TabImgs';
import useIsMobile from '../../hooks/useIsMobile';
// useIsMobile훅 import - Mo(MainTab+Slide)
import MoHeaderComponent from '../../components/Main/Mobile/MobileHeader';
import MobileTab from '../../components/Main/Mobile/MobileTab';
import MobileSlider from '../../components/Main/Mobile/MobileSlider';
import MobileNavbar from '../../components/Main/Mobile/MobileNavbar';

const MainPage = () => {

  if(useIsMobile()){
    return(<>
    <MoHeaderComponent></MoHeaderComponent>
    <MobileTab></MobileTab>
    <MobileSlider></MobileSlider>
    <MobileNavbar></MobileNavbar>
    </>)
  }
  return (<LayoutTemplate>
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