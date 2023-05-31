import { useEffect, useState } from 'react';
import { IHeaderCategory } from '../../../interfaces/IHeaderCategories';
import { useNavigate, useLocation } from "react-router-dom";
import * as s from "./styles";
import HibitLogo from "../../../images/components/HibitLogo.svg";
import AlarmIcon from "../../../images/components/AlarmIcon.svg";
import useIsMobile from '../../../hooks/useIsMobile';
import LoginModal from '../../Login/LoginModal';
import { useRecoilState } from 'recoil';
import { AlarmSwitchState } from '../../../recoil/atom/AlarmSwitchState';

const CATEGORIES: IHeaderCategory[] = [
  { title: "서비스 소개", link: "/intro" },
  { title: "매칭", link: "/matching" },
  { title: "프로필", link: "/profile"},
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("메인");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isAlarm, setIsAlarm] = useState<boolean>(true);
  const [alarmCount, setAlarmCount] = useState<number>(3);
  const [alarmState,setAlarmState] = useRecoilState<boolean>(AlarmSwitchState);
  const onAlarmState = ()=>setAlarmState(!alarmState)

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    console.log({modalOpen});
  };

  useEffect(() => {
    if (alarmCount === 0) setIsAlarm(false);
    else setIsAlarm(true);
  }, [alarmCount]);

  const onClickLogin = () => {
    // setIsLogin(true);
    openModal();
  };

  const onClickLogout = () => {
    alert("로그아웃 되었습니다.");
    setIsLogin(false);
  };

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
      {isLogin ?
        <s.RightContainer>
          <s.AlarmLogoContainer>
            <img onClick={onAlarmState} src={AlarmIcon} alt='alarm-icon' />
            {isAlarm ? 
              <s.AlarmCountWrapper>{alarmCount}</s.AlarmCountWrapper>
              : <></>
            }
          </s.AlarmLogoContainer>
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