import { useMutation,useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { MatchingControllerState } from '../../recoil/atom/MatchingControllerState';
import { useRecoilValue } from 'recoil';
//해당 넘버의 게시글 삭제 후 매칭메인페이지로 Navigate
export const useDeleteMatchingPostMutation = (postIDX: string | undefined) => {
  const sortOption = useRecoilValue(MatchingControllerState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteMatchingPost = async (postIDX: string | undefined) => {
    try {
      const path = `/post/${postIDX}`;
      const res = await HttpClient.delete(path);
      return res;
    } catch (e) {
      console.error(`${postIDX}번 게시글이 삭제되지 않았습니다. ${(e as AxiosError).message}`);
      alert('오류로 인해 게시글이 삭제되지 않았습니다')
      navigate('/matching')
      return;
    }
  }
  return useMutation(deleteMatchingPost, {
    onSuccess: () => {
      alert('게시글이 삭제되었습니다')
      navigate('/matching')
      queryClient.invalidateQueries(['posts', sortOption])
    },
    onError: (e) => {
      console.error(`${postIDX}번 게시글이 삭제되지 않았습니다. ${(e as AxiosError).message}`);
      alert('오류로 인해 게시글이 삭제되지 않았습니다')
      navigate('/matching')
      return;
    },
  })
}
