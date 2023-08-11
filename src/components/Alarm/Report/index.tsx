import { useNavigate } from "react-router";
import report from "../../../images/components/Alarm/Imoji/report.svg";
import defaultProfile from "../../../images/components/defaultProfile.svg";
import * as s from "./styles";

const Report = ({content, time}: any) => {
  const navigate = useNavigate();

  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={defaultProfile}
          alt="profile"
        />
        <s.Imoji 
          src={report}
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

export default Report;
