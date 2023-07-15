/** @jsxImportSource @emotion/react */
import { css,keyframes } from '@emotion/react'
import styled from "@emotion/styled";
import COLORS from "../../../assets/color";
//매칭컴포넌트 헤더
export const MatchingHeader =styled.div`
width: 980px;
height: 61px;
box-sizing: border-box;
border-bottom: 1.5px solid ${COLORS.Gray2};
padding: 1rem 0;
color:${COLORS.black};
font-size:23px;
font-weight:900;
margin-top:40px;
`

//그리드 컨테이너
export const MatchingGridContainer = styled.div`
display:grid;
grid-template-columns: repeat(3,auto);
margin-top:30px;
max-width:100%;
position:relative;
left:1rem;
`

//카드 상단부이미지
export const MatchingCardImgCss =css`
border-radius:1rem 1rem 0 0;
background-color:${COLORS.Gray2};
width: 296px;
height:280px;
border: 1px solid ${COLORS.Gray2};
border-bottom:none;
cursor:pointer;
box-sizing: border-box;
opacity:0.9;
`

//카드 하단부 info
export const MatcingCardInfoCss =css`
background-color:${COLORS.Gray1}; 
border-radius: 0 0 1rem 1rem;
max-width: 296px;
height: 176px;
margin-bottom: 30px;
border: 1px solid ${COLORS.Gray2};
border-top:none;
box-sizing: border-box;
`

//카드 상단부 label 정보의 컨테이너css(3인관람..) min-height보장
export const HeadLabelWrapperCss =css`
max-width:220px;
display:flex;
min-height:72px;
flex-wrap:wrap;
position:relative;
top:20px;
left:1rem;
opacity:1;
`;

export const LabelStatusCss =css`
box-sizing:border-box;
opaicty:1.0;
display:flex;
justify-content:center;
align-items:center;
padding: 4px 12px;
max-height:28px;
margin-right:6px;
font-size:16px;
font-weight:500;
color:purple;
border-radius: 1rem;
border: 1px solid purple;
`
export const LabelPartyNumber =css`
box-sizing:border-box;
display:flex;
justify-content:center;
align-items:center;
padding: 4px 12px;
max-height:28px;
margin-right:6px;
font-size:16px;
font-weight:500;
color:purple;
border-radius: 1rem;
border: 1px solid purple;

background: #FFFFFF;
opacity: 0.24;
border: 1px solid #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
//카드info영역의 하단부부분(status+(댓글,좋아요수) 래퍼)
export const CardInfoBottom =styled.div`
display:flex;
width:100px;
justify-content:space-between;
aling-items:center;
box-sizing:border-box;
position:absolute;
top:394px;
`
//카드 모집status 
export const CardStatus =styled.div`
box-sizing:border-box;
display:flex
justify-content:center;
text-align:center;
min-width:82px;
min-height:28px;
color:${COLORS.Gray3};
font-weight:500;
font-size:16px;
border-radius:1rem;
border: 1.3px solid ${COLORS.Gray2};
padding: 4px 12px;
background-color:white;
`
//카드 하단부 숫자카운트 정보(댓글,좋아요 수)
export const CardBottomCountInfo =styled.div`
display:flex;
position:relative;
left:6rem;
font-size:16px;
`

const hoverAnimation = keyframes`
  0% {
    color: ${COLORS.main100};
    box-shadow: none
  }
  100% {
    background-color: ${COLORS.main100}
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);

  }
`;

export const LoadMoreButton  =styled.div`
font-size:18px;
color:${COLORS.main100};
border: 2px solid ${COLORS.main100};
box-sizing:border-box;
width:177px;
height:54px;
display:flex;
justify-content: center;
align-items:center;
margin:0 auto 120px auto;
border-radius:3rem;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
&:hover{
  font-weight:600;
  animation:${hoverAnimation} 0.4s ease-out;
  border: 2.5px solid ${COLORS.Gray1};
  background-color:${COLORS.main100};
  color:white;
  cursor:pointer;
}
`
export const LoadingIndicatorCss =css`
display:flex; 
justify-content:center;
align-items:center;
width: 300px;
height: 100px;
margin:0 auto;
`
