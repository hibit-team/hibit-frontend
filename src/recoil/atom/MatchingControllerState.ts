import { atom } from 'recoil';
import { IMatchingControllerState } from '../../hooks/MathchingMain/useGetMatchingInifiniteQuery';
// 매칭 게시글 필터 atom
export const MatchingControllerState = atom<string|IMatchingControllerState>({
  key: 'MatchingControllerState',
  default: 'allposts',
});
