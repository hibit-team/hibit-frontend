import styled from "@emotion/styled";
import COLORS from "../../../assets/color";

export const InviteModalHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: 329,
  height: 54,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  background: COLORS.main79,
  padding: '16px 20px 16px 20px',
  color: 'white',
});

export const InviteModalContentsWrapper = styled.div({
  width:'auto',
  maxHeight:277,
  boxSizing:'border-box',
  display:'flex',
  flexDirection:'column',
  justifyContent:'flex-start',
  alignItems:'center',
  overflowX: 'hidden',
  overflowY:'scroll',
  paddingTop:14,
})
