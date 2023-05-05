/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Swimmer from "../../../images/components/swimmer.svg";
import TwoPeople from "../../../images/components/people.svg";
import PurpleBg from '../../../images/components/Purple.svg'
import Arrow from '../../../images/components/Arrow.svg';
//slider기본세팅
const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3300,
};

const TabImgs = () => {
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
          {/* <img css={s.textCss4} src={Arrow} alt="arrow-img"></img> */}
          <s.ArrowImg src={Arrow} alt="arrow-img" />
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
          {/* <img css={s.textCss4} src={Arrow} alt="arrow-img"></img> */}
          <s.ArrowImg src={Arrow} alt="arrow-img" />
        </s.SlideBottom>
      </s.SlideImgWrapper>

      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={PurpleBg} alt="swimmer-img" />
        </s.SlideImg>
        <s.SlideBottom css={{padding: '2rem'}}>
          <h1 css={s.textCss1}>설명 문구</h1>
          <h1 css={s.textCss2}>이번 주에 출발하는 전시회</h1>
          <h1 css={s.textCss3}>매칭 바로가기</h1>
          {/* <img src={Arrow} alt="arrow-img" /> */}
          <s.ArrowImg src={Arrow} alt="arrow-img" />
        </s.SlideBottom>
      </s.SlideImgWrapper>
    </s.SliderContainer>
  );
};
export default TabImgs;
