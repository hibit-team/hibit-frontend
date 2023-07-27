import LayoutTemplate from '../../components/Common/LayoutTemplate';
import MatchingFilterButton from '../../components/Matching/FilterButton';
import MatchingContainer from '../../components/Matching/MatchingContainer';
import MatchingSearchBar from '../../components/Matching/SearchBar';
import MatchingSlideBanner from '../../components/Matching/SlideBanner';
import { AxiosError } from 'axios';
import { useGetMatchingInfiniteQuery } from '../../hooks/MathchingMain/useGetMatchingInifiniteQuery';

export interface IPosts {
  idx: number; // 글 넘버 
  title: string; // 게시글 제목 
  exhibition: string; // 전시회 어디
  status: string; // 게시글 모집 상태
  number_and_What: Array<string>; //라벨
  mainimg: string; // 메인 이미지
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
  } = useGetMatchingInfiniteQuery();

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
