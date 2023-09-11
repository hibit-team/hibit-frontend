import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

//대댓글 작성 hook
interface ISecondaryReplyMutationParams {
  replyIDX: number | undefined;
  userIDX: number | null;
  body: { content: string };
}
export const usePostSecondaryReplyInputMutation = (params: ISecondaryReplyMutationParams) => {
  const { replyIDX, body } = params;
  const queryClient = useQueryClient();
  const secondaryReplyInputMutationFn = async () => {
    try {
      const path = `/comment/replies/${replyIDX}`;
      const res = HttpClient.post(path, body, { 'Content-Type': 'application/json;charset=utf-8' });
      return res;
    } catch (e) {
      console.error(`${replyIDX}번 댓글의 대댓글 작성에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    }
  };
  return useMutation<any, AxiosError, ISecondaryReplyMutationParams>(secondaryReplyInputMutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reply-lists']);
    },
    onError: e => {
      console.error(`${replyIDX}번 댓글의 대댓글 작성에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    },
  });
};
