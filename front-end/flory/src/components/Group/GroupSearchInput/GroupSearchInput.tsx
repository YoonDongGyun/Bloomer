import React, { useEffect, useRef, useState } from "react";
import { getAllGroupByKeywordAction } from "../../../redux/modules/group";
import { useAppDispatch } from "../../../redux/store.hooks";
import MapSearchInput from "../../Map/MapSearchInput/MapSearchInput";

const GroupSearchInput = ({ setUnJoinGroups }: any) => {
  const dispatch = useAppDispatch();
  const groupKeyword = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const fetchData = async () => {
      const res = await dispatch(
        getAllGroupByKeywordAction(groupKeyword.current!.value)
      );
      const filtered = res.payload.filter((item: any) => {
        return item.status !== 1;
      });
      setUnJoinGroups(filtered);
    };
    fetchData();
  };

  return (
    <div>
      <MapSearchInput
        handleClick={handleClick}
        page="group"
        groupKeyword={groupKeyword}
      />
    </div>
  );
};

export default GroupSearchInput;
