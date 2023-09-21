import { useNavigate } from "react-router-dom";
import AlarmAPI from "../../../api/AlarmAPI";
import heart from "../../../images/components/Alarm/Imoji/heart.svg";
import defaultProfile from "../../../images/components/defaultProfile.svg";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";
import * as s from "./styles";

const Remind = (props: IAlarm) => {
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
    
    navigate(`/matchPost/${alarms.postIdx}`);
  };
  
  return (
    <s.Wrapper onClick={() => onClickAlarm()}>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={defaultProfile}
          alt="profile"
        />
        <s.Imoji 
          src={heart}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>
          {alarms.content}
        </s.MainContents>
        <s.Time>{alarms.time}</s.Time>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Remind;
