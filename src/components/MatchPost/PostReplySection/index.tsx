/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as s from './styles';
import COLORS from '../../../assets/color';
import { css } from '@emotion/react';
import ProfileDefault from '../../../images/components/MatchPost/profileDefault.svg';
import PEPE from '../../../images/components/MatchPost/pepe.jpeg';
import YellowLike from '../../../images/components/MatchPost/yellowLike.svg';
import EmptyLike from '../../../images/components/MatchPost/EmptyLike.png';
import ReplyArrow from '../../../images/components/MatchPost/replyArrow.svg';
import PurpleKebap from '../../../images/components/MatchPost/purpleKebap.svg';
import { OptionComponent } from '../PostArticle';
export default function ReplySectionComponent() {
  //useQuery: 댓글 관련 data
  //OriginalReply
  //SecondaryReply

  const [isReplyLikeOn, setIsReplyLikeOn] = useState(false);

  return (
    <div css={{position:'relative'}}>
      <s.InputReplyWrapper>
        <ProfileImage width={32} height={32} source={PEPE} />
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
          <s.ReplyButton>작성하기</s.ReplyButton>
        </div>
      </s.InputReplyWrapper>
      <s.ReplySection>
        {[1,2].map(()=><OriginalReplyComponent></OriginalReplyComponent>)}
      </s.ReplySection>
    </div>
  );
}

export const OriginalReplyComponent =()=>{
  const [isReplyOptModalOpen, setIsReplyOptModalOpen] = useState(false);
  return <>
    <s.OriginalReplyWrapper>
          <div css={{ gridColumn: 1, display: 'flex', alignItems: 'center', margin: '0 30px', justifyContent: 'space-between' }}>
            <ProfileImage width={32} height={32} source={ProfileDefault} />
            <div css={{ display: 'flex', flex: '0 1 187px' }}>
              <div css={{ borderRight: `1px solid ${COLORS.Gray2}`, padding: '0 12px', fontSize: 20, color: COLORS.Gray3, fontWeight: 800 }}>
                닉네임
              </div>
              <div css={{ color: COLORS.Gray3, padding: '0 12px', fontWeight: 500, fontSize: 20 }}>7시간 전</div>
            </div>
            <div css={{ display: 'flex', flex: '1 1 255px', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div css={{ fontSize: 18, fontWeight: 500, color: COLORS.Gray3, padding: '0 12px' }}>좋아요 0개</div>
              <ProfileImage width={32} height={32} source={EmptyLike} />
              <div
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
                }}
              >
                <img src={ReplyArrow} alt="reply-arrow-button" />
                <span css={{ marginLeft: 4 }}>답글</span>
              </div>
              <img onClick={()=>{
                //내가 클릭한 리플의 게시글id가 맞다면 ()
                if(true)setIsReplyOptModalOpen(!isReplyOptModalOpen)}
              }css={{ 
                cursor:'pointer', margin: '0 6px' }} src={PurpleKebap} alt="purple-kebap" />
            </div>
            <div
            css={{
              position:'absolute',
              left:835,
              top:30,  
              display: isReplyOptModalOpen ? 'flex' : 'none',
              justifyContent: 'center',
              width: 56,
              height: 102,
              alignItems: 'center',
              flexDirection: 'column',
              border: `1px solid ${COLORS.Gray2}`,
              borderRadius: 10,
              background:'white',
            }}
          >
            <OptionComponent></OptionComponent>
          </div>
          </div>
          <div
            css={{
              width: 864,
              height: 96,
              color: COLORS.Gray3,
              fontSize: 20,
              fontWeight: 500,
              margin: '12px auto',
              wordBreak: 'break-all',
              overFlow: 'hidden',
            }}
          >
            댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대
            250자댓글최대250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자250자댓글최대 250자댓글최대
            250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대 250자댓글최대
            250자댓글최대 250자 250자댓글최대 250자댓글최대 250자댓글최대 250자
          </div>
          
        </s.OriginalReplyWrapper></>
}

export const ProfileImage = ({ source, width, height }: { source: string; width: number; height: number }) => {
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
