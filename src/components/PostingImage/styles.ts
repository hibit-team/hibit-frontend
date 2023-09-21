import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 140px;
  height: 140px;
  background: rgba(0, 0, 0, 0.3);
  margin-left: 20px;
  border-radius: 10px;
`;

export const TitleImageText = styled.div`
  display: flex;
  position: absolute;
  width: 52px;
  height: 24px;
  top: 12px;
  left: 12px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border: 1px solid #797979;
  border-radius: 100px;
`;

export const ClostButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 12px;
  height: 12px;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

export const ImageItem = styled.img`
  display: flex;
  object-fit: scale-down;
  width: 140px;
  height: 140px;
`;