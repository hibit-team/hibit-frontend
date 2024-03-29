/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from './styles';
import { css } from '@emotion/react';
import Modal from 'react-modal';
import COLORS from '../../../assets/color';
import NoCheck from '../../../images/components/MatchPost/InviteModal/NoCheck.svg';
import OnCheck from '../../../images/components/MatchPost/InviteModal/OnCheck.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { hoverAnimation } from '../PostArticle/styles';
import { IInvitationProps } from '../../../hooks/MatchingPost/useGetInviteModalList';
import { PostStateModalSwitch } from '../../../recoil/atom/PostStateModalSwitch';
import { PostCompleteUserList } from '../../../recoil/atom/PostCompleteUserList';
import HttpClient from '../../../services/HttpClient';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useUpdateCombo } from '../../../hooks/MatchingPost/useUpdateCombo';
//게시글 모집완료(complete)시 등장모달
const PostStateModal = ({ postIDX }: { postIDX: string | undefined }) => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(PostStateModalSwitch);
  const userList = useRecoilValue(PostCompleteUserList); //발송유저리스트
  const [Fold, setFold] = useState(false);//접기여부
  const closeModal = () => {
    setModalIsOpen(false);
  };
  //모달css
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

  const companyListQueryFn = async () => {
    try {
      const res = await HttpClient.get(`/matching/${postIDX}/oklist`);
      return res;
    } catch (e) {
      console.error(`초대리스트를 불러오지 못했습니다 .${(e as AxiosError).message}`);
      return;
    }
  };
  const { data: companionList } = useQuery<IInvitationProps[]>(['company-list'], companyListQueryFn);

  // 함께한 유저리스트 전송 & 게시글 상태 완료  
  const { mutate: updateMutate } = useUpdateCombo(postIDX, userList);
  
  return (
    <div>
      <Modal style={modalCss} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Invite-Modal">
        <s.InviteModalHeader Fold={Fold}>
          <div css={{ userSelect: 'none', fontSize: 18, fontWeight: 900 }}>함께한 인원을 선택해주세요</div>
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
          {companionList?.map(list => {
            return <InviteModalContent key={list.idx} list={list}></InviteModalContent>;
          })}
        </s.InviteModalContentsWrapper>
        {/* 선택하기버튼  */}
        <div
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
            onClick={(e) => {
              e.stopPropagation();
              const confirmed = window.confirm(`함께한 유저를 선택하면 게시글의 상태가 '모집완료'로 변경됩니다.`);
              setModalIsOpen(false);
              if (confirmed === true) {
                //게시글 상태 업데이트 put => userList 발송
                if(userList.length ===0) {
                  alert('함께 간 유저를 선택해주세요')
                } else {
                  updateMutate(postIDX);
                }
              }
            }}
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
            선택하기
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostStateModal;

const InviteModalContent = ({ list }: { list?: IInvitationProps }) => {
  //post body에 userList담아서 요청
  const setUserList = useSetRecoilState(PostCompleteUserList);
  const [checkState, setCheckState] = useState(false);
  useEffect(() => {
    //언마운트시 리스트 클리어
    return () => {
      setUserList([]);
      setCheckState(false);
    };
  }, [setUserList, setCheckState]);
  return (
    <div
      onClick={() => {
        if (checkState === false && list) {
          setCheckState(true);
          setUserList(prev => [...prev, list.idx]);
        } else if (checkState === true && list) {
          //checkState true인경우 다시 체크한 요소를 제외한 요소만 반환
          setCheckState(false);
          setUserList(prev =>
            prev.filter(item => {
              return item !== list.idx;
            })
          );
        }
      }}
      css={{
        userSelect: 'none',
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
};
