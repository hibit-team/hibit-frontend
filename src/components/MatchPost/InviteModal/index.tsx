/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from 'react';
import * as s from './style';
import { css } from '@emotion/react';
import Modal from 'react-modal';
import COLORS from '../../../assets/color';
import NoCheck from '../../../images/components/MatchPost/InviteModal/NoCheck.svg';
import OnCheck from '../../../images/components/MatchPost/InviteModal/OnCheck.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InviteModalSwitchState } from '../../../recoil/atom/InviteModalSwitchState';
import { InviteModalUserList } from '../../../recoil/atom/InviteModalUserList';
import { hoverAnimation } from '../PostArticle/styles';
import { useGetInviteModalList } from '../../../hooks/MatchingPost/useGetInviteModalList';
import { IInvitationProps } from '../../../hooks/MatchingPost/useGetInviteModalList';
import { usePostInviteUserList } from '../../../hooks/MatchingPost/usePostInviteUserList';

// React-lazy 코드스플리팅
const InviteModal = ({ postIDX }: { postIDX: string | undefined }) => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(InviteModalSwitchState);
  const [Fold, setFold] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    return () => {
      //초대모달 언마운트시 클리어
      setModalIsOpen(false);
    };
  }, [setModalIsOpen]);
  //초대장발송 put
  const userList = useRecoilValue(InviteModalUserList);
  const { mutate: inviteUsersMutate } = usePostInviteUserList(postIDX, userList);
  //초대 리스트 불러오기
  const { isFetching, isLoading, data: invitationList } = useGetInviteModalList(postIDX);

  const modalCss: ReactModal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      zIndex: 10,
      overflow: 'hidden',
    },
    content: {
      background: Fold ? 'transparent' : 'white',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      width: 329,
      maxHeight: Fold ? '54px' : '460px',
      top: '150px',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      padding: '0',
      margin: '0 auto',
      maxWidth: '100vw',
      overflow: 'auto',
      borderRadius: '16px 16px 16px 16px',
    },
  };

  if (isFetching || isLoading) return <p css={{ margin: '0 auto', fontSize: 16, fontWeight: 700 }}>isLoading...</p>;

  return (
    <div>
      <Modal style={modalCss} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Invite-Modal">
        <s.InviteModalHeader Fold={Fold}>
          <div css={{ userSelect: 'none', fontSize: 18, fontWeight: 900 }}>참여자 리스트</div>
          {Fold ? (
            <svg
              css={{ cursor: 'pointer' }}
              onClick={() => {
                setFold(!Fold);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
            >
              <path d="M15 1L8 8" stroke="white" />
              <path d="M8 8L1 1" stroke="white" />
            </svg>
          ) : (
            <svg
              css={{ cursor: 'pointer' }}
              onClick={() => {
                setFold(!Fold);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
            >
              <path d="M1 8L8 1" stroke="white" />
              <path d="M8 1L15 8" stroke="white" />
            </svg>
          )}
        </s.InviteModalHeader>
        {/* 컨텐츠영역 */}
        <s.InviteModalContentsWrapper css={{ display: Fold ? 'none' : 'flex' }}>
          {invitationList?.map(list => {
            return <InviteModalContent key={list.idx} list={list}></InviteModalContent>;
          })}
        </s.InviteModalContentsWrapper>
        {/* //초대 유저 리스트 post하기 버튼 */}
        <div
          onClick={e => {
            e.stopPropagation();
            inviteUsersMutate();
          }}
          data-id="invite-button"
          css={{
            display: Fold ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 75,
            boxShadow: `0px 0px 15px 0px rgba(36, 36, 36, 0.25)`,
            marginTop: 'auto',
          }}
        >
          <div
            css={{
              userSelect: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '6px 16px 6px 16px',
              width: 94,
              maxHeight: 34,
              flexShrink: 0,
              border: `1px solid ${COLORS.main79}`,
              background: COLORS.main42,
              borderRadius: 60,
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 'normal',
              letterSpacing: '-0.36px',
              color: COLORS.main100,
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                fontWeight: 700,
                animation: `${hoverAnimation} 0.3s ease-out`,
                border: `1px solid ${COLORS.Gray3}`,
                background: COLORS.main100,
                color: COLORS.white,
              },
            }}
          >
            초대하기
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InviteModal;

const InviteModalContent = React.memo(({ list }: { list?: IInvitationProps }) => {
  //post body에 userList담아서 요청
  const [userList, setUserList] = useRecoilState(InviteModalUserList);
  const [checkState, setCheckState] = useState(false);
  useEffect(() => {
    //언마운트시 리스트 클리어
    return () => {
      setUserList([]);
      // setCheckState(false);
    };
  }, [setUserList]);
  const handleClick = useCallback(() => {
    if (list) {
      //클릭시 체크되지않았다면 리스트추가, 체크된상태라면 빼기
      const updatedUserList = checkState
        ? userList.filter(item => item !== list.idx)
        : [...userList, list.idx];
      //이후 상태 업데이트
      setUserList(updatedUserList);
      setCheckState(prevCheckState => !prevCheckState);
    }
  }, [checkState, list, setUserList, userList]);

  return (
    <div
      onClick={handleClick
    }
      css={{
        minWidth: 259,
        minHeight: 56,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
        border: checkState ? `2px solid ${COLORS.main79}` : `1px solid ${COLORS.Gray2}`,
        margin: '6px 0px',
        color: COLORS.main100,
        fontSize: 14,
        fontWeight: 800,
        padding: '0px 16px 0px 12px',
        cursor: 'pointer',
      }}
    >
      <img style={{ width: 32, height: 32, borderRadius: '50%' }} src={list?.profileImg} alt="list-profile-img"></img>
      <div css={{ userSelect: 'none', marginLeft: 10, display: 'flex', flex: '1 1 auto' }}>{list?.id}</div>
      {checkState ? <img src={OnCheck} alt="no-check"></img> : <img src={NoCheck} alt="no-check"></img>}
    </div>
  );
});
