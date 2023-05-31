/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import COLORS from "../../../assets/color";
import { css } from "@emotion/react";

export const FilterWrapper = styled.div`
box-sizing: border-box;
font-weight:500px;
color: #242424;
position:relative;
bottom:22px;
`
export const FilterButtonWrapper =styled.div`
display:flex;
justify-content: space-around;
`
export const FilterButtonCss =css`
box-sizing:border-box;
padding: 16px 24px 15px 24px;
border: 2px solid ${COLORS.Gray3};
border-radius:60px;
color: #242424;
text-align:center;
margin: 0 8px;
cursor:pointer;
`

export const WriteButtonCss= css`
box-sizing:border-box;
padding: 16px 24px 15px 24px;
border: 2px solid ${COLORS.Gray3};
border-radius:60px;
color: ${COLORS.white};
background-color:${COLORS.main100};
text-align:center;
margin: 0 8px;
cursor:pointer;
`