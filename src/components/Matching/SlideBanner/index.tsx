/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as s from './styles'
import '../../../assets/slick.css';


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

        <div css={css`background-color:#EEEEEE; width:100vw;height:400px`}>1</div>
        <div css={css`background-color:#EEEEEE; width:100vw;height:400px`}>2</div>
        <div css={css`background-color:#EEEEEE; width:100vw;height:400px`}>3</div>
        <div css={css`background-color:#EEEEEE; width:100vw;height:400px`}>4</div>

    </s.MatchSlideContainer>
      )
  }

export default MatchingSlideBanner;