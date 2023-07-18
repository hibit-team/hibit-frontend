import * as s from "./styles";

const Accept = ({nickname, imglink, time}: any) => {
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
        <s.MainContents>{nickname}님이 초대를 수락했어요.</s.MainContents>
        <s.Time>{time}</s.Time>
      </s.ContentsWrapper>
    </s.Wrapper>
  )
};

export default Accept;
