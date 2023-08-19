import { AxiosError } from 'axios';
import HttpClient from '../services/HttpClient';
import { IComments } from '../components/MatchPost/PostReplySection';
const MatchingPostAPI = {
  postMatchingReplyInput: async (postIDX: string, userIDX: number | undefined, body: string) => {
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
