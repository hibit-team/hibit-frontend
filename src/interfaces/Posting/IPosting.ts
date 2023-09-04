import { IDateFormat } from "./IDateFormat";

export interface IPosting {
  title: string,
  content: string,
  exhibition: string,
  number: number,
  openchat: string,
  what_do: string,
  dateTimeSlots: IDateFormat[],
  mainimg: string,
  subimg: string[]
}
