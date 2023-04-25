import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import DiaryList from "../../Diary/DiaryList/DiaryList";
import MapFilterModal from "../../Map/MapFilterModal/MapFilterModal";
import React, { useEffect, useState, useRef } from "react";
import { getGroupInfoAction } from "../../../redux/modules/group";
import { getDiaryWithGroup } from "../../../redux/modules/diary";

const GroupEmotionPanel = ({}: any): JSX.Element => {
  const dispatch = useAppDispatch();

  const groupDiaryList = useAppSelector((store) => store.diary.groupDiaryList);
  const userGroupList = useAppSelector((state) => state.group.userGroupList);

  useEffect(() => {
    dispatch(getGroupInfoAction()).then((data: any) => {
      let lst = [];
      for (let i of data.payload.response) {
        lst.push(i.teamId);
      }
      const groupData = {
        teamIdList: lst,
      };
      dispatch(getDiaryWithGroup(groupData));
    });
  }, [dispatch]);
  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <MapFilterModal />
        </div>
        <DiaryList DIARY_LIST={groupDiaryList} page="map" />
      </div>
    </div>
  );
};

export default GroupEmotionPanel;
