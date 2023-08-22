/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './styles';
import COLORS from '../../assets/color';
import HIBITLOGO from '../../images/mobile/mobileLogo.svg';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate();
  return <div style={{background:COLORS.main42,width:'100vw',height:'100vh',display:'flex',flexDirection:'column',
  justifyContent:'center',alignItems:'center',fontSize:24,}}>
    <s.NotFound>
      <img src={HIBITLOGO} alt="hibit-logo"></img>
    <div css={{margin:10,fontWeight:500,fontSize:28}}>ERROR : 404</div>
    <div css={{margin:10,fontWeight:700,fontSize:48,}}>페이지를 찾을 수 없어요.</div>
    <span css={{fontWeight:600,fontSize:20,margin:20,color:COLORS.Gray3}}>잘못된 URL을 입력한 것 같아요. 홈으로 다시 돌아가보세요</span>
    </s.NotFound>
    <div onClick={()=>{
      navigate('/')
    }} css={s.toHomeText}>홈으로 돌아가기</div>
  </div>;
}



