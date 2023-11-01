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
      <img css={{width:'100%', height: 320}} src={imgs[0]} alt='dada'></img>
      <img css={{width:'100%', height:320}} src={imgs[1]} alt='dada'></img>
      <img css={{width:'100%', height:320}} src={imgs[2]} alt='dada'></img>
    </s.ImageSliderContainer>
  )
};

export default ImageCarousel;
