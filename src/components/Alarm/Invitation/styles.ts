import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 274px;
  min-height: 86px; 
  max-height: 86px;
  border-bottom: 1px solid #c9c9c9;
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

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  height: 16px;
  align-items: center;
`;

export const Time = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 700;
`;

export const AcceptBtn = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 700;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  background-color: #804DD3;
  cursor: pointer;

  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  box-sizing: border-box;
`;

export const RefuseBtn = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 700;
  margin-left: 10px;
  border: 1px solid #797979;
  border-radius: 10px;
  color: #797979;
  background-color: white;
  cursor: pointer;

  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  box-sizing: border-box;
`;