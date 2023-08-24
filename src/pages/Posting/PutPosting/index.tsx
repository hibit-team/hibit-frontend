import { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutTemplateGray from "../../../components/Common/LayoutTemplateGray";
import useIsMobile from "../../../hooks/useIsMobile";
import CalendarComponent from "../../../components/CalendarComponent";
import * as s  from "./styles";
import AddBtn from "../../../images/components/Posting/AddBtn.svg";
import OpenchatGuide from "../../../images/components/Posting/OpenchatGuide.svg";
import GrayPlus from "../../../images/components/Profile/GrayPlus.svg";
import ProfileImage from "../../../components/Profile";

const tmpExhibitionData = [
  "로그아웃 전시회", "전시회2", "전시회3", "전시회4"
];

const activityData_Imoji = [
  "맛집 가기😋", "카페 가기☕", "전시만 보기👓", "만나서 정해요!"
];

const activityData = [
  "맛집 가기", "카페 가기", "전시만 보기", "만나서 정해요!"
];

const testImgs: string[] = [
  // "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-1.png",
  // "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-2.png",
  // "https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/Group-3.png"
];

const PutPosting = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length >= 31) {
      alert("최대 30자까지 작성할 수 있어요.");
      e.target.value = e.target.value.slice(0, e.target.value.length-1);
      return;
    }
    setTitle(e.target.value);
  };

  const [exhibition, setExhibition] = useState(tmpExhibitionData[0])
  const onChangeExhibition = (e: ChangeEvent<HTMLSelectElement>) => {
    setExhibition(e.target.value);
  };

  const personCnt = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [person, setPerson] = useState(personCnt[0]);
  const onChangePerson = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerson(Number(e.target.value));
  };

  const [dateCnt, setDateCnt] = useState<number[]>([1]);
  const onClickAddBtn = () => {
    if(dateCnt.length === 5) {
      alert("최대 5개까지 등록할 수 있어요.");
      return;
    };
    setDateCnt([...dateCnt, 1]);
  };

  const [openchat, setOpenchat] = useState("");
  const onChangeOpenchat = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenchat(e.target.value);
  };

  const [isActivitySelect, setIsActivitySelect] = useState(-1);
  const onClickActivity = (idx: number) => {
    setIsActivitySelect(idx);
  };

  const detailPlaceholder = "본인의 전시 관람 스타일, 메이트를 구하는 목적을 자세히 작성하면 매칭 성공률이 높아져요.";
  const [detail, setDetail] = useState("");
  const onChangeDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length >= 201) {
      alert("최대 200자까지 작성할 수 있어요.");
      e.target.value = e.target.value.slice(0, e.target.value.length-1);
      return;
    }
    setDetail(e.target.value);
  };

  const [img, setImg] = useState<string[] | undefined | null>(testImgs);
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
  }, []);

  const onClickSubmitBtn = () => {
    if (window.confirm("매칭 게시글을 수정하시겠습니까?")) {
      alert("게시글이 수정되었습니다.");
      // submit api 추가 필요
      navigate(-1);
    }
    else return;
  };



  if(isMobile) {
    return (
      <>
      </>
    )
  }

  return (
    <LayoutTemplateGray>
      <s.Wrapper>
        <s.Title>게시글 작성하기</s.Title>
        <s.InfoContainer>
          <s.InfoWrapper>
            <s.PostTitleContainer>
              <s.Column>게시글 제목</s.Column>
              <s.TitleInputWrapper>
                <s.TitleInput 
                  placeholder="내용을 입력하세요"
                  onChange={onChangeTitle}
                />
                <s.LengthChecker>
                  <s.LengthNum>{title.length}</s.LengthNum>
                  <s.TitleMaxLength>/30</s.TitleMaxLength>
                </s.LengthChecker>
              </s.TitleInputWrapper>
            </s.PostTitleContainer>

            <s.ExhibitionContainer>
              <s.Column>가고싶은 전시회</s.Column>
              <s.ExhibitionSelect 
                onChange={onChangeExhibition}
                value={exhibition}
              >
                {
                  tmpExhibitionData.map((exhibit) => {
                    return(
                      <s.ExhibitionOption 
                        value={exhibit}
                        key={exhibit}
                      >
                        {exhibit}
                      </s.ExhibitionOption>
                    )
                  })
                }
              </s.ExhibitionSelect>
            </s.ExhibitionContainer>

            <s.PersonContainer>
              <s.Column>전시 관람 인원</s.Column>
              <s.PersonSelect
                onChange={onChangePerson}
                value={person}
              >
                {
                  personCnt.map((person) => {
                    return (
                      <s.PersonOption
                        value={person}
                        key={person}
                      >
                        {person}인 관람
                      </s.PersonOption>
                    )
                  })
                }
              </s.PersonSelect>
            </s.PersonContainer>

            <s.DateWrapper>
              <s.DateColumn>관람 희망 날짜</s.DateColumn>
              <s.DateContainer>
                <s.DateSelectorGrid>
                  {
                    dateCnt.map(() => <CalendarComponent />)
                  }
                  <s.AddDateBtn 
                    src={AddBtn} 
                    alt="add" 
                    onClick={onClickAddBtn}  
                  />
                </s.DateSelectorGrid>
              </s.DateContainer>
            </s.DateWrapper>

            <s.OpenChatContainer>
              <s.Column>오픈 채팅방 URL</s.Column>
              <s.OpenChatInput 
                onChange={onChangeOpenchat}
                value={openchat}
              />
              <s.OpenchatGuideBtn src={OpenchatGuide} alt="guide" />
              <s.OpenchatGuideMent>도움이 필요하세요?</s.OpenchatGuideMent>
            </s.OpenChatContainer>

            <s.ActivityContainer>
              <s.Column>함께 하고싶은 활동</s.Column>
              <s.ActivityGrid>
                {
                  activityData_Imoji.map((activity, idx) => 
                    <s.Activity 
                      onClick={() => onClickActivity(idx)}
                      isSelected={isActivitySelect === idx ? true : false}
                    >{activity}</s.Activity>)
                }
              </s.ActivityGrid>
            </s.ActivityContainer>

            <s.DetailContainer>
              <s.Column>상세 내용</s.Column>
              <s.DetailInputWrapper>
                <s.DetailInput 
                  placeholder={detailPlaceholder}
                  value={detail}
                  onChange={onChangeDetail}
                />
                <s.DetailLengthChecker>
                  <s.DetailLengthNum>{detail.length}</s.DetailLengthNum>
                  <s.DetailLengthNum>/200</s.DetailLengthNum>
                </s.DetailLengthChecker>
              </s.DetailInputWrapper>
            </s.DetailContainer>

            <s.ImgContainer>
              <s.Column>이미지</s.Column>
              <s.ImageList>
                <s.ImageAddBox onClick={onUploadImgBtnClick}>
                  <s.ImageInputBox 
                    type="file" 
                    accept="image/*" 
                    ref={imgInputRef} 
                    onChange={onUploadImg}
                  />
                  <img src={GrayPlus} alt="gray" />
                </s.ImageAddBox>
                {
                  img?.map((item, idx) => 
                    <ProfileImage
                      imgURL={item} 
                      isFirst={idx === 0 ? true : false}
                      isEditMode={true}
                      imgList={img}
                      setImgList={setImg}
                    />
                  )
                }
              </s.ImageList>
            </s.ImgContainer>

          </s.InfoWrapper>
        </s.InfoContainer>
        <s.SubmitBtn
          onClick={onClickSubmitBtn}
        >게시글 등록하기</s.SubmitBtn>
      </s.Wrapper>
    </LayoutTemplateGray>
  )
};

export default PutPosting;
