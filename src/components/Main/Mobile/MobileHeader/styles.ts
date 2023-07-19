/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import styled from "@emotion/styled";

export const MobileHeader = styled.div`
width:auto;
height:54px;
display: flex;
justify-content:space-between;
padding: 1rem 1.8rem;
box-sizing: border-box;
background-color:#ffffff;
`;

export const LogoCenter = css`
position : relative;
left: calc((100vw - 180.25px)/2);
`
export const OtherWrapper = styled.div`
display:flex;
gap:1rem;
`;