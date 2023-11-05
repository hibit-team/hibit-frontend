/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as s from './styles';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/slick.css';
import ArticleArrow from '../../../images/components/MatchPost/ArticleArrow.webp';
import PurpleKebap from '../../../images/components/MatchPost/purpleKebap.svg';
import PurpleLike from '../../../images/components/MatchPost/purpleLike.png';
import WhiteLike from '../../../images/components/MatchPost/whiteLike.png';
import FsLightbox from 'fslightbox-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FsImageBoxToggler } from '../../../recoil/atom/FsImageBoxToggler';
import ReplySectionComponent, { IComments } from '../PostReplySection';
import { IMatchingPostPage } from '../../../pages/MatchPost';
import { useDeleteReplyMutation } from '../../../hooks/MatchingPost/useDeleteReplyMutation';
import { useDeleteMatchingPostMutation } from '../../../hooks/MatchingPost/useDeleteMatchingPostMutation';
import { usePostMatchingArticleLikeMutation } from '../../../hooks/MatchingPost/usePostMatchingArticleLikeMutation';
import { InviteModalSwitchState } from '../../../recoil/atom/InviteModalSwitchState';
import { useNavigate } from 'react-router-dom';
import { PostIDXAtom } from '../../../recoil/atom/PostIDXAtom';
import { ILoginInfo } from '../../../hooks/useLoginInfo'
import { userIdxState, profileRegisteredState} from '../../../recoil/atom/LoginInfoState';
export default function MatchPostArticle({ userLoginInfo ,data, postIDX }: { userLoginInfo?: boolean; data?: IMatchingPostPage; postIDX?: string | undefined }) {
  const userIdxInfo = useRecoilValue(userIdxState)//user idx
  const isProfile = useRecoilValue(profileRegisteredState) // profile 
  const [isPurpleKebapOptionOpen, setIsPurpleKebapOptionOpen] = useState(false);
  const [toggler, setToggler] = useRecoilState(FsImageBoxToggler);
  const [isInviteModalOpen, setIsInviteModalOpen] = useRecoilState(InviteModalSwitchState);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
  const { mutate: articleLikeMutate } = usePostMatchingArticleLikeMutation(postIDX);
  const isLikeStateOn = data?.likeUsers?.find(item => {
    return item.idx === userIdxInfo;
  });
  useEffect(() => {
    return () => {
      //컴포넌트 언마운트시 모달 clear해주기
      setIsInviteModalOpen(false);
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref?.current.contains(e.target as Node) && isPurpleKebapOptionOpen) {
        // 외부 클릭이 발생한 경우, isOpen 상태를 변경
        if (isPurpleKebapOptionOpen) setIsPurpleKebapOptionOpen(false);
      }
    },
    [isPurpleKebapOptionOpen, setIsPurpleKebapOptionOpen]
  );
  useEffect(() => {
    // 컴포넌트가 마운트될 때 외부 클릭 이벤트를 감지하는 이벤트 리스너를 추가
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트되거나 업데이트될 때 이벤트 리스너를 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsPurpleKebapOptionOpen, handleClickOutside]);
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
            onClick={()=>{
              navigate(`/others/:${data?.writerIdx}`)
              window.scrollTo(0, 0)
            }}
            css={{
              boxSizing: 'border-box',
              width: 35,
              height: 35,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              bottom:3,
              cursor:'pointer',
            }}
          >
            <img
              css={{
                width: '100%',
                height: '100%',
              }}
              src={data?.writerImg}
              alt="user-img"
            />
          </div>

          <div
            css={css`
              font-size: 20px;
              color: #797979;
              font-weight: 700;
              margin-right: 4px;
              margin-left: 10px;
            `}
          >
            {data?.writer ? data?.writer : 'undefined'}
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
          { userLoginInfo ? <img
            onClick={e => {
              e.stopPropagation();
              if (isPurpleKebapOptionOpen) setIsPurpleKebapOptionOpen(false);
              else {
                setIsPurpleKebapOptionOpen(true);
              }
            }}
            css={{
              margin: 6,
              cursor: 'pointer',
            }}
            src={PurpleKebap}
            alt="ellipsis"
          /> : undefined }
          {isPurpleKebapOptionOpen && (
            <div
              ref={ref}
              css={{
                userSelect: 'none',
                position: 'absolute',
                top: '1rem',
                right: '-3.5rem',
                border: `1.5px solid ${COLORS.Gray2}`,
                borderRadius: '10px',
                background: 'white',
                boxSizing: 'border-box',
                width: 56,
                height: 'auto',
                padding: '10px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PostOptionComponent userIdx={data?.writerIdx} userIdxInfo={userIdxInfo} postIDX={postIDX}></PostOptionComponent>
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
          {data?.dateTime.map((time, idx) => (
            <div key={idx} css={ArticleDateCss}>
              {time}
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
            {
              data ?
              data.subimg.map((img) => {
                return (
                  <div 
                    css={css`
                      width: 250px;
                      height: 320px;
                      background-image: url(${img});
                      background-size: contain;
                      background-position: center;
                      background-repeat: no-repeat;
                      `
                    }
                  />
                )
              }) : null
            }
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
            data-id="article-text"
            css={{
              position: 'relative',
              left: 16,
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
            onClick={e => {
              e.stopPropagation();
              //게시글좋아요버튼
              if (userLoginInfo) {
                if(isProfile){ //프로필 등록시 좋아요 가능
                  alert(isLikeStateOn ? '해당 게시글의 `좋아요`를 취소했습니다.' : '해당 게시글에 `좋아요`를 눌렀습니다.');
                  articleLikeMutate(postIDX);
                }
                else{alert('프로필 등록이 필요합니다.') }
              }
              else { 
                alert('로그인이 필요합니다.')
              }
            }}
            css={{
              all: 'unset',
              cursor: 'pointer',
              gridRow: 2,
              display: 'flex',
              position: 'relative',
              left: 535,
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
        <div css={{ width: 874, height: 1, background: COLORS.Gray2, margin: 'auto' }}></div>
        <div css={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
          {userIdxInfo === data?.writerIdx ? (
            <s.InviteBoxWrapper
              onClick={e => {
                e.stopPropagation();
                setIsInviteModalOpen(!isInviteModalOpen);
              }}
            >
              초대하기
            </s.InviteBoxWrapper>
          ) : undefined}
        </div>

        <FsLightboxWrapper data={data} />
        <ReplySectionComponent data={data} postIDX={postIDX}></ReplySectionComponent>
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
  border: 1px solid ${COLORS.Gray2};
  width: 250px;
  overflow: hidden;
  height: 300px;
  border-radius: 10px;
`;

interface IOptionComponent {
  reply?: IComments;
  reReply?: IComments;
  userIdxInfo?: number | null | undefined;
  replyIDX?: number;
  setIsModifyOn?: React.Dispatch<React.SetStateAction<boolean>>;
  isModifyOn?: boolean;
  isReplyOptModalOpen?: boolean;
  setIsReplyOptModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

//게시글 전용 option컴포넌트 분리
export const PostOptionComponent = ({
  userIdx,
  userIdxInfo,
  postIDX,
}: {
  userIdx?: number;
  userIdxInfo?: number | null;
  postIDX: string | undefined;
}) => {
  const navigate = useNavigate();
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
  const options = [
    ['수정', 0],
    ['삭제', 1],
  ];
  //게시글 삭제
  const { mutate } = useDeleteMatchingPostMutation(postIDX);
  return (
    <>
      {userIdx === userIdxInfo ? (
        options.map(opt => (
          <button
            //수정모드 라우트 처리 , 게시글 삭제 API 연동 , 신고 라우트 처리
            key={opt[0]}
            css={opt[1] === 0 ? postOption1 : postOption2}
            onClick={() => {
              switch (opt[1]) {
                case 0: {
                  //수정 라우트로 이동
                  navigate(`/put-posting/${postIDX}`);
                  break;
                }
                //삭제
                case 1: {
                  const confirm = window.confirm('게시글을 삭제하시겠습니까?');
                  if (confirm) mutate(postIDX);
                  break;
                }
                default:
              }
            }}
          >
            {opt[0]}
          </button>
        ))
      ) : (
        <button
          onClick={() => {
            navigate(`/report/:${postIDX}`);
          }}
          css={postOption3}
        >
          신고
        </button>
      )}
    </>
  );
};

export const OptionComponent = ({
  userIdxInfo,
  reply,
  reReply,
  replyIDX,
  setIsModifyOn,
  isModifyOn,
  isReplyOptModalOpen,
  setIsReplyOptModalOpen,
}: IOptionComponent) => {
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
  const options = [
    ['수정', 0],
    ['삭제', 1],
  ];
  const { mutate } = useDeleteReplyMutation(replyIDX);
  const navigate = useNavigate();
  const postIDX = useRecoilValue(PostIDXAtom);
  return (
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* //유저 식별 API인터페이스 */}
      {/* 책갈피1*/}
      {(userIdxInfo === reply?.writerIdx) || (userIdxInfo === reReply?.writerIdx) ? (
        options.map(opt => (
          <button
            onClick={() => {
              //옵션모달꺼주기
              if (setIsReplyOptModalOpen) {
                setIsReplyOptModalOpen(!isReplyOptModalOpen);
              }
              //수정모드On(i==0)
              if (opt[1] === 0 && setIsModifyOn) setIsModifyOn(!isModifyOn);
              //삭제버튼인 경우에(i==1)
              if (opt[1] === 1) {
                mutate(replyIDX);
              }
            }}
            key={opt[1]}
            css={opt[1] === 0 ? postOption1 : postOption2}
          >
            {opt[0]}
          </button>
        ))
      ) : (
        <button
          onClick={() => {
            //accessToken이 존재하는 경우만 요청이 가능하도록 할 예정 =>
            navigate(`/report/${postIDX}?reply=${replyIDX}`);
          }}
          css={postOption3}
        >
          신고
        </button>
      )}
    </div>
  );
};

export const FsLightboxWrapper = ({ data }: { data?: IMatchingPostPage }) => {
  const [toggler, setToggler] = useRecoilState(FsImageBoxToggler);
  const imgList: string[] | undefined = data?.subimg;
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
        sources={
          imgList?.map((img, idx) => {
            return <img src={img} alt={`img-${idx}`}/>
          })
        }
      />
    </>
  );
};
