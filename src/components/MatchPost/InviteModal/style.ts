import styled from '@emotion/styled';
import COLORS from '../../../assets/color';

export const InviteModalHeader = styled.div<{ Fold: boolean }>(Fold => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: 329,
  height: 54,
  background: COLORS.main79,
  padding: '16px 20px 16px 20px',
  color: 'white',
  overflow: 'hidden',
  borderRadius: '16px 16px 0px 0px',
}));

export const InviteModalContentsWrapper = styled.div({
  width: 329,
  maxHeight: 332,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 14,
  overflow: 'auto',
  borderRadius: 16,
});
