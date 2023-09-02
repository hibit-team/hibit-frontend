import { Suspense, useEffect, useState } from 'react';
import { IHeaderCategory } from '../../../interfaces/IHeaderCategories';
import { useNavigate, useLocation } from "react-router-dom";
import HibitLogo from "../../../images/components/HibitLogo.svg";
import AlarmIcon from "../../../images/components/AlarmIcon.svg";
import useIsMobile from '../../../hooks/useIsMobile';
import LoginModal from '../../Login/LoginModal';
import CustomModalAlarm from '../../Alarm';
import * as s from "./styles";
import { useRecoilValue, useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../../../recoil/atom/LoginInfoState';
import useLoginInfo from '../../../hooks/useLoginInfo';
import { alarmCountState } from '../../../recoil/atom/AlarmCount';
import { axiosInstance } from '../../../services/HttpClient';


const Header = () => {
  const navigate = useNavigate();

  const resetAccessToken = useResetRecoilState(accessTokenState);
  const resetUserIdx = useResetRecoilState(userIdxState);
  const resetIsProfileRegistered = useResetRecoilState(profileRegisteredState);
  
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const onClickLogin = () => setModalOpen(true);
  
  const loginInfo = useLoginInfo();
  const [isLogin, setIsLogin] = useState<boolean>(useLoginInfo().isLoggedIn);
  const isProfileRegistered: number | null = loginInfo.isProfileRegistered;

  useEffect(() => {
    setIsLogin(loginInfo.isLoggedIn);
  }, [loginInfo.isLoggedIn]);

  const onClickLogout = async () => {
    await axiosInstance.get(`/api/auth/logout`)
      .then((res) => {
        resetAccessToken();
        resetUserIdx();
        resetIsProfileRegistered();
        clearTokenAndHeader();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('userIdx');
        localStorage.removeItem('isProfileRegistered');
        setIsLogin(false);
        alert("로그아웃 했어요!");
        return null;
      })
      .catch((e) => {
        console.error({e});
        alert("로그인에 문제가 생겼어요. 같은 상황이 반복된다면 문의 주세요 :)");
        resetAccessToken(); 
        resetUserIdx(); 
        resetIsProfileRegistered();
        clearTokenAndHeader();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('userIdx');
        localStorage.removeItem('isProfileRegistered');
        setIsLogin(false);
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
  };

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
        <s.LogoContainer onClick={() => navigate("/")}>
          <img src={HibitLogo} alt='hibit-logo'/>
        </s.LogoContainer>
        <s.Category onClick={() => navigate("/intro")}>서비스 소개</s.Category>
        <s.Category onClick={() => navigate("/matching")}>매칭</s.Category>
        <s.Category
         onClick={() => {
          if (isLogin) {
            if (isProfileRegistered !== null || isProfileRegistered === 1) {
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
          <s.TextWrapper onClick={() => onClickLogout()}>로그아웃</s.TextWrapper>
        </s.RightContainer> :
        <s.RightContainer>
          <s.TextWrapper>회원가입</s.TextWrapper>
          <s.TextWrapper onClick={() => onClickLogin()}>로그인</s.TextWrapper>
          <LoginModal open={modalOpen} close={closeModal} />
        </s.RightContainer>
      }
    </s.Wrapper>
  )
}

export default Header;