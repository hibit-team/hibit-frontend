import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as s from './styles';
import useIsMobile from '../../hooks/useIsMobile';
import AlarmCloseIcon from "../../images/components/Alarm/AlarmCloseIcon.svg";
import { useNavigate } from 'react-router';
import Comment from './Comment';
import Recomment from './Recomment';
import CommentHeart from './CommentHeart';
import Invitation from './Invitation';
import Openchat from './Openchat';
import Accept from './Accept';
import Refuse from './Refuse';
import Report from './Report';
import Event from './Event';
import Status from './Status';
import tmpAlarmData from '../../assets/data/alarm/tmpAlarmData';

const CustomModalAlarm: React.FC<ReactModal.Props> = ({ isOpen, onRequestClose }) => {

  const navigate = useNavigate();

  const isMobile = useIsMobile();
  const AlarmStyles = isMobile ? s.MobileModalStyle : s.WebModalStyle;

  const onClickProfileBtn = () => {
    navigate("/profile");
  };

  const [isTabLeft, setIsTabLeft] = useState(true);
  const onClickLeftTab = () => {
    setIsTabLeft(true);
  };
  const onClickRightTab = () => {
    setIsTabLeft(false);
  };

  if(isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={AlarmStyles}
      >

      </Modal>
    )
  }


  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={AlarmStyles}
      >
        <s.AlarmModalWrapper>
          <s.AlarmTopBar>
            <s.AlarmTopBarText>알림</s.AlarmTopBarText>
            <s.AlarmCloseIconWrapper>
              <s.AlarmCloseBtn 
                src={AlarmCloseIcon}
                alt='close'
                onClick={onRequestClose}
              />
            </s.AlarmCloseIconWrapper>
          </s.AlarmTopBar>

          <s.AlarmBottom>
            {
              isTabLeft ?
              <s.TabContainerLeft>
                <s.Tabs>
                  <s.Left1>매칭</s.Left1>
                  <s.Right1 onClick={onClickRightTab}>공지사항</s.Right1>
                </s.Tabs>
                <s.AlarmList>
                  {
                    tmpAlarmData.map((data) => {
                      if(data.type === "COMMENT"){
                        return <Comment nickname={data.nickname} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "RECOMMENT"){
                        return <Recomment nickname={data.nickname} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "COMMENTHEART"){
                        return <CommentHeart nickname={data.nickname} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "INVITATION"){
                        return <Invitation nickname={data.nickname} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "OPENCHAT"){
                        return <Openchat nickname={data.nickname} imglink={data.imglink} time={data.time} link={data.link}/>
                      }
                      if(data.type === "ACCEPT"){
                        return <Accept nickname={data.nickname} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "REFUSE"){
                        return <Refuse nickname={data.nickname} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "STATUS"){
                        return <Status content={data.content} time={data.time}/>
                      }
                      return null;
                    })
                  }
                </s.AlarmList>
              </s.TabContainerLeft> :
              <s.TabContainerRight>
                <s.Tabs>
                  <s.Left2 onClick={onClickLeftTab}>매칭</s.Left2>
                  <s.Right2>공지사항</s.Right2>
                </s.Tabs>
                <s.AlarmList>
                  {
                    tmpAlarmData.map((data) => {
                      if(data.type === "REPORT"){
                        return <Report content={data.content} imglink={data.imglink} time={data.time}/>
                      }
                      if(data.type === "EVENT"){
                        return <Event content={data.content} imglink={data.imglink} time={data.time}/>
                      }
                      return null;
                    })
                  }
                </s.AlarmList>
              </s.TabContainerRight>
            }
          </s.AlarmBottom>
        </s.AlarmModalWrapper>
      </Modal>
  );
};

export default CustomModalAlarm;
