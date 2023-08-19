import refuse from "../../../images/components/Alarm/Imoji/refuse.svg";
import * as s from "./styles";

const Refuse = ({nickname, imglink, time}: any) => {
  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={imglink}
          alt="profile"
        />
        <s.Imoji 
          src={refuse}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>{nickname}님이 초대를 거절했어요.</s.MainContents>
        <s.Time>{time}</s.Time>
      </s.ContentsWrapper>
  </s.Wrapper>
  )
};

export default Refuse;
