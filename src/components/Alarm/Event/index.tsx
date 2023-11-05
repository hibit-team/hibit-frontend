import { useNavigate } from "react-router";
import event from "../../../images/components/Alarm/Imoji/event.svg";
import defaultProfile from "../../../images/components/defaultProfile.svg";
import * as s from "./styles";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";

const Event = (props: IAlarm) => {
  const alarms = props;
  const navigate = useNavigate();

  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={defaultProfile}
          alt="profile"
        />
        <s.Imoji 
          src={event}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents isreaded={alarms.readed}>
          {alarms.content}
        </s.MainContents>
        <s.Time>{alarms.time}</s.Time>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Event;
