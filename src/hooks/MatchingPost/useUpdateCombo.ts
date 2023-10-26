import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
//같이같 유저 리스트 성공적으로 발송시 게시글 모집상태 완료로 변경 
export const useUpdateCombo = (postIDX: string | undefined, userList: [] | number[]) => {
  const queryClient = useQueryClient();
  //complete상태변경 mutateFn
  const postStatusMutationFn = async (postIDX: string | undefined) => {
      const path = `/post/${postIDX}/complete`;
      const res = HttpClient.put(path, postIDX);
      return res;
  };
  //함께간인원 유저리스트 송 mutateFn
  const postCompleteUserListMutationFn = async () => {
      const path = `/matching/${postIDX}/oksave`;
      const res = HttpClient.put(path, userList, {
        'Content-Type': 'application/json',
      });
      return res;
    }

  //2nd step
  const { mutate: userListPostMutation } = useMutation(postCompleteUserListMutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post-info']);
      window.alert(`게시글의 상태가 모집완료로 변경되었습니다.`);
    },
    onError: e => {
      console.error(`함께한 유저 리스트 발송 실패. error : ${(e as AxiosError).message}`);
      return;
    },
  });

  return useMutation(postStatusMutationFn, {
    onSuccess: () => {
      //게시글상태변경 완료시 유저리스트 발송
      userListPostMutation();
      queryClient.invalidateQueries(['post-info']);
    },
    onError: (e:AxiosError) => {
      console.error(`${postIDX}번 게시글의 모집상태 변경에 실패했습니다. error : ${e.message}`);
      return;
    },
  });
};
