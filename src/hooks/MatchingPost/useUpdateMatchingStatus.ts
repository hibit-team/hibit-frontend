import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
//게시글 모집상태 변경 hook (complete)
//(게시글작성자인 경우에만 가능하도록 제한 필요)
export const useUpdateMatchingStatus = (postIDX: string | undefined) => {
  const queryClient = useQueryClient();
  const postStatusMutationFn = async (postIDX: string | undefined) => {
    try {
      const path = `/post/${postIDX}/complete`;
      const res = HttpClient.put(path, postIDX);
      return res;
    } catch (e) {
      console.error(`${postIDX}번 게시글의 모집상태 변경에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    }
  };
  return useMutation(postStatusMutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post-info']);
      window.alert(`게시글의 상태가 모집완료로 변경되었습니다.`)
    },
    onError: e => {
      console.error(`${postIDX}번 게시글의 모집상태 변경에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    },
  });
};
