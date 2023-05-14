
import styled from "@emotion/styled";


export const MobileNavbarWrapper = styled.div`
display: flex;
flex-direction: column;
`
export const MobileNavDiv = styled.div`
font-weight:500;
font-size:22px;
color:#797979;
box-sizing: border-box;
display:flex;
justify-content: start;
align-items: center;
width:100%;
height:67px;
padding: 20px 24px;
border-top: 2px solid #EEEEEE;

@media (hover: hover) { 
  &:hover {
    color: #5E1EC7;
    background:#F6F7F9;
    font-weight: 900;
  }

`