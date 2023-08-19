import { atom } from "recoil";
// 함께간유저 발송리스트
export const PostCompleteUserList = atom<[]|number[]>({
  key: 'PostCompleteUserList',
  default: [],
});