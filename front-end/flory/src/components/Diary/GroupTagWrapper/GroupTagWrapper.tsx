import React from "react";
import GroupTag from "../GroupTag/GroupTag";
import { SWrapper } from "./styles";

const GroupTagWrapper = (props: any) => {
  const groupList = props.groupList;

  return (
    <SWrapper>
      {groupList !== null &&
        groupList.map((item: any) => <GroupTag item={item.name} />)}
    </SWrapper>
  );
};

export default GroupTagWrapper;
