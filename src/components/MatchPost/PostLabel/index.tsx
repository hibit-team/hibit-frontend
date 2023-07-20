/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as s from './styles';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import ArrownDown from '../../../images/components/MatchPost/ArrowDown.svg';
import ArrowUp from '../../../images/components/MatchPost/ArrowUp.svg';
import { IMatchingPostPage } from '../../../pages/MatchPost';

export default function MatchPostLabel({data}:{data?:IMatchingPostPage}) {
  const label = data?.number_and_What
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [postStatus, setPostStatus] = useState(data?.status ==='N' ? '모집중':'모집완료');
  return (
    <div>
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
              css={{ display: 'flex', padding: '6px 0px 6px 12px' }}
            >
              <button css={{ all: 'unset' }}>{postStatus}</button>
              {!isStatusModalOpen ? (
                <img css={{ position: 'relative', left: 5, bottom: 1 }} src={ArrownDown} alt="modalOpen-arrow"></img>
              ) : (
                <img css={{ position: 'relative', left: 5, bottom: 1 }} src={ArrowUp} alt="modalClose-arrow"></img>
              )}
            </div>
            <div css={{ display: isStatusModalOpen ? 'block' : 'none' }}>
              <div
                onClick={() => {
                  const confirmed = window.confirm(`모집 상태를 '모집 중'으로 변경하시겠습니까?`);
                  if (confirmed) {
                    setPostStatus('모집 중');
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
                모집 중
              </div>
              <div
                onClick={() => {
                  const confirmed = window.confirm(`모집 상태를 '모집완료'로 변경하시겠습니까?`);
                  if (confirmed) {
                    setPostStatus('모집 완료');
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
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                모집 완료
              </div>
            </div>
          </s.MatchPostStatusContainer>
        </s.MatchPostLabelSection>
      </s.MatchPostContainer>
    </div>
  );
}
