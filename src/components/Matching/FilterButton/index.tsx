/** @jsxImportSource @emotion/react */
import * as s from './styles'
// import { css } from '@emotion/react';

interface MatchingFilterButtonProps {
  sortOption:string ,
  handleSortOption: (opt: string) => void;
}

const MatchingFilterButton = ({sortOption,handleSortOption}:MatchingFilterButtonProps) =>{
  //전체게시글 'allposts' , 이번주 'thisweek' , 좋아요 'like'

  return(
    <>
    <s.FilterWrapper>
      <s.FilterButtonWrapper>
        <div onClick={()=>handleSortOption('thisweek')}style={{width:'216px',height:'54px'}}
        css={sortOption === 'thisweek' ? s.SelectedFilterCss : s.FilterButtonCss}
        >이번주 출발하는 전시🤟</div>

        <div onClick={()=>handleSortOption('like')}
        style={{width:'201px',height:'54px'}}
        css={sortOption === 'like' ? s.SelectedFilterCss : s.FilterButtonCss}>좋아요 많은 게시글 🔥</div>

        <div onClick={()=>handleSortOption('allposts')}
        style={{width:'184px',height:'54px'}} css={sortOption === 'allposts' ? s.SelectedFilterCss : s.FilterButtonCss}>게시글 전체보기👀</div>
        <div style={{width:'151px',height:'54px'}} css={s.WriteButtonCss}>게시글 작성 ✍</div>
      </s.FilterButtonWrapper>
    </s.FilterWrapper>
    </>
  )
}
export default MatchingFilterButton;