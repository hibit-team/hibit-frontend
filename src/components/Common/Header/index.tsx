import { useEffect, useState } from 'react';
import { IHeaderCategory } from '../../../interfaces/IHeaderCategories';
import { useNavigate, useLocation } from "react-router-dom";
import HibitLogo from "../../../images/components/HibitLogo.svg";
import AlarmIcon from "../../../images/components/AlarmIcon.svg";
import useIsMobile from '../../../hooks/useIsMobile';
import LoginModal from '../../Login/LoginModal';
import CustomModalAlarm from '../../Alarm';
import * as s from "./styles";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { accessTokenState, isLoggedInState } from '../../../recoil/atom/AccessToken';
import useIsLogin from '../../../hooks/useIsLogin';

const CATEGORIES: IHeaderCategory[] = [
  { title: "서비스 소개", link: "/intro" },
  { title: "매칭", link: "/matching" },
  { title: "프로필", link: "/profile"},
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("메인");

  // Log in
  const accessTokenAtom = useRecoilValue(accessTokenState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const resetAccessToken = useResetRecoilState(accessTokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  useEffect(() => {
    const isloggedin = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isloggedin === 'true');
  }, [setIsLoggedIn]);
  const onClickLogin = () => {
    openModal();
  };
  // const test = useIsLogin();
  // console.log(test);

  // Log out
  const onClickLogout = () => {
    alert("로그아웃 되었습니다.");
    resetAccessToken();
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const [hasAlarm, setHasAlarm] = useState<boolean>(true);
  const [alarmCount, setAlarmCount] = useState<number>(14);

  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const onClickAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
    console.log({isAlarmOpen});
  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    console.log({modalOpen});
  };

  useEffect(() => {
    if (alarmCount === 0) setHasAlarm(false);
    else setHasAlarm(true);
  }, [alarmCount]);

  const onClickSignup = () => {
    navigate("/signup");
  };
  
  /* Web View */
  const onClickCategory = (title: string, link: string) => {
    setSelectedCategory(title);
    navigate(link);
  };
  
  useEffect(() => {
    CATEGORIES.map((selected: IHeaderCategory) => {
      if (pathname.includes(selected.link)) setSelectedCategory(selected.title);
    });
  }, [pathname]);
  
  /* Mobile View */
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleSide = () => {
    setIsMenuOpen(true);
  };

  if (isMobile) {
    return (
      <s.MobileWrapper>
        MobileHeader
      </s.MobileWrapper>
    );
  }

  return (
    <s.Wrapper>
      <s.LeftContainer>
        <s.LogoContainer onClick={() => onClickCategory("메인", "/")}>
          <img src={HibitLogo} alt='hibit-logo'/>
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
      {isLoggedIn ?
        <s.RightContainer>
          <s.AlarmLogoContainer>
            <img onClick={onClickAlarm} src={AlarmIcon} alt='alarm-icon' />
            {
              hasAlarm ?
              <s.AlarmCountWrapper>{alarmCount}</s.AlarmCountWrapper>
              : <></>
            }
            
          </s.AlarmLogoContainer>
          <CustomModalAlarm 
            isOpen={isAlarmOpen}
            onRequestClose={onClickAlarm}
          />
          <s.TextWrapper onClick={() => onClickLogout()}>로그아웃</s.TextWrapper>
        </s.RightContainer> :
        <s.RightContainer>
          <s.TextWrapper onClick={() => onClickSignup()}>회원가입</s.TextWrapper>
          <s.TextWrapper onClick={() => onClickLogin()}>로그인</s.TextWrapper>
          <LoginModal open={modalOpen} close={closeModal} />
        </s.RightContainer>
      }
    </s.Wrapper>
  )
}

export default Header;