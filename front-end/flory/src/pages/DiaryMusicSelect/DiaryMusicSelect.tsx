import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import { SMain } from "./styles";
import AWS from "aws-sdk";
import DiaryMusicItem from "../../components/Diary/DiaryMusicItem/DiaryMusicItem";
import {
  createInfoSaveAction,
  getMusicInfoAction,
} from "../../redux/modules/diaryCreate";
import { musicUrlsDataSave } from "../../redux/modules/diaryCreate/diaryCreate-slice";
import Lottie from "react-lottie";
import animationData from "../../assets/imgs/lotties/music_vibe.json";
import AlertModal from "../../components/common/Modal/AlertModal/AlertModal";

const DiaryMusicSelect = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<any>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const initItem = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  };

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_S3_REGION,
  });
  const s3 = new AWS.S3();
  const [musicUrls, setMusicUrls] = useState<any>([]);
  const [musicData, setMusicData] = useState<any>(null);
  const [totalData, setTotalData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 이전 페이지에서 감정을 저장시켰음
  const emotion = useAppSelector(
    (state) => state.diaryCreate.currentEmotionData[0].largeCategory
  );
  // 유저 id
  const userId = useAppSelector((state) => state.user.userData.userId);

  // 텍스트 형태의 감정을 백엔드에 매칭된 인덱스로 바꿔주는 함수
  const changeTextToIndex = (string: string) => {
    if (string === "기쁨") return 0;
    else if (string === "안정") return 1;
    else if (string === "당황") return 2;
    else if (string === "분노") return 3;
    else if (string === "불안") return 4;
    else if (string === "상처") return 5;
    else if (string === "슬픔") return 6;
  };

  // 응답받은 음악 제목들을 순회하면서 s3의 url을 저장하는 함수
  const getMusicUrls = (musicArray: any) => {
    let test: any = [];

    musicArray.map((item: any) => {
      const params = {
        Bucket: "bloomer205",
        Key: `music/${item.title}.mp3`,
      };

      s3.getSignedUrlPromise("getObject", params)
        .then((url) => {
          test.push(url);

          // dispatch(musicUrlsDataSave(url));
        })
        .catch((err) => console.error(err))
        .finally(() => {
          dispatch(musicUrlsDataSave(test));
          setMusicUrls(test);
        });
    });
  };

  // 리덕스에 있는 뮤직 데이터 ({title: "제목"}) 형태
  const storeMusicData = useAppSelector(
    (state) => state.diaryCreate.currentMusicData
  );
  // 리덕스에 있는 뮤직 s3 url
  const storeMusicUrls = useAppSelector(
    (state) => state.diaryCreate.currentMusicUrls
  );

  // let totalMusicData = [];

  useEffect(() => {
    // 지배 감정을 보내서 음악 제목들 얻기
    if (!storeMusicData.length) {
      const emotionIndex = changeTextToIndex(emotion);
      const emotionData = { emotionIndex, userId };
      dispatch(getMusicInfoAction(emotionData)).then((res) => {
        // setMusicData(res.payload.response);
      });
    }

    // 음악 제목들이 리덕스에 저장되어있으면
    // 리덕스에 저장되어있는 음악 데이터를 통해 s3에 접근해서
    // url을 받은 후 url들을 리덕스에 저장하기
    if (storeMusicData.length) {
      getMusicUrls(storeMusicData);
    }

    // let test;
    // if (musicData !== null && !totalData.length) {
    //   getMusicUrls(musicData);
    //   if (musicData.length === 5 && musicUrls.length === 5) {

    //     const newItem = [];
    //     for (let i = 0; i < 5; i++) {
    //       const splitedTitle = musicData[i].title.split("-");
    //       const newTitle = splitedTitle
    //         .splice(0, splitedTitle.length - 1)
    //         .join(" ");

    //       newItem.push([newTitle, musicUrls[i]]);
    //     }

    //     setTotalData(newItem);
    //   }
    // }
  }, [dispatch, storeMusicData]);

  const handleItemClick = (key: string) => {
    setSelectedItems({ ...initItem, [key]: !selectedItems[key] });
  };

  const handleNavigate = () => {
    let musicId = null;
    const keys = Object.keys(selectedItems);
    for (let i = 0; i < keys.length; i++) {
      if (selectedItems[keys[i]] === true) {
        musicId = i;
      }
    }

    if (musicId !== null) {
      const musicTitle = { musicTitle: storeMusicData[musicId].title };
      dispatch(createInfoSaveAction(musicTitle)).then(() => {
        navigate("/garden/edit");
      });
    } else {
      handleOpen();
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <SMain>
        <div className="info__wrapper">
          <p>일기의 배경 음악을 선택해주세요.</p>
        </div>
        <Lottie
          style={{
            position: "absolute",
            top: "11rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            marginTop: "-50px",
          }}
          options={defaultOptions}
          height={75}
          width="130%"
          isClickToPauseDisabled={true}
          speed={0.6}
        />
        {storeMusicData.length > 0 &&
          storeMusicUrls.length > 0 &&
          storeMusicData.map((item: any, i: number) => {
            return (
              <DiaryMusicItem
                isSelected={selectedItems[i + 1]}
                musicTitle={item.title}
                musicUrl={storeMusicUrls[i]}
                onClick={() => handleItemClick(`${i + 1}`)}
              />
            );
          })}
        <div className="select__wrapper" onClick={handleNavigate}>
          <div className="background">
            <p className="select__p">선택</p>
          </div>
        </div>
        <Navbar absolute={true} />
      </SMain>
      <AlertModal
        open={open}
        handleClose={handleClose}
        content="음악을 선택해주세요."
      />
    </>
  );
};

export default DiaryMusicSelect;
