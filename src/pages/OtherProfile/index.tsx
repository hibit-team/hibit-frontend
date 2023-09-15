import { useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";
import LayoutTemplate from "../../components/Common/LayoutTemplate";
import FsLightbox from "fslightbox-react";
import ImageCarousel from "../../components/OtherProfile/ImageCarousel";
import ZoomInIcon from "../../images/components/OtherProfile/ZoomInIcon.svg";
import LockIcon from "../../images/components/OtherProfile/LockIcon.png";
import { GlobalModal } from "../../components/GlobalModal";
import useLoginInfo from "../../hooks/useLoginInfo";
import { Global } from "@emotion/react";
import OtherprofileAPI from "../../api/OtherprofileAPI";

const OtherProfile = () => {
  const idParams = useParams();
  const userID = idParams.userID;
  // console.log(userID);
  
  const [isTabLeft, setIsTabLeft] = useState<boolean>(true);
  const onClickTab = () => {
    setIsTabLeft(true);
  };

  const loginInfo = useLoginInfo();
  // 프로필 등록 or 미등록 유저에 따른 조건부 렌더링
  const [isProfileRegistered, setIsProfileRegistered] = useState(false);
  useEffect(() => {
    if(loginInfo.isProfileRegistered === 1) setIsProfileRegistered(true);
    else setIsProfileRegistered(false);
  }, [loginInfo]);
  
  // 이미지 미리보기 toggle
  const [imgToggler, setImgToggler] = useState(false);
  
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [personalities, setPersonalities] = useState<string[]>([]);
  const [introduce, setIntroduce] = useState("");
  const [imgs, setImgs] = useState<string[]>([]);
  
  // 타인 선택정보 공개 여부에 따른 조건부 렌더링
  const [isAddressPrivate, setIsAddressPrivate] = useState(true);
  const [isJobPrivate, setIsJobPrivate] = useState(true);
  const [isImgPrivate, setIsImgPrivate] = useState(true);

  useEffect(() => {
    if(!userID) {
      console.log("userID 없음.");
    }
    else {
      OtherprofileAPI.getOtherProfile(+userID)
        .then((res) => {
          console.log({res});
          setNickname(res.nickname);
          setAge(res.age);
          if(res.gender === 0) {
            setGender("남성");
          }
          else {
            setGender("여성");
          }

          setAddress(`${res.addressCity} ${res.addressDistrict}`);
          setJob(res.job);

          const newPersonalities: string[] = [...(res.personality || [])];
          setPersonalities(newPersonalities);

          setIntroduce(res.introduce);

          const mainImg: string = res.mainImg;
          const subImgs: string[] = res.subImg;
          const newImgs: string[] = [];
          newImgs.push(mainImg, ...subImgs);
          setImgs(newImgs);

          if(res.addressVisibility === 0) {
            setIsAddressPrivate(true);
          } else {
            setIsAddressPrivate(false);
          }

          if(res.subImgVisibility === 0) {
            setIsImgPrivate(true);
          } else {
            setIsImgPrivate(false);
          }

          if(res.jobVisibility === 0) {
            setIsJobPrivate(true);
          } else {
            setIsJobPrivate(false);
          }

          
        })
        .catch((e) => {
          console.error({e});
          return;
        })
    }

  }, []);

  const LockStr1 = "저런, ";
  const LockStr2 = "추가 사진";
  const LockStr3 = "과 ";
  const LockStr4 = "메이트 정보";
  const LockStr5 = "를 보려면\n";
  const LockStr6 = "회원님의 프로필 정보";
  const LockStr7 = "를 등록해야 해요.";


  const onClickUserHistoryTab = () => {
    alert("추후 공개될 기능입니다.");
    setIsTabLeft(true);
  };
  const navigate = useNavigate();
  const onClickRegisterBtn = () => {
    navigate("/post-profile");
  };

  return (
    <LayoutTemplate>
      <s.Wrapper>
        {
          isTabLeft ? (
            <s.TabContainer1>
              <s.Tabs>
                <s.LeftTab1>유저 프로필 정보</s.LeftTab1>
                <s.RightTab1 onClick={onClickUserHistoryTab}>유저 히스토리</s.RightTab1>
              </s.Tabs>

              {
                !isProfileRegistered ?
                  <s.NotRegisterContainer>
                    <s.LockImage 
                      src={LockIcon}
                      alt="lock"
                    />

                    <s.RegisterGuideMent>
                      {LockStr1}
                      <s.RegisterGuideMent_strong>{LockStr2}</s.RegisterGuideMent_strong>
                      {LockStr3}
                      <s.RegisterGuideMent_strong>{LockStr4}</s.RegisterGuideMent_strong>
                      {LockStr5}
                    </s.RegisterGuideMent>
                    <s.RegisterGuideMent>
                      <s.RegisterGuideMent_strong>{LockStr6}</s.RegisterGuideMent_strong>
                        {LockStr7}
                    </s.RegisterGuideMent>

                    <s.RegisterProfileBtn
                      onClick={onClickRegisterBtn}
                    >내 프로필 등록하기</s.RegisterProfileBtn>
                  </s.NotRegisterContainer> :
                  null
              }

              <s.NotRegisterContainer>

              </s.NotRegisterContainer>

              <s.ProfileContainer isRegistered={isProfileRegistered ? isProfileRegistered : false }>
                <s.TopInfoContainer>
                  <s.CarouselWrapper>
                    <ImageCarousel />
                    <s.CarouselZoomInBtn onClick={() => setImgToggler(!imgToggler)}>
                      <img src={ZoomInIcon} alt="zoom-in" />
                    </s.CarouselZoomInBtn>
                  </s.CarouselWrapper>
                  {
                    isProfileRegistered ?
                      <FsLightbox 
                      toggler={imgToggler}
                      sources={imgs}  
                      />
                      :
                      <FsLightbox 
                      toggler={imgToggler}
                      sources={[
                        "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/blur1.jpg",
                        "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/blur2.jpg",
                        "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/blur3.jpg"
                      ]}  
                      />
                  }

                  <s.UserInfoContainer>
                    <s.Row1>
                      <s.Nickname>{nickname}</s.Nickname>
                      <s.AgeGenderContainer>
                        <s.Age>{age}세</s.Age>
                        <s.Gender>{gender}</s.Gender>
                      </s.AgeGenderContainer>
                    </s.Row1>

                    <s.HorizontalLine1 />
                    
                    <s.Row2>
                      <s.Title>주소</s.Title>
                      {
                        isAddressPrivate ?
                        <s.Address>비공개</s.Address> :
                        <s.Address>{address} 거주</s.Address>
                      }
                    </s.Row2>
                    
                    <s.HorizontalLine2 />

                    <s.Row3>
                      <s.Title>직업 혹은 학교</s.Title>
                      {
                        isJobPrivate ?
                        <s.Job>비공개</s.Job> :
                        <s.Job>{job}</s.Job>
                      }
                    </s.Row3>

                    <s.HorizontalLine3 />

                    <s.Row4>
                      <s.PersonalityTitle>
                        {nickname}님의 성격은 아래와 같아요
                      </s.PersonalityTitle>
                      <s.PersonalityGrid>
                        {
                          personalities.map((personality, idx) => 
                            <s.PersonalityItem>{personality}</s.PersonalityItem>)
                        }
                      </s.PersonalityGrid>
                    </s.Row4>

                  </s.UserInfoContainer>
                </s.TopInfoContainer>

                <s.BottomInfoContainer>
                  <s.IntroduceTitle>
                    메이트에게 자신을 소개 해주세요.
                  </s.IntroduceTitle>
                  <s.Introduce>{introduce}</s.Introduce>
                </s.BottomInfoContainer>
              </s.ProfileContainer>
            </s.TabContainer1>
          ) : (
            <s.TabContainer2>
              <s.Tabs>
                <s.LeftTab2 onClick={onClickTab}>유저 프로필 정보</s.LeftTab2>
                <s.RightTab2>유저 히스토리</s.RightTab2>
              </s.Tabs>
            </s.TabContainer2>
          )
        }
      </s.Wrapper>
      { isProfileRegistered !== false ? <GlobalModal/> : undefined }
    </LayoutTemplate>
  )
};

export default OtherProfile;
