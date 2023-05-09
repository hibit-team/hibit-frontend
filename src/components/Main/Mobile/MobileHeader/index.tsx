/** @jsxImportSource @emotion/react */
import * as s from './styles';
import MobileLogo from "../../../../images/mobile/mobileLogo.svg";
import MobileAlarm from '../../../../images/mobile/mobileAlarm.svg';
import MobileEllipsis from '../../../../images/mobile/ellipsis.svg';
import {css} from '@emotion/react';

const LogoCenter = css`
position : relative;
left: calc((100vw - 180.25px)/2);
`

const  MoHeaderComponent =() => {
  return(<>
    <s.MobileHeader>
        <img css={LogoCenter} src={MobileLogo} alt="mobile-logo"></img>
      <s.OtherWrapper>
        <img src={MobileAlarm} alt="mobile-alarm"></img>
        <img src={MobileEllipsis} alt="mobile-ellipsis"></img>
      </s.OtherWrapper>
    </s.MobileHeader>

    </>)
};

export default MoHeaderComponent;