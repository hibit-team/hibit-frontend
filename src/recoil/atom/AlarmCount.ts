import { selector, useRecoilValue } from 'recoil';
import AlarmAPI from '../../api/AlarmAPI';
import { profileRegisteredState, userIdxState } from './LoginInfoState';

export const alarmCountState = selector({
  key: 'alarmCountState',
  get: async ({get}) => {
    let userIdx: number | null = get(userIdxState);
    let isProfileRegistered: boolean | null = get(profileRegisteredState);
    if(userIdx && isProfileRegistered) {
      const alarmList = await AlarmAPI.getAlarmList();
      if(alarmList) {
        return alarmList.length;
      } else {
        return 0;
      }
    }
  }
});


