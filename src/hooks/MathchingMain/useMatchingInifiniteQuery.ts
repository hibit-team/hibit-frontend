import HttpClient from "../../services/HttpClient";
import { useRecoilValue } from "recoil";
import { MatchingControllerState } from "../../recoil/atom/MatchingControllerState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IPosts } from "../../pages/Matching";
import { AxiosError } from "axios";
export const useMatchingInfiniteQuery = ()=> {
  const fetchPosts = async ({ pageParam = 1 ,sortOption ='allposts'}) => {
    const res = await HttpClient.get(`/post/list/${sortOption}/${pageParam}`);
    return res;
  };
  const sortOption = useRecoilValue(MatchingControllerState);

  return useInfiniteQuery<IPosts[], AxiosError>(['posts', sortOption], fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 5,
  });
}