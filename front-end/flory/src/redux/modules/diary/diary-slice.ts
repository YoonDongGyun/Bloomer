import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiaryStateType } from "../../../models/diary/diaryStateType";
import {
  createDiaryAction,
  getAllDiary,
  getDiaryListAction,
  getDiaryWithDate,
  getEmotionAction,
  getDiaryWithMap,
  updatePositionAction,
  getDiaryWithGroup,
  getStatisticsMonth,
  getStatisticsLastWeek,
} from "./diary-action";

const initialState: DiaryStateType = {
  diaryData: [],
  create: { loading: false, data: null, error: null },
  positionUpdate: { loading: false, data: null, error: null },
  allDiaryList: [],
  monthDiaryList: [],
  mapDiaryList: [],
  groupDiaryList: [],
  monthStat: {
    joy: 0,
    stable: 0,
    flustered: 0,
    angry: 0,
    anxiety: 0,
    hurt: 0,
    sadness: 0,
  },
  weekStat: {
    joy: 0,
    stable: 0,
    flustered: 0,
    angry: 0,
    anxiety: 0,
    hurt: 0,
    sadness: 0,
  },
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    // 개별 꽃 위치 수정
    positionUpdate: (state, action) => {
      const { diaryId, x, y, z } = action.payload;
      const diaryIndex = state.diaryData.findIndex(
        (item: any) => item.id === diaryId
      );

      if (diaryIndex !== -1) {
        const updatedDiary = {
          ...state.diaryData[diaryIndex],
          x: String(x),
          y: String(y),
          z: String(z),
        };

        const diaryData = [...state.diaryData];
        diaryData[diaryIndex] = updatedDiary;

        state.diaryData = [...diaryData];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // 일기 작성
      .addCase(createDiaryAction.pending, (state) => {
        state.create.loading = true;
        state.create.data = null;
        state.create.error = null;
      })
      .addCase(createDiaryAction.fulfilled, (state, { payload }) => {
        state.create.loading = false;
        state.create.data = payload;
        state.create.error = null;
      })
      .addCase(createDiaryAction.rejected, (state, { payload }) => {
        state.create.loading = false;
        state.create.data = null;
        state.create.error = payload;
      })
      // 수정된 꽃들의 위치 서버에 전송
      .addCase(updatePositionAction.pending, (state) => {
        state.positionUpdate.loading = true;
        state.positionUpdate.data = null;
        state.positionUpdate.error = null;
      })
      .addCase(updatePositionAction.fulfilled, (state, { payload }) => {
        state.positionUpdate.loading = false;
        state.positionUpdate.data = payload;
        state.positionUpdate.error = null;
      })
      .addCase(updatePositionAction.rejected, (state, { payload }) => {
        state.positionUpdate.loading = false;
        state.positionUpdate.data = null;
        state.positionUpdate.error = payload;
      })
      .addCase(getDiaryListAction.fulfilled, (state, { payload }) => {
        state.diaryData = payload.response;
      })
      .addCase(getDiaryListAction.rejected, (state) => {
        state.diaryData = [];
      })
      .addCase(getAllDiary.fulfilled, (state, { payload }) => {
        state.allDiaryList = payload.response;
      })
      .addCase(getDiaryWithDate.fulfilled, (state, { payload }) => {
        state.monthDiaryList = payload.response;
      })
      .addCase(getDiaryWithMap.fulfilled, (state, { payload }) => {
        state.mapDiaryList = payload.response;
      })
      .addCase(getDiaryWithGroup.fulfilled, (state, { payload }) => {
        state.groupDiaryList = payload.response;
      })
      .addCase(getStatisticsMonth.fulfilled, (state, { payload }) => {
        state.monthStat.joy = payload.response.기쁨;
        state.monthStat.stable = payload.response.안정;
        state.monthStat.flustered = payload.response.당황;
        state.monthStat.angry = payload.response.분노;
        state.monthStat.anxiety = payload.response.불안;
        state.monthStat.hurt = payload.response.상처;
        state.monthStat.sadness = payload.response.슬픔;
      })
      .addCase(getStatisticsLastWeek.fulfilled, (state, { payload }) => {
        state.weekStat.joy = payload.response.기쁨;
        state.weekStat.stable = payload.response.안정;
        state.weekStat.flustered = payload.response.당황;
        state.weekStat.angry = payload.response.분노;
        state.weekStat.anxiety = payload.response.불안;
        state.weekStat.hurt = payload.response.상처;
        state.weekStat.sadness = payload.response.슬픔;
      });
  },
});

export const { positionUpdate } = diarySlice.actions;

export default diarySlice.reducer;
