import styled from '@emotion/styled';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import { ILoginInfo } from '../../../hooks/useLoginInfo';

export const InputReplyWrapperCss = css({
  boxSizing: 'border-box',
  width: 864,
  borderRadius: 10,
  border: `1px solid ${COLORS.Gray2}`,
  margin: '0px auto 40px auto',
  display: 'grid',
  gridTemplateColumns: '67px auto',
  position: 'relative',
  padding: 20,
});

export const ReplySection = styled.div({});
export const OriginalReplyText = styled.div({
  width: 847,
  color: COLORS.Gray3,
  fontSize: 20,
  fontWeight: 500,
  margin: '22px auto 0px auto',
  wordWrap:'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  lineHeight: '120%',
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
  width: 790,
  color: COLORS.Gray3,
  fontSize: 20,
  fontWeight: 500,
  margin: '1rem auto -18px 22px',
  overFlow: 'hidden',
  whiteSpace:'pre-wrap',
  wordBreak: 'break-all',
  position: 'relative',
  left: 8,
});

export const OriginalReplyWrapper = styled.div({
  boxSizing: 'border-box',
  margin: '0px 0px 28px 0px',
  position: 'relative',
});

export const SecondaryReplyWrapper = styled.div<{
  isSecondModifyOn: boolean;
}>(props =>({
  boxSizing: 'border-box',
  margin: '24px 24px 16px 24px',
  position: 'relative',
  borderRadius:10,
  border: `1px solid ${COLORS.Gray2}`,
  padding: props.isSecondModifyOn ? '16px 0px 20px 0px' : '16px 0px 46px 0px',
  height: 'auto',
}));
