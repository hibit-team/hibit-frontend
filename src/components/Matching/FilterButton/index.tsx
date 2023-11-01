/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { MatchingControllerState } from '../../../recoil/atom/MatchingControllerState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useLoginInfo from '../../../hooks/useLoginInfo';
import { useNavigate } from 'react-router-dom';
import { GlobalModalOpenSwitch } from '../../../recoil/atom/GlobalModalOpenSwitch';
import { profileRegisteredState } from '../../../recoil/atom/LoginInfoState';
import { LoginModalState } from '../../../recoil/atom/LoginModalState';
import LoginModal from '../../Login/LoginModal';
const MatchingFilterButton = () => {
  //전체게시글 'allposts' , 이번주 'thisweek' , 좋아요 'like'
  //필터 전역으로 상태관리
  const [sortOption, handleSortOption] = useRecoilState(MatchingControllerState);
  const isLoggedIn = useLoginInfo();
  const isProfileRegistered= useRecoilValue(profileRegisteredState);
  const navigate = useNavigate();
  const setModalIsOpen = useSetRecoilState(GlobalModalOpenSwitch);
  //로그인모달
  const [modalOpen, setModalOpen] = useRecoilState(LoginModalState);
  const closeModal = () => setModalOpen(false);
  const onClickLogin = () => setModalOpen(true);
  
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
              if (!isLoggedIn) {
                setModalOpen(true);
                return;
              }
              // 프로필 등록유저일 경우
              else if (isProfileRegistered === true) {
                navigate('/post-posting');
              }
              // 프로필 미등록시 유도모달 오픈
              else if (isProfileRegistered === false) {
                setModalIsOpen(true);
              }
            }}
            style={{ width: '151px', height: '54px' }}
            css={s.WriteButtonCss}
          >
            게시글 작성 ✍
          </div>
            <LoginModal open={modalOpen} close={closeModal} />
        </s.FilterButtonWrapper>
      </s.FilterWrapper>
    </>
  );
};
export default MatchingFilterButton;
