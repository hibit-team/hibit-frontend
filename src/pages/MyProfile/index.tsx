import React, { useCallback, useRef, useState } from "react";
import * as s from "./styles";
import useIsMobile from "../../hooks/useIsMobile";
import LayoutTemplateGray from "../../components/Common/LayoutTemplateGray";
import { IProfile } from "../../interfaces/Profile/IProfile";
import { tmpPersonality } from "../../assets/data/personality/tmpPersonality";
import CheckIcon from "../../images/components/Profile/CheckIcon.svg";
import UnCheckIcon from "../../images/components/Profile/UnCheckIcon.svg";
import address_sido_sigugun from "../../assets/data/address/address";
import ProfileImage from "../../components/Profile";
import WhitePlus from "../../images/components/Profile/WhitePlus.svg";
import GrayPlus from "../../images/components/Profile/GrayPlus.svg";
import CautionIcon from "../../images/components/Profile/CautionIcon.svg";

export interface IimgProps {
  imgURL: string;
  isFirst: boolean;
  isEditMode: boolean;
  imgList: string[];
  setImgList: (value: string[]) => void;
}

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
    address_sigugun: "구로구",
    img: [
      "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-1.png",
      "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-2.png",
      "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-3.png"
    ], 
  };

  const [nickname, setNickname] = useState<string>(receivedData.nickname);
  const [age, setAge] = useState<number>(receivedData.age);
  const [gender, setGender] = useState<number>(receivedData.gender);
  const [personality, setPersonality] = useState<string[]>(receivedData.personality);
  const [introduce, setIntroduce] = useState<string>(receivedData.introduce);
  // const [job, setJob] = useState<string | undefined>();
  const [job, setJob] = useState<string | undefined>(receivedData.job);
  const [address_sido, setAddress_sido] = useState<string | undefined>(receivedData.address_sido);
  const [isAddressChanged, setIsAddressChanged] = useState<boolean>(false);
  const [address_sigungu, setAddress_sigungu] = useState<string | undefined>(receivedData.address_sigugun);
  const [img, setImg] = useState<string[] | undefined | null>(receivedData.img);
  
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

  const onChangeIntroText = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIntroduce(e.target.value);
  const onChangeJob = (e: React.ChangeEvent<HTMLInputElement>) => setJob(e.target.value);

  const onChangeSIDO = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress_sido(e.target.value);
    setIsAddressChanged(true);
  }

  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    if(img?.length === 3) {
      alert("이미지는 최대 3장까지 추가할 수 있습니다.");
      return;
    }
    img?.push(e.target.files[0].name);
    const newImgList = JSON.parse(JSON.stringify(img));
    setImg(newImgList)
    // console.log(e.target.files[0].name);
  }, [img]);
  const onUploadImgBtnClick = useCallback(() => {
    if(!imgInputRef.current) return;
    imgInputRef.current.click();
  }, [])

  
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
              <s.NicknameInput disabled={!isEditMode} placeholder={nickname} value={nickname} />
              <s.CheckIsDuplicateBtn disabled={!isEditMode} isEditMode={isEditMode}>중복확인</s.CheckIsDuplicateBtn>
            </s.NicknameContainer>

            <s.AgeContainer>
              <s.EssentialColumn>나이</s.EssentialColumn>
              <s.AgeInput disabled={!isEditMode} placeholder={`${age}`} type="number" value={age} />
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
            <s.IntroTextArea 
              disabled={!isEditMode} 
              placeholder={introduce} 
              onChange={(e) => onChangeIntroText(e)} 
              value={introduce}
            />
          </s.EssentialInfoWrapper>
        </s.EssentialInfoContainer>  
        
        <s.BottomTitleContainer>
          <s.Title>선택 노출 정보</s.Title>
        </s.BottomTitleContainer>

        <s.OptionalInfoContainer>
          <s.OptionalInfoWrapper>
              <s.JobContainer>
                { 
                  job ? 
                  <s.CheckBox src={CheckIcon} alt="checked" /> : 
                  <s.CheckBox src={UnCheckIcon} alt="unchecked" />
                }
                <s.OptionalColumn>직업 혹은 학교</s.OptionalColumn>
                <s.JobInput 
                  disabled={!isEditMode} 
                  placeholder={job} 
                  onChange={(e) => onChangeJob(e)} 
                  value={job}
                />
              </s.JobContainer>

              <s.AddressContainer>
                { 
                  address_sido ? 
                  <s.CheckBox src={CheckIcon} alt="checked" /> : 
                  <s.CheckBox src={UnCheckIcon} alt="unchecked" />
                }
                <s.OptionalColumn>주소</s.OptionalColumn>
                <s.AddressSIGU 
                  onChange={(e) => onChangeSIDO(e)} 
                  disabled={!isEditMode}
                >
                  {
                    address_sido ?
                    <option value={address_sido}>{address_sido}</option> :
                    <option value="">선택</option>
                  }
                  {
                    address_sido_sigugun
                      .sido
                      .map((sido) => (
                        <option 
                          key={`${sido}`} 
                          value={sido.codeNm}
                        >{sido.codeNm}</option>
                      )
                    )
                  }
                </s.AddressSIGU>
                <s.AddressSIGUGUN 
                  onChange={(e) => setAddress_sigungu(e.target.value)}
                  disabled={!isEditMode}
                >
                  {
                    address_sido_sigugun && !isAddressChanged ?
                    <option value={address_sigungu}>{address_sigungu}</option> :
                    <option value="">선택</option>
                  }
                  {
                    address_sido_sigugun.sigugun
                      .filter((item) => item.sido === address_sido)
                      .map((sigugun) => (
                          <option 
                            key={sigugun.sigugun} 
                            value={sigugun.codeNm}
                          >{sigugun.codeNm}</option>
                        )
                      )
                  }
                </s.AddressSIGUGUN>
              </s.AddressContainer>

              <s.ImageContainer>
                {
                  (img?.length !== 0) ? 
                  <s.CheckBox src={CheckIcon} alt="checked" /> : 
                  <s.CheckBox src={UnCheckIcon} alt="unchecked" />
                }
                <s.OptionalColumn>나의 사진</s.OptionalColumn>
                <s.ImageList>
                  <s.ImageAddBox disabled={!isEditMode} onClick={onUploadImgBtnClick}>
                    <s.ImageInputBox type="file" accept="image/*" ref={imgInputRef} onChange={onUploadImg} />
                    {
                      isEditMode ? 
                      <img src={GrayPlus} alt="gray" /> :
                      <img src={WhitePlus} alt="white" />
                    }
                  </s.ImageAddBox>
                  {
                    img?.map((item, idx) => (
                      <ProfileImage 
                        imgURL={item} 
                        isFirst={idx === 0 ? true : false}
                        isEditMode={isEditMode}
                        imgList={img}
                        setImgList={setImg}
                      />
                    ))
                  }
                </s.ImageList>
              </s.ImageContainer>
              <s.CautionContainer>
                <s.CautionImage>
                  <img src={CautionIcon} alt="caution" />
                </s.CautionImage>
                <s.CautionText>대표 이미지는 모든 유저에게 보여집니다.</s.CautionText>
              </s.CautionContainer>
            </s.OptionalInfoWrapper>
        </s.OptionalInfoContainer>
        <s.ButtonContainer>
          <s.CancelBtn isEditMode={isEditMode}>취소</s.CancelBtn>
          <s.SaveBtn isEditMode={isEditMode}>저장하기</s.SaveBtn>
        </s.ButtonContainer>
      </s.Wrapper>
    </LayoutTemplateGray>
  );
};

export default MyProfile;