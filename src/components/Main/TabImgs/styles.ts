import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    transition: transform 0.3s ease 0s;
    transform: translate(0,-20px);
  }
`;
export const SlideImg = styled.div`
  width: 380px;
  height: 602px;
`;
// export const SlideBottom = styled.div`
//   box-sizing: border-box;
//   margin-top: -1.75rem;

//   width: 430px;
//   height: 150px;
//   background-color: #c9c9c9;
//   display: flex;
//   flex-direction: column;
//   border-radius: 1rem;
// `;
