import LayoutTemplate from "../../components/Common/LayoutTemplate"
import MatchingFilterButton from "../../components/Matching/FilterButton";
import MatchingContainer from "../../components/Matching/MatchingContainer";
import MatchingSearchBar from "../../components/Matching/SearchBar";
import MatchingSlideBanner from "../../components/Matching/SlideBanner";
import { useState } from "react";
import HttpClient from "../../services/HttpClient";
import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import axios,{ AxiosError } from "axios";

interface Post{
  id: number,
  title: string,
  body: string,
  userId: number
}

const MatchingPage =()=>{

//sortOption : ['allPosts','thisWeek','likes']
  const [sortOption,setSortOption] = useState<string>('allPosts')

  const fetchPosts= async ({pageParam=0})=>{
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/`)
    return res.data;
  }
  // ?sort=${sortOption}&size=6`+pageParam

  //sortOption변경함수 
  const handleSortOption= (opt:string)=>{
    console.log(opt);
    setSortOption(opt)
  }

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['posts',sortOption],
    fetchPosts,
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
    }
    },
  )


  return(status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {(error as AxiosError).message}</p>
  ) : (<div>
      <LayoutTemplate>
      <MatchingSlideBanner></MatchingSlideBanner>
      <MatchingSearchBar></MatchingSearchBar>
      <MatchingFilterButton handleSortOption={handleSortOption}></MatchingFilterButton>
      <MatchingContainer fetchNextPage={fetchNextPage}></MatchingContainer>
      </LayoutTemplate>
  </div>
  ))
};

export default MatchingPage;