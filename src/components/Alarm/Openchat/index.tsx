import { useNavigate } from "react-router";
import matchingCTA from "../../../images/components/Alarm/Imoji/matchingCTA.svg";
import * as s from "./styles";

const Openchat = ({nickname, imglink, time, link}: any) => {
  const navigate = useNavigate();
  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={imglink}
          alt="profile"
        />
        <s.Imoji 
          src={matchingCTA}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>
          {nickname}님의 오픈채팅방 링크가 도착했습니다.
        </s.MainContents>

        <s.BottomContainer>
          <s.Time>{time}</s.Time>
          <s.Link
            onClick={() => navigate(link)}
          >이동하기</s.Link>
        </s.BottomContainer>
        
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Openchat;
