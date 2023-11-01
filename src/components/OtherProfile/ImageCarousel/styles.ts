import styled from "@emotion/styled";
import Slider from "react-slick";
import COLORS from "../../../assets/color";
export const ImageSliderContainer = styled(Slider)`
box-sizing: border-box;
left:20px;  
// border: 1px solid ${COLORS.Gray2};
width: 100%;
overflow: hidden;
// margin: auto;
// height: 346px;
border-radius: 10px;
`;

export const ImageItem = styled.img`
  border-radius: 10px;
  // height: 100%;
`;