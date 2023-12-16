import HttpClient from '../../services/HttpClient';
import { useRecoilValue } from 'recoil';
import { MatchingControllerState } from '../../recoil/atom/MatchingControllerState';
import { useInfiniteQuery, useQueryClient, } from '@tanstack/react-query';
import { IPosts } from '../../pages/Matching';
import { AxiosError } from 'axios';
//매칭메인페이지 칩게시물 fetching hook
export interface IMatchingControllerState{
  atomKey:'search',
  searchText:string,
}
export const useGetMatchingInfiniteQuery = () => {
  const sortOption = useRecoilValue<string|IMatchingControllerState>(MatchingControllerState);
  const fetchPostsFn = async ({ pageParam = 1}) => {
    try {
      if (typeof sortOption === 'string') {
        // sortOption의 타입이 string인 경우  
        const res = await HttpClient.get(`/post/list/${sortOption}/${pageParam}`);
        return res;
      } else if (sortOption.atomKey === 'search') {
        // sortOption의 타입이 IMatchingControllerState인 경우 
        const res = await HttpClient.get(`/post/list/search/${pageParam}?keyword=${sortOption.searchText}`);
        return res;
      }
    } catch (e) {
      if (sortOption === 'search') {
        console.error(`${(e as AxiosError).message}: 검색한 게시글 리스트를 불러오지 못했습니다.`);
        return;
      } else {
        console.error(`${(e as AxiosError).message}: 매칭게시글 리스트를 불러오지 못했습니다.`);
        return;
      }
    }
  };

  return useInfiniteQuery<IPosts[], AxiosError>(['posts', sortOption], fetchPostsFn, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: true,
  });
};
