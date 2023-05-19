/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import COLORS from '../../assets/color';
import { css } from '@emotion/react';
export const AlarmModalWrapper = styled.div`
display:flex;
flex-direction:column;
width:100%;
`
export const AlarmTopBar =styled.div`
display:flex;
justify-content:space-between;
height:60px;
background: ${COLORS.main79};
padding: 20px 20px 20px 20px;
font-size: 22px;
font-weight: 900;
line-height:100%;
color:white;
box-sizing: border-box;
;`

export const AlarmTab = styled.div`
display:flex;
justify-content:space-between;
`;

//알람 탭과 컨텐츠를 포함하는 wrapper 
export const AlarmTabWrapper = styled.div`
box-sizing:border-box;
width:100%;
padding:20px;
`;


//알람 컨텐츠

export const AlarmContentsWrapper =styled.div`
max-width:310px;
max-height: 320px;
overflow-x:hidden;
overflow-y:scroll;
`

export const AlarmContent = styled.div`
width:100%;
padding: 1rem 0 1rem 0;
display:grid;
grid-gap: 0px 12px;
grid-template-columns:48px;
grid-auto-columns: repeat(3,1fr);
border-bottom: 1px solid ${COLORS.Gray2}
`
export const AcceptButtonWrapper = styled.div`
width:90px;
height:1rem;
display:flex;
justify-content:space-between;
`
export const AcceptButtonHoverCss = css`
`

// 1. read or not 폰트 컬러 상태관리
// 2. 프로필 + 이모지:알람타입에따른 (압축)
// 3. Username 및 주요키워드 굵기 변경 렌더링
// 4. 수락 거절 상태관리
