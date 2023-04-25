import { UserType } from "../user/userType";
export type DiaryCommentType = {
  id: number;
  did: number | null;
  content: string;
  createdTime: string;
  member: UserType;
};
