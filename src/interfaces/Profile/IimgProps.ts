export interface IimgProps {
  imgURL: string;
  isFirst: boolean;
  isEditMode: boolean;
  imgList: string[];
  setImgList: (value: string[]) => void;
}