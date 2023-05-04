import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {css} from '@emotion/react';
export const SliderContainer = styled(Slider)`
  width: 820px;
  height: 900px;
`;

export const SlideImgWrapper = styled.div`
  margin-left:0.8rem;
  margin-top:2rem;
  width: 380px;
  heigth: 602px;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  &:hover {
    transition: transform 0.5s ease 0s;
    transform: translate(0,-20px);
    scale:1.01;
  }
`;
export const SlideImg = styled.div`
  width: 380px;
  height: 602px;
`;
export const SlideBottom = styled.div`
  box-sizing: border-box;
  width:380px;
  height:210px;
  background-color:#c9c9c9;
  position:relative;
  top:-13.15rem;
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
  margin-top: 0.5rem;
  font-size: 20px;
  font-weight: 500;
`
export const textCss2 = css`
  margin: 1.5rem 0;
  font-size: 26.7px;
  font-weight: 600;

`
export const textCss3 = css`
  position:relative;
  margin-left: 11rem;
  margin-top: 1.5rem;
  font-size: 20px;
  font-weight: 500;  color:#5E1EC7;
  text-shadow: 0.5px 0.5px 1px #797979;
  opacity:0.85;
  &:hover {
    scale:1.1;
    transition: scale 0.1s ease 0s;
  };
`
export const textCss4 = css`
  position:relative;
  left:18.5rem;
  top: -1rem;
  color:#5E1EC7;
  `;
