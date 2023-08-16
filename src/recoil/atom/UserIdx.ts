import { atom } from "recoil";

export const userIdxState = atom<number | null>({
  key: 'userIdxState',
  default: null,
});
