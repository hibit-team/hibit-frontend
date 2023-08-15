/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import COLORS from '../../assets/color';
import useIsMobile from '../../hooks/useIsMobile';
//글로벌모달(회원가입/프로필등록유도)
export const GlobalModal = () => {
  const isMobile = useIsMobile();
  // modalText 초기화 & 언마운트시 모달 클리어
  //회원가입유도1
  const modalText1 = [
    '메이트의 추가 사진과 정보를 보려면',
    '회원가입이 필요해요.',
    '히빗의 회원이 되어 매칭 서비스를 이용해보세요!',
    '회원가입 하러가기',
  ];
  //회원가입유도2
  const modalText2 = [
    '매칭 게시글을 작성하고 메이트를 모집하려면',
    '회원가입이 필요해요.',
    '히빗의 회원이 되어 매칭 서비스를 이용해보세요!',
    '회원가입 하러가기',
  ];
  //프로필등록유도
  const modalText3 = [
    '회원가입이 완료되었어요!',
    '지금프로필을 등록하러 가볼까요?',
    '프로필을 완성하면 게시글과 댓글을 작성 할 수 있어요!',
    '내 프로필 등록하기',
  ];
  //유저로그인 상태값으로부터 회원/프로필 유무 boolean값으로 받아서 setState
  const [modalText, setModalText] = useState<string[]>(modalText1);

  // 모달텍스트 셋팅 & 언마운트시 모달클리어
  useEffect(() => {
    //여기서 회원상태값에 따라 의존성주입
    setModalText(modalText1);
    return () => {
      // if(modalIsOpen) closeModal();
    };
  }, []);

  const svgSmile = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 22.965C18.0558 22.965 22.965 18.0558 22.965 12C22.965 5.94418 18.0558 1.03497 12 1.03497C5.94418 1.03497 1.03497 5.94418 1.03497 12C1.03497 18.0558 5.94418 22.965 12 22.965ZM23.6364 12C23.6364 18.4266 18.4266 23.6364 12 23.6364C5.57341 23.6364 0.363636 18.4266 0.363636 12C0.363636 5.57341 5.57341 0.363636 12 0.363636C18.4266 0.363636 23.6364 5.57341 23.6364 12Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM12 1.3986C6.14501 1.3986 1.3986 6.14501 1.3986 12C1.3986 17.855 6.14501 22.6014 12 22.6014C17.855 22.6014 22.6014 17.855 22.6014 12C22.6014 6.14501 17.855 1.3986 12 1.3986Z"
        fill="white"
      />
      <path
        d="M11.9574 16.4732C11.9331 16.4732 11.9087 16.4732 11.8825 16.4732C10.1359 16.4428 8.64794 15.2991 8.00142 13.4889C7.92458 13.2761 8.00142 13.0282 8.17195 12.9323C8.34248 12.8364 8.54113 12.9323 8.61796 13.1451C9.15767 14.6513 10.4132 15.6055 11.8937 15.6312C13.4416 15.6523 14.7815 14.7028 15.3868 13.1358C15.4674 12.9253 15.6679 12.8364 15.8366 12.9393C16.0052 13.0399 16.0746 13.2925 15.994 13.5006C15.2856 15.3412 13.7433 16.4755 11.9574 16.4755V16.4732Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.73375 14.2007C9.4404 15.2958 10.5793 15.9721 11.8874 15.9948C13.2782 16.0137 14.5082 15.3221 15.272 14.1556C14.5487 15.3549 13.3895 16.064 12.091 16.1095H11.8869C10.5917 16.0859 9.43731 15.3859 8.73375 14.2007ZM11.5938 16.8229C9.8022 16.6772 8.31554 15.4496 7.65897 13.6113C7.53468 13.267 7.63744 12.8157 7.99372 12.6154C8.18518 12.5077 8.40273 12.5067 8.58715 12.595C8.76593 12.6806 8.894 12.8389 8.95999 13.0217C9.45414 14.4007 10.5861 15.2445 11.8993 15.2676C13.2804 15.2861 14.4918 14.4436 15.0476 13.0048C15.1174 12.8231 15.2498 12.6673 15.4326 12.5871C15.621 12.5044 15.838 12.5149 16.0244 12.628C16.3755 12.8385 16.4632 13.2955 16.3332 13.6316C15.5779 15.5938 13.9127 16.8392 11.9574 16.8392H11.5938V16.8229Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.41311 10.2096C9.1523 10.2096 9.75577 9.60614 9.75577 8.86695C9.75577 8.12776 9.1523 7.52429 8.41311 7.52429C7.67392 7.52429 7.07046 8.12776 7.07046 8.86695C7.07046 9.60614 7.67392 10.2096 8.41311 10.2096Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.70682 8.86695C6.70682 7.92692 7.47309 7.16065 8.41311 7.16065C9.35314 7.16065 10.1194 7.92692 10.1194 8.86695C10.1194 9.80697 9.35314 10.5732 8.41311 10.5732C7.47309 10.5732 6.70682 9.80697 6.70682 8.86695ZM8.41311 7.88793C7.87475 7.88793 7.43409 8.32859 7.43409 8.86695C7.43409 9.40531 7.87475 9.84597 8.41311 9.84597C8.95147 9.84597 9.39213 9.40531 9.39213 8.86695C9.39213 8.32859 8.95147 7.88793 8.41311 7.88793Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5767 10.2096C16.3159 10.2096 16.9194 9.60614 16.9194 8.86695C16.9194 8.12776 16.3159 7.52429 15.5767 7.52429C14.8376 7.52429 14.2341 8.12776 14.2341 8.86695C14.2341 9.60614 14.8376 10.2096 15.5767 10.2096Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.8705 8.86695C13.8705 7.92692 14.6367 7.16065 15.5767 7.16065C16.5168 7.16065 17.283 7.92692 17.283 8.86695C17.283 9.80697 16.5168 10.5732 15.5767 10.5732C14.6367 10.5732 13.8705 9.80697 13.8705 8.86695ZM15.5767 7.88793C15.0384 7.88793 14.5977 8.32859 14.5977 8.86695C14.5977 9.40531 15.0384 9.84597 15.5767 9.84597C16.1151 9.84597 16.5558 9.40531 16.5558 8.86695C16.5558 8.32859 16.1151 7.88793 15.5767 7.88793Z"
        fill="white"
      />
    </svg>
  );

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
  //modal switch : 전역추가예정
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <Modal style={modalCss} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Global-Modal">
      <s.ModalContentsWrapper>
        <s.ModalHeader>
          <div css={{ userSelect: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Say "Hi", a 'bit' slowly.
            <p css={{ position: 'relative', left: 10, top: 2 }}>{svgSmile}</p>
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
              fontWeight: 500,
            }}
          >
            {modalText[2]}
          </div>
          <div
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
        </s.ModalTextWrapper>
      </s.ModalContentsWrapper>
    </Modal>
  );
};
