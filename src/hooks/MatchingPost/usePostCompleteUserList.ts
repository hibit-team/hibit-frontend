export {}
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import HttpClient from '../../services/HttpClient';
// import { AxiosError } from 'axios';
// //함께 다녀온 유저 리스트 발송 hook
// export const usePostCompelteUserList = (postIDX: string | undefined, userList: [] | number[]) => {
//   const queryClient = useQueryClient();
//   const postCompleteUserListMutationFn = async () => {
//     try {
//       const path = `/matching/${postIDX}/oksave`;
//       const res = HttpClient.put(path, userList);
//       return res;
//     } catch (e) {
//       console.error(`초대장 보내기 실패. error : ${(e as AxiosError).message}`);
//       return;
//     }
//   };
//   return useMutation(postCompleteUserListMutationFn, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['post-info']);
//       alert('함께한 유저 리스트를 성공적으로 발송하였습니다!');
//     },
//     onError: e => {
//       console.error(`초대장 보내기 실패. error : ${(e as AxiosError).message}`);
//       return;
//     },
//   });
// };
