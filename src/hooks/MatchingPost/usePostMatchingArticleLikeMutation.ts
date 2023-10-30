import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { profileRegisteredState } from '../../recoil/atom/LoginInfoState';
//게시글 좋아요
export const usePostMatchingArticleLikeMutation = (postIDX: string | undefined) => {
  const queryClient = useQueryClient();
  const isProfile = useRecoilValue(profileRegisteredState)
  const matchingArticleLikeMutationFn = async (postIDX: string | undefined) => {
    try {
      if(!isProfile) throw Error; //프로필 없으면 에러
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
  });
};
