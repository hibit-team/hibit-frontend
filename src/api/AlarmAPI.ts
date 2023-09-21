import HttpClient from "../services/HttpClient";

const AlarmAPI = {
  getAlarmList: async () => {
    try {
      const path = `/alarm/list`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putAlarmRead: async (alarm_idx: number) => {
    try {
      const path = `/alarm/read/${alarm_idx}`;
      const response = await HttpClient.put(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default AlarmAPI;