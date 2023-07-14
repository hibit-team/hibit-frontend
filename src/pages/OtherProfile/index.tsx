import { useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useState } from "react";
import LayoutTemplate from "../../components/Common/LayoutTemplate";
import FsLightbox from "fslightbox-react";
import ImageCarousel from "../../components/OtherProfile/ImageCarousel";
import ZoomInIcon from "../../images/components/OtherProfile/ZoomInIcon.svg";
import LockIcon from "../../images/components/OtherProfile/LockIcon.png";

const OtherProfile = () => {
  const idParams = useParams();
  const userID = idParams.userID;
  // console.log(userID);

  // 프로필 등록 or 미등록 유저에 따른 조건부 렌더링 -> 레이어 하나 추가 여부만 달라짐
  const [isProfileRegistered, setIsProfileRegistered] = useState(true);


  const [isTabLeft, setIsTabLeft] = useState<boolean>(true);
  const onClickTab = () => {
    setIsTabLeft(true);
  };

  // 이미지 미리보기 toggle
  const [imgToggler, setImgToggler] = useState(false);

  const [nickname, setNickname] = useState("제임스는 행복해요");
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState("남성");
  const [address, setAddress] = useState("면준구 상준동");
  const [job, setJob] = useState("골드만삭스 애널리스트");
  const [personalities, setPersonalities] = useState([
    "차분한", "유머있는", "낙천적인", "외향적인", "개멋짐(?)"
  ]);
  const [introduce, setIntroduce] = useState("안녕하세요. 해치지 않아요. 함께 해요");

  const LockStr1 = "저런, ";
  const LockStr2 = "추가 사진";
  const LockStr3 = "과 ";
  const LockStr4 = "메이트 정보";
  const LockStr5 = "를 보려면\n";
  const LockStr6 = "회원님의 프로필 정보";
  const LockStr7 = "를 등록해야 해요.";

  const navigate = useNavigate();
  const onClickRegisterBtn = () => {
    navigate("/profile");
  };

  const onClickUserHistoryTab = () => {
    alert("추후 공개될 기능입니다.");
    setIsTabLeft(true);
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

              <s.ProfileContainer isRegistered={isProfileRegistered}>
                <s.TopInfoContainer>
                  <s.CarouselWrapper>
                    <ImageCarousel />
                    <s.CarouselZoomInBtn onClick={() => setImgToggler(!imgToggler)}>
                      <img src={ZoomInIcon} alt="zoom-in" />
                    </s.CarouselZoomInBtn>
                  </s.CarouselWrapper>
                  <FsLightbox 
                    toggler={imgToggler}
                    sources={[
                      'https://i.imgur.com/fsyrScY.jpg',
					            'https://i.imgur.com/fsyrScY.jpg',
                      'https://i.imgur.com/fsyrScY.jpg'
                    ]}  
                  />

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
                      <s.Address>{address} 거주</s.Address>
                    </s.Row2>
                    
                    <s.HorizontalLine2 />

                    <s.Row3>
                      <s.Title>직업 혹은 학교</s.Title>
                      <s.Job>{job}</s.Job>
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
    </LayoutTemplate>
  )
};

export default OtherProfile;
