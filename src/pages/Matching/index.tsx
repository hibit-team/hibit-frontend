import LayoutTemplate from "../../components/Common/LayoutTemplate";
import MatchingFilterButton from "../../components/Matching/FilterButton";
import MatchingContainer from "../../components/Matching/MatchingContainer";
import MatchingSearchBar from "../../components/Matching/SearchBar";
import MatchingSlideBanner from "../../components/Matching/SlideBanner";
import { useState } from "react";
import HttpClient from "../../services/HttpClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface IPosts {
	idx: number;
	user: {
		idx: number;
		id: string;
	};
	title: string;
	status: string;
	number_and_What: string[];
	mainimg: string;
	liked: number;
	comment_number: number;
}

const MatchingPage = () => {
	//sortOption : ["allposts",'thisweek','like']
	const [sortOption, setSortOption] = useState<string>("allposts");
	const fetchPosts = async ({ pageParam = 1 }) => {
		const res = await HttpClient.get(`/post/list/${sortOption}/${pageParam}`);
		return res;
	};

	//sortOption변경함수
	const handleSortOption = (opt: string) => {
		console.log(opt);
		setSortOption(opt);
	};

	const {
		// status,
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
	} = useInfiniteQuery<IPosts[], AxiosError>(["posts", sortOption], fetchPosts, {
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
	});

	if (isLoading === true) {
		//초기 데이터fetch, nextPage fetch 로딩 플래그
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
				<MatchingFilterButton sortOption={sortOption} handleSortOption={handleSortOption}></MatchingFilterButton>
				<MatchingContainer isFetchingNextPage={isFetchingNextPage} sortOption={sortOption} pages={data?.pages} fetchNextPage={fetchNextPage}></MatchingContainer>
			</LayoutTemplate>
		</div>
	);
};

export default MatchingPage;
