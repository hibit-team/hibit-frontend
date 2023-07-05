/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './styles';
import {css} from '@emotion/react';
import Ellipsis from '../../../images/components/MatchPost/ellipsis.svg'
import ProfileDefault from '../../../images/components/MatchPost/profileDefault.svg'
export default function MatchPostArticle() {
  return (
    <div>
      <s.MatchArticleWrapper>
        <s.ArticleTitleSection>
          <div css={css`display:flex;
            flex:1 1 auto; font-size:24px; font-weight:900;
            `}>게시글 명 게시글 명 게시글 공백포함 최대 30자까지</div>
          <img css={css`margin:6px;`} src={ProfileDefault} alt='defaultImage'/>
          <div css={css`font-size:20px; color:#797979; font-weight:900; margin:6px;`}>닉네임123123 </div>
          <div css={css`margin:6px; border-left: 1px solid #C9C9C9;
          height:20px; box-sizing:border-box; padding-left: 0.5rem;
          font-size:20px; font-weight:500; color:#797979`}>n시간 전 </div>
          <img css={css`margin:6px;`}src={Ellipsis} alt='ellipsis'/>
        </s.ArticleTitleSection>

        <s.ArticleDateSection>
          
        </s.ArticleDateSection>
      </s.MatchArticleWrapper>
    </div>
  )
}
