import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SMain } from "./styles";

import Base_map_new from "../../components/Garden/Park/Park_map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
// import Base_map_new_edit from "../../components/Garden/Park/Park_map_edit";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import {
  createDiaryAction,
  getDiaryListAction,
  updatePositionAction,
} from "../../redux/modules/diary";
import Beach_map_edit from "../../components/Garden/Beach/Beach_map_edit";
import Camp_map_edit from "../../components/Garden/Camp/Camp_map_edit";
import Park_map_edit from "../../components/Garden/Park/Park_map_edit";
import Loading from "../Loading/Loading";
import { dataReset } from "../../redux/modules/diaryCreate/diaryCreate-slice";
import DiaryMusicButton from "../../components/Diary/DiaryMusicButton.tsx/DiaryMusicButton";
// import Base_map_new_test from "../../components/Garden/Base_map_new_test";
import { getMusicAction } from "../../redux/modules/music";
import {
  updateMusicTitle,
  updateMusicUrl,
  updateShowMusic,
} from "../../redux/modules/music/music-slice";

const gardenTypeMap = (type: number | null) => {
  if (type === 0) return <Park_map_edit />;
  else if (type === 1) return <Camp_map_edit />;
  else if (type === 2) return <Beach_map_edit />;
};

const Scene = () => {
  const gardenType = useAppSelector((state) => state.garden.gardenData.type);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={0.4} />
        {gardenTypeMap(gardenType)}
      </Suspense>
      {/* REPLACE THIS LIGHT AS NEEDED IT'S A GOOD START */}
    </>
  );
};

const GardenEdit = () => {
  // 현재 작성 중인 일기 데이터
  const currentCreateDiaryData = useAppSelector(
    (state) => state.diaryCreate.diaryCreateData
  );

  const gardenType = useAppSelector((state) => state.garden.gardenData.type);

  // 디버깅용
  // console.log(currentCreateDiaryData);

  const location = useLocation();
  // 일기 작성 flow 중 정원 편집 모드로 온 것이 아닌
  // 메인 화면에서 정원 편집모드로 온 것을 판별하기 위한 변수
  const fromGarden = location.state?.garden;

  const canvasRef = useRef<any>();
  const navigate = useNavigate();
  const diaryData = useAppSelector((state) => state.diary.diaryData);
  const dispatch = useAppDispatch();
  const requestId = useAppSelector((state) => state.user.userData.userId);
  const gardenId = currentCreateDiaryData.gid;

  function base64toFile(base_data: any, filename: any) {
    var arr = base_data.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  dispatch(updateShowMusic(true));
  const musicTitle = useAppSelector((store) => store.music.musicTitle);
  const [musicUrl, setMusicUrl] = useState<any>("");
  useEffect(() => {
    if (
      !fromGarden &&
      currentCreateDiaryData.musicTitle &&
      currentCreateDiaryData.musicTitle !== musicTitle
    ) {
      dispatch(updateMusicTitle(currentCreateDiaryData.musicTitle));
      getMusicAction(currentCreateDiaryData.musicTitle).then((url) => {
        dispatch(updateMusicUrl(url));
        setMusicUrl(url);
      });
    }
  }, []);

  const handlePositionUpdate = () => {
    // 가든에서 왔으면 꽃 움직이게만 하기
    if (fromGarden) {
      dispatch(updatePositionAction(diaryData)).then(() => navigate("/garden"));
      // 일기 작성 flow에서 왔으면 일기 저장 로직 수행
    } else {
      dispatch(updatePositionAction(diaryData))
        .then(async () => {
          const base64String: string | null = localStorage.getItem("imgFile");

          let imgFile = null;
          if (base64String) {
            const file = base64toFile(base64String, "image_file.png");
            const form_data = new FormData();
            form_data.append("file", file);

            imgFile = form_data.get("file");
          }

          await dispatch(
            createDiaryAction({
              diaryData: currentCreateDiaryData,
              imgFile,
            })
          );
          dispatch(dataReset());
        })
        .then(async () => {
          localStorage.removeItem("imgFile");
          const inputData = {
            gardenId,
            requestId,
          };
          await dispatch(getDiaryListAction(inputData));
          navigate("/garden");
        });
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <SMain gardenType={gardenType}>
      <div
        style={{
          position: "absolute",
          color: "black",
          fontSize: "0.7rem",
          top: "2rem",
          zIndex: "100",
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        💡 위치 변경 Tip. 꽃을 누르고 옮기고 싶은 위치를 클릭해 보세요
      </div>
      {!fromGarden && <DiaryMusicButton musicUrl={musicUrl} />}
      <Canvas shadows={true} ref={canvasRef}>
        {/* REMOVE ORBIT CONTROLS TO FORCE THE CAMERA VIEW */}
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={30}
          maxZoom={200}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene></Scene>
      </Canvas>
      <div className="info__wrapper">
        <div className="background" onClick={handlePositionUpdate}>
          <p>완료</p>
        </div>
      </div>
    </SMain>
  );
};

export default GardenEdit;
