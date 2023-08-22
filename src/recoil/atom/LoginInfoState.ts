import { atom } from 'recoil';

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null
});

export const userIdxState = atom<number | null>({
  key: 'userIdxState',
  default: null,
});

export const profileRegisteredState = atom<number | null>({
  key: 'profileRegisteredState',
  default: null,
});

