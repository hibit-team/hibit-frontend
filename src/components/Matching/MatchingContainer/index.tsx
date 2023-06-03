/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./styles";
import LikeIcon from '../../../images/components/Matching/likeIcon.svg'
import ReplyIcon from '../../../images/components/Matching/replyIcon.svg'
import COLORS from "../../../assets/color";
import { IPosts } from "../../../pages/Matching";
// import { InfiniteData } from "@tanstack/react-query";

export interface IProps{
  sortOption:string,
  pages: IPosts[][],
  fetchNextPage:any,
}

export interface IEachPost {
  key: number
  eachData: IPosts
}

const ExhibitionText: {
  [key in string]: string;
} = {
thisweek:"이번주 출발하는 전시",
like:  "좋아요 많은 게시글",
allposts: "게시글 전체보기",
};

//매칭카드
const MatchingCardComponent = ({eachData}:IEachPost) => {
  return (
    <div css={css`position:relative`}>
      <div css={s.MatchingCardImgCss}>
        {/* style={backgroundImage:url('data.imageUrl')} */}

        <div css={s.HeadLabelWrapperCss}>
          {eachData.number_and_What.map((item:string, idx:number) => (
            <span key={idx} css={s.LabelStatusCss}>
              {item}
            </span>
          ))}
          <s.CardInfoBottom>
            <s.CardStatus>{eachData.post_status}</s.CardStatus>
            <s.CardBottomCountInfo>
              <div>
                <img css={css`margin:0 4px -2px 0px;`} src={ReplyIcon} alt="reply-count"></img>
                <span css={css`color: ${COLORS.Gray3};margin:0 8px 0 0px;`}>{eachData.liked}</span>
              </div>
              <div>
                <img css={css`margin:0 2px -1px 0px;`} src={LikeIcon} alt="like-count"></img>
                <span css={css`color: ${COLORS.Red};margin:0 0 0 2px;`}>{eachData.liked}</span>
              </div>
            </s.CardBottomCountInfo>
          </s.CardInfoBottom>
        </div>
      </div>
      <div css={s.MatcingCardInfoCss}>
        <div css={css`padding:24px;`}>
          <div css={css`font-weight: 500; color:#242424; font-size:15px; margin-bottom:8px;`}>{eachData.title}</div>
          <div css={css`font-weight:900; font-size:21px;`}>게시글명 공백포함 최대 30자까지 공백포함 최대 30자까지 공백포함 최대 30자까지 </div>
        </div>
      </div>
    </div>
  );
};

//매칭컨테이너(pages) - 매칭 그리드컨테이너(grid: eachPage)-매칭카드컴포넌트(eachData)
const MatchingContainer = ({sortOption,pages,fetchNextPage}:IProps) => {
  console.log(`pages.length:${pages.length}`)
  return (
    <div>
      <s.MatchingHeader>{ExhibitionText[sortOption]}</s.MatchingHeader>
      <s.MatchingGridContainer>
      {/* pages: page 1 ,2 ,3 ...  각페이지의 데이터가 eachPage파라미터로 ..*/}
        {pages?.map((eachPage) => {
          console.log(`eachPage.length:${eachPage.length}`);
          // 페이지에 해당하는 6개 데이터 mapping
          return eachPage.map((eachPost)=>
            <MatchingCardComponent key={eachPost.idx} eachData={eachPost}/>)})
        }
      </s.MatchingGridContainer>
      <s.LoadMoreButton onClick={fetchNextPage}>More...</s.LoadMoreButton>
    </div>
  );
};

export default MatchingContainer;
