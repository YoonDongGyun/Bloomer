import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../models/user/userStateType";
import { localData } from "./token";
import {
  loginAction,
  logoutAction,
  getUserDataToTokenAction,
  updateAccessToken,
  updateUserInfoAction,
  socialLoginUpdateAction,
  userDeleteAction,
} from "./user-action";

const initialState: UserStateType = {
  userData: {
    userId: 0,
    nickname: "",
    email: "",
    img: "",
  },
  axiosState: { loading: false, data: null, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userData.userId = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.axiosState.loading = false;
        state.axiosState.data = payload;
        state.axiosState.error = null;
        localData.setAccessToken(payload.response.accessToken);
        localData.setRefreshToken(payload.response.refreshToken);
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.axiosState.loading = false;
        state.axiosState.data = null;
        state.axiosState.error = payload;
      })
      // 토큰으로 유저 정보 얻기
      .addCase(getUserDataToTokenAction.fulfilled, (state, { payload }) => {
        state.axiosState.loading = false;
        state.axiosState.data = payload;
        state.axiosState.error = null;
        state.userData.userId = payload.response.userId;
        state.userData.nickname = payload.response.nickname;
        state.userData.email = payload.response.email;
        state.userData.img = payload.response.img;
      })
      .addCase(getUserDataToTokenAction.rejected, (state, { payload }) => {
        state.axiosState.loading = false;
        state.axiosState.data = null;
        state.axiosState.error = payload;
      })
      // 유저 정보 업데이트
      .addCase(updateUserInfoAction.fulfilled, (state, { payload }) => {
        state.axiosState.loading = false;
        state.axiosState.data = payload;
        state.axiosState.error = null;
        state.userData.userId = payload.response.userId;
        state.userData.nickname = payload.response.nickname;
        state.userData.email = payload.response.email;
        state.userData.img = payload.response.img;
      })
      .addCase(updateUserInfoAction.rejected, (state, { payload }) => {
        state.axiosState.loading = false;
        state.axiosState.data = null;
        state.axiosState.error = payload;
      })
      .addCase(socialLoginUpdateAction.fulfilled, (state, { payload }) => {})
      // 회원탈퇴
      .addCase(userDeleteAction.fulfilled, (state, { payload }) => {});

    // 로딩 액션 필요시 참고
    // .addCase(logoutAction.pending, (state) => {
    //   state.axiosState.loading = true;
    //   state.axiosState.data = null;
    //   state.axiosState.error = null;
    // })
  },
});
export default userSlice.reducer;
export const userAction = userSlice.actions;
export const { resetUser } = userSlice.actions;
