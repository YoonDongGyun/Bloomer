import { DiaryMemberType } from "./diaryMemberType";

export type DiaryGardenType = {
  id: number;
  deadLine: string;
  member: DiaryMemberType;
  musicTitle: string | null;
};
