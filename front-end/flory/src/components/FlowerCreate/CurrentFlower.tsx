import React from "react";
import { useAppSelector } from "../../redux/store.hooks";
import F01Create from "./F01Create";
import F02Create from "./F02Create";
import F03Create from "./F03Create";
import F04Create from "./F04Create";
import F05Create from "./F05Create";
import F06Create from "./F06Create";
import F07Create from "./F07Create";
import F08Create from "./F08Create";
import F09Create from "./F09Create";
import F10Create from "./F10Create";
import F11Create from "./F11Create";
import F12Create from "./F12Create";
import F13Create from "./F13Create";
import F14Create from "./F14Create";
import F15Create from "./F15Create";
import F16Create from "./F16Create";
import F17Create from "./F17Create";
import F18Create from "./F18Create";
import F19Create from "./F19Create";
import F20Create from "./F20Create";
import F21Create from "./F21Create";
import F22Create from "./F22Create";
import F23Create from "./F23Create";
import F24Create from "./F24Create";
import F25Create from "./F25Create";

const CurrentFlower: any = () => {
  const currentCreateDiaryData = useAppSelector(
    (state) => state.diaryCreate.diaryCreateData
  );
  if (currentCreateDiaryData.fid === 1) {
    return <F01Create />;
  } else if (currentCreateDiaryData.fid === 2) {
    return <F02Create />;
  } else if (currentCreateDiaryData.fid === 3) {
    return <F03Create />;
  } else if (currentCreateDiaryData.fid === 4) {
    return <F04Create />;
  } else if (currentCreateDiaryData.fid === 5) {
    return <F05Create />;
  } else if (currentCreateDiaryData.fid === 6) {
    return <F06Create />;
  } else if (currentCreateDiaryData.fid === 7) {
    return <F07Create />;
  } else if (currentCreateDiaryData.fid === 8) {
    return <F08Create />;
  } else if (currentCreateDiaryData.fid === 9) {
    return <F09Create />;
  } else if (currentCreateDiaryData.fid === 10) {
    return <F10Create />;
  } else if (currentCreateDiaryData.fid === 11) {
    return <F11Create />;
  } else if (currentCreateDiaryData.fid === 12) {
    return <F12Create />;
  } else if (currentCreateDiaryData.fid === 13) {
    return <F13Create />;
  } else if (currentCreateDiaryData.fid === 14) {
    return <F14Create />;
  } else if (currentCreateDiaryData.fid === 15) {
    return <F15Create />;
  } else if (currentCreateDiaryData.fid === 16) {
    return <F16Create />;
  } else if (currentCreateDiaryData.fid === 17) {
    return <F17Create />;
  } else if (currentCreateDiaryData.fid === 18) {
    return <F18Create />;
  } else if (currentCreateDiaryData.fid === 19) {
    return <F19Create />;
  } else if (currentCreateDiaryData.fid === 20) {
    return <F20Create />;
  } else if (currentCreateDiaryData.fid === 21) {
    return <F21Create />;
  } else if (currentCreateDiaryData.fid === 22) {
    return <F22Create />;
  } else if (currentCreateDiaryData.fid === 23) {
    return <F23Create />;
  } else if (currentCreateDiaryData.fid === 24) {
    return <F24Create />;
  } else if (currentCreateDiaryData.fid === 25) {
    return <F25Create />;
  }
};

export default React.memo(CurrentFlower);
