import * as s from "./styles";
import {useState} from 'react'
import LayoutTemplate from '../../components/Common/LayoutTemplate';
import MainTab from '../../components/Main/MainTab';
import useIsMobile from "../../hooks/useIsMobile";
import { useRecoilState } from "recoil";
import { toggleNavState } from "../../recoil/atom/ToggleNavState";
import MoHeaderComponent from "../../components/Main/Mobile/MobileHeader";
import MobileNavbar from "../../components/Main/Mobile/MobileNavbar";
import MobileTab from "../../components/Main/Mobile/MobileTab";
import MobileSlider from "../../components/Main/Mobile/MobileSlider";
import CustomModalAlarm from "../../components/Alarm";

const MainPage = () => {
  const [toggleState,setToggleState] = useRecoilState<boolean>(toggleNavState);
  const onToggle: Function = ()=>{
    setToggleState(!toggleState);
  }
  const [AlarmSwitch,setAlarmSwitch]=useState(true);
  // const onSwitchAlarm = ()=>{setAlarmSwitch(true)};
  const onCloseAlarm = ()=>{setAlarmSwitch(false)};

  if(useIsMobile()){
    if(toggleState){
      //on-off구현
      return (
        <> 
          <MoHeaderComponent onToggle={onToggle} ></MoHeaderComponent>
          <MobileNavbar></MobileNavbar> 
        </>
      )
    }
    return(
      <>    <CustomModalAlarm isOpen={AlarmSwitch}
      onRequestClose={onCloseAlarm} 
     ></CustomModalAlarm>
        <MoHeaderComponent onToggle={onToggle}></MoHeaderComponent>
        <MobileTab></MobileTab>
        <MobileSlider></MobileSlider>
      </>
    )
  }
  return (
    <LayoutTemplate>
    <CustomModalAlarm isOpen={AlarmSwitch}
      onRequestClose={onCloseAlarm} 
     ></CustomModalAlarm>
      <MainTab></MainTab>
      <s.Wrapper>
        {/* <GoogleLoginButton /> */}
        {/* <KaKaoLogin /> */}
      </s.Wrapper>
    </LayoutTemplate>
  )
}

export default MainPage;