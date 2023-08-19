import { atom } from "recoil";
//게시글넘버 atom
export const PostIDXAtom = atom<null|string>({
  key: 'PostIDXAtom',
  default: null,
});
