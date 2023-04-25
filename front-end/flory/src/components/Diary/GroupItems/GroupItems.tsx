import React, { useState, useEffect } from "react";
import { SSection } from "./styles";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "../../common/Avatar/Avatar";

const GroupItems = (props: any) => {
  const [checked, setChecked] = useState<boolean>(false);
  const groupData = props.props;

  const handleOnChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      props.setSelectedGroupIds([...props.selectedGroupIds, groupData.teamId]);
    } else {
      const items = props.selectedGroupIds;
      const filterdItems = items.filter(
        (item: any) => item !== groupData.teamId
      );
      props.setSelectedGroupIds([...filterdItems]);
    }
  }, [checked]);

  return (
    <SSection>
      <div className="group__wrapper">
        <p className="group__title">{groupData.name}</p>
        <Checkbox
          checked={checked}
          onChange={handleOnChange}
          color="secondary"
        />
      </div>
      <div className="member__wrapper">
        {groupData.userTeamList.map((item: any, i: number) => {
          if (i <= 4) {
            if (item.img.length <= 2) {
              return (
                <Avatar key={item.userId} size="small" imgIdx={item.img} />
              );
            } else {
              return <Avatar key={item.userId} size="small" src={item.img} />;
            }
          }
        })}
        <div className="member__count">
          <p className="member__rep">{groupData.userTeamList[0].nickname} </p>
          <p className="members">&nbsp;외 {groupData.userTeamList.length}명</p>
        </div>
      </div>
    </SSection>
  );
};

export default GroupItems;
