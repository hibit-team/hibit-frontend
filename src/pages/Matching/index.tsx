import LayoutTemplate from "../../components/Common/LayoutTemplate"
import MatchingFilterButton from "../../components/Matching/FilterButton";
import MatchingContainer from "../../components/Matching/MatchingContainer";
import MatchingSearchBar from "../../components/Matching/SearchBar";
import MatchingSlideBanner from "../../components/Matching/SlideBanner";

const MatchingPage =()=>{
  //
  return(<>
      <LayoutTemplate>
      <MatchingSlideBanner></MatchingSlideBanner>
      <MatchingSearchBar></MatchingSearchBar>
      <MatchingFilterButton></MatchingFilterButton>
      <MatchingContainer></MatchingContainer>
      </LayoutTemplate>
  </>
  )
};

export default MatchingPage;