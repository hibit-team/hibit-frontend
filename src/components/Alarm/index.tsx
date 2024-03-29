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
import Remind from './Remind';
import AlarmAPI from '../../api/AlarmAPI';
import { IAlarm } from '../../interfaces/Alarm/IAlarm';
import useLoginInfo from '../../hooks/useLoginInfo';

const CustomModalAlarm: React.FC<ReactModal.Props> = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const isMobile = useIsMobile();
  const AlarmStyles = isMobile ? s.MobileModalStyle : s.WebModalStyle;
  const loginInfo = useLoginInfo();

  const [alarmState, setAlarmState] = useState<IAlarm[]>([]);
  useEffect(() => {
    if(!loginInfo) return;
    const fetchAlarmList = async () => {
      try {
        const alarmList = await AlarmAPI.getAlarmList();
        if(alarmList) setAlarmState(alarmList);
      } catch (error) {
        console.error({error});
      }
    }
    fetchAlarmList();
  }, [loginInfo]);

  const [isTabLeft, setIsTabLeft] = useState(true);
  const onClickLeftTab = () => setIsTabLeft(true);
  const onClickRightTab = () => setIsTabLeft(false);

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
                    alarmState.map((data) => {
                      switch(data.type) {
                        case "COMMENT":
                          return <Comment {...data}/>
                        case "RECOMMENT":
                          return <Recomment {...data}/>
                        case "COMMENTHEART":
                          return <CommentHeart {...data}/>
                        case "INVITATION":
                          return <Invitation {...data}/>
                        case "OPENCHAT":
                          return <Openchat {...data}/>
                        case "ACCEPT":
                          return <Accept {...data}/>
                        case "REFUSE":
                          return <Refuse {...data}/>
                        case "REMIND":
                          return <Remind {...data}/>
                        default:
                          return null;
                      }
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
                    alarmState.map((data) => {
                      switch(data.type) {
                        case "REPORT":
                          return <Report {...data}/>
                        case "EVENT":
                          return <Event {...data}/>
                        default:
                          return null;
                      }
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