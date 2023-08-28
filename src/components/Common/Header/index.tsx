import { Suspense, useEffect, useState } from 'react';
import { IHeaderCategory } from '../../../interfaces/IHeaderCategories';
import { useNavigate, useLocation } from "react-router-dom";
import HibitLogo from "../../../images/components/HibitLogo.svg";
import HibitLogoWhite from "../../../images/components/HibitLogoWhite.svg";
import AlarmIcon from "../../../images/components/AlarmIcon.svg";
import useIsMobile from '../../../hooks/useIsMobile';
import LoginModal from '../../Login/LoginModal';
import CustomModalAlarm from '../../Alarm';
import * as s from "./styles";
import { useRecoilValue, useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../../../recoil/atom/LoginInfoState';
import useLoginInfo from '../../../hooks/useLoginInfo';
import { alarmCountState } from '../../../recoil/atom/AlarmCount';
import { axiosInstance } from '../../../services/HttpClient';

const CATEGORIES: IHeaderCategory[] = [
  { title: "서비스 소개", link: "/intro" },
  { title: "매칭", link: "/matching" },
  { title: "프로필", link: "/profile"},
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("메인");

  // Login + Modal
  const loginInfo = useLoginInfo();
  
  const accessTokenAtom = useRecoilValue(accessTokenState);
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetUserIdx = useResetRecoilState(userIdxState);
  const resetIsProfileRegistered = useResetRecoilState(profileRegisteredState);

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const onClickLogin = () => setModalOpen(true);
  console.log(axiosInstance.defaults.headers.common)

  // Logout
  const onClickLogout = async () => {
    await axiosInstance.post(`/api/auth/token/access?logout=true`, {})
      .then((res) => {
        // console.log({res}) // ex)성공적으로 로그아웃되었습니다.
        resetAccessToken(); // atom으로 관리되는 token값 null로 초기화
        resetUserIdx();
        resetIsProfileRegistered();
        clearTokenAndHeader(); // axiosInstance의 default header accessToken값 null로 초기화
        alert("로그아웃 되었습니다.");
        return null;
      })
      .catch((e) => {
        console.error({e});
        alert("로그아웃 실패. 재로그인 하세요.");
        resetAccessToken(); // atom으로 관리되는 token값 null로 초기화
        resetUserIdx(); // atom으로 관리되는 userIdx값 null로 초기화
        resetIsProfileRegistered(); // atom으로 관리되는 isProfileRegistered값 null로 초기화
        clearTokenAndHeader(); // axiosInstance의 default header accessToken값 null로 초기화
        navigate("/");
        return null;
      }) 
  };
  const clearTokenAndHeader = () => {
    axiosInstance.defaults.headers.common['Authorization'] = null;
  }

  const [hasAlarm, setHasAlarm] = useState<boolean>(true);
  const alarmCount = useRecoilValue(alarmCountState);
  useEffect(() => {
    if (alarmCount > 0) {
      setHasAlarm(true);
      return;
    }
    else {
      setHasAlarm(false);
    }
  }, [alarmCount]);
  
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const onClickAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
    console.log({isAlarmOpen});
  };



  
  /* Web View */
  const onClickCategory = (title: string, link: string) => {
    setSelectedCategory(title);
    navigate(link);
  };
  
  useEffect(() => {
    CATEGORIES.map((selected: IHeaderCategory) => {
      if (pathname.includes(selected.link)) setSelectedCategory(selected.title);
      return null;
    });
  }, [pathname]);
  
  /* Mobile View */
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleSide = () => {
    setIsMenuOpen(true);
  };

  const { pathname: path } = useLocation();
  console.log(path)

  if (isMobile) {
    return (
      <s.MobileWrapper>
        MobileHeader
      </s.MobileWrapper>
    );
  }
  return (
    <s.Wrapper>
      <s.LeftContainer style={{ color: path === '/matching' ? 'white' : 'black'}} >
        <s.LogoContainer onClick={() => onClickCategory("메인", "/")}>
          {path === '/matching' ? <img src={HibitLogoWhite} alt='logo-white'/> : <img src={HibitLogo} alt='hibit-logo'/> }
        </s.LogoContainer>
        {CATEGORIES.map((selected: IHeaderCategory, index: number) => {
            return (
              <s.Category 
                key={index}
                onClick={() => onClickCategory(selected.title, selected.link)}
              >
                {selected.title}
              </s.Category> 
            )
          })}
      </s.LeftContainer>
      {loginInfo?.isLoggedIn ?
        <s.RightContainer>
          <s.AlarmLogoContainer>
            <img onClick={onClickAlarm} src={AlarmIcon} alt='alarm-icon' />
            {
              hasAlarm ?
              <Suspense fallback={<div>0</div>}>
                <s.AlarmCountWrapper>{alarmCount!}</s.AlarmCountWrapper>
              </Suspense>
              : <></>
            }
            
          </s.AlarmLogoContainer>
          <CustomModalAlarm 
            isOpen={isAlarmOpen}
            onRequestClose={onClickAlarm}
          />
          <s.TextWrapper onClick={() => onClickLogout()}>로그아웃</s.TextWrapper>
        </s.RightContainer> :
        <s.RightContainer style={{ color: path === '/matching' ? 'white' : 'black'}}>
          <s.TextWrapper>회원가입</s.TextWrapper>
          <s.TextWrapper onClick={() => onClickLogin()}>로그인</s.TextWrapper>
          <LoginModal open={modalOpen} close={closeModal} />
        </s.RightContainer>
      }
    </s.Wrapper>
  )
}

export default Header;