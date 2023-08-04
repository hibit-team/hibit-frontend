import { atom } from 'recoil';

export const accessTokenState = atom<string|null>({
  key: 'accessTokenState',
  default: null
});