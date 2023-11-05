/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { css } from '@emotion/react';
import '../../../assets/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
        top: '320px',
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
  console.log(imgs)
  return (
    <s.ImageSliderContainer {...settings}>
      {
        imgs ?
        imgs.map((img, idx) => {
          return (
            <img 
              css={{width:'100%', height: 320}}
              src={img}
              alt={`image-${idx}`}
            />
          )
        }) : null
      }
    </s.ImageSliderContainer>
  )
};

export default ImageCarousel;
