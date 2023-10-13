import React, { useEffect } from 'react';
import LayoutTemplate from '../../components/Common/LayoutTemplate';
import * as s from './styles';
import MatchPostLabel from '../../components/MatchPost/PostLabel';
import MatchPostArticle from '../../components/MatchPost/PostArticle';
import { useQuery } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import InviteModal from '../../components/MatchPost/InviteModal';
import { PostIDXAtom } from '../../recoil/atom/PostIDXAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useLoginInfo, { ILoginInfo } from '../../hooks/useLoginInfo';
import { profileRegisteredState, userIdxState } from '../../recoil/atom/LoginInfoState';
export interface ILikeUsers {
  idx: number;
  id: string;
  profileImg: string;
}
export interface IMatchingPostPage {
  idx: number; //게시글넘버
  writer: string; //게시글 작성자
  writerIdx: number;
  writerImg: string; //작성자 프로필
  title: string; //게시글제목
  content: string; //본문텍스트
  exhibiton: string; //전시회명
  status: string; //모집글 상태
  number: number; // 같이가는사람
  openchat: string; // 오픈채팅주소
  view: number; // 열람횟수?
  createdDate: string;
  number_and_What: Array<string>; //label
  mainimg: string; //메인이미지1장
  subimg: Array<string>; //서브이미지2장
  time: string; //게시글 작성시간
  dateTime: Array<string>; //관람희망시간
  likeUsers: ILikeUsers[]; //게시글 좋아요 누른 인원
}

export default function MatchingPostPage() {
  const navigate = useNavigate();
  //게시글정보
  const { idx } = useParams();
  const setIdxAtom = useSetRecoilState(PostIDXAtom);


  const isLogin = useLoginInfo();
  const isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);
  const userIdxInfo: number | null = useRecoilValue(userIdxState);
  const userLoginInfo: ILoginInfo = {
    isLoggedIn: isLogin,
    isProfileRegistered: isProfileRegistered,
    userIdx: userIdxInfo
  }

  useEffect(() => {
    if (idx) setIdxAtom(idx);
  }, [idx, setIdxAtom]);

  const getPostInfoFn = async () => {
    try {
      const res = await HttpClient.get(`/post/${idx}`);
      return res;
    } catch (e) {
      console.error(`게시글 정보를 불러오지 못했습니다 : ${(e as AxiosError).message}`);
      return;
    }
  };
  const { data, isError, error, isLoading, isFetching, status } = useQuery<IMatchingPostPage, AxiosError>(['post-info'], getPostInfoFn, {
    staleTime: 1000,
    retry: 3,
    retryDelay: 2000,
  },);

  useEffect(() => {
    window.scrollTo(0, 100); // x축은 0, y축은 0으로 설정하여 상단으로 스크롤
  }, []);

  if (isError) {
    console.error(`게시글 정보를 불러오지 못했습니다 : ${(error as AxiosError).message}`);
    alert('존재하지 않는 게시글입니다.')
    navigate('/matching')
  }
  
  return (
    <div style={{ position: 'relative' }}>
      <LayoutTemplate>
        <s.Wrapper>
          <MatchPostLabel postIDX={idx} data={data}></MatchPostLabel>
          <MatchPostArticle userLoginInfo={userLoginInfo} postIDX={idx} data={data}></MatchPostArticle>
          <InviteModal postIDX={idx}></InviteModal>
        </s.Wrapper>
      </LayoutTemplate>
    </div>
  );
}
