import styled from "@emotion/styled";

export const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  max-width: 1000px;
  height: 100px;
  font-family: "SUIT";
  font-weight: 500;
  overflow-x: hidden;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 437px;
`;

export const LogoContainer = styled.div``;

export const Categories = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Category = styled.div`
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 230px;
`;

export const AlarmLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const AlarmCountWrapper = styled.div`
  position: relative;
  top: 0px;
  left: -10px;
  display: flex;
  font-size: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #FF4242;
  color: white;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.div`
  border: 1px solid;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 20px;
  margin-left: 24px;
  cursor: pointer;
`;

export const MobileWrapper = styled.div`

`;
