/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import * as s from './styles';
import MobileLogo from "../../../../images/mobile/mobileLogo.svg";
import MobileAlarm from '../../../../images/mobile/mobileAlarm.svg';
import MobileEllipsis from '../../../../images/mobile/ellipsis.svg';
import { useRecoilState } from 'recoil';
import { AlarmSwitchState } from '../../../../recoil/atom/AlarmSwitchState';

const  MoHeaderComponent =({onToggle}:any) => {
  const [alarmState,setAlarmState] = useRecoilState<boolean>(AlarmSwitchState);
  const onAlarmState = ()=>setAlarmState(!alarmState)
  return(<>
    <s.MobileHeader>
        <img css={s.LogoCenter} src={MobileLogo} alt="mobile-logo"></img>
      <s.OtherWrapper>
        <img onClick={onAlarmState} src={MobileAlarm} alt="mobile-alarm"></img>
        <img onClick={onToggle} src={MobileEllipsis} alt="mobile-ellipsis"></img>
      </s.OtherWrapper>
    </s.MobileHeader>

    </>)
};

export default MoHeaderComponent;