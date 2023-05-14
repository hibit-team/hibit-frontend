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
import { useRecoilState } from 'recoil';
import { toggleNavState } from '../../recoil/atom/ToggleNavState';
const MainPage = () => {
  const [toggleState,setToggleState] = useRecoilState<boolean>(toggleNavState);
  const onToggle: Function = ()=>{
    setToggleState(!toggleState);
  }

  if(useIsMobile()){
    if(toggleState){
      //on-off구현
      return <>
      <MoHeaderComponent onToggle={onToggle} ></MoHeaderComponent>
      <MobileNavbar></MobileNavbar> 
      </>
    }
    return(<>
    <MoHeaderComponent onToggle={onToggle}></MoHeaderComponent>
    <MobileTab></MobileTab>
    <MobileSlider></MobileSlider>
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