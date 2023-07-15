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
  margin: 40px auto 0px auto;
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
  width: 32px;
  height: 32px;
  display: flex;
  grid-row: 2/3;
  position: relative;
  left: 190px;
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
    box-shadow: none
  }
  100% {
    background-color: ${COLORS.main100}
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const InviteBoxWrapper = styled.button({
  all: 'unset',
  border: `2px solid ${COLORS.main79}`,
  borderRadius: 20,
  width: 190,
  height: 72,
  background: COLORS.main24,
  color: COLORS.main79,
  fontWeight: 700,
  fontSize: 22,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '40px auto 40px auto',
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
