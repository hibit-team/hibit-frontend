import { useNavigate } from "react-router";
import * as s from "./styles";

const Invitation = ({nickname, imglink, time}: any) => {
  const navigate = useNavigate();

  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={imglink}
          alt="profile"
        />
        <s.Imoji 
          src={imglink}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>
          {nickname}님이 회원님께 초대장을 전송했습니다.
        </s.MainContents>
        <s.BottomContainer>
          <s.Time>{time}</s.Time>
          <s.AcceptBtn
            onClick={() => navigate("/posting")}
          >수락</s.AcceptBtn>
          <s.RefuseBtn
            onClick={() => navigate("/matching")}
          >거절</s.RefuseBtn>
        </s.BottomContainer>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Invitation;
