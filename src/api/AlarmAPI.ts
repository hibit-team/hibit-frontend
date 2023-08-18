import HttpClient from "../services/HttpClient";

const AlarmAPI = {
  getAlarmList: async (userIdx: number) => {
    try {
      const path = `/alarm/list?userIdx=${userIdx}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default AlarmAPI;