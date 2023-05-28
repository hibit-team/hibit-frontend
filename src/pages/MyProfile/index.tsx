import React from "react";
import * as s from "./styles";
import useIsMobile from "../../hooks/useIsMobile";
import LayoutTemplateGray from "../../components/Common/LayoutTemplateGray";

const MyProfile = () => {

  if(useIsMobile()) {
    return (
      <>
    
      </>
    )
  }

  return (
    <LayoutTemplateGray>
      <s.Wrapper>MyProfile</s.Wrapper>
    </LayoutTemplateGray>
  );
};

export default MyProfile;