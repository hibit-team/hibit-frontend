/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as s from './styles';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import ArrownDown from '../../../images/components/MatchPost/ArrowDown.svg';
import ArrowUp from '../../../images/components/MatchPost/ArrowUp.svg';
import { IMatchingPostPage } from '../../../pages/MatchPost';
import PostStateModal from '../PostStateModal';
import { useRecoilState } from 'recoil';
import { PostStateModalSwitch } from '../../../recoil/atom/PostStateModalSwitch';
import { useUpdateMatchingStatusCancel } from '../../../hooks/MatchingPost/useUpdateMatchingStatusCancle';

export default function MatchPostLabel({ data, postIDX }: { data?: IMatchingPostPage; postIDX: string | undefined }) {
  const label = data?.number_and_What;
  const [isPostStateModalOpen, setIsPostStateModalOpen] = useRecoilState(PostStateModalSwitch);
  //게시글 status drop down메뉴
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  //게시글 모집취소 mutation hook
  const { mutate: cancelMutate } = useUpdateMatchingStatusCancel(postIDX);

  return (
    <div>
      <PostStateModal postIDX={postIDX}></PostStateModal>
      <s.MatchPostContainer>
        <s.MatchPostLabelSection>
          <s.MatchPostLabel>
            {label?.map((item, idx) => (
              <div key={idx} css={s.MatchPostLabelCss}>
                {item}
              </div>
            ))}
          </s.MatchPostLabel>

          <s.MatchPostStatusContainer isStatusModalOpen={isStatusModalOpen}>
            <div
              onClick={() => {
                setIsStatusModalOpen(!isStatusModalOpen);
              }}
              css={{ userSelect: 'none', display: 'flex', padding: '6px 0px 6px 12px'}}
            >
              <button css={{ userSelect: 'none', all: 'unset'}}>
              <span css={{position:'relative',left: '9px'}}>{data?.status === 'N' ? '모집 중' : data?.status === 'C' ? '모집 완료' : '모집 취소'}</span>
              </button>
              {!isStatusModalOpen ? (
                <img css={{ position: 'relative', left: 16, bottom: 1 }} src={ArrownDown} alt="modalOpen-arrow"></img>
              ) : (
                <img css={{ position: 'relative', left: 16, bottom: 1 }} src={ArrowUp} alt="modalClose-arrow"></img>
              )}
            </div>
            <div css={{userSelect: 'none', display: isStatusModalOpen ? 'block' : 'none' }}>
              <div
                onClick={e => {
                  e.stopPropagation();
                  switch (data?.status) {
                    case 'N':
                      alert('현재 모집중인 게시글입니다.');
                      setIsStatusModalOpen(false);
                      break;
                    case 'C':
                      alert('이미 모집 완료된 게시글은 상태를 변경할 수 없습니다.');
                      setIsStatusModalOpen(false);
                      break;
                    case 'A':
                      alert('이미 모집 취소된 게시글입니다');
                      setIsStatusModalOpen(false);
                      break;
                    default:
                      alert('invalidate state');
                      setIsStatusModalOpen(false);
                  }
                }}
                css={{
                  '&:hover': {
                    backgroundColor: `${COLORS.main42}`,
                    color: 'white',
                  },
                  padding: '6px 0px 6px 12px',
                  borderTop: `1px solid ${COLORS.main79}`,
                  borderBottom: `1px solid ${COLORS.main79}`,
                  boxSizing: 'border-box',
                }}
              >
                <span css={{position:'relative',left: '9px'}}>모집 중 </span>
              </div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  switch (data?.status) {
                    case 'N':
                      //함께간인원 모달 열어주기
                      //N(모집중)상태 => 모집완료클릭 -> 모달오픈 -> 선택하기클릭 PostStateModal 컴포넌트 의존성O
                      if (!isPostStateModalOpen) {
                        setIsPostStateModalOpen(true);
                      }
                      setIsStatusModalOpen(false);
                      break;
                    case 'C':
                      alert('이미 모집 완료된 게시글입니다.');
                      setIsStatusModalOpen(false);
                      break;
                    case 'A':
                      alert('모집 취소된 게시글은 상태를 변경할 수 없습니다.');
                      setIsStatusModalOpen(false);
                      break;
                    default:
                      alert('invalidate state');
                      setIsStatusModalOpen(false);
                  }
                }}
                css={{
                  '&:hover': {
                    backgroundColor: `${COLORS.main42}`,
                    color: 'white',
                  },
                  padding: '6px 0px 7px 12px',
                  boxSizing: 'border-box',
                  borderBottom: `1px solid ${COLORS.main79}`,
                }}
              >
                <span css={{position:'relative',left: '8px'}}>모집 완료</span>
              </div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  switch (data?.status) {
                    case 'N':
                      const confirm = window.confirm(`게시글 모집을 취소하시겠습니까? 모집 취소시 게시글 리스트에서 해당 게시글이 사라집니다.`);
                      if (confirm) {
                        setIsStatusModalOpen(false);
                        //게시글모집취소 mutate
                        cancelMutate(postIDX);
                      }
                      setIsStatusModalOpen(false);
                      break;
                    case 'C':
                      alert('이미 모집 완료된 게시글은 상태를 변경할 수 없습니다.');
                      setIsStatusModalOpen(false);
                      break;
                    case 'A':
                      alert('이미 모집 취소된 상태의 게시글입니다');
                      setIsStatusModalOpen(false);
                      break;
                    default:
                      alert('invalidate state');
                      setIsStatusModalOpen(false);
                  }
                }}
                css={{
                  '&:hover': {
                    backgroundColor: `${COLORS.main42}`,
                    color: 'white',
                  },
                  padding: '6px 0px 7px 12px',
                  boxSizing: 'border-box',
                }}
              >
                <span css={{position:'relative',left: '8px'}}>모집 취소</span>
              </div>
            </div>
          </s.MatchPostStatusContainer>
        </s.MatchPostLabelSection>
      </s.MatchPostContainer>
    </div>
  );
}
