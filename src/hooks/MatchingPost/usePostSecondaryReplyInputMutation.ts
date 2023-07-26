import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

//대댓글 작성 hook
interface ISecondaryReplyMutationParams {
  replyIDX?: number | undefined;
  userIDX: number | undefined;
  body?: string | undefined;
}
export const usePostSecondaryReplyInputMutation = (replyIDX:number|undefined) => {
  const queryClient = useQueryClient();
  const secondaryReplyInputMutationFn = async ({ replyIDX, userIDX, body }:ISecondaryReplyMutationParams) => {
    try {
      const path = `/comment/replies/${replyIDX}/${userIDX}`;
      const res = HttpClient.post(path, body);
      return res;
    } catch (e) {
      console.error(`${replyIDX}번 댓글의 대댓글 작성에 실패했습니다. error : ${(e as AxiosError).message}`);
    }
  };
  return useMutation<string, AxiosError, ISecondaryReplyMutationParams>(secondaryReplyInputMutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(['reply-lists']);
    },
    onError: e => {
      console.error(`${replyIDX}번 댓글의 대댓글 작성에 실패했습니다. error : ${(e as AxiosError).message}`);
    },
  });
};
