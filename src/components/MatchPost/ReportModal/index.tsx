/** @jsxImportSource @emotion/react */
import React, { ReactNode, useEffect, useState } from 'react';
import * as s from './styles';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import OnCheck from '../../../images/components/MatchPost/InviteModal/OnCheck.svg';
import NoCheck from '../../../images/components/MatchPost/InviteModal/NoCheck.svg';
import { TbArrowBackUp } from 'react-icons/tb';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ReportSelectOptionAtom } from '../../../recoil/atom/ReportSelectOptionAtom';
import { motion } from 'framer-motion';
export default function ReportModal() {
  const params = useParams();
  //게시글넘버
  const postIdx = params.idx;
  const [searchParams] = useSearchParams();
  //댓글넘버 from qs
  const commentIdx = searchParams.get('reply');
  console.log(commentIdx);

  const [selectedOpt, setSelectedOpt] = useRecoilState(ReportSelectOptionAtom);
  //신고텍스트
  const [reportText, setReportText] = useState('');
  const navigate = useNavigate();
  const reportOption = [
    '개인 연락처 또는 1:1 만남 강요',
    '히빗 취지에 반하는 만남 유도',
    '비방,비하,폭언,위협',
    '성적 불쾌감을 유발하는 언어 사용',
    '특정 종교의 권유 및 포교',
    '사칭 및 사기 의심',
    '상업적 광고 및 판매 유도',
    '과도한 정치적 견해 표출',
    '기타',
  ];
  return (
    <div css={{ padding:'16px 0px',minWidth: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: COLORS.Gray1 }}>
      <motion.div initial={{ x: -1000, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -1000, opacity: 0 }} transition={{ duration: 0.6 }}>
        <s.ReportModalWrapper>
          <s.ReportModalHeader>
            신고하기
            <TbArrowBackUp
              onClick={e => {
                navigate(-1);
              }}
              style={{ cursor: 'pointer', color: 'white', width: 36, height: 36 }}
            />
          </s.ReportModalHeader>

          <s.ReportModalContentsWrapper>
            <div
              css={{
                marginBottom: 8,
                fontSize: 23,
                fontWeight: 800,
                color: COLORS.Gray3,
                '@media (max-width:600px)': {
                  fontSize: 20,
                  marginBottom: 8,
                },
              }}
            >
              신고 사유를 선택 해주세요.
            </div>
            {reportOption.map((opt, idx) => {
              return (
                <div
                  onClick={() => {
                    setSelectedOpt(idx);
                  }}
                >
                  <ReportModalContent opt={opt} key={idx} idx={idx}></ReportModalContent>
                </div>
              );
            })}
            <div
              css={{
                marginTop: 16,
                marginBottom: 8,
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.Gray3,
                '@media (max-width:600px)': {
                  fontSize: 17,
                  marginBottom: 4,
                },
              }}
            >
              신고 내용을 입력 해주세요. (최소 20자)
            </div>
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setReportText(e.target.value);
              }}
              placeholder="신고 내용을 입력 하세요."
              css={textareaCss}
            ></textarea>
            <div
              css={{
                margin: '16px auto 0px auto',
                boxSizing: 'border-box',
                minWidth: 170,
                minHeight: 58,
                background: COLORS.main24,
                borderRadius: 10,
                border: `1px solid ${COLORS.main100}`,
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                alignItems: 'center',
                color: COLORS.main100,
                fontSize: 20,
                fontWeight: 500,
                '@media (max-width: 600px)': {
                  fontSize: 16,
                  minWidth: 150,
                  minHeight: 50,
                },
              }}
            >
              {/* onClick post요청: 
  "userId": "a", 사용자
  "reportId": "b", 신고대상
  "postIdx": 123, 신고게시글
  "commentIdx": 456, 신고댓글넘버
  "declarationType": "COMMENT", 신고유형
  "content": "댓글 작성 과정에서 욕설이 포함되어 있었음" */}
              신고서 제출하기
            </div>
          </s.ReportModalContentsWrapper>
        </s.ReportModalWrapper>
      </motion.div>
    </div>
  );
}

export function ReportModalContent({ idx, opt }: { idx: number; opt: string }) {
  const selectedOpt = useRecoilValue(ReportSelectOptionAtom);
  return (
    <div
      css={{
        userSelect: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        margin: '6px',
        width: 'auto',
        height: 52,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 18px',
        color: COLORS.main79,
        fontSize: 18,
        fontWeight: selectedOpt === idx ? 800 : 700,
        borderRadius: 10,
        border: selectedOpt === idx ? `2px solid ${COLORS.main79}` : `1px solid ${COLORS.main24}`,
        '@media (max-width: 600px)': {
          height: 50,
          fontSize: 16,
        },
      }}
    >
      {opt}
      {selectedOpt === idx ? <img src={OnCheck} alt="oncheck" /> : <img src={NoCheck} alt="nocheck" />}
    </div>
  );
}

const textareaCss = css({
  margin: '10px auto 0px auto',
  color: COLORS.Gray3,
  fontSize: 18,
  boxSizing: 'border-box',
  width: '98%',
  resize: 'none',
  minHeight: 150,
  border: `1px solid ${COLORS.Gray2}`,
  borderRadius: 10,
  padding: 16,
  '&:focus': {
    outline: 'none',
    border: `1px solid ${COLORS.Gray2}`,
  },
  '@media (max-width:600px)': {
    fontSize: 16,
    minHeight: 120,
  },
});
