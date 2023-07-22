import HttpClient from '../services/HttpClient';
import { AxiosError } from 'axios';
const MatchingAPI = {
  getMatchingList: async (post_id: number) => {
    try {
      const path = `matching/${post_id}/list`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({ e });
      return null;
    }
  },

  getMatchingOKList: async (post_id: number) => {
    try {
      const path = `matching/${post_id}/oklist`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({ e });
      return null;
    }
  },

  putMatchingSend: async (post_id: number, body: any) => {
    try {
      const path = `matching/${post_id}/send`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({ e });
      return null;
    }
  },

  putMatchingOK: async (post_id: number, body: any) => {
    try {
      const path = `matching/${post_id}/ok`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({ e });
      return null;
    }
  },

  putMatchingNO: async (post_id: number, body: any) => {
    try {
      const path = `matching/${post_id}/no`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({ e });
      return null;
    }
  },
  handleReplyDelete: async (idx: number | undefined) => {
    try {
      const path = `/comment/delete/${idx}`;
      const res = await HttpClient.delete(path);
      return res;
    } catch (e) {
      console.error(`오류로 인해 삭제 처리가 되지 않았습니다. ${(e as AxiosError).message}`);
    }
  },
};

export default MatchingAPI;
