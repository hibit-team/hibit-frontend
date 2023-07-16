import { ChangeEvent, useState } from "react";
import LayoutTemplateGray from "../../components/Common/LayoutTemplateGray";
import useIsMobile from "../../hooks/useIsMobile";
import * as s  from "./styles";

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


          </s.InfoWrapper>
        </s.InfoContainer>
      </s.Wrapper>
    </LayoutTemplateGray>
  )
};

export default Posting;
