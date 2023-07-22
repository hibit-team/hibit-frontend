import React, { useEffect } from 'react';
import LayoutTemplate from '../../components/Common/LayoutTemplate';
import * as s from './styles';
import MatchPostLabel from '../../components/MatchPost/PostLabel';
import MatchPostArticle from '../../components/MatchPost/PostArticle';
import { useQuery } from '@tanstack/react-query';
import HttpClient from '../../services/HttpClient';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
export interface IMatchingPostPage {
  idx: number; //게시글넘버
  writer: string; //게시글 작성자
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
  mainimg: null; //게시글 사진 3장
  time: string; //게시글 작성시간
}

export default function MatchingPostPage() {
  //게시글정보
  const { idx } = useParams();
  const getPostInfoFn = async () => {
    const res = await HttpClient.get(`/post/${idx}`);
    return res;
  };
  const { data, isError, error, isLoading, isFetching } = useQuery<IMatchingPostPage, AxiosError>(['post-info'], getPostInfoFn);

  useEffect(() => {
    window.scrollTo(0, 100); // x축은 0, y축은 0으로 설정하여 상단으로 스크롤
  }, []);

  if (isError) {
    console.error(`MatchingPostPage data-fetching error: ${(error as AxiosError).message}`);
  }

  return (
    <LayoutTemplate>
      <s.Wrapper>
        <MatchPostLabel data={data}></MatchPostLabel>
        <MatchPostArticle postIDX={idx} data={data}></MatchPostArticle>
      </s.Wrapper>
    </LayoutTemplate>
  );
}
