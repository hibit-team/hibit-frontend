import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderContainer = styled(Slider)`
  display: flex;
  height: 380px;
  .slick-slide {
	  padding-right: 47px;
  };
`;

export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 276px;
  height: 276px;
  margin-top: 80px;
  border: 1px solid #C9C9C9;
  box-shadow: 0px 0px 13.4316px rgba(201, 201, 201, 0.79);
  border-radius: 1rem;
  .slick-list {
      margin: 0 -27px;
  }

  &:hover {
    transition: transform 0.5s ease 0s;
    transform: translate(0,-10px);
    scale:1.01;
  }
`;

export const ReviewerImg = styled.img`
  display: flex;
  position: relative;
  top: -40px;
  left: 28px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #EEEEEE;
`;

export const ReviewText = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 500;
  padding-left: 28px;
  padding-right: 28px;
`;

export const ReviewWriter = styled.div`
  display: flex;
  font-size: 22px;
  font-weight: 800;
  margin-top: 24px;
  padding-left: 28px;
  padding-right: 28px;
`;

