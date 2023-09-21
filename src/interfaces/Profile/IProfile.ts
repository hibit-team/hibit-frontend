export interface IProfile {
  nickname: string | undefined,
  age: number | undefined,
  gender: number | undefined,
  personality: string[] | undefined,
  introduce: string | undefined,
  job: string | undefined,
  addressCity: string | undefined,
  addressDistrict: string | undefined,
  mainImg: string | undefined,
  subImg: string[] | undefined,
  jobVisibility: number,
  subImgVisibility: number,
  addressVisibility: number
}