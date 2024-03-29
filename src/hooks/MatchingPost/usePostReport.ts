import { useMutation, useQueryClient } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IReportBody {
  userId: string;
  postIdx: number | null;
  commentIdx: number | null;
  declarationType: string | null;
  content: string;
}

//게시글 및 댓글 신고 요청 훅
export const usePostReport = (body:IReportBody) => {
  const queryClient = useQueryClient();
  const postReportMutationFn = async ()  => {
    const path = `/declaration/report`; 
    const res = await HttpClient.post(path,body ,{
      'Content-Type': 'application/json',
    });
    return res.data;
};
  const navigate = useNavigate();
  return useMutation<IReportBody, AxiosError>( postReportMutationFn, {
    onSuccess: () => {
      if (body.commentIdx) alert('댓글에 대한 신고가 정상적으로 접수되었습니다.');
      else {
        alert('게시글에 대한 신고가 정상적으로 접수되었습니다.');
      }
      navigate(`/matching`)
      queryClient.invalidateQueries(['post-info']);
    },
    onError: e => {
      console.error(`게시글 및 유저 신고에 실패했습니다. error : ${(e as AxiosError).message}`);
      return;
    },
  });
};
