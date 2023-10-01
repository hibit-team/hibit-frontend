import { atom } from 'recoil';

const initialAccessToken = localStorage.getItem('accessToken');

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: initialAccessToken || null
});

export const userIdxState = atom<number | null>({
  key: 'userIdxState',
  default: null,
});

export const profileRegisteredState = atom<boolean>({
  key: 'profileRegisteredState',
  default: false,
});

