/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import COLORS from "../../../assets/color";
// import styled from "@emotion/styled";

export const CustomSearchBarStyles =css`
position: relative;
bottom: 20px;
width: 880px;
height: 68px;
border-radius:60px;
border: 2px solid ${COLORS.main100};
box-sizing: border-box;
margin-bottom:24px;
&:placeholder {
  opacity: 0;
}
font-size: 24px;
padding-left: 2.2rem;
`