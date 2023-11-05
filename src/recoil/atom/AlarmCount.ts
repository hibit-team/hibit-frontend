import { selector, useRecoilValue } from 'recoil';
import AlarmAPI from '../../api/AlarmAPI';
import { profileRegisteredState, userIdxState } from './LoginInfoState';
import { IAlarm } from '../../interfaces/Alarm/IAlarm';


export const alarmCountState = selector({
  key: 'alarmCountState',
  get: async ({get}) => {
    let userIdx: number | null = get(userIdxState);
    let isProfileRegistered: boolean | null = get(profileRegisteredState);
    if(userIdx && isProfileRegistered) {
      const alarmList = await AlarmAPI.getAlarmList();
      if(alarmList) {
        const unreadAlarms = alarmList.filter((alarm: IAlarm) => alarm.readed === false);
        return unreadAlarms.length;
      } else {
        return 0;
      }
    }
  }
});


