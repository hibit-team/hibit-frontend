/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import COLORS from '../../assets/color';
export const NotFound = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  '& img': { width: 150, height: 150, position: 'fixed', left: '8vw', top: '5vh' },
  '@media (max-width:600px)': {
    bottom: '5vh',
    alignItems: 'center',
    '& img': { width: 120, height: 120, position: 'fixed', left: 'calc(50% - 65px)', top: '15vh' },
    '& div': {
      fontSize: 24,
      margin: 10,
    },
    '& span': { fontWeight: 600, fontSize: 13 },
  },
});

export const toHomeText = css({
  position: 'relative',
  top:'11%',
  color: COLORS.white,
  fontWeight: 700,
  borderRadius: 10,
  background: COLORS.main79,
  border: `2px solid ${COLORS.main100}`,
  padding: '20px 62px',
  fontSize: 29,
  userSelect: 'none',
  cursor: 'pointer',
  right: 8,
  '@media (max-width:600px)': { fontSize: 16,right:'3px',top:10, },
});
