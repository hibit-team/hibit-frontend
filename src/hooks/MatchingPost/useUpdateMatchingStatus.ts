import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
//게시글 모집상태 변경 hook
export const useUpdateMatchingStatus = (postIDX:string | undefined) => {
  const queryClient = useQueryClient();
  const postStatusMutationFn = async (postIDX:string | undefined) => {
    try {
      const path = `/post/${postIDX}/complete`;
      const res = HttpClient.put(path,postIDX);
      return res;
    } catch (e) {
      console.error(`${postIDX}번 게시글의 모집상태 변경에 실패했습니다. error : ${(e as AxiosError).message}`);
    }
  };
  return useMutation(postStatusMutationFn, {
    onMutate: ()=>{queryClient.cancelQueries()},
    onSettled: () => {
      queryClient.invalidateQueries(['post-info']);
    },
    onError: e => {
      console.error(`${postIDX}번 게시글의 모집상태 변경에 실패했습니다. error : ${(e as AxiosError).message}`);
    },
  });
};
