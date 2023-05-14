/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import * as s from "./styles";
// import Swimmer from "../../../images/components/swimmer.svg";
// import TwoPeople from "../../../images/components/people.svg";
// import PurpleBg from '../../../images/components/Purple.svg'
// import Arrow from '../../../images/components/Arrow.svg';

import Swimmer from '../../../../images/mobile/mobileSwimmer.svg';
import TwoPeople from '../../../../images/mobile/mobilePeople.svg';
import PurpleBg from '../../../../images/mobile/mobilePurpleBG.svg';
import Arrow from '../../../../images/mobile/moibleArrow.svg';
const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
};

const MobileSlider = () => {
  return (
    <s.SliderContainer {...settings}>
      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={Swimmer} alt="swimmer-img" />
        </s.SlideImg>
        <s.SlideBottom css={{padding: '2rem'}}>
        <h1 css={s.textCss1}>설명 문구</h1>
          <h1 css={s.textCss2}>이번 주에 출발하는 전시회</h1>
            <h1 css={s.textCss3}>매칭 바로가기</h1>
          <img css={s.textCss4} src={Arrow} alt="arrow-img"></img>
        </s.SlideBottom>
      </s.SlideImgWrapper>

      <s.SlideImgWrapper>
        <s.SlideImg >
          <img src={TwoPeople} alt="people-img" />
        </s.SlideImg>
        <s.SlideBottom css={{padding: '2rem'}}>
        <h1 css={s.textCss1}>설명 문구</h1>
          <h1 css={s.textCss2}>이번 주에 출발하는 전시회</h1>
            <h1 css={s.textCss3}>매칭 바로가기</h1>
          <img css={s.textCss4} src={Arrow} alt="arrow-img"></img>
        </s.SlideBottom>
      </s.SlideImgWrapper>

      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={PurpleBg} alt="background-img" />
        </s.SlideImg>
        <s.SlideBottom css={{padding: '2rem'}}>
        <h1 css={s.textCss1}>설명 문구</h1>
          <h1 css={s.textCss2}>이번 주에 출발하는 전시회</h1>
            <h1 css={s.textCss3}>매칭 바로가기</h1>
          <img css={s.textCss4} src={Arrow} alt="arrow-img"></img>
        </s.SlideBottom>
      </s.SlideImgWrapper>
    </s.SliderContainer>
  );
};
export default MobileSlider;