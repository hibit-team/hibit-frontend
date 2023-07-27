import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

//게시글 좋아요
export const usePostMatchingArticleLikeMutation = (postIDX:string|undefined) => {
  const queryClient = useQueryClient();
  const matchingArticleLikeMutationFn = async (postIDX:string|undefined) => {
    try {
      const path = `/post/${postIDX}/like`;
      const res = HttpClient.get(path);
      return res;
    } catch (e) {
      console.error(`${postIDX}번 게시글의 좋아요에 실패했습니다. error : ${(e as AxiosError).message}`);
    }
  };
  return useMutation(matchingArticleLikeMutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(['post-info']);
    },
    onError: e => {
      console.error(`${postIDX}번 게시글의 좋아요에 실패했습니다. error : ${(e as AxiosError).message}`);
    },
  });
};
