import { atom } from "recoil";

export const ReportSelectOptionAtom = atom<number|null>({
  key: 'ReportSelectOptionAtom',
  default: null,
});