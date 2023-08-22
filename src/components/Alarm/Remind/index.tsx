import heart from "../../../images/components/Alarm/Imoji/heart.svg";
import defaultProfile from "../../../images/components/defaultProfile.svg";
import * as s from "./styles";

const Remind = ({content, imglink, time}: any) => {
  return (
    <s.Wrapper>
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
        {content}
      </s.MainContents>
      <s.Time>{time}</s.Time>
    </s.ContentsWrapper>
</s.Wrapper>
  )
};

export default Remind;
