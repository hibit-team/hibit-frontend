/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as s from './styles';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import Slider from 'react-slick';
import Tim from '../../../images/components/MatchPost/Tim.svg';
import ProfileDefault from '../../../images/components/MatchPost/profileDefault.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/slick.css';
import ArticleArrow from '../../../images/components/MatchPost/ArticleArrow.webp';
import PurpleKebap from '../../../images/components/MatchPost/purpleKebap.svg';
import PurpleLike from '../../../images/components/MatchPost/purpleLike.png';
import WhiteLike from '../../../images/components/MatchPost/whiteLike.png';
import FsLightbox from 'fslightbox-react';
import { useRecoilState } from 'recoil';
import { FsImageBoxToggler } from '../../../recoil/atom/FsImageBoxToggler';
import PEPE from '../../../images/components/MatchPost/pepe.jpeg';
import ReplySectionComponent from '../PostReplySection';
import { IMatchingPostPage } from '../../../pages/MatchPost';

export default function MatchPostArticle({data,postIDX}:{data?:IMatchingPostPage, postIDX?:string}) {
  const [isPurpleKebapOptionOpen, setIsPurpleKebapOptionOpen] = useState(false);
  const [isLikeStateOn, setIsLikeStateOn] = useState(false);
  const [toggler, setToggler] = useRecoilState(FsImageBoxToggler);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom2',
  };
  const dateOption = ['0000-00-00-오전', '0000-00-00-오후'];
  return (
    <div css={{ marginBottom: 100 }}>
      <s.MatchArticleWrapper>
        <s.ArticleTitleSection css={{ position: 'relative' }}>
          <div
            css={css`
              display: flex;
              flex: 1 1 auto;
              font-size: 24px;
              font-weight: 800;
            `}
          >
            {data?.title}
          </div>
          <div
            css={{
              boxSizing: 'border-box',
              width: 35,
              height: 35,
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img
              css={{
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                position: 'relative',
                bottom: 3,
              }}
              // src={ProfileDefault}
              src={data?.writerImg}
              alt="writer-profile-img"
            />
          </div>

          <div
            css={css`
              font-size: 20px;
              color: #797979;
              font-weight: 700;
              margin: 6px;
            `}
          >
            {data?.writer}
          </div>
          <div
            css={css`
              margin: 6px;
              border-left: 1px solid #c9c9c9;
              height: 20px;
              box-sizing: border-box;
              padding-left: 0.5rem;
              font-size: 20px;
              font-weight: 500;
              color: #797979;
            `}
          >
            {data?.time}
          </div>
          <img
            onClick={() => {
              setIsPurpleKebapOptionOpen(!isPurpleKebapOptionOpen);
            }}
            css={{
              margin: 6,
              cursor: 'pointer',
            }}
            src={PurpleKebap}
            alt="ellipsis"
          />
          {isPurpleKebapOptionOpen && (
            <div
              css={{
                position: 'absolute',
                top: '3.3rem',
                right: '-0.4rem',
                border: `1.5px solid ${COLORS.Gray2}`,
                borderRadius: '10px',
                background: 'white',
                boxSizing: 'border-box',
                width: 56,
                height: 102,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <OptionComponent></OptionComponent>
            </div>
          )}
        </s.ArticleTitleSection>
        <s.ArticleDateSection>
          <div
            css={{
              flex: '0 1 252px',
              fontSize: 20,
              fontWeight: 800,
              color: COLORS.Gray3,
            }}
          >
            관람희망날짜
          </div>
          {dateOption.map((date, idx) => (
            <div key={idx} css={ArticleDateCss}>
              {date}
            </div>
          ))}
        </s.ArticleDateSection>

        <s.ArticlePlaceTogoSection>
          <div
            css={css`
              flex: 0 1 250px;
              font-size: 20px;
              font-weight: 900;
              color: ${COLORS.Gray3};
            `}
          >
            가고 싶은 전시회
          </div>
          <div
            css={css`
              font-size: 20px;
              font-weight: 500;
              color: ${COLORS.Gray3};
            `}
          >
            {data?.exhibiton}
          </div>
        </s.ArticlePlaceTogoSection>

        <s.ArticleTextSection>
          <ArticleImageSlider {...settings}>
            <img src={Tim} alt="tempo"></img>
            <img src={Tim} alt="tempo"></img>
            <img src={Tim} alt="tempo"></img>
          </ArticleImageSlider>
          <s.ArticleArrowWrapper
            onClick={() => {
              if (toggler === true) setToggler(false);
              else {
                setToggler(true);
              }
            }}
          >
            <img
              css={{
                maxWidth: 22,
                maxHeight: 22,
              }}
              src={ArticleArrow}
              alt="article-arrow"
            />
          </s.ArticleArrowWrapper>
          <article
            css={{
              color: COLORS.Gray3,
              fontSize: 20,
              margin: '-3px 1.6rem',
              lineHeight: 1.4,
              maxHeight: 276,
              overflow: 'hidden',
              overflowWrap: 'break-word',
            }}
          >
            {data?.content}
          </article>
          <button
            onClick={() => {
              alert(isLikeStateOn ? '해당 게시글의 `좋아요`를 취소했습니다.' : '해당 게시글에 `좋아요`를 눌렀습니다.');
              setIsLikeStateOn(!isLikeStateOn);
            }}
            css={{
              all: 'unset',
              cursor: 'pointer',
              gridRow: 2,
              display: 'flex',
              position: 'relative',
              left: 542,
              bottom: 23,
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: '100%',
              boxSizing: 'border-box',
              width: 82,
              height: 31,
              borderRadius: '100px',
              border: isLikeStateOn ? `1px solid ${COLORS.main79}` : `1px solid ${COLORS.Gray3}`,
              color: COLORS.Gray3,
              fontSize: '1rem',
            }}
          >
            <div
              css={{
                color: isLikeStateOn ? COLORS.main79 : COLORS.Gray3,
              }}
            >
              좋아요
            </div>
            {isLikeStateOn ? (
              <img css={{ marginLeft: '4px', width: 13, height: 12 }} src={PurpleLike} alt="purple-like"></img>
            ) : (
              <img css={{ marginLeft: '4px', width: 13, height: 12 }} src={WhiteLike} alt="white-like"></img>
            )}
          </button>
        </s.ArticleTextSection>
        <s.InviteBoxWrapper>초대하기</s.InviteBoxWrapper>

        <FsLightboxWrapper />
        <ReplySectionComponent></ReplySectionComponent>
      </s.MatchArticleWrapper>
    </div>
  );
}

export const ArticleDateCss = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 193px;
  height: 56px;
  background: ${COLORS.Gray1};
  border-radius: 10px;
  margin: 0.5rem;
  color: ${COLORS.Gray3};
  font-size: 18px;
  border: 1px solid ${COLORS.Gray2};
  position: relative;
  right: 10px;
`;

export const ArticleImageSlider = styled(Slider)`
  box-sizing: border-box;
  width: 233px;
  height: 320px;
  border-radius: 10px;
`;

export const OptionComponent = ({
  setIsModifyOn,
  isModifyOn,
  isReplyOptModalOpen,
  setIsReplyOptModalOpen,
}: {
  setIsModifyOn?: React.Dispatch<React.SetStateAction<boolean>>;
  isModifyOn?: boolean;
  isReplyOptModalOpen?: boolean;
  setIsReplyOptModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //수정삭제신고 게시글 옵션
  const postOption1 = css({
    //수정
    all: 'unset',
    position: 'relative',
    cursor: 'pointer',
    top: 2,
    fontSize: 18,
    padding: '6px',
    borderBottom: `1px solid ${COLORS.Gray2}`,
    color: COLORS.Gray3,
    '&:hover': { color: COLORS.main79, scale: '1.04' },
  });
  const postOption2 = css({
    //삭제(idx=2)
    all: 'unset',
    position: 'relative',
    cursor: 'pointer',
    top: 2,
    fontSize: 18,
    padding: '6px',
    borderBottom: `1px solid ${COLORS.Gray2}`,
    color: COLORS.Gray3,
    '&:hover': { color: COLORS.main79, scale: '1.04' },
  });
  const postOption3 = css({
    //신고
    all: 'unset',
    position: 'relative',
    cursor: 'pointer',
    top: 2,
    fontSize: 18,
    padding: '6px',
    color: COLORS.Gray3,
    '&:hover': { color: 'red', scale: '1.04' },
  });
  const options = ['수정', '삭제', '신고'];
  return (
    <>
      {options.map((opt, idx) => (
        <button
          onClick={
            idx === 0 && setIsModifyOn
              ? () => {
                  //옵션모달꺼주기
                  if (setIsReplyOptModalOpen) {
                    setIsReplyOptModalOpen(!isReplyOptModalOpen);
                  }
                  //수정모드On
                  setIsModifyOn(!isModifyOn);
                }
              : () => {}
          }
          key={idx}
          css={idx === 0 ? postOption1 : idx === 1 ? postOption2 : postOption3}
        >
          {opt}
        </button>
      ))}
    </>
  );
};

export const FsLightboxWrapper = (data:any) => {
  const [toggler, setToggler] = useRecoilState(FsImageBoxToggler);
  return (
    <>
      <button
        css={css`
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 0px;
          height: 0px;
          display: none;
        `}
        onClick={() => setToggler(!toggler)}
      ></button>
      <FsLightbox
        toggler={toggler}
        sources={[
          <img src="https://hibit2bucket.s3.ap-northeast-2.amazonaws.com/2.png" alt="dd"/>
        ]}
      />
    </>
  );
};
