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

export interface IGetPosting {
  idx?: number;
  writer?: any; // writer의 타입을 정확히 알면 해당 타입으로 지정
  writerIdx?: number;
  writerImg?: string;
  title: string;
  content: string;
  exhibiton: string;
  status?: string;
  number: number;
  openchat: string;
  view?: number;
  createdDate?: string;
  number_and_What: string[];
  mainimg: string;
  subimg: string[];
  time?: string;
  dateTime: string[];
  likeUsers?: any[]; // likeUsers의 타입을 정확히 알면 해당 타입으로 지정
}
