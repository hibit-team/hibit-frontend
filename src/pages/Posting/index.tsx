import { ChangeEvent, useState } from "react";
import LayoutTemplateGray from "../../components/Common/LayoutTemplateGray";
import useIsMobile from "../../hooks/useIsMobile";
import CalendarComponent from "../../components/CalendarComponent";
import * as s  from "./styles";
import AddBtn from "../../images/components/Posting/AddBtn.svg";

const tmpExhibitionData = [
  "로그아웃 전시회", "전시회2", "전시회3", "전시회4"
];

const Posting = () => {
  const isMobile = useIsMobile();


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

  // 최대 5개까지 선택 가능
  const [dateCnt, setDateCnt] = useState<number[]>([1]);
  const onClickAddBtn = () => {
    if(dateCnt.length === 5) {
      alert("최대 5개까지 등록할 수 있어요.");
      return;
    };
    setDateCnt([...dateCnt, 1]);
  };
  const [isMorning, setIsMorning] = useState(true);



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

          </s.InfoWrapper>
        </s.InfoContainer>
      </s.Wrapper>
    </LayoutTemplateGray>
  )
};

export default Posting;
