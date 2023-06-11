/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./styles";
import LikeIcon from '../../../images/components/Matching/likeIcon.svg'
import ReplyIcon from '../../../images/components/Matching/replyIcon.svg'
import COLORS from "../../../assets/color";
import { IPosts } from "../../../pages/Matching";

export interface IProps{
  isFetchingNextPage:boolean;
  sortOption:string,
  pages: IPosts[][],
  fetchNextPage:any;
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
      <div style={{backgroundImage: `url(${eachData?.mainimg})`}} css={s.MatchingCardImgCss}>
        <div css={s.HeadLabelWrapperCss}>
          {eachData?.number_and_What.map((item:string, idx:number) => (
            <span key={idx} css={s.LabelStatusCss}>
              {item}
            </span>
          ))}
          <s.CardInfoBottom>
            <s.CardStatus>{eachData?.status === 'N' ? '모집중' : eachData?.status==='C' ? '모집완료': ''}</s.CardStatus>
            <s.CardBottomCountInfo>
                <img css={css`margin:2px`} src={ReplyIcon} alt="reply-count"></img>
                <span css={css`position:relative; top: 2px; margin:4px; color: ${COLORS.Gray3};`}>{eachData?.comment_number}</span>
                <img css={css`margin:2px 2px 2px 6px;`} src={LikeIcon} alt="like-count"></img>
                <span css={css`position:relative; top: 2px; margin:4px ;color: ${COLORS.Red};`}>{eachData?.liked}</span>
            </s.CardBottomCountInfo>
          </s.CardInfoBottom>
        </div>
      </div>
      <div css={s.MatcingCardInfoCss}>
        <div css={css`padding:24px;`}>
          <div css={css`font-weight: 500; color:#242424; font-size:15px; margin-bottom:8px;`}>{eachData?.title}</div>
          {/* <div css={css`font-weight: 500; color:#242424; font-size:15px; margin-bottom:8px;`}>20자까지 공백포함 최대 20자까지 공백포함 최대</div> */}
          <div css={css`font-weight:900; font-size:21px;`}>{eachData?.title} </div>
        </div>
      </div>
    </div>
  );
};

//매칭컨테이너(pages) - 매칭 그리드컨테이너(grid: eachPage)-매칭카드컴포넌트(eachData)
const MatchingContainer = ({isFetchingNextPage,sortOption,pages,fetchNextPage}:IProps) => {
  console.log(`pages.length:${pages.length}`)
  return (
    <div>
      <s.MatchingHeader>{ExhibitionText[sortOption]}</s.MatchingHeader>
      <s.MatchingGridContainer>
      {/* pages: page 1 ,2 ,3 ...  각페이지의 데이터가 eachPage파라미터로 ..*/}
        {pages?.map((eachPage) => {
          // 페이지에 해당하는 6개 데이터 mapping
          return eachPage.map((eachPost)=>
            <MatchingCardComponent key={eachPost.idx} eachData={eachPost}/>)})
        }  
      </s.MatchingGridContainer>
      {/* 로딩인디케이터 추가 예정 */}
      {!isFetchingNextPage? <div style={{display:'flex',height:'50px',justifyContent:'center'}}>Loading Indicator...</div> : undefined}
      <s.LoadMoreButton onClick={fetchNextPage}>next</s.LoadMoreButton>
    </div>
  );
};

export default MatchingContainer;
