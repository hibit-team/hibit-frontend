import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {css} from '@emotion/react';
export const SliderContainer = styled(Slider)`
  width: 326px;
  height: 458px;
  margin:auto;
`;

export const SlideImgWrapper = styled.div`
  padding: 25px 0;
  width: 326px;
  heigth: 304px;
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
`;
export const SlideImg = styled.div`
  width: 326px;
  height: 304px;
`;
export const SlideBottom = styled.div`
  box-sizing: border-box;
  width:326px;
  height:154px;
  background-color:#c9c9c9;
  position:relative;
  border-radius:1.5rem;
`
//   width: 430px;
//   height: 150px;
//   background-color: #c9c9c9;
//   display: flex;
//   flex-direction: column;
//   border-radius: 1rem;
// `;

export const textCss1 = css`
  font-size: 15px;
  font-weight: 500;
`
export const textCss2 = css`
  margin: 1.5rem 0;
  font-size: 19px;
  font-weight: 600;

`
export const textCss3 = css`
  position:relative;
  font-size: 17px;
  font-weight: 500;  color:#5E1EC7;
  text-shadow: 0.5px 0.5px 1px #797979;
  opacity:0.85;
`
export const textCss4 = css`
  position:relative;
  top:-0.75rem;
  left:6.2rem;
  `;
