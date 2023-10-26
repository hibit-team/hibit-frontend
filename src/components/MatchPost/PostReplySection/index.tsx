/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, SetStateAction, useCallback } from 'react';
import * as s from './styles';
import COLORS from '../../../assets/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
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
import { motion } from 'framer-motion';
import useLoginInfo from '../../../hooks/useLoginInfo';
import { ILoginInfo } from '../../../hooks/useLoginInfo';
import userDefaultImage from '../../../images/components/MatchPost/profileDefault.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { profileRegisteredState, userIdxState } from '../../../recoil/atom/LoginInfoState';
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
  writerIdx: number;
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
  const isLogin = useLoginInfo();
  const isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);
  const userIdx: number | null = useRecoilValue(userIdxState);
  const userLoginInfo: ILoginInfo = {
    isLoggedIn: isLogin,
    isProfileRegistered: isProfileRegistered,
    userIdx: userIdx
  }
  return (
    <div css={{ position: 'relative', paddingBottom: 100 }}>
      {/* 유저 댓글입력창 */}
      <InputReplyWrapper postIDX={postIDX} userLoginInfo={userLoginInfo} />
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
export const InputReplyWrapper = ({ postIDX, userLoginInfo }: { postIDX?: string; userLoginInfo?: ILoginInfo }) => {
  let [userImg,setUserImg] = useState<string>('')
  useEffect(()=>{
      (async function getUserImg (){
        try{
          const res = await HttpClient.get('api/profiles/me')
          setUserImg(res.mainImg)}
        catch(e){
          console.error(`댓글입력창의 이미지를 불러올 수 없습니다.${(e as AxiosError)}`)
        }
      })()
  },[])
  const [textState, setTextState] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  //댓글입력api
  const postMatchingReplyInput = async (params: IMutationParams) => {
    const { postIDX, body } = params;
    try {
      const path = `comment/${postIDX}`;
      const response = await HttpClient.post(path, body, { 'Content-Type': 'application/json;charset=utf-8' });
      return response;
    } catch (e) {
      console.error(`댓글 입력에 실패했습니다. Error: ${(e as AxiosError).message}`);
      if ((e as AxiosError).response?.status === 404) alert('댓글 작성에 실패했습니다.');
      return;
    }
  };
  if (textState.length > 250) setTextState(prev => prev.slice(0, 250));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: replyInputMutate } = useMutation<string, AxiosError, IMutationParams>(postMatchingReplyInput, {
    onMutate: () => {
      queryClient.cancelQueries();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reply-lists']);
      const documentHeight = document.body.scrollHeight;
      window.scrollTo({ top: documentHeight, behavior: 'smooth' });
    },
    onError: e => {
      alert('댓글 입력에 실패했습니다.');
      console.error(`댓글 입력에 실패했습니다. Error: ${(e as AxiosError).message}`);
    },
  });
  return (
    <div css={s.InputReplyWrapperCss}>
      {/* 로그인상태값으로 프로필 이미지 가져오기 */}
      <div css={{ cursor:'pointer' }} onClick={()=>{
        navigate(`/others/:${userLoginInfo?.userIdx}`)
        window.scrollTo(0,0)
      }}>
        <ImageBox width={32} height={32} source={userImg ? userImg : userDefaultImage} />
      </div>
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
          onClick={e => {
            e.stopPropagation();
            // 로그인 + 프로필등록 완료시에 댓글작성 OK
            if (userLoginInfo?.isLoggedIn === false ){
              alert('로그인이 필요합니다.');
            }
            else if (userLoginInfo?.isLoggedIn && userLoginInfo?.isProfileRegistered === false){
              alert('댓글 작성시 프로필을 등록이 필요합니다.')
            }
            else if (userLoginInfo?.isLoggedIn && userLoginInfo?.isProfileRegistered === true) {
              if (textState === '') {
                alert('댓글 내용을 입력해 주세요.');
              } else {
                replyInputMutate({ postIDX, body: { content: textState } });
              }
            }
          }}
        >
          <ReplyButton buttonCord={{ right: 0, bottom: 5 }}>작성하기</ReplyButton>
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
  //로그인 정보 불러오기
  const userIdxInfo = useRecoilValue(userIdxState);

  const isLogin = useLoginInfo();
  const isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);
  const userLoginInfo: ILoginInfo = {
    isLoggedIn: isLogin,
    isProfileRegistered: isProfileRegistered,
    userIdx: userIdxInfo
  }

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
    // 로그인한 아이디 idx가 좋아요유저에 있다면
    if (user.idx === userIdxInfo) {
      return true;
    }
    return false;
  });
  // 대댓글 unfold ==true면 펼치기
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  //(대)댓글 옵션컴포넌트 외부클릭시 꺼주기
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref?.current.contains(e.target as Node) && isReplyOptModalOpen) {
        // 외부 클릭이 발생한 경우, isOpen 상태를 변경
        setIsReplyOptModalOpen(false);
      }
    },
    [isReplyOptModalOpen, setIsReplyOptModalOpen]
  );
  useEffect(() => {
    // 컴포넌트가 마운트될 때 외부 클릭 이벤트를 감지하는 이벤트 리스너를 추가
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트되거나 업데이트될 때 이벤트 리스너를 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsReplyOptModalOpen, handleClickOutside]);
  return (
    <div css={{ paddingBottom: 10 }}>
      <s.OriginalReplyWrapper>
        <div css={{ gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 30px', justifyContent: 'space-between' }}>
          <div css={{ cursor:'pointer' }} onClick={()=>{
        navigate(`/others/:${reply?.writerIdx}`)
        window.scrollTo(0, 0)
        }}>
          <ImageBox width={32} height={32} source={reply.writerImg}
          />
        </div>
          <div css={{ display: 'flex', flex: '0 1 auto' }}>
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
              onClick={e => {
                e.stopPropagation();
                setIsLikeModalOpen(!isLikeModalOpen);
              }}
              css={{ userSelect: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}
            >
              {/* 좋아요 수 */}
              좋아요 {reply.liked}명{/* 좋아요리스트 => 컴포넌트화 하기(유저 로그인여부에 따라 ui 포지션 변경 (댓글-대댓글 케밥버튼여부에 따라)*/}
              {isLikeModalOpen && reply && <LikeUserModal reply={reply} marginTop={10} setIsLikeModalOpen={setIsLikeModalOpen} />}
            </div>
            <div
              onClick={e => {
                //댓글 좋아요
                if (userLoginInfo) {
                  //로그인한 경우만 좋아요가능
                  mutate(reply.idx);
                } else {
                  alert('로그인이 필요합니다');
                }
              }}
            >
              {isInclude ? <ReplyEmptyRoundLikeButton isReplyLikeOn={true} /> : <ReplyEmptyRoundLikeButton isReplyLikeOn={false} />}
            </div>
            {/* REPLY BUTTON */}
            <div
              onClick={() => {
                if (userLoginInfo) {
                  setIsDaetgulOpen(!isDaetgulOpen);
                } else {
                  alert('로그인이 필요합니다.');
                }
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
              <div css={{ userSelect: 'none', marginLeft: 4 }}>답글</div>
            </div>
            {/* KEBAP BUTTON */}
            {userLoginInfo ? (
              <img
                onClick={e => {
                  e.stopPropagation();
                  if (isReplyOptModalOpen) setIsReplyOptModalOpen(false);
                  else {
                    setIsReplyOptModalOpen(true);
                  }
                }}
                css={{
                  cursor: 'pointer',
                  margin: '0 6px',
                }}
                src={PurpleKebap}
                alt="purple-kebap"
              />
            ) : undefined}
          </div>
          {/* 게시글OPTION */}
          {isReplyOptModalOpen && (
            <div
              ref={ref}
              css={{
                position: 'absolute',
                right: -30,
                top: -5,
                display: 'flex',
                justifyContent: 'center',
                width: 56,
                height: 'auto',
                padding: '10px 0px',
                alignItems: 'center',
                flexDirection: 'column',
                border: `1px solid ${COLORS.Gray2}`,
                borderRadius: 10,
                background: 'white',
              }}
            >
              <OptionComponent
                userIdxInfo={userIdxInfo}
                reply={reply}
                replyIDX={reply.idx}
                isModifyOn={isModifyOn}
                setIsModifyOn={setIsModifyOn}
                isReplyOptModalOpen={isReplyOptModalOpen}
                setIsReplyOptModalOpen={setIsReplyOptModalOpen}
              ></OptionComponent>
            </div>
          )}
        </div>
        {/* ORIGINAL 댓글 */}
        {isModifyOn ? (
          <ReplyModifyOnComponent
            modifyTypes="original"
            reply={reply}
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
              userLoginInfo={userLoginInfo}
              replyIDX={reply.idx}
              userIDX={userLoginInfo.userIdx}
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
          {isOpen && reply.childComments.length > 3 ? (
            <p css={{ userSelect: 'none' }}>접기</p>
          ) : (
            <p css={{ userSelect: 'none' }}>&gt; 답글 +{reply.childComments.length - 3} 개</p>
          )}
        </span>
      ) : undefined}
      {reply.childComments.map((reReply, lineNumber) => {
        if (isOpen === false && lineNumber >= 3) return <></>;
        return (
          <SecondaryReplyComponent
            userLoginInfo={userLoginInfo}
            userIdxInfo={userIdxInfo}
            key={reReply.idx}
            reReply={reReply}
          ></SecondaryReplyComponent>
        );
      })}
    </div>
  );
};

// 대댓글입력창(input)컴포넌트
export const SecondaryReplyInputComponent = ({
  userLoginInfo,
  replyIDX,
  userIDX,
  isDaetgulOpen,
  setIsDaetgulOpen,
}: {
  userLoginInfo: ILoginInfo;
  replyIDX: number | undefined;
  userIDX: number | null;
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
    } else {
      setSecondaryReplyText(e.target.value.slice(0, 250));
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
  //대댓글작성mutation
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
        placeholder="대댓글을 입력하세요. 입력이 길어지면 그에 맞춰 입력창이 늘어납니다."
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
        onClick={e => {
          e.stopPropagation();
          if (userLoginInfo?.isLoggedIn === true) {
            if(secondaryReplyText.trim().length !== 0){
              setIsDaetgulOpen(false);
              mutate({ replyIDX, userIDX, body: { content: secondaryReplyText } });
            } else{ 
              alert('댓글 내용을 입력해 주세요.')
            } 
          } else {
            alert('로그인이 필요합니다');
          }
        }}
        css={{ display: 'flex', alignItems: 'flex-end' }}
      >
        <ReplyButton buttonCord={{ right: -20, bottom: 0 }}>작성하기</ReplyButton>
      </div>
    </div>
  );
};

//댓글(대댓글) 수정모드 컴포넌트
export const ReplyModifyOnComponent = ({
  modifyTypes,
  reply,
  replyIDX,
  replyTextState,
  setReplyTextState,
  isModifyOn,
  setIsModifyOn,
  isSecondModifyOn,
  setIsSecondModifyOn,
}: {
  modifyTypes?: string;
  reply?: IComments;
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
    if (setReplyTextState && e.target.value.length <= 250) {
      setReplyTextState(e.target.value);
      adjustTextareaHeight();
    } else if (setReplyTextState && e.target.value.length > 250) {
      setReplyTextState(e.target.value.slice(0, 250));
      adjustTextareaHeight();
    }
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
      if (setReplyTextState && reply) setReplyTextState(reply?.content);
    }
  };
  //댓글수정
  const { mutate } = useUpdateReplyTextMutation(replyIDX);
  return (
    <div
      css={{
        margin: '24px 24px',
        border: `1px solid ${COLORS.Gray2}`,
        borderRadius: 10,
        padding: 16,
        display: 'grid',
        gridTemplateColumns: '707px auto',
      }}
    >
      <textarea
        onKeyDown={handleKeyDown}
        maxLength={250}
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
          width: modifyTypes === 'secondary' ? '93%' : '97%',
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
        {/* //대댓글수정버튼 */}
        {modifyTypes === 'original' ? (
          <ReplyButton modifyTypes="original" buttonCord={{ right: 0, bottom: 0 }}>
            수정하기
          </ReplyButton>
        ) : (
          <ReplyButton buttonCord={{ right: 28, bottom: 0 }}>수정하기</ReplyButton>
        )}
      </div>
    </div>
  );
};

//대댓글 컴포넌트

export const SecondaryReplyComponent = ({
  userLoginInfo,
  userIdxInfo,
  reReply,
}: {
  userLoginInfo?: ILoginInfo;
  userIdxInfo?: number | null;
  reReply: IComments;
}) => {
  //원댓글과 별도의 optModalState
  const [isReplyOptModalOpen, setIsReplyOptModalOpen] = useState(false);
  const [replyTextState, setReplyTextState] = useState(reReply.content);
  const [isSecondModifyOn, setIsSecondModifyOn] = useState(false);
  const { mutate: secondaryReplyLikeMutate } = usePostReplyLikeMutation(reReply.idx);
  //좋아요 누른 인원 모달 open
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const isInclude = reReply?.likeUsers?.find(user => {
    // 로그인 유저가 해당 댓글에 좋아요를 눌렀다면
    if (user.idx === userLoginInfo?.userIdx) {
      return true;
    } else {
      return false;
    }
  });
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref?.current.contains(e.target as Node) && isReplyOptModalOpen) {
        // 외부 클릭이 발생한 경우, isOpen 상태를 변경
        setIsReplyOptModalOpen(false);
      }
    },
    [isReplyOptModalOpen, setIsReplyOptModalOpen]
  );
  useEffect(() => {
    // 컴포넌트가 마운트될 때 외부 클릭 이벤트를 감지하는 이벤트 리스너를 추가
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트되거나 업데이트될 때 이벤트 리스너를 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsReplyOptModalOpen, handleClickOutside]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <s.SecondaryReplyWrapper isSecondModifyOn={isSecondModifyOn}>
        <div css={{ userSelect: 'none', gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 15px', justifyContent: 'space-between' }}>
          <img css={{ marginRight: 12 }} src={EmptyReplyArrow} alt="reply-arrow-empty" />
          <div css={{ cursor:'pointer' }} onClick={()=>{
            navigate(`/others/:${reReply?.writerIdx}`)
            window.scrollTo(0, 0)
            }}>
            <ImageBox width={32} height={32} source={reReply.writerImg} />
          </div>
          <div css={{ display: 'flex', flex: '0 1 auto' }}>
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
              css={{ userSelect: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}
            >
              {/* 좋아요 수 */}
              좋아요 {reReply.liked}명
              {isLikeModalOpen ? <LikeUserModal reply={reReply} marginTop={26} setIsLikeModalOpen={setIsLikeModalOpen} /> : undefined}
            </div>
            <div
              onClick={() => {
                if (userLoginInfo?.isLoggedIn) {
                  secondaryReplyLikeMutate(reReply.idx);
                } else {
                  alert('로그인이 필요합니다');
                }
              }}
            >
              {isInclude ? <ReplyEmptyRoundLikeButton isReplyLikeOn={true} /> : <ReplyEmptyRoundLikeButton isReplyLikeOn={false} />}
            </div>
            {userLoginInfo?.isLoggedIn === true ? (
              <img
                onClick={e => {
                  e.stopPropagation();
                  if (isReplyOptModalOpen) {
                    setIsReplyOptModalOpen(false);
                  } else {
                    setIsReplyOptModalOpen(true);
                  }
                }}
                css={{
                  cursor: 'pointer',
                  margin: '0 0 0px 12px ',
                }}
                src={PurpleKebap}
                alt="purple-kebap"
              />
            ) : undefined}
          </div>
          {isReplyOptModalOpen && (
            <div
              ref={ref}
              css={{
                position: 'absolute',
                right: -55,
                top: 10,
                display: 'flex',
                justifyContent: 'center',
                width: 56,
                height: 'auto',
                padding: '10px 0',
                alignItems: 'center',
                flexDirection: 'column',
                border: `1px solid ${COLORS.Gray2}`,
                borderRadius: 10,
                background: 'white',
                zIndex: 10,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <OptionComponent
                userIdxInfo={userIdxInfo}
                reReply={reReply}
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
            modifyTypes="secondary"
            reply={reReply}
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
    </motion.div>
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
interface ButtonProps {
  buttonCord: {
    right: number;
    bottom: number;
  };
  modifyTypes?: string;
}

export const ReplyButton = styled.button<ButtonProps>(({ buttonCord, modifyTypes }) => ({
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
  borderRadius: 60,
  position: 'relative',
  right: modifyTypes === 'original' ? -30 : buttonCord.right,
  bottom: modifyTypes === 'original' ? 0 : buttonCord.bottom,
}));

//유저 좋아요 리스트 모달
function LikeUserModal({
  reply,
  marginTop,
  setIsLikeModalOpen,
}: {
  reply: IComments;
  marginTop: number;
  setIsLikeModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref?.current.contains(e.target as Node)) {
      // 외부 클릭이 발생한 경우, isOpen 상태를 변경
      setIsLikeModalOpen(false);
    }
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 외부 클릭 이벤트를 감지하는 이벤트 리스너를 추가합니다.
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트되거나 업데이트될 때 이벤트 리스너를 제거합니다.
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsLikeModalOpen, handleClickOutside]);

  return (
    <div
      ref={ref}
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
