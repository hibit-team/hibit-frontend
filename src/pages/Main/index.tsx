import * as s from "./styles";
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
import { GlobalModal } from "../../components/GlobalModal";
const MainPage = () => {
  const [toggleState, setToggleState] = useRecoilState<boolean>(toggleNavState);
  const onToggle: Function = () => {
    setToggleState(!toggleState);
  }

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
      <GlobalModal/>
      <MainTab></MainTab>
      <s.Wrapper>
        {/* <GoogleLoginButton /> */}
        {/* <KaKaoLogin /> */}
      </s.Wrapper>
    </LayoutTemplate>
  )
}

export default MainPage;