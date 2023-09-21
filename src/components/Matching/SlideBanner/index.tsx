/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as s from './styles'
import '../../../assets/slick.css';
import banner from '../../../images/components/Matching/banner.svg';



const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  appendDots: (dots: any) => (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '24px',
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

const MatchingSlideBanner = () => {
  return (
    <s.MatchSlideContainer {...settings} >
        <img src={banner} alt='matching-banner'/>
    </s.MatchSlideContainer>
      )
  }

export default MatchingSlideBanner;