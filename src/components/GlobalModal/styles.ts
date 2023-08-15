import styled from '@emotion/styled';
import COLORS from '../../assets/color';

export const ModalContentsWrapper = styled.div({
  boxSizing:'border-box',
  overflow:'hidden',
  width:'100%',
  height: '100%',
  display:'flex',
  flexDirection:'column',

  // flex: '1 1 auto',
  // alignItems:'center',
  // "@media (max-width:600px)":{
  //   minWidth:300,
  //   minHeight:402,
  // }
});

export const ModalHeader = styled.div({
  boxSizing:'border-box',
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  padding: '23px 28px',
  border:`2px solid ${COLORS.main79}`,
  height:76,
  background:COLORS.main79,
  color:COLORS.white,
  fontSize:24,
  fontWeight: 800,
})

export const ModalTextWrapper = styled.div({
  width:'100%',
  height:'100%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
})