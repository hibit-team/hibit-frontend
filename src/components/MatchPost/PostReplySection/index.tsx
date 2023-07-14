/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, Dispatch, DispatchWithoutAction, SetStateAction } from 'react';
import * as s from './styles';
import COLORS from '../../../assets/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ProfileDefault from '../../../images/components/MatchPost/profileDefault.svg';
import PEPE from '../../../images/components/MatchPost/pepe.jpeg';
import EmptyRoundLike from '../../../images/components/MatchPost/EmptyRoundLike.png';
import YellowRoundLike from '../../../images/components/MatchPost/YellowRoundLike.svg';
import ReplyArrow from '../../../images/components/MatchPost/replyArrow.svg';
import PurpleKebap from '../../../images/components/MatchPost/purpleKebap.svg';
import EmptyReplyArrow from '../../../images/components/MatchPost/emptyReplyArrow.svg';
import { OptionComponent } from '../PostArticle';
//댓글영역 컴포넌트
export default function ReplySectionComponent() {
  //useQuery: 댓글 관련 data
  //OriginalReply:댓글
  //SecondaryReply:대댓글
  return (
    <div css={{ position: 'relative', paddingBottom: 100 }}>
      {/* 유저 댓글입력창 */}
      <s.InputReplyWrapper>
        <ImageBox width={32} height={32} source={PEPE} />
        <textarea
          defaultValue={''}
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
            wordBreak: 'break-all',
            position: 'relative',
            top: 7,
            right: 12,
            overflow: 'hidden',
            '&::placeholder': {
              fontSize: 18,
              color: COLORS.Gray3,
            },
            width: 760,
            height: 100,
          }}
        ></textarea>
        <div css={{ gridColumn: '2', display: 'flex', justifyContent: 'flex-end', position: 'relative', right: 10, top: 8 }}>
          <ReplyButton right={0} bottom={10}>
            작성하기
          </ReplyButton>
        </div>
      </s.InputReplyWrapper>
      {/* //댓글영역 */}
      <s.ReplySection>
        {[1, 2].map((item, keys) => (
          <OriginalReplyComponent key={keys}></OriginalReplyComponent>
        ))}
      </s.ReplySection>
    </div>
  );
}
//기본 댓글 컴포넌트
export const OriginalReplyComponent = () => {
  const [isReplyOptModalOpen, setIsReplyOptModalOpen] = useState(false);
  const [isReplyLikeOn, setIsReplyLikeOn] = useState(false);
  const [isDaetgulOpen, setIsDaetgulOpen] = useState(false);
  const [replyTextState, setReplyTextState] = useState(
    '댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대250자댓글최대250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자250자댓글최대 250자댓글최대250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대'
  );
  return (
    <div>
      <s.OriginalReplyWrapper>
        <div css={{ gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 30px', justifyContent: 'space-between' }}>
          <ImageBox width={32} height={32} source={ProfileDefault} />
          <div css={{ display: 'flex', flex: '0 1 187px' }}>
            <div css={{ borderRight: `1px solid ${COLORS.Gray2}`, padding: '0 12px', fontSize: 20, color: COLORS.Gray3, fontWeight: 800 }}>
              닉네임
            </div>
            <div css={{ color: COLORS.Gray3, padding: '0 12px', fontWeight: 500, fontSize: 20 }}>7시간 전</div>
          </div>
          <div css={{ display: 'flex', flex: '1 1 255px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div css={{ fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}>좋아요 0개</div>
            <div onClick={()=>setIsReplyLikeOn(!isReplyLikeOn)}>
              <ReplyEmptyRoundLikeButton
                isReplyLikeOn={isReplyLikeOn}
              />
            </div>

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
            <img
              onClick={() => {
                //내가 클릭한 리플의 게시글id가 맞다면 ()
                if (true) setIsReplyOptModalOpen(!isReplyOptModalOpen);
              }}
              css={{
                cursor: 'pointer',
                margin: '0 6px',
              }}
              src={PurpleKebap}
              alt="purple-kebap"
            />
          </div>
          <div
            css={{
              position: 'absolute',
              left: 835,
              top: 30,
              display: isReplyOptModalOpen ? 'flex' : 'none',
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
            <OptionComponent></OptionComponent>
          </div>
        </div>
        <s.OriginalReplyText>{replyTextState}</s.OriginalReplyText>
        {/* 대댓글 */}
        <div css={{ display: isDaetgulOpen ? 'block' : 'none' }}>
          <SecondaryReplyInputComponent isDaetgulOpen={isDaetgulOpen}></SecondaryReplyInputComponent>
        </div>
      </s.OriginalReplyWrapper>
      <SecondaryReplyComponent></SecondaryReplyComponent>
    </div>
  );
};

// 대댓글입력창(input)컴포넌트
export const SecondaryReplyInputComponent = ({ isDaetgulOpen }: { isDaetgulOpen: boolean }) => {
  const [secondaryReplyText, setSecondaryReplyText] = useState('');
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleSecondaryReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length <= 250) {
      value = value.slice(0, value.length - 1);
      setSecondaryReplyText(value);
      adjustTextareaHeight();
    } else if (value.length > 250) {
      value = value.slice(0, 250);
      setSecondaryReplyText(value);
      alert('250자를 넘을 수 없습니다.');
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
  //모달 온오프 댓글초기화
  useEffect(() => {
    setSecondaryReplyText('');
    const currentTextAreaRef = replyTextAreaRef.current;
    return () => {
      if (currentTextAreaRef) currentTextAreaRef.value = '';
    };
  }, [isDaetgulOpen]);
  return (
    <div
      css={{
        margin: '24px 30px',
        border: `1px solid ${COLORS.Gray2}`,
        borderRadius: 10,
        padding: 20,
        display: 'grid',
        gridTemplateColumns: '707px auto',
      }}
    >
      <textarea
        maxLength={251}
        ref={replyTextAreaRef}
        defaultValue={secondaryReplyText}
        onChange={handleSecondaryReplyTextChange}
        placeholder="대댓글을 입력하세요. 입력이 길어지면 그에 맞춰 입력창이 늘어납니다."
        css={{
          boxSizing: 'content-box',
          padding: 0,
          lineHeight: '100%',
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
      <ReplyButton right={50} bottom={17}>
        작성하기
      </ReplyButton>
    </div>
  );
};
//대댓글 컴포넌트
export const SecondaryReplyComponent = () => {
  const [isReplyOptModalOpen, setIsReplyOptModalOpen] = useState(false);
  const [isReplyLikeOn, setIsReplyLikeOn] = useState(false);
  const [isDaetgulOpen, setIsDaetgulOpen] = useState(false);
  const [seconaryReplyTextState, setSecondaryReplyTextState] = useState(
    '댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대250자댓글최대250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자250자댓글최대 250자댓글최대250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대'
  );
  return (
    <div>
      <s.SecondaryReplyWrapper>
        <div css={{ gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 30px', justifyContent: 'space-between' }}>
          <img css={{ marginRight: 12 }} src={EmptyReplyArrow} alt="reply-arrow-empty" />
          <ImageBox width={32} height={32} source={ProfileDefault} />
          <div css={{ display: 'flex', flex: '0 1 187px' }}>
            <div css={{ borderRight: `1px solid ${COLORS.Gray2}`, padding: '0 12px', fontSize: 20, color: COLORS.Gray3, fontWeight: 800 }}>
              닉네임
            </div>
            <div css={{ color: COLORS.Gray3, padding: '0 12px', fontWeight: 500, fontSize: 20 }}>7시간 전</div>
          </div>
          <div css={{ display: 'flex', flex: '1 1 255px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div css={{ fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}>좋아요 0개</div>
            <div onClick={()=>setIsReplyLikeOn(!isReplyLikeOn)}>
              <ReplyEmptyRoundLikeButton
                isReplyLikeOn={isReplyLikeOn}
              />
            </div>
            <img
              onClick={() => {
                setIsReplyOptModalOpen(!isReplyOptModalOpen);
              }}
              css={{
                margin: '0 0 0px 12px ',
              }}
              src={PurpleKebap}
              alt="purple-kebap"
            />
          </div>
          <div
            css={{
              position: 'absolute',
              left: 842,
              top: 30,
              display: isReplyOptModalOpen ? 'flex' : 'none',
              justifyContent: 'center',
              width: 56,
              height: 102,
              alignItems: 'center',
              flexDirection: 'column',
              border: `1px solid ${COLORS.Gray2}`,
              borderRadius: 10,
              background: 'white',
              zIndex: 10,
            }}
          >
            <OptionComponent></OptionComponent>
          </div>
        </div>
        <s.SecondaryReplyText>{seconaryReplyTextState}</s.SecondaryReplyText>
      </s.SecondaryReplyWrapper>
      {/* 대댓글구분선 */}
      <div
        css={{ margin: '0px auto', boxSizing: 'border-box', width: 864, height: 1, borderBottom: `1.5px solid ${COLORS.Gray2}`, paddingTop: 18 }}
      ></div>
    </div>
  );
};

//이미지박스
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

// 댓글&대댓글 좋아요 버튼
export const ReplyEmptyRoundLikeButton = ({ isReplyLikeOn}: { isReplyLikeOn: boolean}) => {
  return (
    <>
      {isReplyLikeOn ? (
        <img css={{ width: 33, height: 32, cursor: 'pointer' }} src={YellowRoundLike} alt="empty-like" />
      ) : (
        <img css={{ width: 33, height: 32, cursor: 'pointer' }} src={EmptyRoundLike} alt="empty-like" />
      )}
    </>
  );
};

//작성하기 버튼
export const ReplyButton = styled.button<{ right: number; bottom: number }>(({ right, bottom }) => ({
  boxSizing: 'border-box',
  all: 'unset',
  cursor: 'pointer',
  width: 94,
  height: 34,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  color: 'white',
  background: COLORS.Gray3,
  borderRadius: 60,
  alignSelf: 'flex-end',
  position: 'absolute',
  right: right,
  bottom: bottom,
}));
