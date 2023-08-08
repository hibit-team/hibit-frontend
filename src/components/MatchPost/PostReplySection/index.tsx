/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, SetStateAction } from 'react';
import * as s from './styles';
import COLORS from '../../../assets/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PEPE from '../../../images/components/MatchPost/pepe.jpeg';
import EmptyRoundLike from '../../../images/components/MatchPost/EmptyRoundLike.png';
import YellowRoundLike from '../../../images/components/MatchPost/YellowRoundLike.svg';
import ReplyArrow from '../../../images/components/MatchPost/replyArrow.svg';
import PurpleKebap from '../../../images/components/MatchPost/purpleKebap.svg';
import EmptyReplyArrow from '../../../images/components/MatchPost/emptyReplyArrow.svg';
import { OptionComponent } from '../PostArticle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../../services/HttpClient';
import { AxiosError } from 'axios';
import { useUpdateReplyTextMutation } from '../../../hooks/MatchingPost/useUpdateReplyTextMutation';
import { usePostSecondaryReplyInputMutation } from '../../../hooks/MatchingPost/usePostSecondaryReplyInputMutation';
import { usePostReplyLikeMutation } from '../../../hooks/MatchingPost/usePostReplyLikeMutation';

//좋아요한 유저들
export interface ILikeUsers {
  idx: number;
  id: string;
  profileImg: string;
}

//댓글(대댓글)리스트 인터페이스
export interface IComments {
  idx: number;
  writer: string;
  writerImg: string;
  content: string;
  childComments: IComments[];
  liked: number;
  time: string;
  likeUsers: ILikeUsers[];
}
//댓글입력창 MutationFn params
interface IMutationParams {
  postIDX: string | undefined;
  userIDX: number | undefined;
  body: { content: string };
}
//댓글영역 컴포넌트
export default function ReplySectionComponent({ postIDX }: { postIDX?: string }) {
  //OriginalReply:댓글
  //SecondaryReply:대댓글
  const queryKeys = {
    Rlists: ['reply-lists'],
  };
  //게시글데이터 불러오기
  const getMatchingPostReplyList = async () => {
    const res = HttpClient.get(`comment/list/${postIDX}`);
    return res;
  };
  const {
    data: replyData,
    error,
    isError,
    isFetching,
    isLoading,
  } = useQuery<IComments[], AxiosError>(queryKeys.Rlists, getMatchingPostReplyList, { staleTime: 1000, retry: 3, retryDelay: 2000 });
  if (isError) {
    console.error(`댓글리스트를 불러오지 못했습니다 :  ${error as AxiosError}`);
  }
  return (
    <div css={{ position: 'relative', paddingBottom: 100 }}>
      {/* 유저 댓글입력창 */}
      {/* 3번유저 : b */}
      <InputReplyWrapper postIDX={postIDX} userIDX={3} />
      {/* //댓글영역 */}
      <s.ReplySection>
        {replyData?.map(reply => (
          <OriginalReplyComponent key={reply.idx} reply={reply}></OriginalReplyComponent>
        ))}
      </s.ReplySection>
    </div>
  );
}
//댓글입력창
export const InputReplyWrapper = ({ postIDX, userIDX }: { postIDX?: string; userIDX?: number }) => {
  const [textState, setTextState] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  //댓글입력api
  const postMatchingReplyInput = async (params: IMutationParams) => {
    const { postIDX, userIDX, body } = params;
    try {
      const path = `comment/${postIDX}/${userIDX}`;
      const response = await HttpClient.post(path, body, { 'Content-Type': 'application/json;charset=utf-8' });
      return response;
    } catch (e) {
      console.error(`댓글 입력에 실패했습니다. Error: ${(e as AxiosError).message}`);
      return;
    }
  };
  if (textState.length > 250) setTextState(prev => prev.slice(0, 250));
  const queryClient = useQueryClient();
  const { mutate } = useMutation<string, AxiosError, IMutationParams>(postMatchingReplyInput, {
    onMutate: () => {
      queryClient.cancelQueries();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reply-lists']);
      const documentHeight = document.body.scrollHeight;
      window.scrollTo({ top: documentHeight, behavior: 'smooth' });
    },
    onError: e => {
      console.error(`댓글 입력에 실패했습니다. Error: ${(e as AxiosError).message}`);
    },
  });
  return (
    <div css={s.InputReplyWrapperCss}>
      <ImageBox width={32} height={32} source={PEPE} />
      <textarea
        onChange={e => {
          setTextState(e.target.value);
        }}
        ref={textRef}
        defaultValue={textState}
        maxLength={250}
        placeholder="댓글을 입력하세요"
        css={{
          boxSizing: 'border-box',
          border: 'none',
          appearance: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: 18,
          color: COLORS.Gray3,
          position: 'relative',
          top: 7,
          right: 20,
          overflow: 'hidden',
          '&::placeholder': {
            fontSize: 18,
            color: COLORS.Gray3,
          },
          width: 760,
          height: 100,
          overflowWrap: 'break-word',
        }}
      ></textarea>
      <div css={{ position: 'absolute', left: '78.5%', top: '78%', color: COLORS.Gray3 }}>{textState.length} / 250</div>
      <div css={{ gridColumn: '2', display: 'flex', justifyContent: 'flex-end', position: 'relative', right: 0, top: 12 }}>
        <div
          onClick={() => {
            setTimeout(() => {
              mutate({ postIDX, userIDX, body: { content: textState } });
            }, 500);
          }}
        >
          <ReplyButton right={0} bottom={5}>
            작성하기
          </ReplyButton>
        </div>
      </div>
    </div>
  );
};

//댓글 컴포넌트
export const OriginalReplyComponent = ({ reply }: { reply: IComments }) => {
  //선택옵션on-off
  const [isReplyOptModalOpen, setIsReplyOptModalOpen] = useState(false);
  const [isDaetgulOpen, setIsDaetgulOpen] = useState(false);
  //수정모드on-off여부
  const [isModifyOn, setIsModifyOn] = useState(false);
  const OriginalReplyTextRef = useRef<HTMLTextAreaElement>(null);
  const [replyTextState, setReplyTextState] = useState(reply.content);
  //좋아요 누른 인원 모달 open
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const handleOriginalReplyText = () => {
    if (OriginalReplyTextRef.current) {
      OriginalReplyTextRef.current.style.height = 'auto';
      OriginalReplyTextRef.current.style.height = OriginalReplyTextRef.current.scrollHeight + 'px';
    }
  };
  useEffect(() => {
    if (OriginalReplyTextRef.current) {
      handleOriginalReplyText();
      OriginalReplyTextRef.current.focus();
    }
  }, [replyTextState]);
  useEffect(() => {
    if (isDaetgulOpen === true) {
      setIsModifyOn(false);
    }
    if (isModifyOn === true) {
      setIsDaetgulOpen(false);
    }
  }, [isDaetgulOpen, isModifyOn]);
  //댓글 좋아요
  const { mutate } = usePostReplyLikeMutation(reply.idx);
  const isInclude = reply?.likeUsers?.find(user => {
    //3번아이디가 좋아요유저에 있다면
    if (user.idx === 2) {
      return true;
    }
    return false;
  });
  // 대댓글 unfold ==true면 펼치기
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div css={{ paddingBottom: 10 }}>
      <s.OriginalReplyWrapper>
        <div css={{ gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 30px', justifyContent: 'space-between' }}>
          <ImageBox width={32} height={32} source={reply.writerImg} />
          <div css={{ display: 'flex', flex: '0 1 187px' }}>
            <div css={{ borderRight: `1px solid ${COLORS.Gray2}`, padding: '0 12px', fontSize: 20, color: COLORS.Gray3, fontWeight: 800 }}>
              {/* 닉네임 */}
              {reply.writer}
            </div>
            <div css={{ color: COLORS.Gray3, padding: '0 12px', fontWeight: 500, fontSize: 20 }}>
              {/* 작성 시간 */}
              {reply.time}
            </div>
          </div>
          {/* LIKE BUTTON */}

          <div css={{ display: 'flex', flex: '1 1 255px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsLikeModalOpen(!isLikeModalOpen);
              }}
              css={{ userSelect: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}
            >
              {/* 좋아요 수 */}
              좋아요 {reply.liked}명{/* 좋아요리스트 => 컴포넌트화 하기(유저 로그인여부에 따라 ui 포지션 변경 (댓글-대댓글 케밥버튼여부에 따라)*/}
              {isLikeModalOpen && reply && <LikeUserModal reply={reply}marginTop={10}/>}
            </div>
            <div
              onClick={() => {
                //댓글 좋아요
                mutate(reply.idx);
              }}
            >
              {isInclude ? <ReplyEmptyRoundLikeButton isReplyLikeOn={true} /> : <ReplyEmptyRoundLikeButton isReplyLikeOn={false} />}
            </div>
            {/* REPLY BUTTON */}
            <div
              onClick={() => {
                setIsDaetgulOpen(!isDaetgulOpen);
              }}
              css={{
                margin: '0 6px 0 12px',
                width: 76,
                height: 32,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.Gray3,
                border: `1px solid ${COLORS.Gray3}`,
                borderRadius: '100px',
                cursor: 'pointer',
              }}
            >
              <img src={ReplyArrow} alt="reply-arrow-button" />
              <div css={{ marginLeft: 4 }}>답글</div>
            </div>
            {/* KEBAP BUTTON */}
            <img
              onClick={() => {
                setIsReplyOptModalOpen(!isReplyOptModalOpen);
              }}
              css={{
                cursor: 'pointer',
                margin: '0 6px',
              }}
              src={PurpleKebap}
              alt="purple-kebap"
            />
          </div>
          {/* 게시글OPTION */}
          {isReplyOptModalOpen && (
            <div
              css={{
                position: 'absolute',
                right: -30,
                top: -5,
                display: 'flex',
                justifyContent: 'center',
                width: 56,
                height: 102,
                alignItems: 'center',
                flexDirection: 'column',
                border: `1px solid ${COLORS.Gray2}`,
                borderRadius: 10,
                background: 'white',
              }}
            >
              <OptionComponent
                replyIDX={reply.idx}
                isModifyOn={isModifyOn}
                setIsModifyOn={setIsModifyOn}
                isReplyOptModalOpen={isReplyOptModalOpen}
                setIsReplyOptModalOpen={setIsReplyOptModalOpen}
              ></OptionComponent>
            </div>
          )}
        </div>
        {/* 댓글텍스트 */}
        {isModifyOn ? (
          <ReplyModifyOnComponent
            replyIDX={reply.idx}
            isModifyOn={isModifyOn}
            setIsModifyOn={setIsModifyOn}
            setReplyTextState={setReplyTextState}
            replyTextState={replyTextState}
          ></ReplyModifyOnComponent>
        ) : (
          <s.OriginalReplyText>{replyTextState}</s.OriginalReplyText>
        )}
        {/* 대댓글입력창 */}
        {isDaetgulOpen && (
          <div>
            <SecondaryReplyInputComponent
              replyIDX={reply.idx}
              userIDX={3}
              isDaetgulOpen={isDaetgulOpen}
              setIsDaetgulOpen={setIsDaetgulOpen}
            ></SecondaryReplyInputComponent>
          </div>
        )}
      </s.OriginalReplyWrapper>
      {/* 대댓글 컴포넌트 */}
      {reply.childComments.length > 3 ? (
        <span
          onClick={e => {
            e.stopPropagation();
            setIsOpen(!isOpen); //펼치기 false<->true
          }}
          css={{
            display: 'inline-block ',
            fontWeight: 600,
            justifyContent: 'start',
            cursor: 'pointer',
            fontSize: 20,
            color: COLORS.main79,
            marginTop: 10,
            marginLeft: 32,
          }}
        >
          {isOpen && reply.childComments.length > 3 ? <p css={{}}>접기</p> : `> 답글 +${reply.childComments.length - 3} 개`}
        </span>
      ) : undefined}
      {reply.childComments.map((reReply, lineNumber) => {
        if (isOpen === false && lineNumber >= 3) return <></>;
        return <SecondaryReplyComponent key={reReply.idx} reReply={reReply}></SecondaryReplyComponent>;
      })}
    </div>
  );
};

// 대댓글입력창(input)컴포넌트
export const SecondaryReplyInputComponent = ({
  replyIDX,
  userIDX,
  isDaetgulOpen,
  setIsDaetgulOpen,
}: {
  replyIDX: number | undefined;
  userIDX: number | undefined;
  isDaetgulOpen: boolean;
  setIsDaetgulOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  //대댓글
  const [secondaryReplyText, setSecondaryReplyText] = useState('');
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      //esc눌러서 대댓글입력창 켜져있으면 꺼주기
      if (setIsDaetgulOpen) setIsDaetgulOpen(false);
    }
  };
  const handleSecondaryReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length <= 250) {
      setSecondaryReplyText(value);
      adjustTextareaHeight();
    }
  };
  //댓글 길이에 반응하는 댓글창 (auto:측정,scrollHeight:반응형높이추가)
  function adjustTextareaHeight() {
    const textarea = replyTextAreaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      //scroll 생기면?
      const hasScrollbar = textarea.scrollHeight > textarea.clientHeight;
      if (hasScrollbar) {
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }
  }
  //모달 온오프 댓글초기화
  useEffect(() => {
    setSecondaryReplyText('');
    const currentTextAreaRef = replyTextAreaRef.current;
    return () => {
      if (currentTextAreaRef) currentTextAreaRef.value = '';
    };
  }, [isDaetgulOpen]);
  //대댓글작성mutation (임시유저3 = b)
  const { mutate } = usePostSecondaryReplyInputMutation({ replyIDX, userIDX, body: { content: secondaryReplyText } });
  return (
    <div
      css={{
        margin: '24px 30px',
        border: `1px solid ${COLORS.Gray2}`,
        borderRadius: 10,
        padding: '12px 20px',
        display: 'grid',
        gridTemplateColumns: '707px auto',
      }}
    >
      <textarea
        onKeyDown={handleKeyDown}
        maxLength={251}
        ref={replyTextAreaRef}
        defaultValue={secondaryReplyText}
        onChange={handleSecondaryReplyTextChange}
        placeholder="대댓글을 입력하세요. 입력이 길어지면 그에 맞춰 입력창이 늘어납니다 [최대 250자]"
        css={{
          boxSizing: 'content-box',
          padding: 0,
          lineHeight: '130%',
          height: 24,
          fontSize: 20,
          fontWeight: 500,
          color: COLORS.Gray3,
          border: 'none',
          appearance: 'none',
          outline: 'none',
          overflow: 'hidden',
          resize: 'none',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          '&:placeholder': { color: COLORS.Gray3 },
          letterSpacing: -2,
          position: 'relative',
          top: 5,
        }}
      ></textarea>
      <div
        onClick={() => {
          setIsDaetgulOpen(false);
          mutate({ replyIDX, userIDX, body: { content: secondaryReplyText } });
        }}
        css={{ display: 'flex', alignItems: 'flex-end' }}
      >
        <ReplyButton right={-20} bottom={0}>
          작성하기
        </ReplyButton>
      </div>
    </div>
  );
};

//댓글(대댓글) 수정모드 컴포넌트
export const ReplyModifyOnComponent = ({
  replyIDX,
  replyTextState,
  setReplyTextState,
  isModifyOn,
  setIsModifyOn,
  isSecondModifyOn,
  setIsSecondModifyOn,
}: {
  replyIDX?: number;
  replyTextState: string;
  setReplyTextState?: React.Dispatch<React.SetStateAction<string>>;
  isModifyOn?: boolean;
  setIsModifyOn?: React.Dispatch<React.SetStateAction<boolean>>;
  isSecondModifyOn?: boolean;
  setIsSecondModifyOn?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleOriginalTextModifying = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setReplyTextState) setReplyTextState(prevState => e.target.value);
    adjustTextareaHeight();
  };
  //댓글 길이에 반응하는 댓글창 (auto:측정,scrollHeight:반응형높이추가)
  const adjustTextareaHeight = () => {
    const textarea = replyTextAreaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      //scroll 생기면?
      const hasScrollbar = textarea.scrollHeight > textarea.clientHeight;
      if (hasScrollbar) {
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }
  };
  useEffect(() => {
    if (replyTextAreaRef.current) {
      replyTextAreaRef.current.focus();
    }
  }, [replyTextAreaRef.current]);
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      //esc눌러서 댓글 켜져있으면 꺼주기
      if (setIsModifyOn) setIsModifyOn(false);
      if (setIsSecondModifyOn) setIsSecondModifyOn(false);
    }
  };
  //댓글수정
  const { mutate } = useUpdateReplyTextMutation(replyIDX);
  return (
    <div
      css={{
        margin: '24px 30px',
        border: `1px solid ${COLORS.Gray2}`,
        borderRadius: 10,
        padding: 16,
        display: 'grid',
        gridTemplateColumns: '707px auto',
      }}
    >
      <textarea
        onKeyDown={handleKeyDown}
        maxLength={251}
        ref={replyTextAreaRef}
        defaultValue={replyTextState}
        onChange={handleOriginalTextModifying}
        css={{
          boxSizing: 'content-box',
          lineHeight: '130%',
          height: 24,
          fontSize: 20,
          fontWeight: 500,
          color: COLORS.Gray3,
          border: 'none',
          appearance: 'none',
          outline: 'none',
          overflow: 'hidden',
          resize: 'none',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          '&:placeholder': { color: COLORS.Gray3 },
          letterSpacing: -2,
          position: 'relative',
          top: 2,
        }}
      ></textarea>
      <div
        css={{ display: 'flex', alignItems: 'end' }}
        onClick={() => {
          if (setReplyTextState && replyTextAreaRef.current) setReplyTextState(replyTextAreaRef.current.value);
          if (setIsModifyOn) setIsModifyOn(false);
          if (setIsSecondModifyOn) setIsSecondModifyOn(false);
          mutate({ replyIDX, body: { content: replyTextState } });
        }}
      >
        <ReplyButton right={-24} bottom={0}>
          수정하기
        </ReplyButton>
      </div>
    </div>
  );
};

//대댓글 컴포넌트
export const SecondaryReplyComponent = ({ reReply }: { reReply: IComments }) => {
  //원댓글과 별도의 optModalState
  const [isReplyOptModalOpen, setIsReplyOptModalOpen] = useState(false);
  const [replyTextState, setReplyTextState] = useState(reReply.content);
  const [isSecondModifyOn, setIsSecondModifyOn] = useState(false);
  const { mutate } = usePostReplyLikeMutation(reReply.idx);
  //좋아요 누른 인원 모달 open
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const isInclude = reReply?.likeUsers?.find(user => {
    //3번아이디가 좋아요유저에 있다면
    if (user.idx === 2) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div>
      <s.SecondaryReplyWrapper>
        <div css={{ gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 15px', justifyContent: 'space-between' }}>
          <img css={{ marginRight: 12 }} src={EmptyReplyArrow} alt="reply-arrow-empty" />
          <ImageBox width={32} height={32} source={reReply.writerImg} />
          <div css={{ display: 'flex', flex: '0 1 187px' }}>
            <div css={{ borderRight: `1px solid ${COLORS.Gray2}`, padding: '0 12px', fontSize: 20, color: COLORS.Gray3, fontWeight: 800 }}>
              {/* 닉네임 */}
              {reReply.writer}
            </div>
            <div css={{ color: COLORS.Gray3, padding: '0 12px', fontWeight: 500, fontSize: 20 }}>
              {/* 작성시간 */}
              {reReply.time}
            </div>
          </div>
          <div css={{ display: 'flex', flex: '1 1 255px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div
              onClick={e => {
                e.stopPropagation();
                setIsLikeModalOpen(!isLikeModalOpen);
              }}
              css={{ userSelect:'none',cursor:'pointer',fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}
            >
              {/* 좋아요 수 */}
              좋아요 {reReply.liked}명{isLikeModalOpen ? <LikeUserModal reply={reReply} marginTop={26} /> : undefined}
            </div>
            <div
              onClick={() => {
                mutate(reReply.idx);
              }}
            >
              {isInclude ? <ReplyEmptyRoundLikeButton isReplyLikeOn={true} /> : <ReplyEmptyRoundLikeButton isReplyLikeOn={false} />}
            </div>
            <img
              onClick={() => {
                setIsReplyOptModalOpen(!isReplyOptModalOpen);
              }}
              css={{
                cursor: 'pointer',
                margin: '0 0 0px 12px ',
              }}
              src={PurpleKebap}
              alt="purple-kebap"
            />
          </div>
          {isReplyOptModalOpen && (
            <div
              css={{
                position: 'absolute',
                right: -55,
                top: 10,
                display: 'flex',
                justifyContent: 'center',
                width: 56,
                height: 102,
                alignItems: 'center',
                flexDirection: 'column',
                border: `1px solid ${COLORS.Gray2}`,
                borderRadius: 10,
                background: 'white',
                zIndex: 10,
                cursor: 'pointer',
              }}
            >
              <OptionComponent
                replyIDX={reReply.idx}
                isReplyOptModalOpen={isReplyOptModalOpen}
                setIsReplyOptModalOpen={setIsReplyOptModalOpen}
                isModifyOn={isSecondModifyOn}
                setIsModifyOn={setIsSecondModifyOn}
              ></OptionComponent>
            </div>
          )}
        </div>
        {isSecondModifyOn ? (
          <ReplyModifyOnComponent
            replyIDX={reReply.idx}
            replyTextState={replyTextState}
            setReplyTextState={setReplyTextState}
            isSecondModifyOn={isSecondModifyOn}
            setIsSecondModifyOn={setIsSecondModifyOn}
          ></ReplyModifyOnComponent>
        ) : (
          <s.SecondaryReplyText>{replyTextState}</s.SecondaryReplyText>
        )}
      </s.SecondaryReplyWrapper>
    </div>
  );
};

//프로필 이미지박스
export const ImageBox = ({ source, width, height }: { source: string; width: number; height: number }) => {
  return (
    <div
      css={{
        boxSizing: 'border-box',
        width,
        height,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `1px solid ${COLORS.Gray2}`,
      }}
    >
      <img
        css={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        // src={ProfileDefault}
        src={source}
        alt="pepe"
      />
    </div>
  );
};

// 댓글&대댓글 좋아요 버튼 컴포넌트
export const ReplyEmptyRoundLikeButton = ({ isReplyLikeOn }: { isReplyLikeOn: boolean }) => {
  return (
    <>
      {isReplyLikeOn ? (
        <img css={{ userSelect: 'none', width: 33, height: 32, cursor: 'pointer' }} src={YellowRoundLike} alt="yellow-like" />
      ) : (
        <img css={{ width: 33, height: 32, cursor: 'pointer' }} src={EmptyRoundLike} alt="empty-like" />
      )}
    </>
  );
};

//작성하기 버튼
export const ReplyButton = styled.button<{ right?: number; bottom?: number }>(({ right, bottom }) => ({
  alignSelf: 'end',
  boxSizing: 'border-box',
  all: 'unset',
  cursor: 'pointer',
  width: 94,
  height: 34,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 20,
  border: `1px solid ${COLORS.Gray3}`,
  color: COLORS.Gray3,
  '&:hover': {
    color: COLORS.white,
    background: COLORS.Gray3,
  },
  // color: COLORS.Gray3,
  // background: COLORS.Gray3,
  borderRadius: 60,
  position: 'relative',
  right: right,
  bottom: bottom,
}));

//유저 좋아요 리스트 모달 
function LikeUserModal({ reply,marginTop}: { reply: IComments,marginTop:number }) {
  return (
    <div
      data-id="likeuser-list"
      css={{
        display: reply?.liked === 0 ? 'none' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 10px',
        position: 'absolute',
        width: 128,
        height: 'auto',
        background: COLORS.Gray2,
        zIndex: 20,
        borderRadius: 16,
        marginTop: marginTop,
        top: 30,
      }}
    >
      {reply?.likeUsers.map(likeuser => (
        <div key={likeuser.id} css={{ color: 'white', fontSize: 16, fontWeight: 700, padding: 6 }}>
          {likeuser.id}
        </div>
      ))}
      {reply.likeUsers.length > 4 ? (
        <div css={{ display: 'flex', color: COLORS.Gray3, fontSize: 16, fontWeight: 900, padding: 6 }}>이외 {reply?.likeUsers.length - 4}명</div>
      ) : undefined}
    </div>
  );
}
