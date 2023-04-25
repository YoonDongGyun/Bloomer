import { createSlice } from "@reduxjs/toolkit";
import { GardenStateType } from "../../../models/garden/gardenStateType";
import {
  createGardenAction,
  getCurrentGardenAction,
  getGardenListAction,
} from "./garden-action";

const initialState: GardenStateType = {
  gardenList: [],
  gardenData: {
    deadline: "",
    gardenId: null,
    img: null,
    musicTitle: null,
    nickname: "",
    userId: null,
    type: null,
  },
  otherGardenData: {
    deadline: "",
    gardenId: null,
    img: null,
    musicTitle: null,
    nickname: "",
    userId: null,
    type: null,
  },
};

const gardenSlice = createSlice({
  name: "garden",
  initialState,
  reducers: {
    setGardenData(state, action) {
      state.gardenData = action.payload.gardenData;
    },
    setGardenMusic(state, action) {
      state.gardenData.musicTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGardenAction.fulfilled, (state, { payload }) => {
        // state.gardenData.id = payload.response.id;
        // state.gardenData.gardenPath = payload.response.gardenPath;
        // state.gardenData.nickname = payload.response.nickname;
        // state.gardenData.artist = payload.response.artist;
        // state.gardenData.title = payload.response.title;
        // state.gardenData.deadline = payload.response.deadline;
      })
      .addCase(createGardenAction.rejected, (state, { payload }) => {})
      .addCase(getCurrentGardenAction.fulfilled, (state, { payload }) => {
        state.otherGardenData = {
          deadline: payload.response.deadline,
          gardenId: payload.response.gardenId,
          img: payload.response.img,
          nickname: payload.response.nickname,
          musicTitle: payload.response.musicTitle,
          userId: payload.response.userId,
          type: payload.response.type,
        };
      })
      .addCase(getCurrentGardenAction.rejected, (state) => {
        state.otherGardenData = {
          deadline: "",
          gardenId: null,
          img: null,
          nickname: "",
          musicTitle: null,
          userId: null,
          type: null,
        };
      })
      .addCase(getGardenListAction.fulfilled, (state, { payload }) => {
        state.gardenList = payload.response;
      })
      .addCase(getGardenListAction.rejected, (state, { payload }) => {});
  },
});

export default gardenSlice.reducer;
export const gardenActions = gardenSlice.actions;
