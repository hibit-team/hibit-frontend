import { AxiosError } from 'axios';
import HttpClient from '../services/HttpClient';

const MatchingPostAPI = {
  getMatchingPostReplyList: async (postIDX: string) => {
    try {
      const path = `comment/list/${postIDX}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error((e as AxiosError).message);
    }
  },
};
export default MatchingPostAPI;
