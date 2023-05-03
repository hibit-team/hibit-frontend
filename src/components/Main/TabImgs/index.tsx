/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Swimmer from "../../../images/components/swimmer1.svg";
import TwoPeople from "../../../images/components/people.svg";
import PurpleBg from '../../../images/components/purple1.svg'
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
       
      </s.SlideImgWrapper>
      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={TwoPeople} alt="people-img" />
        </s.SlideImg>
      </s.SlideImgWrapper>

      <s.SlideImgWrapper>
        <s.SlideImg>
          <img src={PurpleBg} alt="swimmer-img" />
        </s.SlideImg>
       
      </s.SlideImgWrapper>
    </s.SliderContainer>
  );
};
export default TabImgs;

// const textCss1 = css`
//   margin-top: 0.5rem;
//   font-size: 20px;
//   font-weight: 400;
// `;

// const textCss2 = css`
//   position: relative;
//   top: 1rem;
//   font-size: 28px;
//   font-weight: 800;
// `;

// const textCss3 = css`
//   position: relative;
//   top: 4rem;
//   left: 12.3rem;
//   font-size: 22px;
//   font-weight: 500;
//   &:hover{
//     transition-duration:0.5s;
//     font-weight:900;
//     color: #5E1EC7;
//   } 
// `;
// const textCss4 = css`
//   width: 30px;
//   height: 30px;
//   position: relative;
//   top: 2.45rem;
//   left: 20rem;
//   opacity: 0.75;
//   scale: 0.9;
// `;
