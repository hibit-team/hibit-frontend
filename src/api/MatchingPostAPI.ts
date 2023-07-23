import { AxiosError } from 'axios';
import HttpClient from '../services/HttpClient';
import { IComments } from '../components/MatchPost/PostReplySection';
const MatchingPostAPI = {
  // getMatchingPostReplyList: async (postIDX: string | undefined) => {
  //   try {
  //     const path = `comment/list/${postIDX}`;
  //     const response = await HttpClient.get(path);
  //     return response;
  //   } catch (e) {
  //     console.error((e as AxiosError).message);
  //     return;
  //   }
  // },
  postMatchingReply: async (postIDX: string, userIDX: number | undefined, body: string) => {
    try {
      const path = `comment/${postIDX}/${userIDX}`;
      const response = await HttpClient.post(path, body);
      return response;
    } catch (e) {
      console.error(`댓글 입력에 실패했습니다. Error: ${(e as AxiosError).message}`);
    }
  },
};
export default MatchingPostAPI;
