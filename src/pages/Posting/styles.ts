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

export const ExhibitionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const ExhibitionSelect = styled.select`
  display: flex;
  width: 300px;
  height: 56px;
  margin-left: 50px;
  border-radius: 10px;
  border: 1px solid #797979;
  padding-left: 20px;
  font-family: 'SUIT';
  font-size: 18px;
  font-weight: 500;
  color: #797979;
`;

export const ExhibitionOption = styled.option`
  display: flex;
`;

export const PersonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const PersonSelect = styled.select`
  display: flex;
  width: 300px;
  height: 56px;
  margin-left: 50px;
  border-radius: 10px;
  border: 1px solid #797979;
  padding-left: 20px;
  font-family: 'SUIT';
  font-size: 18px;
  font-weight: 500;
  color: #797979;
`;

export const PersonOption = styled.option`
  display: flex;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

export const DateColumn = styled.div`
  display: flex;
  width: 170px;
  font-size: 22px;
  font-weight: 500;
  margin-top: 20px;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 6px;
  align-items: center;
`;

export const AddDateBtn = styled.img`
  display: flex;
  margin-left: 10px;
  margin-top: 16px;
`;

export const DateSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fill);
  margin-left: 50px;
  row-gap: 20px;
  column-gap: 20px;
`;

export const OpenChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const OpenChatInput = styled.input`
  display: flex;
  margin-left: 50px;
  width: 300px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid #797979;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  font-family: 'SUIT';
  font-size: 18px;
`;

export const OpenchatGuideBtn = styled.img`
  display: flex;
  margin-left: 20px;
  cursor: pointer;
`;

export const OpenchatGuideMent = styled.div`
  display: flex;
  color: #797979;
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
`;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const ActivityGrid = styled.div`
  display: grid;
  margin-left: 50px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
`;

interface ISelected {
  isSelected: boolean;
};

export const Activity = styled.div<ISelected>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 56px;
  cursor: pointer;
  
  border-radius: 10px;
  color: ${(props) => !props.isSelected ? '#797979' : 'white'};
  border: ${(props) => !props.isSelected ? '1px solid #797979' : ""};
  background-color: ${(props) => !props.isSelected ? "white" : "#5E1EC7"};
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const DetailInputWrapper = styled.div`
  display: flex;
  width: 680px;
  height: 172px;
`;

export const DetailInput = styled.textarea`
  display: flex;
  width: 100%;
  height: 172px;
  box-sizing: border-box;
  padding: 20px;
  resize: none;
  color: #797979;
  font-family: 'SUIT';
  font-size: 18px;
  font-weight: 500;
  margin-left: 50px;
  border-radius: 10px;
  border: 1px solid #797979;
`;

export const DetailLengthChecker = styled.div`
  display: flex;
  position: relative;
  top: 60px;
  right: 70px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #c9c9c9;
`;

export const DetailLengthNum = styled.div`
  display: flex;
`;

export const DetailMaxLength = styled.div`
  display: flex;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const ImageList = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImageAddBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 46px;
  
  background-color: #EEEEEE;
  cursor: pointer;
`;

export const ImageInputBox = styled.input`
  /* display: flex; */
  width: 140px;
  height: 140px;
  display: none;
`;

export const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-left: 623px;
  width: 218px;
  height: 72px;
  border: 1px solid #5E1EC7;
  border-radius: 10px;
  color: #5E1EC7;
  background-color: #D8C9F2;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border: 1px solid #5E1EC7;
    background-color: #5E1EC7;
    color: white;
    font-weight: 800;
  };
`;