import { atom } from "recoil";
export const GlobalModalOpenSwitch = atom<boolean>({
  key: 'GlobalModalOpenSwitch',
  default: false,
});
