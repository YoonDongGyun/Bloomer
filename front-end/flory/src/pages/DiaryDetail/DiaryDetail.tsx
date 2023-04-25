import { useLocation, useNavigate, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../assets/imgs/lotties/84142-gradient-background.json";
import StaticMap from "../../components/Map/StaticMap/StaticMap";
import {
  faLocationDot,
  faLock,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import DiaryFlower from "../../components/Diary/DiaryFlower/DiaryFlower";
import { SMain } from "./styles";
import { borderRadius } from "@mui/system";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/common/Avatar/Avatar";
import DiaryComment from "../../components/Diary/DiaryComment/DiaryComment";
import BackButton from "../../components/common/BackButton/BackButton";
import CreateInput from "../../components/common/CreateInput/CreateInput";
import CommentInput from "../../components/common/CommentInput/CommentInput";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import {
  createCommentAction,
  deleteDiaryAction,
  getDetailDiary,
} from "../../redux/modules/diary";
import { DiaryType } from "../../models/diary/diaryType";
import SettingPopover from "../../components/common/SettingPopover/SettingPopover";
import {
  convertDateTimeFormat,
  convertEmotionFormat,
  convertMusicFormat,
} from "../../utils/utils";
import BasicModal from "../../components/common/Modal/BasicModal/BasicModal";
import { FormControlLabel, FormGroup, Radio } from "@mui/material";
import GroupItems from "../../components/Diary/GroupItems/GroupItems";
import { getGroupInfoAction } from "../../redux/modules/group";
import Navbar from "../../components/common/Navbar/Navbar";
import AWS from "aws-sdk";
import DiaryMusicItem from "../../components/Diary/DiaryMusicItem/DiaryMusicItem";
import DiaryMusicButton from "../../components/Diary/DiaryMusicButton.tsx/DiaryMusicButton";
import { getMusicAction } from "../../redux/modules/music";
import {
  checkDetail,
  updateMusicTitle,
  updateMusicUrl,
  updateShowMusic,
} from "../../redux/modules/music/music-slice";
import AlertModal from "../../components/common/Modal/AlertModal/AlertModal";

let isInitial = true;
const DiaryDetail = () => {
  // 정원에서 해당 꽃을 누르면 이 페이지(일기 상세)로 이동하며
  // useNavigate로 일기의 id를 전달한다.
  // 이 페이지에서는 useLocation을 통해 전달된 데이터를 받는다.
  const location = useLocation();
  const diaryId = Number(location.pathname.slice(7));
  const backpage = location.state ? location.state.page : null;

  const initialDiary: DiaryType = {
    id: 0,
    content: "",
    imgSrc: "",
    lat: 0,
    lng: 0,
    publicStatus: "",
    x: 0,
    y: 0,
    z: 0,
    address: "",
    createdTime: "",
    garden: null,
    flowerEmotion: {
      fid: 0,
      eid: 0,
      flowerName: "",
      language: "",
      largeCategory: "",
      smallCategory: "",
    },
    groupList: [],
    musicTitle: "",
    commentList: [],
  };
  const [diary, setDiary] = useState<DiaryType>(initialDiary);
  const userId = useAppSelector((state) => state.user.userData.userId);
  const navigate = useNavigate();
  const commentInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [mapView, setMapView] = useState<boolean>(false);

  // 그룹 수정 관련
  const [groupSetting, setGroupSetting] = useState(diary.publicStatus);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [group, setGroup] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let isSelf = false;
  if (diary !== initialDiary) {
    if (diary.garden?.member.userId === userId) {
      isSelf = true;
    }
  }

  const onClickLocation = () => {
    setMapView(!mapView);
  };

  const handleGoBack = () => {
    // 뒤로가기
    // navigate(-1);
    if (backpage) {
      navigate(backpage);
    } else {
      navigate(-1);
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

  const createCommentHandler = () => {
    if (commentInput.current?.value) {
      const commentData = {
        content: commentInput.current?.value,
        uid: userId,
        did: diary.id,
      };
      dispatch(createCommentAction(commentData)).then(() => {
        dispatch(getDetailDiary(diaryId)).then((data: any) => {
          setDiary(data.payload.response);
        });
        if (commentInput.current) {
          commentInput.current.value = "";
        }
      });
    }
  };

  const deleteAction = async () => {
    handleOpen();
  };

  const deleteDiary = async () => {
    await dispatch(deleteDiaryAction(diaryId));
    navigate("/garden");
  };

  const editAction = () => {};

  const updateDiary = () => {
    dispatch(getDetailDiary(diaryId)).then((data: any) => {
      setDiary(data.payload.response);
    });
  };

  useEffect(() => {
    setGroupSetting(diary.publicStatus);
  }, [diary]);

  // 이미지 관련
  let imgSrc;

  // tmpsrc : 클라이언트에서 바로 가져오는 이미지src
  // src : s3에서 불러오는 이미지 키값

  // s3 bucket 이미지 읽어오기
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(""); //실제 이미지

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_S3_REGION,
  });

  useEffect(() => {
    if (diary.imgSrc) {
      const params = {
        Bucket: "bloomer205",
        Key: `${diary.imgSrc}`,
      };
      s3.getSignedUrlPromise("getObject", params)
        .then((url) => setImageUrl(url))
        .catch((err) => console.error(err));
    }
  }, [diary.imgSrc]);

  imgSrc = imageUrl;

  // 음악 관련
  const music = useAppSelector((store) => store.music);
  // const [musicUrl, setMusicUrl] = useState<any>("");
  useEffect(() => {
    if (diary.musicTitle && diary.musicTitle !== music.musicTitle) {
      dispatch(updateMusicTitle(diary.musicTitle));
      getMusicAction(diary.musicTitle).then((url) => {
        dispatch(updateMusicUrl(url));
        // setMusicUrl(url);
      });
    }
  }, [diary.musicTitle]);

  // \n 인식시키기
  const convertNewLineToBreak = (str: string) => {
    return str.split("\n").map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    if (diary === initialDiary) {
      // isInitial = false;
      updateDiary();
    }

    if (group === null) {
      dispatch(getGroupInfoAction()).then((res) => {
        setGroup(res.payload.response);
      });
    }
  }, []);

  dispatch(updateShowMusic(true));
  dispatch(checkDetail(true));

  return (
    <>
      <SMain>
        {/* 헤더 영역 */}

        <div className="header_back">
          <div className="music_tag">
            <FontAwesomeIcon icon={faMusic} />
            <p>{convertMusicFormat(diary.musicTitle)}</p>
          </div>
          <div className="header-circle"></div>
          <Lottie
            style={{ position: "absolute", zIndex: -3 }}
            options={defaultOptions}
            height={200}
            width="100%"
          />
        </div>
        <DiaryFlower flower={diary.flowerEmotion} />
        <div className="header"></div>
        {/* 뒤로 가기 아이콘 */}
        <BackButton color="white" onClickAction={handleGoBack} />
        {/* 음악 아이콘 */}
        {/* <DiaryMusicButton musicUrl={musicUrl} /> */}

        <div className="content-box">
          {isSelf && diary && (
            <div
              className="setting"
              style={{
                marginLeft: "auto",
                width: "34px",
                position: "absolute",
                top: "235px",
              }}
            >
              <SettingPopover
                color="black"
                deleteAction={deleteAction}
                editAction={editAction}
                group={group}
                groupSetting={groupSetting}
                setGroupSetting={setGroupSetting}
                selectedGroupIds={selectedGroupIds}
                setSelectedGroupIds={setSelectedGroupIds}
                diary={diary}
                updateDiary={updateDiary}
              />
            </div>
          )}
          <div className="flower-title">
            {diary.flowerEmotion.flowerName} - {diary.flowerEmotion.language}
          </div>
          {/* 본인 글일 때 수정 삭제 하는 부분 */}

          {/* 다이어리 내용 영역 */}
          <h3
            className="nickname__active"
            onClick={() => {
              !isSelf && navigate(`/garden/${diary.garden?.member.userId}`);
            }}
          >
            {diary.garden?.member.nickname}
          </h3>
          <div className="content-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {diary.publicStatus !== "전체공개" && (
                <FontAwesomeIcon
                  icon={faLock}
                  style={{
                    color: "#8a8a8a",
                    height: "1rem",
                    marginRight: "10px",
                  }}
                />
              )}
              <h2>
                {convertEmotionFormat(diary.flowerEmotion.largeCategory)} 순간
              </h2>
            </div>
            <p>{convertDateTimeFormat(diary.createdTime)}</p>
          </div>
          {imgSrc && (
            <img className="diary-img" src={imgSrc} alt="img-loading,," />
          )}
          <div className="content-diary">
            {convertNewLineToBreak(diary.content)}
          </div>

          {/* 지도 영역 */}
          <div className="location-tag" onClick={onClickLocation}>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{diary.address}</p>
          </div>
          {mapView && (
            <div style={{ marginBottom: "15px" }}>
              <StaticMap
                lng={diary.lng}
                lat={diary.lat}
                fid={diary.flowerEmotion.fid}
              />
            </div>
          )}

          {/* 덧글 영역 */}
          <CommentInput
            contentInput={commentInput}
            placeholder="덧글을 입력해주세요"
            createCommentHandler={createCommentHandler}
          />
          {diary.commentList &&
            diary.commentList.map((comment: any, idx: number) => {
              return (
                <DiaryComment
                  comment={comment}
                  key={idx}
                  updateDiary={updateDiary}
                />
              );
            })}
        </div>
        <Navbar />
      </SMain>
      <div>
        <AlertModal
          additionBtn={true}
          open={open}
          handleClose={handleClose}
          action={deleteDiary}
          content="해당 일기를 삭제하시겠습니까?"
        />
      </div>
    </>
  );
};
export default DiaryDetail;
