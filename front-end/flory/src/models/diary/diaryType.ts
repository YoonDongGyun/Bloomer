import { DiaryGardenType } from "./diaryGardenType";
import { DiaryFlowerType } from "./diaryFlowerType";
import { DiaryGroupType } from "./diaryGroupType";
import { DiaryCommentType } from "./diaryCommentType";

export type DiaryType = {
  id: number;
  content: string;
  imgSrc: string;
  lat: number;
  lng: number;
  publicStatus: string;
  x: number | string;
  y: number | string;
  z: number | string;
  address: string;
  createdTime: string;
  garden: DiaryGardenType | null;
  flowerEmotion: DiaryFlowerType;
  groupList: DiaryGroupType[] | null;
  musicTitle: string;
  commentList: DiaryCommentType[];
};
