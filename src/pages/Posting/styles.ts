import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
`;

export const TopTitleWrpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 920px;
  height: 48px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 920px;
  height: 48px;
  font-size: 24px;
  font-weight: 800;
  color: #797979;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  background-color: white;
  margin-top: 20px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 840px;
  margin: 40px;
`;

export const PostTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
`;

export const Column = styled.div`
  display: flex;
  width: 170px;
  font-size: 22px;
  font-weight: 500;
`;

export const TitleInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 620px;
  height: 56px;
  margin-left: 50px;
`;

export const TitleInput = styled.input`
  display: flex;
  width: 620px;
  height: 56px;
  font-family: 'SUIT';
  font-size: 18px;
  padding-left: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #797979;
`;

export const LengthChecker = styled.div`
  display: flex;
  position: relative;
  top: 0px;
  right: 60px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #c9c9c9;
`;

export const LengthNum = styled.div`
  display: flex;
`;

export const TitleMaxLength = styled.div`
  display: flex;
`;
