import { ReduxStateType } from "../reduxStateType";
import { GroupType } from "./GroupType";

export type GroupStateType = {
  // 수정 해야 됨....
  userGroupList: any[];
  groupCheckList: any[];
  group: ReduxStateType;
};
