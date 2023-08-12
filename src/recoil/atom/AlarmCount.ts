import { selector } from 'recoil';
import AlarmAPI from '../../api/AlarmAPI';
import { userIdxState } from './UserIdx';

export const alarmCountState = selector({
  key: 'alarmCountState',
  get: async ({get}) => {
    const userIdx = get(userIdxState);
    const alarmList = await AlarmAPI.getAlarmList(userIdx);
    if(alarmList) {
      return alarmList.length;
    } else {
      return 0;
    }
  }
});


