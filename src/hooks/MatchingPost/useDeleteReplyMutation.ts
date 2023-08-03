import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

//해당 넘버의 댓글(대댓글)삭제
export const useDeleteReplyMutation = (replyIDX: number | undefined) => {
  const queryClient = useQueryClient();
  const deleteMatchingReply = async (replyIDX: number | undefined) => {
    try {
      const path = `/comment/delete/${replyIDX}`;
      const res = await HttpClient.delete(path);
      return res;
    } catch (e) {
      console.error(`${replyIDX} : 오류로 인해 삭제가 되지 않았습니다. ${(e as AxiosError).message}`);
      return;
    }
  };
  return useMutation(deleteMatchingReply, {
    onSettled: () => {
      queryClient.invalidateQueries(['reply-lists']);
    },
    onError: e => {
      console.error(`오류로 인해 삭제가 되지 않았습니다. ${(e as AxiosError).message}`);
    },
    retry: 3,
    retryDelay: 3000,
  });
};
