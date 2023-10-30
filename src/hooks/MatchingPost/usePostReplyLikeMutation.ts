import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { profileRegisteredState } from '../../recoil/atom/LoginInfoState';
//댓글&대댓글 좋아요
export const usePostReplyLikeMutation = (replyIDX: number | undefined) => {
  const queryClient = useQueryClient();
  const isProfile = useRecoilValue<boolean>(profileRegisteredState)
  isProfile ? console.log(isProfile) : console.log('false')
  const replyLikeMutationFn = async (replyIDX: number | undefined) => {
      if(!isProfile) throw Error
      const path = `/comment/like/${replyIDX}`;
      const res = await HttpClient.get(path);
      return res;
  };
  return useMutation(replyLikeMutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(['reply-lists']);
    },
    onError: e => {
      console.error(`${replyIDX}번 댓글의 좋아요에 실패했습니다. error : ${(e as AxiosError).message}`);
      alert('좋아요에 실패했습니다.')
    },
  });
};
