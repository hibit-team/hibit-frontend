import React from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import * as s from './styles';
import COLORS from '../../assets/color';

//알람 상태관리 ( useEffect : 매칭 컴포넌트부터)
const alarmTabState = true;

const CustomModalAlarm: React.FC<ReactModal.Props> = ({ isOpen, onRequestClose }) => {
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
          height:'470px',
          justifyContent:'center',
          top: '122px',
          left:0,
          right: 6,
          bottom:0,
          zIndex: 10,
          borderRadius:'1rem',
          padding:'0',
          margin:'0 auto',
          overflow:'hidden',
        },
      }}
    >
      <s.AlarmModalWrapper>
        <s.AlarmTopBar>
        <div css={css`width:100%;
        `}>알림</div>
        <div css={css`&:after {content: "\\00d7"; font-size:23pt;
      font-weight:500;      
      }`}></div>
        </s.AlarmTopBar>
        
        <s.AlarmTabWrapper>
          <s.AlarmTab>

          <div css={css`width:50%; font-size:18px;
          font-weight: ${alarmTabState? 900 : 500};
          padding-bottom:10px;
          color: ${alarmTabState? COLORS.main100 : '#black'};
          border-bottom: ${alarmTabState? '3px' :'2px'} solid ${alarmTabState? COLORS.main79 : '#C9C9C9'};
          `}>매칭</div>

<div css={css`width:50%; font-size:18px;
          font-weight: ${!alarmTabState? 900 : 500};
          padding-bottom:10px;
          color: ${!alarmTabState? COLORS.main100 : '#black'};
          border-bottom: ${!alarmTabState? '3px' :'2.3px'} solid ${!alarmTabState? COLORS.main79 : '#C9C9C9'};
          `}>공지사항</div>
          </s.AlarmTab>
          
        {/* 알람컨텐츠 */}
          <s.AlarmContentsWrapper>
          <div css={css`
          width:100%;
          padding: 1rem 0 1rem 0;
          `}>개죽이님이 회원님의 게시글에 댓글을 남겼습니다.</div>
          <s.AlarmContent>
            <div>image..</div>
            <div>개죽이님이 회원님의 게시글에 댓글을 남겼습니다.</div>
            <div>1시간 전</div>
            <div>수락</div>
          </s.AlarmContent>
          </s.AlarmContentsWrapper>
        </s.AlarmTabWrapper>
      </s.AlarmModalWrapper>
    </Modal>
    
  );
};

export default CustomModalAlarm;
