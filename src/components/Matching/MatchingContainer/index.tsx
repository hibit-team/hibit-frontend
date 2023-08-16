/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import * as s from './styles';
import LikeIcon from '../../../images/components/Matching/likeIcon.svg';
import ReplyIcon from '../../../images/components/Matching/replyIcon.svg';
import COLORS from '../../../assets/color';
import { IPosts } from '../../../pages/Matching';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { MatchingControllerState } from '../../../recoil/atom/MatchingControllerState';
import { motion } from 'framer-motion';
import { IMatchingControllerState } from '../../../hooks/MathchingMain/useGetMatchingInifiniteQuery';
export interface IProps {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  pages: IPosts[][] | undefined;
  fetchNextPage: any;
}
export interface IEachPost {
  key: number;
  eachData: IPosts;
}
const ExhibitionText: {
  [key in string]: string;
} = {
  thisweek: '이번주 출발하는 전시',
  like: '좋아요 많은 게시글',
  allposts: '게시글 전체보기',
};

const cardVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: -100, opacity: 0, transition: { duration: 0.5 } },
};
//매칭카드컴포넌트
const MatchingCardComponent = ({ eachData }: IEachPost) => {
  const navigate = useNavigate();
  const [timeVisibleState, setTimeVisibleState] = useState(false);
  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit"
      onMouseEnter={() => {
        if (timeVisibleState === false) setTimeVisibleState(!timeVisibleState);
      }}
      onMouseLeave={() => {
        if (timeVisibleState === true) setTimeVisibleState(!timeVisibleState);
      }}
      css={css`
        position: relative;
      `}
    >
      <div
        onClick={() => {
          navigate(`/matchPost/${eachData.idx}`);
        }}
        style={{ backgroundImage: `url(${eachData?.mainimg})` }}
        css={s.MatchingCardImgCss}
      >
        <div css={s.HeadLabelWrapperCss}>
          {eachData?.number_and_What.map((item: string, idx: number) => (
            <span key={idx} css={idx === 0 ? s.LabelPartyNumber : s.LabelStatusCss}>
              {item}
            </span>
          ))}
          <s.CardInfoBottom>
            <s.CardStatus>{eachData?.status === 'N' ? '모집중' : eachData?.status === 'C' ? '모집완료' : 'error'}</s.CardStatus>
            <s.CardBottomCountInfo>
              <img
                css={css`
                  margin: 2px;
                `}
                src={ReplyIcon}
                alt="reply-count"
              ></img>
              <span
                css={css`
                  position: relative;
                  top: 2px;
                  margin: 4px;
                  color: ${COLORS.Gray3};
                `}
              >
                {eachData?.comment_number}
              </span>
              <img
                css={css`
                  margin: 2px 2px 2px 6px;
                `}
                src={LikeIcon}
                alt="like-count"
              ></img>
              <span
                css={css`
                  position: relative;
                  top: 2px;
                  margin: 4px;
                  color: ${COLORS.Red};
                `}
              >
                {eachData?.liked}
              </span>
            </s.CardBottomCountInfo>
          </s.CardInfoBottom>
        </div>
      </div>
      <div css={s.MatcingCardInfoCss}>
        <div
          css={css`
            padding: 24px;
          `}
        >
          <div
            css={css`
              font-weight: 500;
              color: #242424;
              font-size: 15px;
              margin-bottom: 8px;
            `}
          >
            {eachData?.exhibition}
          </div>
          <div
            css={css`
              font-weight: 900;
              font-size: 21px;
            `}
          >
            {eachData?.title}
          </div>
        </div>
        <div
          css={{
            fontWeight: 600,
            fontSize: 16,
            position: 'absolute',
            top: 250,
            left: 20,
            display: timeVisibleState ? 'block' : 'none',
            color: 'white',
          }}
        >
          {eachData.dateTime}
        </div>
      </div>
    </motion.div>
  );
};

//매칭컨테이너(pages) - 매칭 그리드컨테이너(grid: eachPage)-매칭카드컴포넌트(eachData)
const MatchingContainer = ({ hasNextPage, isFetchingNextPage, pages, fetchNextPage }: IProps) => {
  
  const sortOption = useRecoilValue<string|IMatchingControllerState>(MatchingControllerState);
  console.log(sortOption,'test')
  return (
    <div >
      { typeof sortOption === 'string' ? <s.MatchingHeader>{ExhibitionText[sortOption]}</s.MatchingHeader>: <s.MatchingHeader>{sortOption.searchText}에 대한 검색결과</s.MatchingHeader>}
      <s.MatchingGridContainer>
        {/* pages: page 1 ,2 ,3 ...  각페이지의 데이터가 eachPage파라미터로 ..*/}
        {pages?.map(eachPage => {
          // 페이지에 해당하는 6개 데이터 mapping
          return eachPage.map(eachPost => <MatchingCardComponent key={eachPost.idx} eachData={eachPost} />);
        })}
      </s.MatchingGridContainer>
      {/* 로딩인디케이터 추가 예정 */}
      <s.LoadMoreButton onClick={fetchNextPage}>게시글 더보기</s.LoadMoreButton>
    </div>
  );
};

export default MatchingContainer;

