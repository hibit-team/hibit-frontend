import styled from '@emotion/styled';
import COLORS from '../../../assets/color';

export const InviteModalHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: 329,
  height: 54,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  background: COLORS.main79,
  padding: '16px 20px 16px 20px',
  color: 'white',
  overflow:'hidden',
});

export const InviteModalContentsWrapper = styled.div({
  width:329,
  maxHeight: 332,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 14,
  overflow:'auto'
});
