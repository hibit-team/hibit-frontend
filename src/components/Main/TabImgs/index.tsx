/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./styles";
import Swimmer from "../../../images/components/Swimmer.svg";
import TwoPeople from "../../../images/components/TwoPeople.svg";
import ArrowRight from "../../../images/components/ArrowRight.svg";

//slider기본세팅
const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3700,
};

const TabImgs = () => {
  return (
    <s.SliderContainer {...settings}>
      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={Swimmer} alt="swimmer-img" />
        </s.SlideImg>
        <s.SlideBottom>
          <span css={textCss1}>설명문구</span>
          <span css={textCss2}>이번 주에 출발하는 전시회</span>
          <span css={textCss3}> 매칭 바로가기</span>
          <img css={textCss4} src={ArrowRight} alt="arrow"></img>
        </s.SlideBottom>
      </s.SlideImgWrapper>
      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={TwoPeople} alt="people-img" />
        </s.SlideImg>
        <s.SlideBottom>
          <span css={textCss1}>설명문구</span>
          <span css={textCss2}>이번 주에 출발하는 전시회</span>
          <span css={textCss3}> 매칭 바로가기</span>
          <img css={textCss4} src={ArrowRight} alt="arrow"></img>
        </s.SlideBottom>
      </s.SlideImgWrapper>

      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={Swimmer} alt="swimmer-img" />
        </s.SlideImg>
        <s.SlideBottom>
          <span css={textCss1}>설명문구</span>
          <span css={textCss2}>이번 주에 출발하는 전시회</span>
          <span css={textCss3}> 매칭 바로가기</span>
          <img css={textCss4} src={ArrowRight} alt="arrow"></img>
        </s.SlideBottom>
      </s.SlideImgWrapper>
    </s.SliderContainer>
  );
};
export default TabImgs;

const textCss1 = css`
  margin-top: 0.5rem;
  font-size: 20px;
  font-weight: 400;
`;

const textCss2 = css`
  position: relative;
  top: 1rem;
  font-size: 28px;
  font-weight: 800;
`;
const textCss3 = css`
  position: relative;
  top: 4rem;
  left: 12rem;
  font-size: 22px;
  font-weight: 500;
  &:hover {
    transition: color 0.2s linear 0s;
    color: #5e1ec7;
    font-weight: 900;
  }
`;

const textCss4 = css`
  width: 30px;
  height: 30px;
  position: relative;
  top: 2.5rem;
  left: 19.75rem;
  opacity: 0.8;
  scale: 0.9;
  &:hover {
    transition: color 0.2s linear 0s;
    color: #5e1ec7;
    font-weight: 900;
  }
`;
