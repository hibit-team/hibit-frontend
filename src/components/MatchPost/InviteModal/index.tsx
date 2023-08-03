/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { InviteModalSwitchState } from '../../../recoil/atom/InviteModalSwitchState';
import COLORS from '../../../assets/color';
import * as s from './style';
import NoCheck from '../../../images/components/MatchPost/InviteModal/NoCheck.svg';
import OnCheck from '../../../images/components/MatchPost/InviteModal/OnCheck.svg';
import ProfileImg from '../../../images/components/MatchPost/profileDefault.svg';
import { hoverAnimation } from '../PostArticle/styles';

const InviteModal = ({ postIDX }: { postIDX: string | undefined }) => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(InviteModalSwitchState);
  const [Fold, setFold] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const modalCss: ReactModal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      zIndex: 10,
      overflowX: 'hidden',
      borderRadius: '1rem',
    },
    content: {
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      width: '329px',
      height: Fold ? '54px' : '406px',
      top: '150px',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      borderRadius: '1rem',
      padding: '0',
      margin: '0 auto',
      maxWidth: '100vw',
      overflowX: 'hidden',
      overflowY: 'hidden',
      transition: `height 0.2s linear`,
    },
  };

  return (
    <div>
      <Modal style={modalCss} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Invite-Modal">
        <s.InviteModalHeader>
          <p css={{ fontSize: 18, fontWeight: 900 }}>참여자 리스트</p>
          {Fold ? (
            <svg
              css={{ cursor: 'pointer' }}
              onClick={() => {
                setFold(!Fold);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
            >
              <path d="M15 1L8 8" stroke="white" />
              <path d="M8 8L1 1" stroke="white" />
            </svg>
          ) : (
            <svg
              css={{ cursor: 'pointer' }}
              onClick={() => {
                setFold(!Fold);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
            >
              <path d="M1 8L8 1" stroke="white" />
              <path d="M8 1L15 8" stroke="white" />
            </svg>
          )}
        </s.InviteModalHeader>
        {/* 컨텐츠영역 */}
        <s.InviteModalContentsWrapper css={{ display: Fold ? 'none' : 'flex' }}>
          <InviteModalContent></InviteModalContent>
          <InviteModalContent></InviteModalContent>
          <InviteModalContent></InviteModalContent>
          <InviteModalContent></InviteModalContent>
          <InviteModalContent></InviteModalContent>
          <InviteModalContent></InviteModalContent>
        </s.InviteModalContentsWrapper>
        {/* 초대하기버튼  */}
        <div
          css={{
            display: Fold ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 75,
            boxShadow: `0px 0px 15px 0px rgba(36, 36, 36, 0.25)`,
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '6px 16px 6px 16px',
              width: 94,
              maxHeight: 34,
              flexShrink: 0,
              border: `1px solid ${COLORS.main79}`,
              background: COLORS.main42,
              borderRadius: 60,
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 'normal',
              letterSpacing: '-0.36px',
              color: COLORS.main100,
              fontWeight: 600,
              boxShadow:'none',
              '&:hover': {
                fontWeight: 700,
                animation: `${hoverAnimation} 0.3s ease-out`,
                border: `1px solid ${COLORS.Gray3}`,
                background: COLORS.main100,
                color: COLORS.white,
                fontSize: '18px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                letterSpacing: '-0.36px',
              },
            }}
          >
            초대하기
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InviteModal;

//queryData.map =>
const InviteModalContent = () => {
  return (
    <div
      css={{
        minWidth: 259,
        minHeight: 56,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
        border: `1px solid ${COLORS.Gray2}`,
        margin: '6px 0px',
        color: COLORS.main100,
        fontSize: 14,
        fontWeight: 800,
        padding: '0px 16px 0px 12px',
        cursor: 'pointer',
        '&:hover': { border: `2px solid ${COLORS.main79}`, transition: 'border-color 0.3s ease' },
      }}
    >
      <img src={ProfileImg} alt="default-profile"></img>
      <div css={{ marginLeft: 10, display: 'flex', flex: '1 1 auto' }}>유저닉네임8자리12</div>
      <img src={NoCheck} alt="no-check"></img>
    </div>
  );
};
