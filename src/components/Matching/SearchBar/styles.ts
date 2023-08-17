/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import COLORS from "../../../assets/color";
import styled from '@emotion/styled';
// import styled from "@emotion/styled";

export const CustomSearchBarStyles =css`
width: 880px;
height: 68px;
border-radius:60px;
border: 2px solid ${COLORS.main100};
box-sizing: border-box;
margin-top:80px;
margin-bottom:24px;
&:placeholder {
  opacity: 0;
}
font-size: 24px;
padding-left: 2.2rem;
`




// 서치박스래퍼 V
// 필터wrapper / 필터버튼 
// 매치 컴포넌트(Grid) / 헤더 / 게시글Container / 게시글Wrapper / 게시글
