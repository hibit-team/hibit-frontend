import styled from '@emotion/styled';
import COLORS from '../../assets/color';
// export const ModalOutLay = styled.div({
//   boxSizing:'border-box',
//   // position: 'absolute',
//   // top:0,
//   // left:0,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width:'100%',
//   height: '100%',
//   background: 'rgba(0,0,0,0.05)',
// });
//반응형
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

//Say "Hi", a 'bit' slowly.@ X 
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

