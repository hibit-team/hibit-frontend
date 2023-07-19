import * as s from "./styles";
import { css } from '@emotion/react';
import '../../../assets/slick.css';

const settings = {
  arrows: false,
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  adaptiveHeight: true,
  appendDots: (dots: any) => (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        top: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
  dotsClass: 'dots_custom'
  };

const ImageCarousel = () => {
  return (
    <s.ImageSliderContainer {...settings}>
      <img 
        src="https://i.imgur.com/fsyrScY.jpg" 
        alt="tmp1" 
      />
      <img 
        src="https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-1.png" 
        alt="tmp2"
      />
      <img  
        src="https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-1.png" 
        alt="tmp3"
      />
    </s.ImageSliderContainer>
  )
};

export default ImageCarousel;
