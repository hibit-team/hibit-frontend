import { atom } from "recoil";
// 매칭 게시글 필터 atom
export const MatchingControllerState = atom({
  key: 'MatchingControllerState',
  default: 'allposts',
});
