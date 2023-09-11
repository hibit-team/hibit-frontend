import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

//댓글&대댓글 좋아요
export const usePostReplyLikeMutation = (replyIDX: number | undefined) => {
  const queryClient = useQueryClient();
  const replyLikeMutationFn = async (replyIDX: number | undefined) => {
    try {
      const path = `/comment/like/${replyIDX}`;
      const res = HttpClient.get(path);
      return res;
    } catch (e) {
      console.error(`${replyIDX}번 댓글의 좋아요에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    }
  };
  return useMutation(replyLikeMutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(['reply-lists']);
    },
    onError: e => {
      console.error(`${replyIDX}번 댓글의 좋아요에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    },
  });
};
