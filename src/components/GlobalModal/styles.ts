import styled from '@emotion/styled';
import COLORS from '../../assets/color';
export const ModalContentsWrapper = styled.div({
  boxSizing: 'border-box',
  overflow: 'hidden',
  width: '100%',
  height: 402,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  fontSize: 16,
  '@media (max-width:1000px)': {
    fontSize: '0.8em',
  },
});

export const ModalHeader = styled.div({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '23px 28px',
  border: `2px solid ${COLORS.main79}`,
  height: 76,
  background: COLORS.main79,
  color: COLORS.white,
  fontSize: '1.5em',
  fontWeight: 800,
  '@media (max-width:1000px)': {
    fontSize: '1.3em',
    height: 60,
  },
});

export const ModalTextWrapper = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
