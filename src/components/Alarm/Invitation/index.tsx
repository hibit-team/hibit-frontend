import { useNavigate } from "react-router";
import matchingCTA from "../../../images/components/Alarm/Imoji/matchingCTA.svg";
import * as s from "./styles";
import { IAlarm } from "../../../interfaces/Alarm/IAlarm";
import AlarmAPI from "../../../api/AlarmAPI";
import MatchingAPI from "../../../api/MatchingAPI";

const Invitation = (props: IAlarm) => {

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

  const onClickAccept = () => {
    MatchingAPI.putMatchingOK(alarms.matchingIdx)
      .then((res) => {
        console.log({res});
      })
      .catch((e) => {
        console.error({e});
      });
  };

  const onClickRefuse = () => {
    MatchingAPI.putMatchingNO(alarms.matchingIdx)
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
          src={matchingCTA}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>
          {alarms.nickname}님이 회원님께 초대장을 전송했습니다.
        </s.MainContents>
        <s.BottomContainer>
          <s.Time>{alarms.time}</s.Time>
          {
            alarms.history !== "YET" ? 
              alarms.history === "NO" ?
              <s.RefuseBtn>거절한 초대입니다.</s.RefuseBtn> :
              <s.AcceptBtn>수락한 초대입니다.</s.AcceptBtn>
              :
              <>              
                <s.AcceptBtn onClick={() => onClickAccept()}>수락</s.AcceptBtn>
                <s.RefuseBtn onClick={() => onClickRefuse()}>거절</s.RefuseBtn>
              </>              
          }
        </s.BottomContainer>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Invitation;
