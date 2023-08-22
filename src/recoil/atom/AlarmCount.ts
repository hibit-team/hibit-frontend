import { selector } from 'recoil';
import AlarmAPI from '../../api/AlarmAPI';

export const alarmCountState = selector({
  key: 'alarmCountState',
  get: async ({get}) => {
    const alarmList = await AlarmAPI.getAlarmList();
    if(alarmList) {
      return alarmList.length;
    } else {
      return 0;
    }
  }
});


