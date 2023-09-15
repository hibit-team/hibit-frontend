import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 140px;
  width: 920px;
  height: 828px;
`;

export const TabContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  justify-content: space-evenly;
`;

export const LeftTab1 = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 800;
  width: 50%;
  color: #5E1EC7;
  text-align: center;
  line-height: 100%;
  justify-content: center;
  border-bottom: 3.5px solid #5E1EC7;
`;

export const RightTab1 = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 500;
  width: 50%;
  color: #797979;
  line-height: 100%;
  text-align: center;
  justify-content: center;
  border-bottom: 2px solid #797979;
  opacity: 80%;
`;

interface IsRegistered {
  isRegistered: boolean;
};

export const ProfileContainer = styled.div<IsRegistered>`
  display: flex;
  flex-direction: column;
  height: 640px;

  ${props => !props.isRegistered && 'filter: blur(5px);'};
`;

export const TopInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  width: 264px;
  height: 346px;
  border: 1px solid;
  border-radius: 10px;
`;

export const CarouselZoomInBtn = styled.div`
  display: flex;
  position: relative;
  top: 288px;
  right: 40px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

export const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  width: 618px;
`;

export const Nickname = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

export const AgeGenderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 130px;
  height: 30px;
  justify-content: space-between;
`;

export const Age = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #797979;
  border-radius: 60px;
  width: 60px;
  font-size: 18px;
  font-weight: 500;
`;

export const Gender = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #797979;
  border-radius: 60px;
  width: 56px;
  font-size: 18px;
  font-weight: 500;
`;

export const HorizontalLine1 = styled.div`
  display: flex;
  width: 618px;
  height: 0px;
  border: 1px solid #797979;
  margin-top: 20px;
  opacity: 0.3;
`;

export const Row2 = styled.div`
  display: flex;  
  flex-direction: row;
  align-items: center;
  width: 618px;
  height: 60px;
`;

export const Title = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 800;
  color: #797979;
`;

export const Address = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  color: #797979;
  margin-left: 172px; 
`;

export const HorizontalLine2 = styled.div`
  width: 618px;
  height: 0px;
  border: 1px solid #797979;
  opacity: 0.3;
`;

export const Row3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 618px;
  height: 60px;
`;

export const Job = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  color: #797979;
  margin-left: 92px; 
`;

export const HorizontalLine3 = styled.div`
  width: 618px;
  height: 0px;
  border: 1px solid #797979;
  opacity: 0.3;
`;

export const Row4 = styled.div`
  display: flex;
  flex-direction: column;
  width: 618px;
  height: 188px;
`;

export const PersonalityTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 800;
  color: #797979;
  margin-top: 20px;
`;

export const PersonalityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr 1fr 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  width: 617px;
  margin-top: 16px;
`;

export const PersonalityItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 195px;
  height: 56px;
  border-radius: 10px;
  background-color: #804DD3;
  color: white;
  font-size: 18px;
  font-weight: 800;
`;

export const BottomInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 260px;
  margin-top: 40px;
`;

export const IntroduceTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 800;
  color: #797979;
`;

export const Introduce = styled.div`
  display: flex;
  width: 920px;
  height: 208px;
  padding: 28px;
  background-color: #eee;
  border-radius: 10px;
  border: 1px solid #797979;
  margin-top: 20px;
  color: #797979;
`;

export const NotRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
  left: 50%;
  background-color: white;
  transform: translate(-50%, 50%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const LockImage = styled.img`
  display: flex;
`;

export const RegisterGuideMent = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  white-space: pre-line;
  margin-top: 20px;
  /* line-height: 20px; */
`;

export const RegisterGuideMent_strong = styled.div`
  font-weight: 800;
  white-space: pre-line;
`;

export const RegisterProfileBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 260px;
  height: 56px;
  background-color: #804DD3;
  margin-top: 40px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;


export const TabContainer2 = styled.div`
  display: flex;
  width: 100%;
`;

export const LeftTab2 = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 500;
  width: 50%;
  color: #797979;
  text-align: center;
  line-height: 100%;
  justify-content: center;
  border-bottom: 2px solid #797979;
  opacity: 80%;
`;

export const RightTab2 = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 800;
  width: 50%;
  color: #5E1EC7;
  line-height: 100%;
  text-align: center;
  justify-content: center;
  border-bottom: 3.5px solid #5E1EC7;
`;
