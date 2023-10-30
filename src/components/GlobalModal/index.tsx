/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import COLORS from '../../assets/color';
import useIsMobile from '../../hooks/useIsMobile';
import { GlobalModalTextState } from '../../recoil/atom/GlobalModalTextState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { LoginModalState } from '../../recoil/atom/LoginModalState';
import helloSmile from '../../images/components/Main/helloSmile.png';
import { useNavigate } from 'react-router-dom';
import { GlobalModalOpenSwitch } from '../../recoil/atom/GlobalModalOpenSwitch';
import useLoginInfo from '../../hooks/useLoginInfo';
import { profileRegisteredState } from '../../recoil/atom/LoginInfoState';
import { expireDateSet } from './expireTest';
//글로벌모달(회원가입/프로필등록유도)
export const GlobalModal = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(LoginModalState);
  const userLoginInfo = useLoginInfo();
  // 3일간 보지 않기 로직
  

  let isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);

  //회원가입유도: (Home)
  const modalText1 = useMemo(
    () => ['히빗의 매칭 서비스를 이용하려면', '회원가입이 필요해요.', '히빗의 회원이 되어 추가 서비스를 이용해보세요!', '회원가입 하러가기'],
    []
  );
  //프로필등록유도1 (게시글작성버튼 클릭)
  const modalText2 = useMemo(
    () => [
      '회원가입 완료!',
      '지금프로필을 등록하러 가볼까요?',
      '프로필을 완성하면 메이트를 모집하고 게시글을 작성 할 수 있어요!',
      '내 프로필 등록하기',
    ],
    []
  );

  //프로필등록유도2 (타인프로필)
  const modalText3 = useMemo(
    () => [
      '회원가입이 완료된 상태입니다!',
      '지금프로필을 등록하러 가볼까요?',
      '프로필을 완성하면 메이트의 추가 사진과 정보를 확인할 수 있어요!',
      '내 프로필 등록하기',
    ],
    []
  );
  const pathName = useLocation().pathname;
  //유저로그인 상태값으로부터 회원/프로필 유무 boolean값으로 받아서 setState
  const [modalText, setModalText] = useRecoilState<string[]>(GlobalModalTextState);
  // 모달텍스트 셋팅 & 언마운트시 모달클리어
  useEffect(() => {
    //홈화면
    if (pathName === '/') {
      //로그인하지않은경우(:userIdx가 받아와지지 않은 경우)
      if (!userLoginInfo){
        if(modalText[0] !== modalText1[0]) setModalText(modalText1);
        setModalIsOpen(true);
      } 
      //이미 로그인(회원가입)은O 프로필X ->프로필등록 유도
      else if (userLoginInfo && !isProfileRegistered) {
        if(modalText[0] !== modalText[2]) setModalText(modalText2);
        setModalIsOpen(true);
      } 
    } else if (pathName === '/matching') {
      if (!userLoginInfo) {
        if(modalText[0] !== modalText1[0]) setModalText(modalText1)
      }
      //로그인 한 경우 프로필등록 유도 텍스트로 변경
      else {
        if(modalText[0] !== modalText2[0]) setModalText(modalText2)
      }
      //비회원,프로필미등록 유저는 계속 modal유도 등장
      if (!userLoginInfo || !isProfileRegistered) {
        setModalIsOpen(true)
      }
    }
    // 회원가입 && 프로필 등록유저에게는 모달 항상 꺼주기
  }, [modalText,userLoginInfo, isProfileRegistered, pathName]);

  const modalCss: ReactModal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      zIndex: 10,
      border: 'none',
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      border: 'none',
      width: isMobile ? 365 : 610,
      height: isMobile ? 350 : 402,
      overflow: 'hidden',
      borderRadius: 16,
      padding: 0,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  //글로벌모달 기본상태는 OPEN
  const [modalIsOpen, setModalIsOpen] = useRecoilState(GlobalModalOpenSwitch);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // if(typeof(isExpired())==='boolean'){
  //   //만료가 아니면
  //   if(isExpired()){ return null}
  // }
  if(userLoginInfo&&isProfileRegistered) return null
  return (
    <Modal style={modalCss} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Global-Modal">
      <s.ModalContentsWrapper>
        <s.ModalHeader>
          <div css={{ userSelect: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Say "Hi", a 'bit' slowly.
            <img src={helloSmile} css={{ position: 'relative', left: 10, top: 2 }} alt="helloSmile" />
          </div>
          <p
            onClick={e => {
              e.stopPropagation();
              closeModal();
            }}
            css={{ userSelect: 'none', cursor: 'pointer' }}
          >
            X
          </p>
        </s.ModalHeader>
        <s.ModalTextWrapper>
          <div
            css={{
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1.375em',
              fontWeight: 500,
            }}
          >
            {modalText[0]}
            <div css={{ margin: 14 }}>{modalText[1]}</div>
          </div>
          <div
            css={{
              userSelect: 'none',
              margin: '20px 0 36px 0',
              color: COLORS.Gray3,
              fontSize: '1.25em',
              '@media (max-width: 768px)': {
                fontSize: '1em',
              },
              fontWeight: 500,
            }}
          >
            {modalText[2]}
          </div>
          <div
            onClick={e => {
              e.stopPropagation();
              //홈화면에서 초기 비회원 유저의 초기 회원 유도모달이면
              if (modalText[3] === '회원가입 하러가기') {
                setModalIsOpen(false);
                setLoginModalOpen(true);
              }
              if (modalText[3] === '내 프로필 등록하기') {
                setModalIsOpen(false);
                if (userLoginInfo) {
                  navigate('/post-profile');
                }
                else {
                  alert('로그인이 필요합니다.');
                  navigate('/');
                  setLoginModalOpen(true);
                }
              }
            }}
            css={{
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: '1.125em',
              color: COLORS.main79,
              width: isMobile ? 200 : 260,
              height: isMobile ? 40 : 52,
              fontWeight: 600,
              borderRadius: 10,
              border: `2px solid ${COLORS.main79}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {modalText[3]}
          </div>
          
          <div css={{
          userSelect:'none',
          fontSize:'16px',fontWeight:800, color:COLORS.Gray3,
          position:'absolute',bottom:'5%',left:'5%'}}>
          <label css={{cursor:'pointer',}} htmlFor='nextTime'>3일간 열지 않기</label>
          <input onClick={expireDateSet}
          id="nextTime" css={{cursor:'pointer',position:'relative',top:1,left:3}} 
          type='checkbox'></input>
          </div>
        </s.ModalTextWrapper>
      </s.ModalContentsWrapper>
    </Modal>
  )
};
