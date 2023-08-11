import styled from '@emotion/styled';
import COLORS from '../../../assets/color';

export const ReportModalWrapper = styled.div({
  boxSizing: 'border-box',
  margin: '0px auto 0px auto',
  width: 580,
  borderRadius: 16,
  overflow: 'hidden',
  '@media (max-width: 600px)': {
    width: 365,
  },
});

export const ReportModalHeader = styled.div({
  height: 76,
  color: 'white',
  background: COLORS.main79,
  display: 'flex',
  padding: '23px 28px',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 24,
  fontWeight: 800,
});
export const ReportModalContentsWrapper = styled.div({
  boxSizing: 'border-box',
  overflowY:'auto',
  width: '100%',
  height:720,
  '@media (max-width: 600px)': {
    height: 400,
    overflowY: 'auto',
  },
  padding: '32px 34px 32px 28px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: 'white',
});
