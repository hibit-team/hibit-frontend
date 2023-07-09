import styled from '@emotion/styled';
import COLORS from '../../../assets/color';

export const MatchArticleWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 920px;
  min-height: auto;
  border: 1px solid ${COLORS.Gray2};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

export const ArticleTitleSection = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 874px;
  height: 71px;
  margin: 0px auto;
  border-bottom: 1px solid ${COLORS.Gray2};
`;
export const ArticleDateSection = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 874px;
  height: 96px;
  margin: 0px auto;
  border-bottom: 1px solid ${COLORS.Gray2};
`;

export const ArticlePlaceTogoSection = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 874px;
  height: 96px;
  margin: 0px auto;
  border-bottom: 1px solid ${COLORS.Gray2};
`;
export const ArticleTextSection = styled.div`
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 874px;
  margin: 40px 34px;
  border-bottom: 1px solid ${COLORS.Gray2};
  grid-template-columns: 233px 640px;
  &: nth-child(2) {
    grid-row: 2/3;
  }
  &: nth-child(3) {
    grid-column: 2/3;
  }
  border-bottom: 1px solid ${COLORS.Gray2};
`;

export const ArticleArrowWrapper = styled.div`
width:32px;
height:32px;
display:flex;
grid-row: 2/3;
position:relative;
left:190px;
bottom:50px;
justify-content:center;
align-items:center;

box-sizing: border-box;
border-radius:10px;
background:white;
border-radius:10px;
&: hover {
  scale: 1.05;
}
cursor:pointer;
`;
