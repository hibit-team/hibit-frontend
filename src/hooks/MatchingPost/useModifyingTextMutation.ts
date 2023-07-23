import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

//댓글,대댓글의 코멘트idx넘기면 수정요청해줌
interface IModifyingMutationFnParams {
  replyIDX?: number | undefined;
  body?: string;
}
export const useModifyingTextMutation = (replyIDX: number | undefined) => {
  const queryClient = useQueryClient();
  const modifyingTextMutationFn = async (params: IModifyingMutationFnParams) => {
    const { replyIDX, body } = params;
    try {
      const path = `/comment/update/${replyIDX}`;
      const res = HttpClient.put(path, body);
      return res;
    } catch (e) {
      console.error(`${replyIDX}번 댓글 수정에 실패했습니다. error : ${(e as AxiosError).message}`);
    }
  };
  return useMutation<string, AxiosError, IModifyingMutationFnParams>(modifyingTextMutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(['reply-lists']);
    },
    onError: e => {
      console.error(`${replyIDX}번 댓글 수정에 실패했습니다. error : ${(e as AxiosError).message}`);
    },
  });
};
