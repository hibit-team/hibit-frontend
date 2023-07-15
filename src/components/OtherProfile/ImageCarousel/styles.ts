import styled from "@emotion/styled";
import Slider from "react-slick";

export const ImageSliderContainer = styled(Slider)`
  display: flex;
  width: 264px;
  height: 346px;
  .slick-slide slick-active slick-current{
    width: 264px;
    height: 346px;
  }
  border-radius: 10px;
`;

export const ImageItem = styled.img`
  border-radius: 10px;
  height: 100%;
`;