/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import * as s from './styles';
import {useState} from 'react';
// import {css} from '@emotion/react';

const MobileTab = () => {
  const [isMoTabLeft,setIsMoTabLeft] = useState<boolean>(true);
  const tabClickChange = ()=>{setIsMoTabLeft(!isMoTabLeft)};
  return(
  <>
  {isMoTabLeft ? 
    <s.TabContainer>
      <s.LeftTab>매칭 바로가기</s.LeftTab>
      <s.RightTab onClick={tabClickChange}>매칭 자세히보기</s.RightTab>
    </s.TabContainer>

    :
    <s.TabContainer_2>
      <s.LeftTab_2 onClick={tabClickChange}>매칭 바로가기</s.LeftTab_2>
      <s.RightTab_2 >매칭 자세히보기</s.RightTab_2>
    </s.TabContainer_2>
  }
  </> 
  )
}
export default MobileTab;