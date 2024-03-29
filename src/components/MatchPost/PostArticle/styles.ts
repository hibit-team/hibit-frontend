import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
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
  width: 864px;
  margin: 40px auto 0px 0px;
  padding-left:24px;
  grid-template-columns: 250px 640px;
`;

export const ArticleArrowWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  grid-row: 2/3;
  position: relative;
  left: 200px;
  bottom: 50px;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border-radius: 10px;
  background: white;
  border-radius: 10px;
  &: hover {
    scale: 1.05;
  }
  cursor: pointer;
`;

export const hoverAnimation = keyframes`
  0% {
    color: ${COLORS.main100};
    box-shadow: none;
  }
  100% {
    background-color: ${COLORS.main100}
    color: white;
  }
`;

export const InviteBoxWrapper = styled.button({
  all: 'unset',
  border: `2px solid ${COLORS.main79}`,
  borderRadius: 16,
  width: 150,
  height: 55,
  background: COLORS.main24,
  color: COLORS.main79,
  fontWeight: 700,
  fontSize: 22,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // margin: '40px auto 40px auto',
  cursor: 'pointer',
  '&:hover': {
    fontWeight: 700,
    animation: `${hoverAnimation} 0.6s ease-out`,
    border: `2px solid ${COLORS.Gray3}`,
    backgroundColor: COLORS.main100,
    color: 'white',
    cursor: 'pointer',
  },
});



export const StyledSliderWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid ${COLORS.Gray2};
  padding-left: 16px;
  margin: 10px;
  width: 233px;
  height: 320px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
`;
