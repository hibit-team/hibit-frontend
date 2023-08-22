import heart from "../../../images/components/Alarm/Imoji/heart.svg";
import * as s from "./styles";

const CommentHeart = ({nickname, imglink, time}: any) => {
  return (
    <s.Wrapper>
    <s.ProfileImgWrapper>
      <s.ProfileImg 
        src={imglink}
        alt="profile"
      />
      <s.Imoji 
        src={heart}
        alt="imoji"
      />
    </s.ProfileImgWrapper>

    <s.ContentsWrapper>
      <s.MainContents>
        {nickname}님이 회원님의 댓글을 좋아합니다.
      </s.MainContents>
      <s.Time>{time}</s.Time>
    </s.ContentsWrapper>
</s.Wrapper>
  )
};

export default CommentHeart;
