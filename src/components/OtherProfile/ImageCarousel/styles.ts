import styled from "@emotion/styled";
import Slider from "react-slick";
import COLORS from "../../../assets/color";
export const ImageSliderContainer = styled(Slider)`
border-radius: 10px;
left:20px;
box-sizing: border-box;
border: 2px solid ${COLORS.Gray2};
overflow: hidden;
width:100%;
height: 348px;
top:8px;
// display:flex;
// align-items:center;
`;

export const ImageItem = styled.img`
  border-radius: 10px;
  // height: 100%;
`;