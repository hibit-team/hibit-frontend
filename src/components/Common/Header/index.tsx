import * as s from "./styles";
import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import HibitLogo from "../../../images/components/HibitLogo.svg";
import HibitLogoWhite from "../../../images/components/HibitLogoWhite.svg";
import AlarmIcon from "../../../images/components/AlarmIcon.svg";
import useIsMobile from '../../../hooks/useIsMobile';
import LoginModal from '../../Login/LoginModal';
import CustomModalAlarm from '../../Alarm';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../../../recoil/atom/LoginInfoState';
import { alarmCountState } from '../../../recoil/atom/AlarmCount';
import HttpClient, { axiosInstance } from '../../../services/HttpClient';
import { LoginModalState } from '../../../recoil/atom/LoginModalState';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const navigate = useNavigate();

  const onClickIntro = () => {
    window.location.href = "https://mellow-bard-bc8.notion.site/28a5202c60344d978caa0d2745921049?pvs=4";
  };

  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetUserIdx = useResetRecoilState(userIdxState);
  const resetIsProfileRegistered = useResetRecoilState(profileRegisteredState);
  
  const [modalOpen, setModalOpen] = useRecoilState(LoginModalState);
  const closeModal = () => setModalOpen(false);
  const onClickLogin = () => setModalOpen(true);
  
  const [isLogin, setIsLogin] = useState<boolean>(false);
  let isProfileRegistered: boolean = useRecoilValue(profileRegisteredState);

  const queryClient = useQueryClient();

  const removeNicknameCache = () => {
    queryClient.removeQueries(['nickname']);
    queryClient.invalidateQueries()
  };

  useEffect(()=>{
    const accessToken: string | null = localStorage.getItem("accessToken");
    if(accessToken) setIsLogin(true)
  },[])

  const onClickLogout = async () => {
    await HttpClient.get(`/api/auth/logout`)
      .then((res) => {
        resetAccessToken();
        resetUserIdx();
        resetIsProfileRegistered();

        clearTokenAndHeader();

        localStorage.removeItem('accessToken');
        setIsLogin(false);

        alert("로그아웃 했어요!");
        removeNicknameCache()
        return null;
      })
      .catch((e) => {
        console.error({e});
        resetAccessToken(); 
        resetUserIdx(); 
        resetIsProfileRegistered();
        
        alert("로그인에 문제가 생겼어요. 같은 상황이 반복된다면 문의 주세요 :)");
        clearTokenAndHeader();

        localStorage.removeItem('accessToken');
        setIsLogin(false);

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
  };

  /* Mobile View */
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleSide = () => {
    setIsMenuOpen(true);
  };

  const { pathname: path } = useLocation();

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
        <s.LogoContainer onClick={() => navigate("/")}>
          {path === '/matching' ? <img src={HibitLogoWhite} alt='logo-white'/> : <img src={HibitLogo} alt='hibit-logo'/> }
        </s.LogoContainer>
        <s.Category onClick={() => onClickIntro()}>서비스 소개</s.Category>
        <s.Category onClick={() => navigate("/matching")}>매칭</s.Category>
        <s.Category
        onClick={() => {
          if (isLogin) {
            if (isProfileRegistered) {
              navigate("/put-profile");
            } else {
              navigate("/post-profile");
            }
          } else {
            alert("로그인 후에 진행 해 주세요.");
          }
        }}>프로필</s.Category>
        
      </s.LeftContainer>
      {isLogin ?
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
          <s.TextWrapper style={{ color: path === '/matching' ? 'white' : 'black'}} onClick={() =>{
            onClickLogout()
          }}>로그아웃</s.TextWrapper>
        </s.RightContainer> 
        :
        <s.RightContainer >
          <s.TextWrapper style={{ color: path === '/matching' ? 'white' : 'black'}} onClick={() => onClickLogin()}>회원가입</s.TextWrapper>
          <s.TextWrapper style={{ color: path === '/matching' ? 'white' : 'black'}} onClick={() => onClickLogin()}>로그인</s.TextWrapper>
          <LoginModal open={modalOpen} close={closeModal} />
        </s.RightContainer>
      }
    </s.Wrapper>
  )
}

export default Header;