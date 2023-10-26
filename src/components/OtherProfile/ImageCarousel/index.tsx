import * as s from "./styles";
import { css } from '@emotion/react';
import '../../../assets/slick.css';

interface ImageCarouselProps {
  imgs: string[];
}

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

const ImageCarousel: React.FC<ImageCarouselProps> = ({imgs}) => {
  return (
    <s.ImageSliderContainer {...settings}>
      {
        imgs.map((img) => {
          return <img src={img} alt="im" />
        })
      }
    </s.ImageSliderContainer>
  )
};

export default ImageCarousel;
