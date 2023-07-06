import { useParams } from "react-router-dom";
import * as s from "./styles";
import { useState } from "react";
import LayoutTemplate from "../../components/Common/LayoutTemplate";

const OtherProfile = () => {
  const idParams = useParams();
  const userID = idParams.userID;
  // console.log(userID);

  const [isTabLeft, setIsTabLeft] = useState<boolean>(true);
  const onClickTab = () => {
    setIsTabLeft(!isTabLeft);
  };

  
  return (
    <LayoutTemplate>
      <s.Wrapper>
        {
          isTabLeft ? (
            <s.TabContainer1>
              <s.Tabs>
                <s.LeftTab1>유저 프로필 정보</s.LeftTab1>
                <s.RightTab1 onClick={onClickTab}>유저 히스토리</s.RightTab1>
              </s.Tabs>
            </s.TabContainer1>
          ) : (
            <s.TabContainer2>
              <s.Tabs>
                <s.LeftTab2 onClick={onClickTab}>유저 프로필 정보</s.LeftTab2>
                <s.RightTab2>유저 히스토리</s.RightTab2>
              </s.Tabs>
            </s.TabContainer2>
          )
        }
      </s.Wrapper>
    </LayoutTemplate>
  )
};

export default OtherProfile;
