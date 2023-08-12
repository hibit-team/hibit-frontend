//게시글 및 댓글 신고 훅
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IReportBody {
  userId: string;
  reportId: string;
  postIdx: number | null;
  commentIdx: number | null;
  declarationType: string | null;
  content: string;
}
//게시글 좋아요
export const usePostReport = (body: IReportBody) => {
  const queryClient = useQueryClient();
  const matchingArticleLikeMutationFn = async () => {
    try {
      const path = `/declaration/report`;
      const res = await HttpClient.post(path, body);
      return res;
    } catch (e) {
      console.error(`게시글 및 유저 신고에 실패했습니다. error : ${(e as AxiosError).message}`);
    }
  };
  const navigate = useNavigate();
  return useMutation<IReportBody, AxiosError>(() => matchingArticleLikeMutationFn(), {
    onSuccess: () => {
      if (body.commentIdx) alert('댓글에 대한 신고가 정상적으로 접수되었습니다.');
      else {
        alert('게시글에 대한 신고가 정상적으로 접수되었습니다.');
      }
      navigate(`/matchPost/${body.postIdx}`)
      queryClient.invalidateQueries(['post-info']);
    },
    onError: e => {
      console.error(`게시글 및 유저 신고에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    },
  });
};
