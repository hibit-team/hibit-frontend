import { atom } from "recoil";
// 초대유저 체크 목록 배열
// export interface IInvitationUserProps {
//   idx: number;
//   id: string;
//   profileImg: string;
// }
export const InviteModalUserList = atom<[]|number[]>({
  key: 'InviteModalUserList',
  default: [],
});