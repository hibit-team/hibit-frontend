import { useNavigate } from "react-router";
import openchat from "../../../images/components/Alarm/Imoji/openchat.svg";
import * as s from "./styles";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";
import AlarmAPI from "../../../api/AlarmAPI";

const Openchat = (props: IAlarm) => {

  const navigate = useNavigate();
  const alarms = props;
  
  const onClickAlarm = () => {
    AlarmAPI.putAlarmRead(alarms.idx)
      .then((res) => {
        console.log({res});
      })
      .catch((e) => {
        console.error({e});
      });
    
  };

  return (
    <s.Wrapper onClick={() => onClickAlarm()}>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={alarms.imglink}
          alt="profile"
        />
        <s.Imoji 
          src={openchat}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>
          {alarms.nickname}님의 오픈채팅방 링크가 도착했습니다.
        </s.MainContents>

        <s.BottomContainer>
          <s.Time>{alarms.time}</s.Time>
          <s.Link
            onClick={() => navigate(alarms.url)}
          >이동하기</s.Link>
        </s.BottomContainer>
        
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Openchat;
