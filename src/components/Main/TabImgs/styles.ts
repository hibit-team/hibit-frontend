import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {css} from '@emotion/react';
import COLORS from "../../../assets/color";


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
  }
  overflow: hidden;
`;

export const SlideImg = styled.div`
  display: flex;
  width: 380px;
  height: 392px;
  border: none;
`;

export const SlideBottom = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 380px;
  height: 210px;
  background-color: #EEEEEE;
  border-bottom-right-radius:1.5rem;
  border-bottom-left-radius:1.5rem;
  `;

export const textCss1 = css`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  color: ${COLORS.Gray3};
`;

export const textCss2 = css`
  display: flex;
  margin-top: 12px;
  font-size: 28px;
  font-weight: 800;
  color: #242424;
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
`;

export const textCss3 = css`
  position: absolute;
  left:-56%;
  top:10%;
  display: flex;
  width: 176px;
  height: 45px;
  flex-shrink: 0;
  font-size: 20px;
  font-weight: 500;  
  color: ${COLORS.Gray3};
  text-shadow: 0.5px 0.5px 1px #797979;
  user-select:none;
  cursor:pointer;
`;

