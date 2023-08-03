import styled from '@emotion/styled';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';

export const InputReplyWrapperCss = css({
  boxSizing: 'border-box',
  width: 864,
  borderRadius: 10,
  border: `1px solid ${COLORS.Gray2}`,
  margin: '0px auto 0px auto',
  display: 'grid',
  gridTemplateColumns: '67px auto',
  position: 'relative',
  padding: 20,
});

export const ReplySection = styled.div({});
export const OriginalReplyText = styled.div({
  width: 855,
  color: COLORS.Gray3,
  fontSize: 20,
  fontWeight: 500,
  margin: '12px auto 0px auto',
  wordWrap:'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'pre-wrap',
});
export const OriginalReplyModifiedTextCss = css({
  borderRadius: 10,
  padding: 20,
  width: 855,
  color: COLORS.Gray3,
  fontSize: 20,
  fontWeight: 500,
  margin: '12px auto 0 20px',
  overFlow: 'hidden',
  overflowWrap: 'break-word',
  border: `1px solid ${COLORS.Gray3}`,
  appearance: 'none',
  outline: 'none',
  overflow: 'hidden',
  resize: 'none',
});

export const SecondaryReplyText = styled.div({
  width: 820,
  color: COLORS.Gray3,
  fontSize: 20,
  fontWeight: 500,
  margin: '12px auto -18px auto',
  overFlow: 'hidden',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  position: 'relative',
  left: 8,
});

export const OriginalReplyWrapper = styled.div({
  boxSizing: 'border-box',
  margin: '28px 0px 28px 0px',
  position: 'relative',
});

export const SecondaryReplyWrapper = styled.div({
  boxSizing: 'border-box',
  margin: '28px auto 28px auto ',
  position: 'relative',
});
