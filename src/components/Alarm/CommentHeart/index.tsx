import { useNavigate } from "react-router-dom";
import heart from "../../../images/components/Alarm/Imoji/heart.svg";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";
import * as s from "./styles";
import AlarmAPI from "../../../api/AlarmAPI";

const CommentHeart = (props: IAlarm) => {

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
          src={alarms.imglink}
          alt="profile"
        />
        <s.Imoji 
          src={heart}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents isreaded={alarms.readed}>
          {alarms.nickname}님이 회원님의 댓글을 좋아합니다.
        </s.MainContents>
        <s.Time>{alarms.time}</s.Time>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default CommentHeart;
