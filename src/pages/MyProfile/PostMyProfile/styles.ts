import styled from "@emotion/styled";

interface IEditMode {
  isEditMode: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
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
  font-size: 24px;
  font-weight: 800;
  color: #797979;
`;

export const EditBtn = styled.div<IEditMode>`
  display: ${(props) => props.isEditMode ? "none" : "none"};
  width: 140px;
  height: 48px;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid;
  border-color: #5E1EC7;
  border-radius: 10px;
  background-color: #D8C9F2;
  font-weight: 500;
  color: #5E1EC7;
  cursor: pointer;
  &:hover{
    background-color: #5E1EC7;
    color: white;
    font-weight: 800;
  }
`;

export const EssentialInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  background-color: white;
  margin-top: 20px;
`;

export const EssentialInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 840px;
  margin: 40px;
`;

export const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
`;

export const EssentialColumn = styled.div`
  display: flex;
  width: 70px;
  font-size: 22px;
  font-weight: 500;
`;

export const NicknameInput = styled.input`
  display: flex;
  width: 460px;
  height: 56px;
  font-size: 18px;
  padding-left: 20px;
  border: 1px solid #797979;
  border-radius: 10px;
  font-family: 'SUIT';

  &:disabled {
    cursor: default;
    background-color: #EEEEEE;
  }

  margin-left: 150px;
`;

export const CheckIsDuplicateBtn = styled.button`
  display: flex;
  width: 140px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
  font-size: 18px;
  font-family: 'SUIT';
  &:hover {
    background: #804DD3;
    color: white;
  }
`;

export const AgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 56px;
  align-items: center;
  margin-top: 20px;
`;

export const AgeInput = styled.input`
  display: flex;
  width: 300px;
  height: 56px;
  font-size: 18px;
  padding-left: 20px;
  border: 1px solid #797979;
  border-radius: 10px;
  font-family: 'SUIT';

  &:disabled {
    cursor: default;
    background-color: #EEEEEE;
  }

  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }  

  margin-left: 147px;
`;

export const GenderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 56px;
  align-items: center;
  margin-top: 20px;
`;

interface IGender {
  isMale?: boolean;
  isFemale?: boolean;
  selected: boolean;
};

export const GenderMaleBtn = styled.button<IGender>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #797979;
  font-size: 18px;
  width: 140px;
  height: 56px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 147px;
  font-family: 'SUIT';

  background-color: ${(props) => props.selected ? "#804DD3" : "white"};
  font-weight: ${(props) => props.selected ? "800" : "500"};
  color: ${(props) => props.selected ? "white" : "#797979"};
  &:disabled {
    cursor: not-allowed;
    font-weight: 500;
    color: #797979;
    background-color: ${(props) => props.isMale ? "#EEEEEE" : "white"};
  }
  cursor: pointer;
`;

export const GenderFemaleBtn =  styled.button<IGender>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #797979;
  font-size: 18px;
  width: 140px;
  height: 56px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 20px;
  font-family: 'SUIT';

  background-color: ${(props) => props.selected ? "#804DD3" : "white"};
  font-weight: ${(props) => props.selected ? "800" : "500"};
  color: ${(props) => props.selected ? "white" : "#797979"};
  &:disabled {
    cursor: not-allowed;
    font-weight: 500;
    color: #797979;
    background-color: ${(props) => props.isFemale ? "#EEEEEE" : "white"};
  }
  cursor: pointer;
`;

export const HorizontalLine = styled.div`
  display: flex;
  width: 840px;
  border: 1px solid #c9c9c9;
  margin-top: 36px;
`;

export const EssentialColumn2 = styled.div`
  display: flex;
  font-size: 22px;
  font-weight: 500;
  margin-top: 32px;
`;

export const PersonalityTable = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  column-gap: 20px;
`;

interface ISelected {
  isSelected: boolean;
};

export const PersonalityItem = styled.button<ISelected>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 195px;
  height: 56px;
  margin-top: 20px;
  font-size: 18px;
  border: 1px solid #797979;
  border-radius: 10px;
  font-family: 'SUIT';
  
  &:disabled {
    cursor: not-allowed;
    color: #797979;
    background: ${(props) => props.isSelected ? "#EEEEEE" : "white"};
  }
  
  cursor: pointer;
  background: ${(props) => props.isSelected ? "#804DD3" : "white"};
  color: ${(props) => props.isSelected ? "white" : "#797979"};
  font-weight: ${(props) => props.isSelected ? "800" : "500"};
`;

export const IntroTextArea = styled.textarea`
  display: flex;
  width: 840px;
  height: 208px;
  margin-top: 20px;
  padding: 28px;
  box-sizing: border-box;
  resize: none;
  font-family: 'SUIT';
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #797979;
  border-radius: 10px;
`;

export const BottomTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 40px;
`;

export const OptionalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 920px;
  height: 416px;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  background-color: white;
  margin-top: 20px;
`;

export const OptionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 840px;
  margin: 40px;
`;

export const CheckBox = styled.img`
  display: flex;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const JobContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
`;

export const JobInput = styled.input`
  display: flex;
  width: 460px;
  height: 56px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 46px;
  box-sizing: border-box;
  padding-left: 20px;
  font-family: 'SUIT';
  font-size: 18px;
  background-color: white;

  &:disabled {
    background-color: #EEEEEE;
  }
`;

export const OptionalColumn = styled.div`
  display: flex;
  width: 130px;
  font-size: 22px;
  font-weight: 500;
  margin-left: 20px;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  margin-top: 20px;
`;

export const AddressSIGU = styled.select`
  display: flex;
  box-sizing: border-box;
  padding-left: 20px;
  width: 300px;
  height: 56px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 46px;
  font-family: 'SUIT';
  font-size: 18px;

  &:disabled {
    background-color: #EEEEEE;
    color: black;
    border-color: #797979;
  }
`;

export const AddressSIGUGUN = styled.select`
  display: flex;
  box-sizing: border-box;
  padding-left: 20px;
  width: 300px;
  height: 56px;
  border: 1px solid #797979;
  border-radius: 10px;
  margin-left: 20px;
  font-family: 'SUIT';
  font-size: 18px;

  &:disabled {
    background-color: #EEEEEE;
    color: black;
    border-color: #797979;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 140px;
  margin-top: 20px;
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
  
  &:disabled {
    background-color: #C9C9C9;
    cursor: not-allowed;
  }
  background-color: #EEEEEE;
  cursor: pointer;
`;

export const ImageInputBox = styled.input`
  /* display: flex; */
  width: 140px;
  height: 140px;
  display: none;
`;

export const ImageWrapper = styled.div`
  display: flex;
  width: 140px;
  height: 140px;
`;

export const CautionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-left: 220px;
`;

export const CautionImage = styled.div`
  display: flex;
`;

export const CautionText = styled.div`
  display: flex;
  color: #797979;
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 60px;
`;

export const CancelBtn = styled.button<IEditMode>`
  display: ${(props) => props.isEditMode ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  width: 217px;
  height: 72px;
  margin-right: 33px;
  font-family: 'SUIT';
  font-size: 22px;
  font-weight: 500;
  background-color: #EEEEEE;
  color: #797979;
  border: 1px solid #797979;
  border-radius: 10px;

  &:hover {
    font-weight: 800;
    background-color: #C9C9C9;
  }
`;

export const SaveBtn = styled.button<IEditMode>`
  display: ${(props) => props.isEditMode ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  width: 217px;
  height: 72px;
  font-family: 'SUIT';
  font-size: 22px;
  font-weight: 500;
  background-color: #D8C9F2;
  color: #5E1EC7;
  border: 1px solid #5E1EC7;
  border-radius: 10px;

  &:hover {
    font-weight: 800;
    background-color: #5E1EC7;
    color: white;
  }
`;