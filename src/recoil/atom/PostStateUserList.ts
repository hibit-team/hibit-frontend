import { atom } from "recoil";
// 초대유저 체크 목록 배열
interface IInvitationProps {
  idx: number;
  id: string;
  profileImg: string;
}
export const PostStateUserList = atom<[]|IInvitationProps[]>({
  key: 'PostStateUserList',
  default: [],
});