import * as s from "./styles";
import { useState,lazy } from "react";
import LayoutTemplate from '../../components/Common/LayoutTemplate';
import MainTab from '../../components/Main/MainTab';
import useIsMobile from "../../hooks/useIsMobile";
import { useRecoilState } from "recoil";
import { toggleNavState } from "../../recoil/atom/ToggleNavState";
import MoHeaderComponent from "../../components/Main/Mobile/MobileHeader";
import MobileNavbar from "../../components/Main/Mobile/MobileNavbar";
import MobileTab from "../../components/Main/Mobile/MobileTab";
import MobileSlider from "../../components/Main/Mobile/MobileSlider";
import GlobalModal  from "../../components/GlobalModal";
import useLoginInfo from "../../hooks/useLoginInfo";
import { isExpired } from "../../components/GlobalModal/expireTest";
import { useRecoilValue } from "recoil";
import { userIdxState } from "../../recoil/atom/LoginInfoState";
import GoogleTagManager from "../../components/TagManager";
const MainPage = () => {
  const [isExpire] = useState(()=>isExpired())
  const userIdx = useRecoilValue(userIdxState)
  const [toggleState, setToggleState] = useRecoilState<boolean>(toggleNavState);
  const onToggle: Function = () => {
    setToggleState(!toggleState);
  }
  const isLoggedIn = useLoginInfo();

  if (useIsMobile()) {
    if (toggleState) {
      //on-off구현
      return (
        <>
          <MoHeaderComponent onToggle={onToggle} ></MoHeaderComponent>
          <MobileNavbar></MobileNavbar>
        </>
      )
    }
    return (
      <>    
        <MoHeaderComponent onToggle={onToggle}></MoHeaderComponent>
        <MobileTab></MobileTab>
        <MobileSlider></MobileSlider>
      </>
    )
  }
  
  return (
    <LayoutTemplate>
      <GoogleTagManager gtmId="GTM-5LL38ZTW" />
      {isExpire ?
      (userIdx ? null : <GlobalModal/>)
      : null
      }
      <MainTab></MainTab>
      <s.Wrapper />
    </LayoutTemplate>
  )
}

export default MainPage;