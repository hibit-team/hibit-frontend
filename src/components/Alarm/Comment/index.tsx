import reply from "../../../images/components/Alarm/Imoji/reply.svg";
import * as s from "./styles";

const Comment = ({nickname, imglink, time}: any) => {
  return (
    <s.Wrapper>
      <s.ProfileImgWrapper>
        <s.ProfileImg 
          src={imglink}
          alt="profile"
        />
        <s.Imoji 
          src={reply}
          alt="imoji"
        />
      </s.ProfileImgWrapper>

      <s.ContentsWrapper>
        <s.MainContents>
          {nickname}님이 회원님의 게시글에 댓글을 남겼습니다.
        </s.MainContents>
        <s.Time>{time}</s.Time>
      </s.ContentsWrapper>
  </s.Wrapper>
  )
};

export default Comment;
