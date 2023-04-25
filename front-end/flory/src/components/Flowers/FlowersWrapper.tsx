import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JsxElement } from "typescript";
import { positionUpdate } from "../../redux/modules/diary/diary-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import F01Create from "../FlowerCreate/F01Create";
import F01 from "./F01"; // 크로커스
import F02 from "./F02"; // 은방울꽃
import F03 from "./F03"; // 빨강 튤립
import F04 from "./F04"; // 칼랑코에
import F05 from "./F05"; // 분홍 장미
import F06 from "./F06"; // 쑥국화
import F07 from "./F07"; // 뱀무
import F08 from "./F08"; // 잉글리쉬데이지
import F09 from "./F09"; // 함박꽃
import F10 from "./F10"; // 무스카리
import F11 from "./F11"; // 흑종초
import F12 from "./F12"; // 해당화
import F13 from "./F13"; // 봉선화
import F14 from "./F14"; // 노란 장미
import F15 from "./F15"; // 풍접초
import F16 from "./F16"; // 매발톱꽃
import F17 from "./F17"; // 빨강 매발톱꽃
import F18 from "./F18"; // 아네모네
import F19 from "./F19"; // 콜레우스
import F20 from "./F20"; // 시네라리아
import F21 from "./F21"; // 알리움
import F22 from "./F22"; // 찔레꽃
import F23 from "./F23"; // 노란 카네이션
import F24 from "./F24"; // 층꽃나무
import F25 from "./F25"; // 제라늄
import { getGroupInfoAction } from "../../redux/modules/group";
import { getDiaryListAction } from "../../redux/modules/diary";

const FlowersWrapper = ({
  page,
  otherUserId,
}: {
  page?: string;
  otherUserId?: number;
}) => {
  const diary = useAppSelector((state) => state.diary);
  const group = useAppSelector((state) => state.group);
  const [currentDiary, setCurrentDiary] = useState<any>([]);
  const [currentGroupList, setCurrentGroupList] = useState<any>([]);
  const userId = useAppSelector((state) => state.user.userData.userId);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const checkCanView = (status: string) => {
    if (page === "self") {
      return true;
    }
    if (status === "비공개") {
      return false;
    } else if (status === "그룹공개") {
      for (const teamList of currentGroupList) {
        for (const team of teamList.userTeamList) {
          if (userId === team.userId) {
            return true;
          }
        }
      }
      return false;
    } else {
      return true;
    }
  };

  const handleMoveToDetail = (diaryId: number, status: string) => {
    const canView = checkCanView(status);

    if (canView) {
      navigate(`/diary/${diaryId}`, {
        state: {
          page: page === "self" ? "/garden" : `/garden/${otherUserId}`,
        },
      });
    }
  };

  useEffect(() => {
    dispatch(getGroupInfoAction());
  }, []);

  const otherGardenData = useAppSelector((state) => state.garden);
  // 보고싶은 정원 ID
  const gardenId =
    page === "other"
      ? otherGardenData.otherGardenData.gardenId
      : otherGardenData.gardenData.gardenId;
  // 보고싶은 user ID
  const requestId =
    page === "other" ? parseInt(location.pathname.slice(8)) : userId;
  useEffect(() => {
    const inputData = {
      gardenId,
      requestId,
    };

    if (gardenId) {
      dispatch(getDiaryListAction(inputData));
    }
  }, [gardenId, dispatch, otherGardenData]);

  useEffect(() => {
    setCurrentDiary(diary.diaryData);
  }, [diary, otherGardenData]);

  useEffect(() => {
    setCurrentGroupList(group.userGroupList);
  }, [group]);

  return (
    <>
      <Suspense fallback={null}>
        {/* 작성 완료된 일기들의 꽃 */}
        {currentDiary.length &&
          currentDiary.map((item: any) => {
            if (item.flowerEmotion.flowerName === "크로커스") {
              return (
                <F01
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "은방울꽃") {
              return (
                <F02
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "빨강 튤립") {
              return (
                <F03
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "칼랑코에") {
              return (
                <F04
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "분홍 장미") {
              return (
                <F05
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "쑥국화") {
              return (
                <F06
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "뱀무") {
              return (
                <F07
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "잉글리쉬데이지") {
              return (
                <F08
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "함박꽃") {
              return (
                <F09
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "무스카리") {
              return (
                <F10
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "흑종초") {
              return (
                <F11
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "해당화") {
              return (
                <F12
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "봉선화") {
              return (
                <F13
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "노란 장미") {
              return (
                <F14
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "풍접초") {
              return (
                <F15
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "매발톱꽃") {
              return (
                <F16
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "빨강 매발톱꽃") {
              return (
                <F17
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "아네모네") {
              return (
                <F18
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "콜레우스") {
              return (
                <F19
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "시네라리아") {
              return (
                <F20
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "알리움") {
              return (
                <F21
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "찔레꽃") {
              return (
                <F22
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "노란 카네이션") {
              return (
                <F23
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "층꽃나무") {
              return (
                <F24
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            } else if (item.flowerEmotion.flowerName === "제라늄") {
              return (
                <F25
                  diaryId={item.id}
                  page={page}
                  flowerPosition={{ x: +item.x, z: +item.z, y: +item.y }}
                  onClick={() => {
                    if (!location.pathname.includes("garden/edit")) {
                      handleMoveToDetail(item.id, item.publicStatus);
                    }
                  }}
                />
              );
            }
          })}
      </Suspense>
    </>
  );
};

export default React.memo(FlowersWrapper);
