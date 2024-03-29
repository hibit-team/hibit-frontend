import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";
import LayoutTemplate from "../../components/Common/LayoutTemplate";
import FsLightbox from "fslightbox-react";
import ImageCarousel from "../../components/OtherProfile/ImageCarousel";
import ZoomInIcon from "../../images/components/OtherProfile/ZoomInIcon.svg";
import LockIcon from "../../images/components/OtherProfile/LockIcon.png";
import useLoginInfo from "../../hooks/useLoginInfo";
import OtherprofileAPI from "../../api/OtherprofileAPI";
import { useRecoilValue } from "recoil";
import { profileRegisteredState } from "../../recoil/atom/LoginInfoState";
import GoogleTagManager from "../../components/TagManager";
const OtherProfile = () => {
  const idParams = useParams();
  const userID = Number(idParams.userID?.replace(":", ""));

  const navigate = useNavigate();
  
  const [isTabLeft, setIsTabLeft] = useState<boolean>(true);
  const onClickTab = () => {
    setIsTabLeft(true);
  };

  const loginInfo = useLoginInfo();
  // 프로필 등록 or 미등록 유저에 따른 조건부 렌더링
  const isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);
  
  // 이미지 미리보기 toggle
  const [imgToggler, setImgToggler] = useState(false);
  
  const [nickname, setNickname] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string | undefined>();
  const [personalities, setPersonalities] = useState<string[]>([]);
  const [introduce, setIntroduce] = useState<string | undefined>();

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [job, setJob] = useState<string | undefined>();
  const [imgs, setImgs] = useState<string[]>(['https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/og.png']);
  const [mainImg,setMainImg] = useState<string[]>(['https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/og.png']);
  // 타인 선택정보 공개 여부에 따른 조건부 렌더링
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [isJobOpen, setIsJobOpen] = useState(true);
  const [isImgOpen, setIsImgOpen] = useState(true);

  useEffect(() => {
    if(!userID) {
      alert("존재하지 않는 유저입니다.");
      navigate(-1);
    }
    else {
   
      OtherprofileAPI.getOtherProfile(Number(userID))
        .then((res) => {
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

          if(res.jobVisibility === 1) { //서버에서는 공개가 0 이고, 비공개가 1로 받아오는중
            setIsJobOpen(true);
          } else {
            setIsJobOpen(false);
          }

          if(res.addressVisibility === 1) {
            setIsAddressOpen(true);
          } else {
            setIsAddressOpen(false);
          }

          if(res.subImgVisibility === 1) {
            setIsImgOpen(true);
          } else {
            setIsImgOpen(false);
          }

          if(res.subImg){ //공개
              const subImgs: string[] = res.subImg;
              setImgs(subImgs);
            }
          else{ //비공개
            const mainImg: string = res.mainImg;
            setImgs([mainImg])
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
  const onClickRegisterBtn = () => {
    navigate("/post-profile");
  };

  const location = useLocation();
  useEffect(() => {
    const removeFsLightboxClass = () => {
      document.documentElement.classList.remove('fslightbox-open');
    };
    return ()=>{
      removeFsLightboxClass()
    }
  }, [location]);

  return (
    <LayoutTemplate>
      <GoogleTagManager gtmId="GTM-5LL38ZTW" />
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

              <s.ProfileContainer isRegistered={isProfileRegistered ? true : false }>
                <s.TopInfoContainer>
                  <s.CarouselWrapper>
                    <ImageCarousel imgs={imgs} />
                    <div style={{position:'relative'}}>
                      <s.CarouselZoomInBtn onClick={() => setImgToggler(!imgToggler)}>
                        <img src={ZoomInIcon} alt="zoom-in" />
                      </s.CarouselZoomInBtn>
                    </div>
                  </s.CarouselWrapper>
                  { isProfileRegistered ? 
                      imgs && imgs.length > 1?
                        <FsLightbox 
                          toggler={imgToggler}
                          sources={
                            imgs?.map((img, idx) => {
                              return <img src={img} alt={`img-${idx}`}/>
                            })
                          }/>
                        : 
                        <FsLightbox 
                          toggler={imgToggler}
                          sources={ imgs }/>
                      :
                      null
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
                        isAddressOpen ?
                        <s.Address>비공개</s.Address> :
                        <s.Address>{address} 거주</s.Address>
                      }
                    </s.Row2>
                    
                    <s.HorizontalLine2 />

                    <s.Row3>
                      <s.Title>직업 혹은 학교</s.Title>
                      {
                        !isJobOpen ?
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
                            <s.PersonalityItem key={idx}>{personality}</s.PersonalityItem>)
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
    </LayoutTemplate>
  )
};

export default OtherProfile;
