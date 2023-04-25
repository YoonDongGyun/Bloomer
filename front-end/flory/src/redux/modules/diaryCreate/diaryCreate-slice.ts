import { createSlice } from "@reduxjs/toolkit";
import { DiaryCreateStateType } from "../../../models/diaryCreate/diaryCreateStateType";
import { createInfoSaveAction, getMusicInfoAction } from "./diaryCreate-action";

const initialState: DiaryCreateStateType = {
  diaryCreateData: {
    address: "",
    content: "",
    fid: null,
    gid: null,
    groupList: null,
    lat: "",
    lng: "",
    musicTitle: null,
    publicStatus: "",
    x: 0,
    y: 0,
    z: 0,
  },
  imgSrc: null,
  currentEmotionData: [],
  currentFlowerData: [],
  currentMusicData: [],
  currentMusicUrls: [],
};

const diaryCreateSlice = createSlice({
  name: "diaryCreate",
  initialState,
  reducers: {
    dataReset: (state) => {
      state.diaryCreateData = {
        address: "",
        content: "",
        fid: null,
        gid: null,
        groupList: null,
        lat: "",
        lng: "",
        musicTitle: null,
        publicStatus: "",
        x: 0,
        y: 0,
        z: 0,
      };
      state.imgSrc = null;
      state.currentEmotionData = [];
      state.currentFlowerData = [];
      state.currentMusicData = [];
      state.currentMusicUrls = [];
    },
    imgDataSave: (state, action) => {
      state.imgSrc = action.payload;
    },
    emotionDataSave: (state, action) => {
      const emotionData = action.payload.payload.response.emotions;
      const flowerData = action.payload.payload.response.flowers;
      state.currentEmotionData = [...emotionData];
      state.currentFlowerData = [...flowerData];
    },
    createFlowerPosition: (state, action) => {
      state.diaryCreateData.x = action.payload.x;
      state.diaryCreateData.y = action.payload.y;
      state.diaryCreateData.z = action.payload.z;
    },
    musicUrlsDataSave: (state, action) => {
      // const musicUrls = action.payload.payload.response;
      state.currentMusicUrls = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // 일기 작성하면서 입력받는 데이터를 저장시키는 로직
      .addCase(createInfoSaveAction.fulfilled, (state, { payload }) => {
        state.diaryCreateData = { ...state.diaryCreateData, ...payload };
      })
      // 감정을 보내서 음악 데이터를 받는 로직
      .addCase(getMusicInfoAction.fulfilled, (state, { payload }) => {
        state.currentMusicData = [...payload.response];
      });
  },
});

export const {
  dataReset,
  imgDataSave,
  emotionDataSave,
  createFlowerPosition,
  musicUrlsDataSave,
} = diaryCreateSlice.actions;

export default diaryCreateSlice.reducer;
