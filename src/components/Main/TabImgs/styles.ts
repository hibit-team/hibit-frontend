import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {css} from '@emotion/react';

export const SliderContainer = styled(Slider)`
  display: flex;
  /* margin-top: 60px; */
  margin-bottom: 100px;
  width: 820px;
  /* height: 602px; */
`;

export const SlideImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  
  /* margin-top:2rem; */
  margin-top: 60px;
  width: 380px;
  height: 602px;
  border-radius: 1rem;
  &:hover {
    transition: transform 0.5s ease 0s;
    transform: translate(0,-20px);
    scale:1.01;
  }
`;

export const SlideImg = styled.div`
  display: flex;
  width: 380px;
  height: 392px;
`;

export const SlideBottom = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 380px;
  height: 210px;
  background-color: #EEEEEE;
  /* position:relative; */
  /* top:-13.15rem; */
  border-radius:1.5rem;
`;

//   width: 430px;
//   height: 150px;
//   background-color: #c9c9c9;
//   display: flex;
//   flex-direction: column;
//   border-radius: 1rem;
// `;


export const textCss1 = css`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  /* margin-top: 0.5rem; */
  font-size: 20px;
  font-weight: 500;
`;

export const textCss2 = css`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  /* margin: 1.5rem 0; */
  font-size: 28px;
  font-weight: 600;
`;

export const textCss3 = css`
  display: flex;
  flex-direction: row;
  /* position: relative; */
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
`;

export const ArrowImg = styled.img`
  display: flex;
  width: 18px;
  height: 6px;
  /* position: relative; */
  /* left:18.5rem; */
  /* top: -1rem; */
  /* color:#5E1EC7; */
`;
