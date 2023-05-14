import * as s from "./styles";
import LayoutTemplate from '../../components/Common/LayoutTemplate';
import MainTab from '../../components/Main/MainTab';
import TabImgs from '../../components/Main/TabImgs';
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
  return (
    <LayoutTemplate>
      <MainTab></MainTab>
      <s.Wrapper>
        {/* <GoogleLoginButton /> */}
        {/* <KaKaoLogin /> */}
      </s.Wrapper>
    </LayoutTemplate>
  )
}

export default MainPage;