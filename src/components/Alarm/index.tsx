/** @jsxImportSource @emotion/react */
import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import * as s from './styles';

// Modal 컴포넌트의 Props 타입
interface ModalProps extends ReactModal.Props {
  // 추가적인 prop들
}

// Modal 컴포넌트
const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  return (
  <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: 10,

        },
        content: {
          display:'flex',
          width:'333px',
          height:'460px',
          justifyContent:'center',
          top: '117px',
          left:0,
          right: 8,
          bottom:0,
          zIndex: 10,
          borderRadius:'1rem',
          padding:'0',
          margin:'0 auto'
        },
      }}
    >
      <s.AlarmModalWrapper>
        <s.AlarmTopBar>
        <div css={css`width:100%;`}>알림</div>
        <div css={css`width:1rem;height:15px;
        &:after {content: "\\00d7"; font-size:15pt;}`}></div>
        </s.AlarmTopBar>
        <div>매칭</div>
        <div>공지사항</div>
        <div>매칭</div>
        <div>공지사항</div>

      </s.AlarmModalWrapper>
    </Modal>
    
  );
};

export default CustomModal;
