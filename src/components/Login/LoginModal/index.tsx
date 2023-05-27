import { useCallback } from "react";
import * as s from "./styles";
import { ILoginModalProps } from "../../../interfaces/ILoginModalProps";
import XcloseBtn from "../../../images/components/Login/XcloseBtn.svg";
import LockIcon from "../../../images/components/Login/LockIcon.svg";
import SearchIcon from "../../../images/components/Login/SearchIcon.svg";
import HeartIcon from "../../../images/components/Login/HeartIcon.svg";
import GoogleLoginButton from "../GoogleLoginButton";
import KaKaoLogin from "../KaKaoLogin";

const LoginModal = (props: ILoginModalProps) => {
  const { open, close } = props;

  const onClickCloseBtn = useCallback(() => {
    close(false);
    console.log(open);
  }, [open, close]);

  return (
    <s.Wrapper isOpen={open}>
      <s.Container>
        <s.Header>
          <s.HeaderText>Say "Hi", a 'bit' slowly. 😊</s.HeaderText>
          <s.CloseBtn onClick={onClickCloseBtn}>
            <img src={XcloseBtn} alt="close button" />
          </s.CloseBtn>
          
        </s.Header>

        <s.Body>
          <s.IconContainer>
            <img src={LockIcon} alt="lock icon" width="80px" height="80px" />
            <s.StrongText>믿을 수 있고</s.StrongText>
            <s.NormalText>민감한 내 정보의<br />노출은 내가 결정해요</s.NormalText>
          </s.IconContainer>
          <s.VerticalLine />
          <s.IconContainer>
            <img src={SearchIcon} alt="search icon" width="80px" height="80px" />
            <s.StrongText>효율적인 서비스</s.StrongText>
            <s.NormalText>원하는 조건의 게시글을<br />쉽게 탐색해요</s.NormalText>
          </s.IconContainer>
          <s.VerticalLine />
          <s.IconContainer>
            <img src={HeartIcon} alt="heart icon" width="80px" height="80px" />
            <s.StrongText>편리하게 즐겨요</s.StrongText>
            <s.NormalText>모집/수락/거절은 간편하게,<br />댓글로 소통해요</s.NormalText>
          </s.IconContainer>
        </s.Body>

        <s.Bottom>
          <s.IntroText>
            예술은 더 이상 어렵지 않아요. 나와 함께 할 히빗의 <s.IntroStrongText>전시회 메이트</s.IntroStrongText>가 있다면!
          </s.IntroText>
          <s.LoginBtnWrapper>
            <GoogleLoginButton />
            <KaKaoLogin />
          </s.LoginBtnWrapper>
        </s.Bottom>

      </s.Container>
    </s.Wrapper>
  );
};

export default LoginModal;