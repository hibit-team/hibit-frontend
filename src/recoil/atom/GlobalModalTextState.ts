import { atom } from "recoil";
export const GlobalModalTextState = atom<string[]>({
  key: 'GlobalModalTextState',
  default: [
    '메이트의 추가 사진과 정보를 보려면',
    '회원가입이 필요해요.',
    '히빗의 회원이 되어 매칭 서비스를 이용해보세요!',
    '회원가입 하러가기',
  ],
});
