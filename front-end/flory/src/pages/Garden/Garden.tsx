import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";

import ToggleButton from "../../components/common/ToggleButton/ToggleButton";
import Navbar from "../../components/common/Navbar/Navbar";
import { SMain } from "./styles";

// import Base_map_new from "../../components/Garden/Park/Park_map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintRoller, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import { getDiaryListAction } from "../../redux/modules/diary";
import Beach_map from "../../components/Garden/Beach/Beach_map";
import Camp_map from "../../components/Garden/Camp/Camp_map";
import Park_map from "../../components/Garden/Park/Park_map";
import { getMusicAction } from "../../redux/modules/music";
import {
  checkDetail,
  updateMusicTitle,
  updateMusicUrl,
  updateShowMusic,
} from "../../redux/modules/music/music-slice";
import Swal from "sweetalert2";

type RN = {
  postMessage(msg: string): void;
};
declare global {
  interface Window {
    ReactNativeWebView: RN;
  }
}

let isInitial = true;
let screenshotData: any;

const gardenTypeMap = (type: number | null) => {
  if (type === 0) return <Park_map page="self" />;
  else if (type === 1) return <Camp_map page="self" />;
  else if (type === 2) return <Beach_map page="self" />;
};
const Scene = (gardenType: any) => {
  const gl = useThree((state) => state.gl);
  const nickname = useAppSelector((state) => state.user.userData.nickname);

  useControls({
    screenshot: button(() => {
      screenshotData = gl.domElement.toDataURL();

      const link = document.createElement("a");
      link.setAttribute("download", `${nickname}'s bloomer.png`);
      link.setAttribute(
        "href",
        gl.domElement.toDataURL("image/png")
        // .replace("image/png", "image/octet-stream")
      );

      Swal.fire({
        text: `이미지를 저장하시겠습니까?`,
        imageUrl: screenshotData,
        imageWidth: "80%",
        width: 350,
        confirmButtonText: "저장",
        showCloseButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          link.click();

          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "download",
                data: screenshotData,
              })
            );
          }
        }
      });
    }),
  });

  return (
    <>
      {/* <Loader /> */}
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={0.4} />
        {gardenTypeMap(gardenType.gardenType)}
      </Suspense>
      {/* REPLACE THIS LIGHT AS NEEDED IT'S A GOOD START */}
    </>
  );
};

const Garden = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const gardenData = useAppSelector((state) => state.garden.gardenData);
  const garden = useAppSelector((store) => store.garden);
  const locationData = location.state !== null ? location.state : null;
  const gardenType = useAppSelector((state) =>
    locationData !== null ? locationData.type : state.garden.gardenData.type
  );

  // 보고 싶은 정원 ID
  const gardenId =
    locationData !== null && locationData.gid !== null
      ? locationData.gid
      : garden.gardenData.gardenId;
  // 본인 ID
  const requestId = useAppSelector((state) => state.user.userData.userId);
  const user = useAppSelector((state) => state.user);

  const handleMoveToGuestBook = () => {
    navigate("/guestbook", {
      state: {
        gardenData,
      },
    });
  };

  // Function to capture the canvas contents

  // useEffect(() => {
  //   const inputData = {
  //     gardenId:
  //       locationData !== null && locationData.gid !== null
  //         ? locationData.gid
  //         : garden.gardenData.gardenId,
  //     requestId,
  //   };

  //   if (gardenId) {
  //     dispatch(getDiaryListAction(inputData));
  //   }
  // }, [gardenId, dispatch, user, garden]);

  const music = useAppSelector((state) => state.music);

  useEffect(() => {
    if (gardenData.musicTitle !== music.musicTitle || !music.musicUrl) {
      dispatch(updateMusicTitle(gardenData.musicTitle));
      if (gardenData.musicTitle) {
        getMusicAction(gardenData.musicTitle).then((url) => {
          if (typeof url !== "object") {
            dispatch(updateMusicUrl(url));
          }
          // setMusicUrl(url);
        });
      }
    }
  }, [garden, music]);

  dispatch(updateShowMusic(true));
  dispatch(checkDetail(false));
  return (
    <SMain gardenType={gardenType}>
      {locationData !== null && (
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "10",
            color: "white",
          }}
        >
          {locationData.year}/{locationData.month}
        </div>
      )}
      <ToggleButton gardenType={gardenType} />

      <Canvas
        shadows={true}
        // ref={canvasRef}
        gl={{ preserveDrawingBuffer: true }}
      >
        {/* <Sparkles
          count={15}
          size={40}
          position={[0, 1.5, 0]}
          scale={8}
          speed={1}
        /> */}
        {/* REMOVE ORBIT CONTROLS TO FORCE THE CAMERA VIEW */}
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={30}
          maxZoom={200}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene gardenType={gardenType}></Scene>
      </Canvas>

      {/* 이용안내 이동 버튼 */}
      <button onClick={() => navigate("/info")} className="moveToInfo">
        <FontAwesomeIcon icon={faQuestion} />
      </button>
      {/* 정원 편집 모드 버튼 */}
      {locationData === null && (
        <button
          onClick={() =>
            navigate("/garden/edit", {
              state: {
                garden: true,
              },
            })
          }
          className="moveToEdit"
        >
          <FontAwesomeIcon icon={faPaintRoller} />
        </button>
      )}
      {/* 네브바 */}
      <Navbar absolute={true} />
    </SMain>
  );
};

export default Garden;
