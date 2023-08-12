import accept from "../../../images/components/Alarm/Imoji/accept.svg";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";
import * as s from "./styles";

const Accept = (props: IAlarm) => {
  const alarms = props;
  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={alarms.imglink}
          alt="profile"
        />
        <s.Imoji 
          src={accept}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>{alarms.nickname}님이 초대를 수락했어요.</s.MainContents>
        <s.Time>{alarms.time}</s.Time>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Accept;
