/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { css } from '@emotion/react';
import COLORS from '../../../assets/color';
import React, { useState } from 'react';
import SearchIcon from '../../../images/components/Matching/searchIcon.svg';

const CustomSearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [placeHolderState, setPlaceHolderState] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const placeholderText = (
    <div
      onClick={() => {
        setPlaceHolderState(false);
      }}
      css={css`
        color: ${COLORS.Gray3};
        font-size: 22px;
        font-weight: 500px;
        position: relative;
        right: 9.8rem;
        bottom: 4.25rem;
        height: 0;
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
          히순이
        </span>
        님 👋
      </span>
      <span> 원하시는 매칭 키워드를 검색 해보세요!</span>
    </div>
  );

  return (
    <>
      <input
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
        css={css`
          width: 32px;
          height: 32px;
          position: relative;
          left: 394px;
          bottom: 4.4rem;
          &: hover {
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
