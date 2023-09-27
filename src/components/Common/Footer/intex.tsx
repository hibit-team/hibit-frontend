import React from "react";
import * as s from "./styles";
import useIsMobile from "../../../hooks/useIsMobile";
import HibitLogoGray from "../../../images/components/HibitLogoGray.svg";
import MoveTopIcon from "../../../images/components/MoveTopIcon.svg";
import InstagramIcon from "../../../images/components/Footer/instagramLogo.svg";
import GithubIcon from "../../../images/components/Footer/githubLogo.svg";
import ArrowIcon from "../../../images/components/Footer/arrowLogo.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const isMobile = useIsMobile();
  const RIGHTS = "예술 기반 소셜 디스커버리 서비스, 히빗 (Hibit)\nⓒ 2023 Hibit All rights reserved.";
  
  const navigate = useNavigate();
  const instagramURL = "https://www.instagram.com/hibit.co.kr/";
  const githubURL = "https://github.com/hibit-team";
  
  const onClickInstagramIcon = () => window.location.href = instagramURL;
  const onClickGithubIcon = () => window.location.href = githubURL;
  
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
            <s.IconWrapper onClick={() => onClickInstagramIcon()}>
              <s.InstagramIcon src={InstagramIcon} alt="instagram" />
            </s.IconWrapper>
            <s.IconWrapper onClick={() => onClickGithubIcon()}>
              <s.GithubIcon src={GithubIcon} alt="Github" />
            </s.IconWrapper>
            <s.IconWrapper>
              <s.ArrowIcon src={ArrowIcon} alt="Arrow" />
            </s.IconWrapper>
          </s.RightIconContainer>
        </s.RightContainer>
      </s.Wrapper>
    </s.BackGround>
  )
}

export default Footer;