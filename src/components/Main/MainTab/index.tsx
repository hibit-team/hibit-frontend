
import TabImgs from '../TabImgs';
import * as s from './styles';
import {useState} from 'react';

const MainTab = () => {
  //isMobile False => web UI => MainTab
  //isMobile True => mobile UI => MobileMainTab
  //isTabLeft :상태관리 -> 
  const [isTabLeft,setIsTabLeft] = useState<boolean>(true);
  const tabClickChange = () => {
    setIsTabLeft(!isTabLeft);
  };
  return (
    <s.Wrapper>
      {isTabLeft ? (
        <s.TabContainer_1>
          <s.Tabs>
            <s.LeftTab_1>매칭 바로가기</s.LeftTab_1>
            <s.RightTab_1 onClick={tabClickChange}>매칭 자세히보기</s.RightTab_1>
          </s.Tabs>
          <TabImgs />
        </s.TabContainer_1>
      ) : (
        <s.TabContainer_2>
          <s.Tabs>
            <s.LeftTab_2 onClick={tabClickChange}>매칭 바로가기</s.LeftTab_2>
            <s.RightTab_2>매칭 자세히보기</s.RightTab_2>
          </s.Tabs>
        </s.TabContainer_2>
      )}
    </s.Wrapper>
  );
}
export default MainTab;