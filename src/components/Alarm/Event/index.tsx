import { useNavigate } from "react-router";
import event from "../../../images/components/Alarm/Imoji/event.svg";
import defaultProfile from "../../../images/components/defaultProfile.svg";
import * as s from "./styles";

const Event = ({content, time}: any) => {
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
        <s.MainContents>
          {content}
        </s.MainContents>
        <s.Time>{time}</s.Time>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Event;
