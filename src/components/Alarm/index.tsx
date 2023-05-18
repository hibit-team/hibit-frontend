/** @jsxImportSource @emotion/react */
import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import * as s from './styles';
// Modal 컴포넌트의 스타일
// const modalStyles = css`
//   /* 스타일 정의 */
// `;

// Modal 컴포넌트의 Props 타입
interface ModalProps extends ReactModal.Props {
  // 추가적인 prop들
}

// Modal 컴포넌트
const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  return (<div css={css`display:flex; justify-content: center;`}>
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
          width:'329px',
          height:'460px',
          justifyContent:'center',
          top: '94px',
          zIndex: 10,
          margin: '23px auto',
          borderRadius:'1rem',
        },
      }}
    >
      <s.AlarmModalWrapper>
        <div>알림</div>
        <div>매칭</div>
        <div>공지사항</div>

      </s.AlarmModalWrapper>
    </Modal>
  </div>
    
  );
};

export default CustomModal;
