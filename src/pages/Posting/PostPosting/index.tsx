import { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutTemplateGray from "../../../components/Common/LayoutTemplateGray";
import useIsMobile from "../../../hooks/useIsMobile";
import CalendarComponent from "../../../components/CalendarComponent";
import * as s  from "./styles";
import AddBtn from "../../../images/components/Posting/AddBtn.svg";
import OpenchatGuide from "../../../images/components/Posting/OpenchatGuide.svg";
import GrayPlus from "../../../images/components/Profile/GrayPlus.svg";
import ExhibitionAPI from "../../../api/ExhibitionAPI";
import PostingImage from "../../../components/PostingImage";
import CreatableSelect from "react-select/creatable";
import { css } from "@emotion/react";
import { CSSObjectWithLabel, ControlProps, StylesConfig } from "react-select";

const activityData_Imoji = [
  "맛집 가기😋", "카페 가기☕", "전시만 보기👓", "만나서 정해요!"
];

const activityData_enum = [
  "EAT", "CAFE", "ONLY", "LATER"
];

interface IExhibition {
  value: string,
  label: string
};
const OPENCHAT_GUIDELINK = "https://cs.kakao.com/helps_html/1073184404?locale=ko";

const PostPosting = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length >= 31) {
      alert("최대 30자까지 작성할 수 있어요.");
      e.target.value = e.target.value.slice(0, e.target.value.length-1);
      return;
    }
    setTitle(e.target.value);
  };

  const [exhibition, setExhibition] = useState<string>("")
  const onChangeExhibition = (e: string) => {
    console.log({e});
    setExhibition(e);
  };
  const [exhibitionList, setExhibitionList] = useState<IExhibition[]>([]);
  useEffect(() => {
    ExhibitionAPI.getExhibitions()
      .then((res) => {
        const exhibitionData = res as string[];
        const newList = [...(exhibitionData || [])];
        const newObjectList: IExhibition[] = [];
        
        newList.forEach((exhibition) => {
          const newObject: IExhibition = {
            value: exhibition,
            label: exhibition
          };
          newObjectList.push(newObject);
        });

        setExhibitionList(newObjectList);
      })
      .catch((e) => {
        console.error({e});
      });
  }, []);

  const customControlStyles = (
    base: CSSObjectWithLabel,
  ) => {
    return {
      ...base,
      width: '580px',
      height: '56px',
      marginLeft: "50px",
      borderRadius: "10px",
      borderColor: "#797979",
      paddingLeft: "10px"
    };
  };
  const customSelectStyles: StylesConfig<IExhibition, false, any> = {
    control: customControlStyles
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
  const onClickOpenchatGuide = (e: MouseEvent<HTMLImageElement>) => {
    window.open(OPENCHAT_GUIDELINK);
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


  const [imgURLs, setImgURLs]= useState<string[]>([]);
  const [imgs, setImgs]= useState<File[]>([]);
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
  }, []);

  const checkAllInfo = (): boolean => {
    if (title === null) {
      alert("제목을 입력해 주세요.");
      return false;
    }

    if (exhibition === null) {
      alert("전시회를 선택해 주세요.");
      return false;
    }


    return true;
  }

  const onClickSubmitBtn = () => {
    if (window.confirm("매칭 게시글을 등록하시겠습니까?")) {


       
      alert("게시글이 등록되었습니다.");
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
              <CreatableSelect 
                styles={customSelectStyles}
                isClearable={true} 
                options={exhibitionList} 
                isSearchable={true}
                onChange={(inputValue) => onChangeExhibition(inputValue?.value!)}
                placeholder="전시회를 검색하거나 선택해주세요 :)"
                />
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
              <s.OpenchatGuideBtn 
                src={OpenchatGuide}
                alt="guide"
                onClick={onClickOpenchatGuide} />
              <s.OpenchatGuideMent
                onClick={onClickOpenchatGuide}
              >도움이 필요하세요?</s.OpenchatGuideMent>
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
                    name="file"
                    type="file" 
                    accept="image/*" 
                    ref={imgInputRef} 
                    onChange={onUploadImg}
                  />
                  <img src={GrayPlus} alt="gray" />
                </s.ImageAddBox>
                {
                  imgURLs &&
                  imgURLs.map((item: string, idx: number) => 
                    <PostingImage
                      imgURL={item} 
                      isFirst={idx === 0 ? true : false}
                      isEditMode={true}
                      imgList={imgURLs}
                      setImgList={setImgURLs}
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

export default PostPosting;
