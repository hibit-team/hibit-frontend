import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 350px;
  height: 38px;
  cursor: pointer;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  &:hover{
    background-color: #edf3f5;
  };
`;

export const Text = styled.div`
  font-family: 'SUIT';
  display: flex;
  font-size: 18px;
  font-weight: 500;
`;

export const KakaoIcon = styled.img`
  display: flex;
  width: 24px;
  height: 24px;
`;