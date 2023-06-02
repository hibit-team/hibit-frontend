import LayoutTemplate from "../../components/Common/LayoutTemplate"
import MatchingFilterButton from "../../components/Matching/FilterButton";
import MatchingContainer from "../../components/Matching/MatchingContainer";
import MatchingSearchBar from "../../components/Matching/SearchBar";
import MatchingSlideBanner from "../../components/Matching/SlideBanner";
import { useState } from "react";
import HttpClient from "../../services/HttpClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { InfiniteData } from "@tanstack/react-query";


export interface IPosts 
  {
    idx: number,
    user: null,
    title: string,
    post_status: string,
    number_and_What: string[],
    mainimg: null,
    liked: number,
  }



const MatchingPage =()=>{

//sortOption : ["allposts",'thisweek','like']
  const [sortOption,setSortOption] = useState<string>("allposts")
  const fetchPosts= async ({pageParam=1})=>{
    const res = await HttpClient.get(`/post/list/${sortOption}/${pageParam}`);
    return res
  }

  //sortOption변경함수 
  const handleSortOption= (opt:string)=>{
    console.log(opt);
    setSortOption(opt)
  }


  const {
    status,
    data,
    error,
    // isFetching,
    // isFetchingNextPage,
    // isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    // hasNextPage,
    // hasPreviousPage,
  } = useInfiniteQuery<IPosts[],AxiosError>(
    ['posts',sortOption],
    fetchPosts,
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
    },
    },
  )
  console.log(data)


  return(status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {(error as AxiosError).message}</p>
  ) : (<div>
      <LayoutTemplate>
      <MatchingSlideBanner></MatchingSlideBanner>
      <MatchingSearchBar></MatchingSearchBar>
      <MatchingFilterButton sortOption={sortOption} handleSortOption={handleSortOption}></MatchingFilterButton>
      <MatchingContainer pages={data?.pages} fetchNextPage={fetchNextPage}></MatchingContainer>
      </LayoutTemplate>
  </div>
  ))
};

export default MatchingPage;