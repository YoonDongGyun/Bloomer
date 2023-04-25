import React, { useEffect, useState, useRef } from "react";
import { SMain } from "./styles";
import DiaryList from "../../components/Diary/DiaryList/DiaryList";
import BasicTabs from "../../components/common/Tabs/BasicTabs";
import Navbar from "../../components/common/Navbar/Navbar";
import { getAllDiary, getDiaryWithMap } from "../../redux/modules/diary";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import CommunityMap from "../../components/Map/CommunityMap/CommunityMap";
import GroupEmotionPanel from "../../components/MyPage/GroupEmotionPanel/GroupEmotionPanel";
import { updateShowMusic } from "../../redux/modules/music/music-slice";
import ScrollToTopButton from "../../components/common/ScrollToTopButton/ScrollToTopButton";

let isInitial = true;

const Map = () => {
  const top = useRef<any>();
  const [isActive, setIsActive] = useState(false);

  const [bound, setBound] = useState<any>({
    lat1: "37.51369914424146",
    lng1: "127.0259808088334",
    lat2: "37.51189830901963",
    lng2: "127.03085648636002",
  });
  const allDiaryList = useAppSelector((store) => store.diary.allDiaryList);
  const mapDiaryList = useAppSelector((store) => store.diary.mapDiaryList);
  const userId = useAppSelector((store) => store.user.userData.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDiary());
  }, [dispatch]);

  useEffect(() => {
    const mapData = { ...bound, requestId: userId };
    dispatch(getDiaryWithMap(mapData));
  }, [bound]);

  // 내 주변 보기
  const mapPanel = (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <CommunityMap setBound={setBound} diaries={mapDiaryList} />
      </div>
      <div>
        <DiaryList DIARY_LIST={mapDiaryList} page="map" />
      </div>
    </div>
  );

  // 모든 감정 보기
  const allPanel = (
    <div>
      <div>
        <DiaryList DIARY_LIST={allDiaryList} page="map" />
      </div>
    </div>
  );

  // 그룹 감정 보기
  const groupPanel = <GroupEmotionPanel />;
  dispatch(updateShowMusic(false));
  return (
    <>
      <ScrollToTopButton target={top} active={isActive} />
      <div
        style={{ position: "relative", height: "100%", overflowY: "auto" }}
        onScroll={() => {
          if (top.current?.getBoundingClientRect().top < -400) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        }}
      >
        <SMain ref={top}>
          <div className="header">
            {/* <div className="inner-header flex"></div> */}
          </div>

          <div className="login__title">
            <h3>내 주변에 피어난 꽃</h3>
          </div>

          <BasicTabs
            tabs={[
              {
                label: "내 주변 보기",
                panel: mapPanel,
              },
              { label: "모든 감정 보기", panel: allPanel },
              {
                label: "그룹 감정 보기",
                panel: groupPanel,
              },
            ]}
          />

          <Navbar bottomZero={true} />
        </SMain>
      </div>
    </>
  );
};

export default Map;
