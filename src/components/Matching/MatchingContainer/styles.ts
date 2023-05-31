/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
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
background-color:${COLORS.main79};
width: 296px;
height:280px;
border: 1px solid ${COLORS.Gray2};
border-bottom:none;
cursor:pointer;
box-sizing: border-box;
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

//카드 하단부 정보_header status
export const HeadLabelWrapperCss =css`
width:90%;
display:flex;
flex-wrap:wrap;
position:relative;
top:20px;
left:1rem;
`;

export const LabelStatusCss =css`
padding: 4px 12px;
font-size:16px;
font-weigth:500px;
color: white;
border-radius:1rem;
border: 1px solid white;
margin:4px;
`
//카드info영역의 하단부부분
export const CardInfoBottom =styled.div`
display:flex;
box-sizing:border-box;
width:100%;
justify-content:space-between;
position:relative;
top:353px;
margin-top:8px;
`
//카드 모집status 
export const CardStatus =styled.div`
box-sizing:border-box;
width:79px;
height:28px;
color:${COLORS.Gray3};
font-weight:500;
font-size:16px;
border-radius:1rem;
border: 1.3px solid ${COLORS.Gray2};
padding: 4px 12px;
text-align:center;
background-color:white;
line-height:110%;
`

export const CardBottomCountInfo =styled.div`
display:flex;
justify-content:center;
align-items:center;
font-size:16px;
`

export const LoadMoreButton =styled.div`
color:${COLORS.main100};
background-color:${COLORS.Gray2};
border-radius: 1.5rem;
line-height:100%;
width: 270px;
height:50px;
display:flex;
justify-content:center;
align-items:center;
font-size: 2rem;
position:relative;
margin: 0 auto 3.5rem auto;
text-align:center;
`