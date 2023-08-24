import { IImage } from "../IImage";

export interface IProfile {
  nickname: string | undefined,
  age: number | undefined,
  gender: number | undefined,
  personality: string[] | undefined,
  introduce: string | undefined,
  job?: string,
  address_sido?: string,
  address_sigugun?: string,
  img?: IImage
}