/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './styles';
import COLORS from '../../../assets/color';
import { css } from '@emotion/react';
import ProfileDefault from '../../../images/components/MatchPost/profileDefault.svg';

export default function ReplySectionComponent() {
  //useQuery: 댓글 관련 data
  //OriginalReply
  //SecondaryReply

  return (
    <div>
      <s.InputReplyWrapper>
        <div
          css={{
            boxSizing: 'border-box',
            width: 35,
            height: 35,
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
            src={ProfileDefault}
            // src={PEPE}
            alt="defaultImage"
          />
        </div>
        <textarea
          placeholder="댓글을 입력하세요"
          css={{
            border: 'none',
            appearance: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 18,
            color: COLORS.Gray3,
            wordBreak: 'break-all',
            position: 'relative',
            top: 4,
            right: 10,
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
          <s.ReplyButton>작성하기</s.ReplyButton>
        </div>
      </s.InputReplyWrapper>
      <s.ReplySection>
        <div>프로필</div>
        <div>닉네임</div>
        <div>7시간 전</div>
        <div>좋아요 0개</div>
        <div>좋아요하트</div>
        <div>답글버튼</div>
        <div>보라케밥(통일)</div>
        <div>작성한댓글영역</div>
      </s.ReplySection>
    </div>
  );
}
