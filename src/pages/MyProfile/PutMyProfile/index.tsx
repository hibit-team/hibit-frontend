import React, { useCallback, useEffect, useRef, useState } from "react";
import * as s from "./styles";
import useIsMobile from "../../../hooks/useIsMobile";
import LayoutTemplateGray from "../../../components/Common/LayoutTemplateGray";
import { IProfile } from "../../../interfaces/Profile/IProfile";
import CheckIcon from "../../../images/components/Profile/CheckIcon.svg";
import UnCheckIcon from "../../../images/components/Profile/UnCheckIcon.svg";
import address_sido_sigugun from "../../../assets/data/address/address";
import ProfileImage from "../../../components/ProfileImage";
import WhitePlus from "../../../images/components/Profile/WhitePlus.svg";
import GrayPlus from "../../../images/components/Profile/GrayPlus.svg";
import CautionIcon from "../../../images/components/Profile/CautionIcon.svg";
import MyprofileAPI from "../../../api/MyprofileAPI";
import { useNavigate } from "react-router-dom";
import FileAPI from "../../../api/FileAPI";
import { IImage } from "../../../interfaces/IImage";
import useLoginInfo from "../../../hooks/useLoginInfo";

const PutMyProfile = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const navigate = useNavigate();

  let myProfileData: Promise<IProfile>;
  let userIdx: number | null = null;



  /* 필수 정보 */
  const [nickname, setNickname] = useState<string>("");
  const [firstNickname, setFirstNickname] = useState<string>("");
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }; 
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState<boolean>(true);
  const onClickDuplicateNickname = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (nickname) {
      MyprofileAPI.checkIsUniqueNickname(nickname)
        .then((res) => {
          if (res.unique) {
            alert("사용 가능한 닉네임입니다.");
            setIsNicknameDuplicated(false);
          }
          else {
            alert("이미 존재하는 닉네임입니다.");
            setIsNicknameDuplicated(true);
          }
        })
        .catch((e) => {
          console.error({e});
          return;
        })
    }

  }; // nickname
  
  const [age, setAge] = useState<number | null>(null);
  const onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(+e.target.value);
  }; // age

  const [gender, setGender] = useState<number | undefined>();
  const [personality, setPersonality] = useState<string[]>([]);
  const [allPersonalities, setAllPersonalities] = useState<string[]>([]);
  useEffect(() => {
    MyprofileAPI.getAllPersonalities()
      .then((res) => {
        setAllPersonalities(res);
      })
      .catch((e) => {
        console.error({e});
      });
  }, []);

  const [introduce, setIntroduce] = useState<string | undefined>();

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
  const [job, setJob] = useState<string | undefined>();
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
  
  const [imgURLs, setImgURLs]= useState<string[]>([]);
  const [imgs, setImgs]= useState<File[]>([]);
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
    if (imgURLs?.length === 3) {
      alert("이미지는 최대 3장까지 추가할 수 있습니다.");
      return;
    }

    const newImgs = [...(imgs) || []];
    newImgs.push(e.target.files[0]);
    setImgs(newImgs);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const newImgURL = [...(imgURLs || [])];
      newImgURL.push(reader.result as string);
      setImgURLs(newImgURL);
    };
  }, [imgs, setImgs, imgURLs, setImgURLs]);
  const onUploadImgBtnClick = useCallback(() => {
    if(!imgInputRef.current) return;
    imgInputRef.current.click();
  }, [])

  const onClickSendBtn = () => {
    
    if (!checkAllInfo()) {
      alert("모든 정보를 기입해야 합니다.");
      return;
    }
    console.log("???")
    
    if (imgURLs && imgURLs.length > 0) {
      const formData = new FormData();
      imgs.forEach((imageData) => {
        formData.append(`file`, imageData);
      });
      
      console.log(formData.getAll(`file`));
  
      FileAPI.postFiles(0, formData)
        .then((res) => {
          console.log({res});
          const imageResponse: IImage = {
            mainImage: "",
            subImages: []
          }

          imageResponse.mainImage = res?.data[0];
          if (res?.data[1].length > 0) {
            res?.data[1].forEach((url: string) => {
              imageResponse.subImages!.push(url);
            });
          }

          console.log("이미지 업로드 완료", imageResponse);

          const body: IProfile = {
            nickname: nickname,
            age: age!,
            gender: gender!,
            personality: personality,
            introduce: introduce,
            job: job,
            addressCity: address_sido,
            addressDistrict: address_sigungu,
            mainImg: imageResponse.mainImage,
            subImg: imageResponse.subImages!,
            jobVisibility: isJobChecked ? 1 : 0,
            addressVisibility: isAddressChecked ? 1: 0, 
            subImgVisibility: isImgChecked ? 1 : 0,
          }

          const userIdx = +localStorage.getItem('userIdx')!;
          MyprofileAPI.putMyProfile(userIdx, body)
            .then((res) => {
              console.log("put my profile res: ", {res});
            })
            .catch((e) => {
              console.error({e});
            });

        })
        .catch((e) => {
          console.error({e});
          
        });
    }
    
    else return;
  }


  const checkAllInfo = () => {
    if (nickname === undefined || nickname === "") {
      alert("닉네임 정보를 입력해 주세요.");
      return false;
    }
    


    loop1:
    if (age === undefined || age === 0 || +age! < 0) {
      alert("나이를 올바르게 입력해 주세요.");
      return false;
    }

    if (gender === undefined) {
      alert("성별 정보를 입력해 주세요.");
      return false;
    }

    if (personality.length === 0) {
      alert("본인의 성격을 1개 이상 입력해 주세요.");
      return false;
    }

    if (introduce === undefined || introduce === "") {
      alert("자기소개 정보를 입력해 주세요.");
      return false;
    }

    if (job === undefined || job === "") {
      alert("직업 정보를 입력해 주세요.");
      return false;
    }

    if (address_sido === undefined || address_sido === "") {
      alert("시/도 정보를 입력해 주세요.");
      return false;
    }

    if (address_sigungu === undefined || address_sigungu === "") {
      // console.log("시군구 없음");
      alert("시/군/구 정보를 입력해 주세요.");
      return false;
    }

    if (imgURLs.length < 2) {
      alert("이미지는 2장 이상을 등록해야 합니다.");
      return false;
    }

    if (isNicknameDuplicated) {
      if (firstNickname === nickname) {
        return true;
      }  
      alert("닉네임 중복 확인을 먼저 해 주세요.");
      return false;
    }

    return true;
  };

  const isProfileRegistered = useLoginInfo().isProfileRegistered;
  useEffect(() => {
    if (userIdx) {
      MyprofileAPI.getMyProfile(userIdx)
        .then((res) => {
          setNickname(res.nickname);
          setFirstNickname(res.nickname)
          setAge(res.age);
          setGender(res.gender);
          setPersonality([...res.personality]);
          setIntroduce(res.introduce);
          setJob(res.job);
          setIsJobChecked(res.jobVisibility);
          setAddress_sido(res.addressCity);
          setAddress_sigungu(res.addressDistrict);
          setIsAddressChecked(res.addressVisibility);
          
          const ret_ImgURLs = [];
          ret_ImgURLs.push(res.mainImg);

          const subImgArrayString: string = res.subImg;
          const arrayWithoutBrackets = subImgArrayString.slice(1, -1);
          const subImgArray = arrayWithoutBrackets.split(',').map(item => item.trim());
          ret_ImgURLs.push(subImgArray[0]);
          ret_ImgURLs.push(subImgArray[1]);
          setImgURLs(ret_ImgURLs);
          setIsImgChecked(res.subImgVisibility);
        })
      
    } else {
      alert("로그인을 먼저 진행해 주세요.");
      navigate("/");
    }

    if (!isProfileRegistered) {
      console.log("프로필정보가 등록되어 있지 않아 post-profile로 이동")
      navigate("/post-profile");
    }
  }, [userIdx]);

  
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
              <s.NicknameInput 
                disabled={!isEditMode} 
                placeholder={nickname ? `${nickname}` : "ex) 성수동프로감성러"} 
                value={nickname} 
                onChange={onChangeNickname}
                />
              <s.CheckIsDuplicateBtn 
                disabled={!isEditMode} 
                isEditMode={isEditMode}
                onClick={onClickDuplicateNickname}
                >중복확인</s.CheckIsDuplicateBtn>
            </s.NicknameContainer>

            <s.AgeContainer>
              <s.EssentialColumn>나이</s.EssentialColumn>
              <s.AgeInput
                disabled={!isEditMode} 
                placeholder={age ? `${age}` : "나이"} 
                type="number" 
                value={age ? age : ""}
                onChange={onChangeAge} 
              />
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
          <s.ExplainText>좌측 원을 클릭하면 해당 정보를 숨길 수 있어요.</s.ExplainText>
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
                    <s.ImageInputBox
                      name="file" 
                      type="file" 
                      accept="image/*" 
                      ref={imgInputRef} 
                      onChange={onUploadImg} />
                    {
                      isEditMode ? 
                      <img src={GrayPlus} alt="gray" /> :
                      <img src={WhitePlus} alt="white" />
                    }
                  </s.ImageAddBox>
                  {
                    imgURLs &&
                    imgURLs.map((item: string, idx: number) => (
                      <ProfileImage 
                        imgURL={item} 
                        isFirst={idx === 0 ? true : false}
                        isEditMode={isEditMode}
                        imgList={imgURLs}
                        setImgList={setImgURLs}
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