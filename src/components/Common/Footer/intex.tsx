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
  
  // const navigate = useNavigate();
  const TermsOfServiceURL = "https://mellow-bard-bc8.notion.site/4c55e63b2f2e48a49c6bb3ca7e2e7505?pvs=4";
  const PrivacyPolicyURL = "https://mellow-bard-bc8.notion.site/90c65d984f6347afa943945692af6c9f?pvs=4";
  const ManualURL = "https://mellow-bard-bc8.notion.site/28a5202c60344d978caa0d2745921049?pvs=4";
  const instagramURL = "https://www.instagram.com/hibit.co.kr/";
  const githubURL = "https://github.com/hibit-team";
  const hibitURL = "https://hibit-frontend.vercel.app";
  
  const onClickTermsOfService = () => window.location.href = TermsOfServiceURL;
  const onClickPrivacyPolicy = () => window.location.href = PrivacyPolicyURL;
  const onClickManual = () => window.location.href = ManualURL;
  const onClickInstagramIcon = () => window.location.href = instagramURL;
  const onClickGithubIcon = () => window.location.href = githubURL;
  
  const onClickScrollTop = () => {
    window.scrollTo(0, 0);
  };

  const onClickShareIcon = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("클립보드에 URL이 복사되었습니다!");
    } catch (e) {
      console.error({e});
      alert("클립보드 복사 실패. 다시 시도해 주세요.");
    }
  }

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
            <s.IntroText onClick={() => onClickManual()}>매뉴얼</s.IntroText>
            <s.VerticalLine />
            <s.IntroText onClick={() => onClickTermsOfService()}>이용약관</s.IntroText>
            <s.VerticalLine />
            <s.IntroText onClick={() => onClickPrivacyPolicy}>개인정보 처리방침</s.IntroText>
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
            <s.IconWrapper onClick={() => onClickShareIcon(hibitURL)}>
              <s.ArrowIcon src={ArrowIcon} alt="Arrow" />
            </s.IconWrapper>
          </s.RightIconContainer>
        </s.RightContainer>
      </s.Wrapper>
    </s.BackGround>
  )
}

export default Footer;