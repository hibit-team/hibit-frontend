import React from "react";
import * as s from "./styles";
import useIsMobile from "../../../hooks/useIsMobile";
import HibitLogoGray from "../../../images/components/HibitLogoGray.svg";
import MoveTopIcon from "../../../images/components/MoveTopIcon.svg"

const Footer = () => {
  const isMobile = useIsMobile();
  const RIGHTS = "예술 기반 소셜 디스커버리 서비스, 히빗 (Hibit)\nⓒ 2023 Hibit All rights reserved.";

  const onClickScrollTop = () => {
    window.scrollTo(0, 0);
  };

  if (isMobile) {
    return (
      <s.MobileWrapper>
      </s.MobileWrapper>
    )
  }

  return (
    <s.BackGround>
      <s.Wrapper>
        <s.LeftContainer>
          <s.IntroContainer>
            <s.IntroText>매뉴얼</s.IntroText>
            <s.VerticalLine />
            <s.IntroText>이용약관</s.IntroText>
            <s.VerticalLine />
            <s.IntroText>개인정보 처리방침</s.IntroText>
          </s.IntroContainer>
          <s.HibitLogoContainer>
            <img src={HibitLogoGray} alt="Hibit-logo-gray" />
          </s.HibitLogoContainer>
          <s.RightsText>{RIGHTS}</s.RightsText>
        </s.LeftContainer>
        <s.RightContainer>
          <s.MoveTopIconContainer onClick={() => onClickScrollTop()}>
            <img src={MoveTopIcon} alt="move-top" />
          </s.MoveTopIconContainer>
          <s.RightIconContainer>
            <s.IconWrapper />
            <s.IconWrapper />
            <s.IconWrapper />
          </s.RightIconContainer>
        </s.RightContainer>
      </s.Wrapper>
    </s.BackGround>
  )
}

export default Footer;