import { Checkbox, IconButton } from "@mui/material";
import { useState } from "react";
import { GroupType } from "../../../models/Group/GroupType";
import { getDiaryWithGroup } from "../../../redux/modules/diary";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import Button from "../../common/Button/Button";
import BasicModal from "../../common/Modal/BasicModal/BasicModal";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faUserGroup,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { groupActions } from "../../../redux/modules/group/group-slice";
const MapFilterModal = ({ teamIdList }: any): JSX.Element => {
  const groupCheckList = useAppSelector((state) => state.group.groupCheckList);
  const dispatch = useAppDispatch();
  // 체크 관리
  const handleCheck = (idx: number) => {
    dispatch(groupActions.check({ idx: idx }));
  };

  const dispatchAction = async () => {
    let lst = [];
    for (let i of groupCheckList) {
      if (i.check) {
        lst.push(i.teamId);
      }
    }
    const groupData = {
      teamIdList: lst,
    };
    await dispatch(getDiaryWithGroup(groupData));
    return true;
  };

  return (
    <BasicModal
      modalButton={
        <IconButton size="small">
          <FontAwesomeIcon icon={faUserGroup} style={{ color: "#612fab" }} />
        </IconButton>
      }
      dispatchAction={dispatchAction}
    >
      <h3>그룹 선택</h3>
      <div style={{ width: "100%", margin: "1rem 0 1rem" }}>
        {groupCheckList && groupCheckList.length !== 0 ? (
          groupCheckList.map((group: any, idx: number) => (
            <div
              key={idx}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="radio__wrapper">
                {group.name}

                <FontAwesomeIcon
                  className={group.check ? "active" : "disabled"}
                  icon={faSquareCheck}
                  onClick={() => {
                    handleCheck(group.teamId);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            🌻 새로운 그룹에 가입해보세요 🌻
          </div>
        )}
      </div>
    </BasicModal>
  );
};
export default MapFilterModal;
