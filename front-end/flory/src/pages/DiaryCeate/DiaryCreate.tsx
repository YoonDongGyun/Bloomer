import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import CreateInput from "../../components/common/CreateInput/CreateInput";
import { SMain, SSection } from "./styles";
import useGeolocation from "react-hook-geolocation";

// mui
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import GroupTagWrapper from "../../components/Diary/GroupTagWrapper/GroupTagWrapper";
import Button from "../../components/common/Button/Button";
import BasicModal from "../../components/common/Modal/BasicModal/BasicModal";
import DiaryLocationModal from "../../components/Diary/DiaryLocationModal/DiaryLocationModal";

import { PlaceType } from "../../models/map/placeType";

import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import { createDiaryAction, getEmotionAction } from "../../redux/modules/diary";
import { useNavigate } from "react-router-dom";
import { createInfoSaveAction } from "../../redux/modules/diaryCreate";
import {
  emotionDataSave,
  imgDataSave,
} from "../../redux/modules/diaryCreate/diaryCreate-slice";
import GroupItems from "../../components/Diary/GroupItems/GroupItems";
import { getGroupInfoAction } from "../../redux/modules/group";
import {
  updateIsPlaying,
  updateMusicTitle,
  updateMusicUrl,
  updateShowMusic,
} from "../../redux/modules/music/music-slice";
import AlertModal from "../../components/common/Modal/AlertModal/AlertModal";

declare global {
  interface Window {
    kakao: any;
  }
}

const DiaryCreate = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupSetting, setGroupSetting] = useState("전체공개");
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [group, setGroup] = useState<any>(null);

  const navigate = useNavigate();

  const contentInput = useRef<HTMLInputElement>(null);

  const [selectedValue, setSelectedValue] = React.useState("a");

  // ============이미지 삽입 관련 변수=============
  const [selectedImg, setSelectedImg] = useState({
    image_file: "",
    preview_URL: "",
  });
  const fileInput = React.useRef<HTMLInputElement>(null);
  // =============현재 주소 관련 변수=============
  const geolocation = useGeolocation();
  let isGeolocation = geolocation.latitude != null;
  const [place, setPlace] = useState<PlaceType>({
    placeName: isGeolocation ? "" : "멀티캠퍼스 역삼",
    address: "",
    lng: isGeolocation ? geolocation.longitude : 128.5,
    lat: isGeolocation ? geolocation.latitude : 37.5,
  });

  let geocoder = new kakao.maps.services.Geocoder();

  function searchDetailAddrFromCoords(callback: any) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다

    geocoder.coord2Address(
      geolocation.longitude,
      geolocation.latitude,
      callback
    );
  }

  // dispatch(updateMusicTitle(""));
  // dispatch(updateMusicUrl(""));
  // dispatch(updateIsPlaying(false));

  dispatch(updateShowMusic(false));
  // 현재 위치 반환
  const getGeo = () => {
    if (isGeolocation) {
      searchDetailAddrFromCoords(function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          setPlace({
            placeName: "",
            address: detailAddr,
            lng: geolocation.longitude,
            lat: geolocation.latitude,
          });
        }
      });
    }
  };

  useEffect(() => {
    getGeo();

    if (group === null) {
      dispatch(getGroupInfoAction()).then((res) => {
        setGroup(res.payload.response);
      });
    }
  }, [geolocation]);

  const handleAddImg = (e: React.MouseEvent<SVGSVGElement>) => {
    fileInput.current!.click();
  };

  const handleImgChange = (e: any) => {
    const imgFile = e.target.files[0];

    let reader = new FileReader();
    if (imgFile) {
      reader.readAsDataURL(imgFile);
    }
    reader.onloadend = () => {
      const previewImgUrl = reader.result as string;
      if (previewImgUrl) {
        const previewImgUrlSub = previewImgUrl.toString();
        setSelectedImg({
          image_file: imgFile,
          preview_URL: previewImgUrlSub,
        });

        // 같은 이미지 올리면 변화 감지 안됨 => 초기화 필요
        e.target.value = "";
      }
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleDeletePreviewImg = () => {
    setSelectedImg({
      image_file: "",
      preview_URL: "",
    });
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  // 다이어리 생성
  const gardenId = useAppSelector((state) => state.garden.gardenData.gardenId);

  let gardenType = useAppSelector((state) => state.garden.gardenData.type);
  let setPositionX: number;
  let setPositionY: number;
  let setPositionZ: number;

  // 공원 테마인 경우
  if (gardenType === 0) {
    setPositionX = 0;
    setPositionY = 0;
    setPositionZ = 0;
  }
  // 캠프 테마인 경우
  else if (gardenType === 1) {
    setPositionX = 1;
    setPositionY = -0.1;
    setPositionZ = -0.5;
  }
  // 해변 테마인 경우
  else if (gardenType === 2) {
    setPositionX = -2.4;
    setPositionY = 0.5;
    setPositionZ = -2.4;
  }

  const onCreateDiary = () => {
    const groupList = selectedGroupIds.length ? selectedGroupIds : null;

    const diaryData = {
      content: contentInput.current?.value,
      // 이미지 수정해야 됨
      // imgSrc: selectedImg.preview_URL,
      lat: place.lat,
      lng: place.lng,
      // 그룹 설정 수정해야 됨
      publicStatus: groupSetting,
      // 전체 공개 아니면 그룹 리스트 배열 넣기
      groupList,
      fid: null,
      gid: gardenId,
      musicTitle: null,
      address: place.placeName ? place.placeName : place.address,
      x: setPositionX,
      y: setPositionY,
      z: setPositionZ,
    };

    if (!diaryData.content?.trim()) {
      handleOpen();
    } else {
      // 입력된 텍스트로 감정 분석하기
      dispatch(getEmotionAction(contentInput.current?.value))
        .then((res) => {
          // 분석된 감정과 꽃 정보 저장
          dispatch(emotionDataSave(res));
          // 꽃 선택 페이지로 가기 전에 현재 입력 상태 저장
          dispatch(createInfoSaveAction(diaryData));
          // 이미지 데이터 저장
          // dispatch(imgDataSave(selectedImg.image_file));
          localStorage.setItem("imgFile", selectedImg.preview_URL);
        })
        .then(() => {
          navigate("/diary/select");
        });
    }
  };

  const style: any = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffffff",
    boxShadow: 24,
    // p: 3,
  };

  return (
    <SMain>
      <SSection>
        {/* 전체 공개인 경우 height 60% 올리는 로직 추가하기! */}
        <CreateInput
          contentInput={contentInput}
          placeholder="어떤 일이 있었나요?"
          isTotal={
            groupSetting === "전체공개"
              ? true
              : groupSetting === "비공개"
              ? true
              : false
          }
        />
        <div className="input__wrapper">
          <button className="image__button">
            <FontAwesomeIcon
              className="image-input__icon"
              icon={faImage}
              onClick={handleAddImg}
            />
          </button>
          <input
            className="file__input"
            type="file"
            ref={fileInput}
            // 가능한 업로드 파일 형식 제한
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleImgChange}
          />
          {/* {selectedImg.preview_URL && (
            <img className="preview-image" src={selectedImg.preview_URL} />
          )} */}

          <BasicModal
            modalButton={
              <FormGroup>
                <FormControlLabel
                  control={
                    groupSetting === "전체공개" ? (
                      <Switch checked={true} />
                    ) : (
                      <Switch checked={false} />
                    )
                  }
                  label="전체 공개"
                />
              </FormGroup>
            }
          >
            <h3>공개 설정</h3>
            <div className="radio__wrapper">
              <p>전체 공개</p>
              <Radio
                {...controlProps("a")}
                onClick={() => {
                  setGroupSetting("전체공개");
                }}
                color={"secondary"}
              />
            </div>
            <div className="radio__wrapper">
              <p>그룹 공개</p>
              <Radio
                disabled={group !== null && group.length ? false : true}
                {...controlProps("b")}
                onClick={() => {
                  setGroupSetting("그룹공개");
                }}
                color={"secondary"}
              />
            </div>
            {group !== null &&
              groupSetting === "그룹공개" &&
              group.map((item: any) => {
                return (
                  <GroupItems
                    props={item}
                    selectedGroupIds={selectedGroupIds}
                    setSelectedGroupIds={setSelectedGroupIds}
                  />
                );
              })}
            <div className="radio__wrapper last__radio">
              <p>나만 보기</p>
              <Radio
                {...controlProps("c")}
                onClick={() => {
                  setGroupSetting("비공개");
                }}
                color={"secondary"}
              />
            </div>
          </BasicModal>
        </div>
        <div className="preview-image__wrapper">
          {selectedImg.preview_URL && (
            <>
              <img
                className="preview-image"
                alt="미리보기"
                src={selectedImg.preview_URL}
              />
              <FontAwesomeIcon
                className="cancleBtn"
                icon={faXmark}
                onClick={handleDeletePreviewImg}
              />
            </>
          )}
        </div>
        {/* 많아졌을 때 문제있음. API 연결하고 수정해야 됨 */}
        {/* 그룹 태그 */}
        {groupSetting === "그룹공개" && <GroupTagWrapper groupList={group} />}
        <div className="location__wrapper">
          <div>기록 위치</div>
          <div className="location">
            {place.placeName ? place.placeName : place.address}
            <DiaryLocationModal place={place} setPlace={setPlace} />
          </div>
        </div>
      </SSection>
      <div className="bottom__wrapper">
        <Button
          onClick={onCreateDiary}
          contents="기록 완료"
          addStyle={{
            width: "90%",
            // margin: "2rem  0",
            height: "25%",
            background1: "rgb(244,175,255)",
            background2:
              "linear-gradient(90deg, rgba(244,175,255,1) 0%, rgba(156,147,221,1) 58%, rgba(150,119,210,1) 100%)",
            borderRadius: "16px",
            color: "#ffffff",
            fontSize: "1rem",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 2px 8px, rgba(0, 0, 0, 0.25) 0px 2px 8px",
          }}
        />
      </div>
      <Navbar absolute={true} />
      <AlertModal
        open={open}
        handleClose={handleClose}
        content={"일기를 작성해주세요."}
      />
    </SMain>
  );
};

export default DiaryCreate;
