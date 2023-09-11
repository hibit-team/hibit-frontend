import { useQuery } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { AxiosError } from 'axios';

export interface IInvitationProps {
  idx: number;
  id: string;
  profileImg: string;
}

export const useGetInviteModalList =(postIDX:string|undefined)=>{
  const invitationQueryFn = async () => {
    try {
      const res = await HttpClient.get(`/matching/${postIDX}/list`);
      return res;
    } catch (e) {
      console.error(`초대리스트를 불러오지 못했습니다 .${(e as AxiosError).message}`);
      return;
    }
  };
    return useQuery<IInvitationProps[], AxiosError,IInvitationProps[],string[]>(['invitation-list'], invitationQueryFn, {
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
  });
}
