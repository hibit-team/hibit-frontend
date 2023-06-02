/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./styles";
import LikeIcon from '../../../images/components/Matching/likeIcon.svg'
import ReplyIcon from '../../../images/components/Matching/replyIcon.svg'
import COLORS from "../../../assets/color";
import { IPosts } from "../../../pages/Matching";
// import { InfiniteData } from "@tanstack/react-query";

export interface IProps{
  pages: IPosts[][] // IPosts[][]
  fetchNextPage:any;
}

export interface IEachPost {
  key: number
  eachData: IPosts
}

// IPosts (각 카드 게시글별 데이터 형태)
// export interface IPosts 
//   {
//     idx: number,
//     user: null,
//     title: string,
//     post_status: string,
//     number_and_What: string[],
//     mainimg: null,
//     liked: number,
//   }

const ExhibitionText = [
  "이번주 출발하는 전시",
  "좋아요 많은 게시글",
  "게시글 전체보기",
];

const CardLabelStatus = ["2인 관람", "전시만 보기",];
const CardDummyData = [1, 2, 3, 4, 5, 6, 7];

//매칭카드
const MatchingCardComponent = ({eachData}:IEachPost) => {
  return (
    <div>
      <div css={s.MatchingCardImgCss}>
        {/* style={backgroundImage:url('data.imageUrl')} */}
        {eachData.idx}
        <div css={s.HeadLabelWrapperCss}>
          {eachData.number_and_What.map((item:string, idx:number) => (
            <span key={idx} css={s.LabelStatusCss}>
              {item}
            </span>
          ))}
          <s.CardInfoBottom>
            <s.CardStatus>모집중</s.CardStatus>
            <s.CardBottomCountInfo>
              <div>
                <img css={css`margin:0 4px -2px 0px;`} src={ReplyIcon} alt="reply-count"></img>
                <span css={css`color: ${COLORS.Gray3};margin:0 8px 0 0px;`}>79</span>
              </div>
              <div>
                <img css={css`margin:0 2px -1px 0px;`} src={LikeIcon} alt="like-count"></img>
                <span css={css`color: ${COLORS.Red};margin:0 0 0 2px;`}>42</span>
              </div>
            </s.CardBottomCountInfo>
          </s.CardInfoBottom>
        </div>
      </div>
      <div css={s.MatcingCardInfoCss}>
        <div css={css`padding:24px;`}>
          <div css={css`font-weight: 500; color:#242424; font-size:15px; margin-bottom:8px;`}>전시회 명 최대 공백포함 </div>
          <div css={css`font-weight:900; font-size:21px;`}>게시글명 공백포함 최대 30자까지 공백포함 최대 30자까지 공백포함 최대 30자까지 </div>
        </div>
      </div>
    </div>
  );
};

//매칭컨테이너(pages) - 매칭 그리드컨테이너(grid틀: eachPage)-매칭카드컴포넌트(unit)
const MatchingContainer = ({pages,fetchNextPage}:IProps) => {
  // mount시 data fetch:  useEffect(()=>{},[])
  return (
    <div>
      <s.MatchingHeader>{ExhibitionText[0]}</s.MatchingHeader>
      <s.MatchingGridContainer>
      {/* pages: page 1 ,2 ,3 ...  각페이지의 데이터가 eachPage파라미터로 ..*/}
        {pages?.map((eachPage) => {
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
