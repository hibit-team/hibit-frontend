import styled from "@emotion/styled";

export const Warpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 880px;
  height: 640px;
  margin-top: 80px;
`;

export const LeftIntroText = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

export const IntroText1 = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

export const IntroText2 = styled.h2`
  font-size: 48px;
  font-weight: 800;
  margin-top: 16px;
`;

export const TopIntroText3 = styled.h3`
  margin-top: 40px;
`;

export const TopIntroTextDetail3 = styled.h4`
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
`;

export const TextDetailStrong = styled.h4`
  font-size: 22px;
  font-weight: 800;
  line-height: 30px;
`

export const RightImgContainer = styled.div`
  display: flex;
  position: relative;
`;

export const PhoneImg = styled.img`
  position: absolute;
`;

export const MidContainer = styled.div`
  max-width: 100vw;
  height: 1800px;
  background-color: #EFE8F9;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 880px;
  margin-top: 100px;
`;

export const MatchingBtn = styled.button`
  display: flex;
  position: relative;
  top: 0px;
  left: 500px;
  justify-content: center;
  align-items: center;
  width: 292px;
  height: 80px;
  margin-top: 100px;
  margin-bottom: 100px;
  font-size: 28px;
  font-weight: 500;
  color: #804DD3;
  border-radius: 100px;
  border: 1px solid #804DD3;
  background-color: white;
  font-family: 'SUIT';
  cursor: pointer;

  &:hover {
    background-color: #5E1EC7;
    border: 1px solid #804DD3;
    color: white;
    font-weight: 800;
  }
`;