import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { localData } from "../user/token";

export const createInfoSaveAction = createAsyncThunk(
  "SAVE",
  async (diaryCreateData: any, { rejectWithValue }) => {
    return diaryCreateData;
  }
);

export const getMusicInfoAction = createAsyncThunk(
  "GET_MUSIC",
  async (emotionData: any, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(
        `/api/music/recommend/${emotionData.emotionIndex}/user/${emotionData.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
