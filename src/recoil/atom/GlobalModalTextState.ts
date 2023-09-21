import { atom } from "recoil";
export const GlobalModalTextState = atom<string[]>({
  key: 'GlobalModalTextState',
  default: ['히빗의 매칭 서비스를 이용하려면', '회원가입이 필요해요.', '히빗의 회원이 되어 추가 서비스를 이용해보세요!', '회원가입 하러가기'],
});
