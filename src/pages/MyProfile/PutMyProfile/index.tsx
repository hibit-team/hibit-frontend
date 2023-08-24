import React, { useCallback, useEffect, useRef, useState } from "react";
import * as s from "./styles";
import useIsMobile from "../../../hooks/useIsMobile";
import LayoutTemplateGray from "../../../components/Common/LayoutTemplateGray";
import { IProfile } from "../../../interfaces/Profile/IProfile";
import CheckIcon from "../../../images/components/Profile/CheckIcon.svg";
import UnCheckIcon from "../../../images/components/Profile/UnCheckIcon.svg";
import address_sido_sigugun from "../../../assets/data/address/address";
import ProfileImage from "../../../components/Profile";
import WhitePlus from "../../../images/components/Profile/WhitePlus.svg";
import GrayPlus from "../../../images/components/Profile/GrayPlus.svg";
import CautionIcon from "../../../images/components/Profile/CautionIcon.svg";
import MyprofileAPI from "../../../api/MyprofileAPI";
import { userIdxState } from "../../../recoil/atom/LoginInfoState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import useLoginInfo, { ILoginInfo } from "../../../hooks/useLoginInfo";
import FileAPI from "../../../api/FileAPI";

const PutMyProfile = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const navigate = useNavigate();

  let myProfileData: Promise<IProfile>;
  const userIdx = useRecoilValue(userIdxState);
  const loginInfo: ILoginInfo | undefined = useLoginInfo();

  useEffect(() => {
    if (userIdx) {
      myProfileData = MyprofileAPI.getMyProfile(userIdx);
    } else {
      alert("로그인을 먼저 진행해 주세요.");
    }
  }, [userIdx]);

  /* 필수 정보 */
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<number | undefined>(undefined);
  const [personality, setPersonality] = useState<string[]>([]);
  const [allPersonalities, setAllPerosonalities] = useState<string[]>([]);
  useEffect(() => {
    MyprofileAPI.getAllPersonalities()
      .then((res) => {
        setAllPerosonalities(res);
      })
      .catch((e) => {
        console.error({e});
      });
  }, []);

  const [introduce, setIntroduce] = useState<string | undefined>(undefined);

  const onClickCancelBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("변경 사항을 취소하시겠습니까?")) {
      window.alert("메인 화면으로 돌아갑니다.");
      navigate("/");
    }
  };

  const onClickEditBtn = () => {
    setIsEditMode(true);
  };

  const onClickPersonalityBtn = (item: string) => {
    if(!personality.includes(item) && personality.length > 4) {
      alert("최대 5개까지 선택 가능합니다.");
      return;
    }
    if(personality.includes(item)) {
      
      setPersonality(personality.filter((element) => element !== item));
    }
    else setPersonality([...personality, item]);
    
  };

  const onClickMaleBtn = () => setGender(0);
  const onClickFemaleBtn = () => setGender(1);
  const onChangeIntroText = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIntroduce(e.target.value);


  /* 선택 정보 */
  const [job, setJob] = useState<string | undefined>(undefined);
  const [isJobChecked, setIsJobChecked] = useState<boolean | undefined>(false);
  const onClickJobCheck = () => {
    if (!isEditMode) return;
    setIsJobChecked(!isJobChecked);
  };
  const onChangeJob = (e: React.ChangeEvent<HTMLInputElement>) => setJob(e.target.value);
  // 직업 혹은 학교

  const [address_sido, setAddress_sido] = useState<string | undefined>(undefined);
  const [address_sigungu, setAddress_sigungu] = useState<string | undefined>(undefined);
  const [isAddressChecked, setIsAddressChecked] = useState<boolean | undefined>(false);
  const onClickAddressCheck = () => {
    if (!isEditMode) return;
    setIsAddressChecked(!isAddressChecked);
  };
  const [isAddressChanged, setIsAddressChanged] = useState<boolean>(false);
  const onChangeSIDO = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress_sido(e.target.value);
    setIsAddressChanged(true);
  };
  // 주소
  
  const [img, setImg]: any = useState();
  const [isImgChecked, setIsImgChecked] = useState<boolean | undefined>(false);
  const onClickImgCheck = () => {
    if (!isEditMode) return;
    setIsImgChecked(!isImgChecked);
  };
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      console.log("이미지 파일 없음");
      return;
    }
    if (img?.length === 3) {
      alert("이미지는 최대 3장까지 추가할 수 있습니다.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
    reader.onload = () => {
      const newImg = [...(img || [])];
      newImg.push(reader.result as string);
      setImg(newImg);
    };
  }, [img, setImg]);
  const onUploadImgBtnClick = useCallback(() => {
    if(!imgInputRef.current) return;
    imgInputRef.current.click();
  }, [])

  const onClickSendBtn = () => {
    // 폼데이터로 이미지 업로드
    if (img && img.length > 0) {
      const formData = new FormData();
      img.forEach((imageData: any, index: number) => {
        formData.append(`file${index}`, imageData);
      });
  
      FileAPI.postFiles(0, formData)
        .then((res) => {
          console.log({res});
          // 이미지 업로드 된 url (응답) 받아서 최종 POST 요청

          const imageResponse = {
            mainImage: res?.data.mainImage,
            subImages: res?.data.subImages
          }

          const body: IProfile = {
            nickname: nickname,
            age: age,
            gender: gender,
            personality: personality,
            introduce: introduce,
            job: job,
            address_sido: address_sido,
            address_sigugun: address_sigungu,
            img: imageResponse
          }

          if (userIdx) {
            MyprofileAPI.putMyProfile(userIdx, body)
              .then((res) => {
                console.log("post my profile res: ", {res});
              })
              .catch((e) => {
                console.error({e});
              });
          } else {
            console.error("userIdx가 존재하지 않습니다.");
            alert("userIdx가 존재하지 않습니다.");
          }

        })
        .catch((e) => {
          console.error({e});
          
        });
    }
    
    else return;
  }

  
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
              {
                allPersonalities &&
                allPersonalities.map((item, idx) => { 
                  return (
                    <s.PersonalityItem 
                      disabled={!isEditMode} 
                      isSelected={personality.includes(item)}
                      onClick={() => onClickPersonalityBtn(item)}
                    >{item}</s.PersonalityItem>
                  )
                })
              }
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
                  isJobChecked ?
                  <s.CheckBox src={CheckIcon} alt="checked" onClick={onClickJobCheck} /> :
                  <s.CheckBox src={UnCheckIcon} alt="unchecked" onClick={onClickJobCheck} />
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
                  isAddressChecked ? 
                  <s.CheckBox src={CheckIcon} alt="checked" onClick={onClickAddressCheck} /> : 
                  <s.CheckBox src={UnCheckIcon} alt="unchecked" onClick={onClickAddressCheck} />
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
                  isImgChecked ?
                  <s.CheckBox src={CheckIcon} alt="checked" onClick={onClickImgCheck}/> : 
                  <s.CheckBox src={UnCheckIcon} alt="unchecked" onClick={onClickImgCheck}/>
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
                    img &&
                    img.map((item: string, idx: number) => (
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
          <s.CancelBtn 
            isEditMode={isEditMode}
            onClick={onClickCancelBtn}>취소</s.CancelBtn>
          <s.SaveBtn
           isEditMode={isEditMode}
           onClick={onClickSendBtn}>저장하기</s.SaveBtn>
        </s.ButtonContainer>
      </s.Wrapper>
    </LayoutTemplateGray>
  );
};

export default PutMyProfile;