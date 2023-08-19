import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 274px;
  min-height: 86px; 
  max-height: 86px;
  border-bottom: 1px solid #c9c9c9;
  cursor: pointer;
  flex: 1;
`;

export const ProfileImgWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;

export const ProfileImg = styled.img`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const Imoji = styled.img`
  position: absolute;
  top: 28px;
  left: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: none;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export const MainContents = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 700;
  width: 194px;
`;

export const Time = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 700;
  margin-top: 10px;
`;
