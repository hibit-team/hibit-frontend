import AlarmAPI from "../../../api/AlarmAPI";
import refuse from "../../../images/components/Alarm/Imoji/refuse.svg";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";
import * as s from "./styles";

const Refuse = (props: IAlarm) => {
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
          src={refuse}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents isreaded={alarms.readed}>
          {alarms.nickname}님이 초대를 거절했어요.
        </s.MainContents>
        <s.Time>{alarms.time}</s.Time>
      </s.ContentsWrapper>
  </s.Wrapper>
  )
};

export default Refuse;
