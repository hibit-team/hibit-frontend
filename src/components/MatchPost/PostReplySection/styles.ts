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
  alignSelf:'flex-end'
});

export const ReplySection = styled.div({
});
export const InputReplyText =styled.div({
  width: 864,
            height: 96,
            color: COLORS.Gray3,
            fontSize: 20,
            fontWeight: 500,
            margin: '12px auto',
            overFlow: 'hidden',
            overflowWrap: 'break-word',
});

export const OriginalReplyWrapper = styled.div({
  boxSizing: 'border-box',
  margin: '28px 0px',
  position:'relative',
});
