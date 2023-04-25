import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store.hooks";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { localData } from "../user/token";
import { gardenActions } from "./garden-slice";

// 유저별 현재 정원 확인
export const getCurrentGardenAction = createAsyncThunk(
  "GET_CURRENT_GARDEN",
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      let today = new Date();
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1; // 월
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(
        `/api/garden/user/${userId}/date/${year}/${month}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (e: any) {
      const user = useAppSelector((state) => state.user.userData);
      return rejectWithValue(e);
    }
  }
);

// 정원 목록 확인
export const getGardenListAction = createAsyncThunk(
  "GET_GARDEN_LIST",
  async (userId: number, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/garden/list/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (data.response.length > 0) {
        const latestDate = data.response[
          data.response.length - 1
        ].deadline.substr(0, 7);
        let today = new Date();
        let year = String(today.getFullYear()); // 년도
        let month = String(today.getMonth() + 1); // 월
        if (month.length < 2) {
          month = "0" + String(month);
        }

        if (latestDate !== String(year) + "-" + String(month)) {
          localStorage.setItem("newGarden", "Yes");
          // dispatch(createGardenAction(userId));
        } else {
          localStorage.setItem("newGarden", "No");
          const currentGarden = data.response[data.response.length - 1];
          dispatch(
            gardenActions.setGardenData({
              gardenData: currentGarden,
            })
          );
        }
      } else {
        localStorage.setItem("newGarden", "Yes");
        // dispatch(createGardenAction(userId));
      }

      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 정원 생성
export const createGardenAction = createAsyncThunk(
  "CREATE",
  async (
    gardenCreateData: { userId: number; type: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      // console.log(userId);
      const { data } = await axios.post(`/api/garden`, gardenCreateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // const userId = useAppSelector((state) => state.user.userData.userId);
      await localStorage.setItem("newGarden", "No");
      dispatch(getGardenListAction(gardenCreateData.userId));

      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);
