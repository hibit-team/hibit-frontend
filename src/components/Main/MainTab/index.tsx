
import styled from '@emotion/styled';
import * as s from './styles';
import {useState} from 'react';
const MainTab = () => {
  //isMobile False => web UI => MainTab
  //isMobile True => mobile UI => MobileMainTab
  //isTabLeft :상태관리 -> 
  const [isTabLeft,setIsTabLeft] = useState(true);
  const tabClickChange = ()=>{setIsTabLeft(!isTabLeft)};
  return(
  <>
  {isTabLeft ? 
    <s.TabContainer>
      <s.LeftTab onClick={tabClickChange}>매칭 바로가기</s.LeftTab>
      <s.RightTab onClick={tabClickChange}>매칭 자세히보기</s.RightTab>
    </s.TabContainer>
    :
    <s.TabContainer_2>
      <s.LeftTab_2 onClick={tabClickChange}>매칭 바로가기</s.LeftTab_2>
      <s.RightTab_2 onClick={tabClickChange}>매칭 자세히보기</s.RightTab_2>
    </s.TabContainer_2>
  }
  </> 
  )
}
export default MainTab;