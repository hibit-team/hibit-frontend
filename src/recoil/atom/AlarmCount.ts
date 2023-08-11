import { atom, selector } from 'recoil';
import AlarmAPI from '../../api/AlarmAPI';
import axios from 'axios';

export const alarmCountState = selector({
  key: 'alarmCountState',
  get: async ({get}) => {
    const response =  axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/alarm/list?userIdx=${1}`)
    
    // const response = await AlarmAPI.getAlarmList(1);
    const alarmCountArray: [] = (await response).data;
    return alarmCountArray.length;
  }
});


