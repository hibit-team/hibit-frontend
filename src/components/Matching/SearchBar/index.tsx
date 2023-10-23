/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import React, { useState, useRef ,useEffect } from 'react';
import SearchIcon from '../../../images/components/Matching/searchIcon.svg';
import { useSetRecoilState } from 'recoil';
import { MatchingControllerState } from '../../../recoil/atom/MatchingControllerState';
import HttpClient from '../../../services/HttpClient';

const CustomSearchBar = () => {
  let [userId,setUserId] = useState<string>('');
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const fetchedUserId = await HttpClient.get('/api/profiles/me');
        setUserId(fetchedUserId.nickname);
      } catch (e) {
        console.error(e,'userId를 받아오지 못했습니다.');
      }
    };
    fetchUserId()
  },[userId])
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [placeHolderState, setPlaceHolderState] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const setSortOption = useSetRecoilState(MatchingControllerState);
  const placeholderText = (
    <div
      onClick={() => {
        setPlaceHolderState(false);
      }}
      css={css`
        color: ${COLORS.Gray3};
        font-family: 'SUIT';
        font-size: 22px;
        font-weight: 500px;
        position: relative;
        right: 2rem;
        bottom: 5.45rem;
        height: 0;
        left: auto;
      `}
    >
      <span
        css={css`
          color: ${COLORS.main100};
        `}
      >
        Hi,
        <span
          css={css`
            font-weight: 700;
          `}
        >
          {userId ? userId : '익명'}
        </span>
        님 👋
      </span>
      <span> 원하시는 매칭 키워드를(전시회명,제목) 검색 해보세요!</span>
    </div>
  );
  return (
    <>
      <input
        ref={inputRef}
        onFocus={() => {
          setPlaceHolderState(false);
        }}
        type="text"
        onChange={handleChange}
        value={inputValue}
        css={s.CustomSearchBarStyles}
      ></input>
      {placeHolderState ? placeholderText : ''}
      <img
        onClick={e => {
          //클릭시 recoil value 변경
          e.stopPropagation();
          setSortOption({
            atomKey: 'search',
            searchText: inputValue,
          });
        }}
        css={css`
          width: 32px;
          height: 32px;
          position: relative;
          left: 394px;
          bottom: 5.6rem;
          &:hover {
            scale: 1.05;
            cursor: pointer;
          }
        `}
        src={SearchIcon}
        alt="search-icon"
      ></img>
    </>
  );
};

const MatchingSearchBar = () => {
  return (
    <>
      <CustomSearchBar></CustomSearchBar>
    </>
  );
};

export default MatchingSearchBar;
