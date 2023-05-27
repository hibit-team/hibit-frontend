/** @jsxImportSource @emotion/react */
import React,{useState} from 'react';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import * as s from './styles';
import COLORS from '../../assets/color';
import useIsMobile from '../../hooks/useIsMobile';
//알람 상태관리필요 ( useEffect : 매칭 컴포넌트부터)
const alarmTabState = true;

//dummy데이터
const textData = [
  { id: 1, userName: "개죽이", text: "님이 회원님의 게시글에 댓글을 남겼습니다. 회원님의 게시글에 HIHI asdad", time: '2시간 전'},
  { id: 2, userName: "애옹", text: "님이 회원님께 초대장을 전송했습니다.!", time: '1시간 전',},
  { id: 3, userName: "망고", text: "님이 회원님의 대댓글을 좋아합니다.", time: '1시간 전',},
  { id: 4, userName: "고냥이", text: "님이 회원님의 게시글에 댓글을 남겼습니다. 회원님의 게시글에 SAY Hellooooo asap!", time: '1시간 전',},
];





//알람 모달컴포넌트
const CustomModalAlarm: React.FC<ReactModal.Props> = ({isOpen, onRequestClose}) => {
  const [openState,setOpenState]=useState(true);
  const closeAlarm = ()=>{
    setOpenState(!openState)
  };
  const isMobile = useIsMobile();
   const AlarmStyles1:ReactModal.Styles = 
  { 
  overlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 10,
},
content: {
  display:'flex',
  width:'333px',
  height:'470px',
  justifyContent:'center',
  top: '122px',
  left:0,
  right: 0,
  bottom:0,
  zIndex: 10,
  borderRadius:'1rem',
  padding:'0',
  margin:'0 auto',
  maxWidth: '100vw',
  overflow:'hidden',
}};

 const AlarmStyles2:ReactModal.Styles = 
  { 
  overlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: 10,
},
content: {
  display:'flex',
  width:'333px',
  height:'470px',
  justifyContent:'center',
  top: '78px',
  left: 570,
  right: 0,
  bottom:0,
  zIndex: 10,
  borderRadius:'1rem',
  padding:'0',
  margin:'0 auto',
  maxWidth: '100vw',
  overflow:'hidden',
}};
const AlarmStyles = isMobile ? AlarmStyles1 : AlarmStyles2;


  return (
  <Modal
      isOpen={openState}
      onRequestClose={onRequestClose}
      style={AlarmStyles}
    >
      <s.AlarmModalWrapper>
        <s.AlarmTopBar>
        <div css={css`width:100%;
        `}>알림</div>
        <div onClick={closeAlarm} css={css`&:after {content: "\\00d7"; font-size:25pt;
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
          {
            textData.map((item,idx)=>{
              return (
          <s.AlarmContent>        
            <div css={css`width:48px; height:48px;
            background:gray; border-radius:50%;`}>
              <div css={css`background:purple;
              z-index: 11;
              border-radius:50%;
              width:1.1rem; height:1.1rem;
              position:relative;
              top:30px;
             left:33px;`}>
             </div>
            </div>
            <div css={css`
            position:relative;
            bottom:3px;
            max-width:195px;
            grid-column: 2 / 5;
            word-wrap:word-break;
            line-height:18px;
            letter-spacing:-2%;
            font-weight:500;
            font-size:14px;
            `}><span css={css`font-weight:700;`}>{item.userName}</span>{item.text}</div>

            <div css={css`grid-column:2;
            font-size: 10px;
            font-weight:700;
            position:relative;
            top:2.5px;
            color:${COLORS.Gray3};
            `}>{item.time}</div>
            <div css={css`
            grid-column:3;
            display:flex;
            align-items:center;
            justify-content:center;
            color:white;
            font-size: 10px;
            font-weight:700;
            position:relative;
            right:1.8rem;
            width:42px;
            height:16px;
            border-radius: 12px;
            box-sizing:border-box;
            background:${COLORS.main100};
            &:hover{${s.AcceptButtonHoverCss}};
            `}>수락</div>
            <div css={css`
          grid-column:4;
          display:flex;
          align-items:center;
          justify-content:center;
          color:${COLORS.Gray3};
          border: 1px solid ${COLORS.Gray3};
          font-size: 10px;
          font-weight:700;
          position:relative;
          right:3.8rem;
          width:42px;
          height:16px;
          border-radius: 12px;
          box-sizing:border-box;
          &:hover{${s.AcceptButtonHoverCss}};
            `}>거절</div>
          </s.AlarmContent>)})}
          </s.AlarmContentsWrapper>
        </s.AlarmTabWrapper>
      </s.AlarmModalWrapper>
    </Modal>
  );
};

export default CustomModalAlarm;
