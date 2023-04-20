import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderContainer = styled(Slider)`
  width: 960px;
  height: 660px;
`;

export const SlideImgWrapper = styled.div`
  width: 420px;
  heigth: 420px;
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  border-radius: 1rem;
  scale: 0.8;
  &:hover {
    transition: scale 0.25s ease 0s;
    scale: 0.83;
  }
`;
export const SlideImg = styled.div`
  width: 420px;
  height: 420px;
`;
export const SlideBottom = styled.div`
  box-sizing: border-box;
  margin-top: -1.75rem;
  padding: 2rem;
  width: 420px;
  height: 210px;
  background-color: #c9c9c9;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
`;

//이미지의 구멍뚤린 부분
// export const SlideImgArtPoint = styled.div``;
