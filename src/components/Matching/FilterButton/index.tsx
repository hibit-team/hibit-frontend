/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useMemo } from 'react';
import { MatchingControllerState } from '../../../recoil/atom/MatchingControllerState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useLoginInfo from '../../../hooks/useLoginInfo';
import { GlobalModal } from '../../GlobalModal';
import { useNavigate } from 'react-router-dom';
import { GlobalModalOpenSwitch } from '../../../recoil/atom/GlobalModalOpenSwitch';

const MatchingFilterButton = () => {
  //전체게시글 'allposts' , 이번주 'thisweek' , 좋아요 'like'
  //필터 전역으로 상태관리
  const [sortOption, handleSortOption] = useRecoilState(MatchingControllerState);
  const isLoggedIn = useLoginInfo()?.isLoggedIn;
  const isProfileRegistered= useLoginInfo()?.isProfileRegistered;
  const navigate = useNavigate();
  const setModalIsOpen = useSetRecoilState(GlobalModalOpenSwitch);
  return (
    <>
      <s.FilterWrapper>
        <s.FilterButtonWrapper>
          <div
            onClick={() => handleSortOption('thisweek')}
            style={{ width: '216px', height: '54px' }}
            css={sortOption === 'thisweek' ? s.SelectedFilterCss : s.FilterButtonCss}
          >
            이번주 출발하는 전시🤟
          </div>

          <div
            onClick={() => handleSortOption('like')}
            style={{ width: '201px', height: '54px' }}
            css={sortOption === 'like' ? s.SelectedFilterCss : s.FilterButtonCss}
          >
            좋아요 많은 게시글 🔥
          </div>

          <div
            onClick={() => handleSortOption('allposts')}
            style={{ width: '184px', height: '54px' }}
            css={sortOption === 'allposts' ? s.SelectedFilterCss : s.FilterButtonCss}
          >
            게시글 전체보기👀
          </div>
          <div
            onClick={() => {
              if (isLoggedIn === false) {
                alert('비회원은 게시글을 작성할 수 없습니다.');
                return;
              }
              if (isProfileRegistered) navigate('/post-posting');
              else {
                setModalIsOpen(true);
              }
            }}
            style={{ width: '151px', height: '54px' }}
            css={s.WriteButtonCss}
          >
            게시글 작성 ✍
          </div>
        </s.FilterButtonWrapper>
      </s.FilterWrapper>
      {isProfileRegistered ? undefined : <GlobalModal />}
    </>
  );
};
export default MatchingFilterButton;
