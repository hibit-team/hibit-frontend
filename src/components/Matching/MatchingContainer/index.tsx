/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./styles";
import LikeIcon from '../../../images/components/Matching/likeIcon.svg'
import ReplyIcon from '../../../images/components/Matching/replyIcon.svg'
import COLORS from "../../../assets/color";
//상태관리 , 게시글렌더링, useInfiniteQuery 훅 로직
// data.map( (item,idx) => MatchingCardWrapper
const ExhibitionText = [
  "이번주 출발하는 전시",
  "좋아요 많은 게시글",
  "게시글 전체보기",
];

const CardLabelStatus = ["2인 관람", "전시만 보기",];

const CardDummyData = [1, 2, 3, 4, 5, 6, 7];

//매칭카드
const MatchingCardComponent = () => {
  return (
    <div>
      <div css={s.MatchingCardImgCss}>
        {/* style={backgroundImage:url('data.imageUrl')} */}
        <div css={s.HeadLabelWrapperCss}>
          {CardLabelStatus.map((item, idx) => (
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

const MatchingContainer = ({fetchNextPage}:any) => {
  // mount시 data fetch:  useEffect(()=>{},[])
  return (
    <div>
      <s.MatchingHeader>{ExhibitionText[0]}</s.MatchingHeader>
      <s.MatchingGridContainer>
        {CardDummyData.map((item, idx) => (
          <MatchingCardComponent/>
        ))}
      </s.MatchingGridContainer>
      <s.LoadMoreButton onClick={fetchNextPage}>More...</s.LoadMoreButton>
    </div>
  );
};

export default MatchingContainer;
