import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { InviteModalSwitchState } from '../../recoil/atom/InviteModalSwitchState';
//초대장 발송 hook
export const usePostInviteUserList = (postIDX: string | undefined, userList: [] | number[]) => {
  const queryClient = useQueryClient();
  const postInviteUserListMutationFn = async () => {
    try {
      const path = `/matching/${postIDX}/send`;
      const res = HttpClient.put(path, userList);
      return res;
    } catch (e) {
      console.error(`초대장 보내기 실패. error : ${(e as AxiosError).message}`);
      return;
    }
  };
  const setModalIsOpen = useSetRecoilState(InviteModalSwitchState);
  return useMutation(postInviteUserListMutationFn, {
    onSettled: () => {
      setModalIsOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post-info']);
      alert('초대장을 성공적으로 발송하였습니다!');
    },
    onError: e => {
      console.error(`초대장 보내기 실패. error : ${(e as AxiosError).message}`);
      return;
    },
  });
};
