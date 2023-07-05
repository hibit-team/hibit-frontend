/** @jsxImportSource @emotion/react */
import React,{useState} from 'react'
import * as s from './styles'
import {css} from '@emotion/react';
import {MdArrowDropDown,MdArrowDropUp} from 'react-icons/md'

export default function MatchPostLabel() {
  const label = ['전시만보기','2인관람']
  const postStatusSelect = ['모집 전','모집 중','모집완료'
]

  const [postStatusModal,setPostStatus] = useState(true);

  
  return (<div>
    <s.MatchPostContainer>
      <s.MatchPostLabelSection>

        <s.MatchPostLabel>
          {label.map((item) =><div css={s.MatchPostLabelCss}>{item}</div>)}
        </s.MatchPostLabel>

          <s.MatchPostStatus>
          <div
            css={css`display:flex; 
            align-items:center;
            justify-content:center;
            position:relative;
            bottom:4px;`} onClick={(e)=>{setPostStatus(!postStatusModal)
          }}
            >모집중
          { postStatusModal ? <MdArrowDropDown css={s.MatchPostStatusArrowCss}/> : <MdArrowDropUp css={s.MatchPostStatusArrowCss}/>}
          </div>
            {!postStatusModal ? postStatusSelect.map(status=>(<div onClick={()=>{window.confirm(status)}}css={s.postStatusCss}>{status}</div>)): undefined}
        </s.MatchPostStatus>

      </s.MatchPostLabelSection>
    </s.MatchPostContainer>
  </div>)
}
