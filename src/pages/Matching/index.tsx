import LayoutTemplate from '../../components/Common/LayoutTemplate';
import MatchingFilterButton from '../../components/Matching/FilterButton';
import MatchingContainer from '../../components/Matching/MatchingContainer';
import MatchingSearchBar from '../../components/Matching/SearchBar';
import MatchingSlideBanner from '../../components/Matching/SlideBanner';
import HttpClient from '../../services/HttpClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { MatchingControllerState } from '../../recoil/atom/MatchingControllerState';
import { useMatchingInfiniteQuery } from '../../hooks/MathchingMain/useMatchingInifiniteQuery';
export interface IPosts {
  idx: number;
  title: string; //글제목
  exhibition: string;
  status: string; //게시글상태
  number_and_What: Array<string>; //라벨
  mainimg: string;
  liked: number; //게시글 좋아요수
  comment_number: number; //댓글 수
  dateTime: string; //호버시 나오는 희망 관람시간
}
const MatchingPage = () => {
  //sortOption : ["allposts",'thisweek','like']
  const {
    data,
    error,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    // isFetching,
    // hasNextPage,
    // isFetchingPreviousPage,
    // fetchPreviousPage,
    // hasPreviousPage,
  } = useMatchingInfiniteQuery();
  if (isLoading === true) {
    //초기 데이터fetch, nextPage fetch 로딩 플래그 => 추후 로딩스피너로 대체
    return <p>Loading...</p>;
  }
  if (isError === true) {
    return <p>Error: {(error as AxiosError)?.message}</p>;
  }
  return (
    <div>
      <LayoutTemplate>
        <MatchingSlideBanner></MatchingSlideBanner>
        <MatchingSearchBar></MatchingSearchBar>
        <MatchingFilterButton></MatchingFilterButton>
        <MatchingContainer isFetchingNextPage={isFetchingNextPage} pages={data?.pages} fetchNextPage={fetchNextPage}></MatchingContainer>
      </LayoutTemplate>
    </div>
  );
};

export default MatchingPage;
