import styled from '@emotion/styled';
import COLORS from '../../../assets/color';

export const InputReplyWrapper = styled.div({
  boxSizing: 'border-box',
  width: 864,
  height: 188,
  borderRadius: 10,
  border: `1px solid ${COLORS.Gray2}`,
  margin: '0px auto 0px auto',
  display: 'grid',
  gridTemplateColumns: '67px auto',
  position: 'relative',
  padding: 20,
});

export const ReplyButton = styled.button({
  boxSizing: 'border-box',
  all: 'unset',
  cursor: 'pointer',
  width: 94,
  height: 34,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  color: 'white',
  background: COLORS.Gray3,
  borderRadius: 60,
});

export const ReplySection = styled.div({
});

export const OriginalReply = styled.div({
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateRows:'56px auto',
  margin: '28px auto',
});
