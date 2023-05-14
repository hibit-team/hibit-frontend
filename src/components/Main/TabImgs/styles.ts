import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {css} from '@emotion/react';


export const SliderContainer = styled(Slider)`
  display: flex;
  margin-bottom: 100px;
  width: 820px;
`;

export const SlideImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
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
  border-radius:1.5rem;
`;

export const textCss1 = css`
  display: flex;
  font-size: 20px;
  font-weight: 500;
`;

export const textCss2 = css`
  display: flex;
  margin-top: 12px;
  font-size: 28px;
  font-weight: 800;
`;

export const textCssContainer3 = styled.div`
  display: flex;
  position: relative;
  top: 32px;
  left: 180px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 26px;
  &:hover {
    scale:1.1;
    transition: scale 0.1s ease 0s;
  };
`;

export const textCss3 = css`
  display: flex;
  font-size: 20px;
  font-weight: 500;  
  color:#5E1EC7;
  text-shadow: 0.5px 0.5px 1px #797979;
  opacity:0.85;
  margin-right: 10px;
`;

export const ArrowImg = styled.img`
  display: flex;
  width: 20px;
  height: 8px;
`;
