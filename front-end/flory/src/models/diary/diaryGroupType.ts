import { UserType } from "../user/userType";
export type DiaryGroupType = {
  teamId: number;
  name: string;
  info: string;
  open: boolean;
  userTeamList: UserType[];
  createdDate: string;
  status: number;
};
