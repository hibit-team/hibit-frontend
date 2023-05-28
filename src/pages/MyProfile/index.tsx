import React, { useState } from "react";
import * as s from "./styles";
import useIsMobile from "../../hooks/useIsMobile";
import LayoutTemplateGray from "../../components/Common/LayoutTemplateGray";
import { IProfile } from "../../interfaces/Profile/IProfile";
import { tmpPersonality } from "../../assets/data/personality/tmpPersonality";

const MyProfile = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /* 초기에 받은 data */
  const receivedData: IProfile = {
    nickname: "망고조아",
    age: 27,
    gender: 0,
    personality: ["지적인", "차분한"],
    introduce: "오늘은 축구가 땡긴다",
    job: "숭실대학교",
    address_sido: "서울특별시",
    address_sigungu: "구로구",
    img: ["url1", "url2"], 
  };

  const [nickname, setNickname] = useState<string>(receivedData.nickname);
  const [age, setAge] = useState<number>(receivedData.age);
  const [gender, setGender] = useState<number>(receivedData.gender);
  const [personality, setPersonality] = useState<string[]>(receivedData.personality);
  const [introduce, setIntroduce] = useState<string>(receivedData.introduce);
  const [job, setJob] = useState<string | undefined>(receivedData.job);
  const [address_sido, setAddress_sido] = useState<string | undefined>(receivedData.address_sido);
  const [address_sigungu, setAddress_sigungu] = useState<string | undefined>(receivedData.address_sigungu);
  const [img, setImg] = useState<string[] | undefined>(receivedData.img);
  
  /* 성격 리스트 - api로 받아 올 부분 */
  const personalityList = tmpPersonality;

  /* 수정이 반영된 데이터: `취소` 버튼 클릭 시 receivedData로 다시 초기화 */
  const sendData: IProfile = receivedData;

  const onClickEditBtn = () => {
    setIsEditMode(true);
  };

  const onClickPersonalityBtn = (item: string) => {
    if(!personality.includes(item) && personality.length > 4) {
      alert("최대 5개");
      return;
    }
    if(personality.includes(item)) setPersonality(personality.filter((element) => element !== item));
    else setPersonality([...personality, item]);
  };

  const onClickMaleBtn = () => setGender(0);
  const onClickFemaleBtn = () => setGender(1);

  if(useIsMobile()) {
    return (
      <>
    
      </>
    )
  }

  return (
    <LayoutTemplateGray>
      <s.Wrapper>
        <s.TopTitleWrpper>
          <s.Title>필수 노출 정보</s.Title>
          <s.EditBtn isEditMode={isEditMode} onClick={onClickEditBtn}>수정하기</s.EditBtn>
        </s.TopTitleWrpper>

        <s.EssentialInfoContainer>
          <s.EssentialInfoWrapper>
            <s.NicknameContainer>
              <s.EssentialColumn>닉네임</s.EssentialColumn>
              <s.NicknameInput disabled={!isEditMode} placeholder={nickname}/>
              <s.CheckIsDuplicateBtn disabled={!isEditMode} isEditMode={isEditMode}>중복확인</s.CheckIsDuplicateBtn>
            </s.NicknameContainer>

            <s.AgeContainer>
              <s.EssentialColumn>나이</s.EssentialColumn>
              <s.AgeInput disabled={!isEditMode} placeholder={`${age}`} type="number"/>
            </s.AgeContainer>

            <s.GenderContainer>
              <s.EssentialColumn>성별</s.EssentialColumn>
              <s.GenderMaleBtn
                disabled={!isEditMode}
                isMale={gender === 0 ? true : false}
                selected={gender === 0 ? true : false}
                onClick={onClickMaleBtn}
              >남성</s.GenderMaleBtn>
              <s.GenderFemaleBtn
                disabled={!isEditMode}
                isFemale={gender === 1 ? true : false}
                selected={gender === 1 ? true : false}
                onClick={onClickFemaleBtn}
              >여성</s.GenderFemaleBtn>
            </s.GenderContainer>

            <s.HorizontalLine />
            <s.EssentialColumn2>본인의 성격을 골라주세요. (최대 5개)</s.EssentialColumn2>
            <s.PersonalityTable>
              {tmpPersonality.map((item, idx) => {
                return (
                  <s.PersonalityItem 
                    disabled={!isEditMode} 
                    isSelected={personality.includes(item)}
                    onClick={() => onClickPersonalityBtn(item)}
                  >{item}</s.PersonalityItem>
                )
              })}
            </s.PersonalityTable>


            <s.HorizontalLine />
            <s.EssentialColumn2>메이트에게 자신을 소개 해 주세요.</s.EssentialColumn2>
          </s.EssentialInfoWrapper>
        </s.EssentialInfoContainer>
        
        <s.BottomTitleContainer>
          <s.Title>선택 노출 정보</s.Title>
        </s.BottomTitleContainer>

        <s.OptionalInfoContainer>

        </s.OptionalInfoContainer>
      </s.Wrapper>
    </LayoutTemplateGray>
  );
};

export default MyProfile;