/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import COLORS from '../../assets/color';
export const MobileLanding= styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  '& img': { width: 200, height: 200, position: 'fixed', left: '9vw', top: '5vh' },
  '@media (max-width:600px)': {
    bottom: '5vh',
    alignItems: 'center',
    '& img': { width: 140, height: 140, position: 'fixed', left: 'calc(50% - 70px)', top: '15vh' },
    '& p': {
      fontSize: 23,
      fontWeight: 600,
    },
    '& div': {
      fontSize: 18,
      fontWeight:600,
      margin: '2.5vh 0 3vh 0',
    },
    '& span': { 
      fontWeight: 600, 
      fontSize: 12 },
  },
});
