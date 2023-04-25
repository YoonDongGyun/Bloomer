import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginType } from "../../../models/user/loginType";
import { SignupType } from "../../../models/user/signUpType";
import { UpdateInfoType } from "../../../models/user/updateInfoType";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { localData } from "./token";
import { getCurrentGardenAction, getGardenListAction } from "../garden";
import { resetUser, userAction } from "./user-slice";

// 로그인
export const loginAction = createAsyncThunk(
  "LOGIN",
  async (userData: LoginType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/user/login`, userData);
      return data;
    } catch (e: any) {
      // alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 토큰으로 내 정보 가져오기
export const getUserDataToTokenAction = createAsyncThunk(
  "GETINFO",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();

      const { data } = await axios.get(`/api/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // dispatch(getCurrentGardenAction(data.response.userId));
      dispatch(updateAccessToken());
      await dispatch(getGardenListAction(data.response.userId));
      return data;
    } catch (e: any) {
      // localData.clear();
      return rejectWithValue(e);
    }
  }
);

// 로그아웃
export const logoutAction = createAsyncThunk(
  "LOGOUT",
  // 토큰 타입 지정해줘야 됨!!!
  async (userData: any, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios.get(`/api/user/logout`, {
        headers: {
          Authorization: `Bearer ${userData}`,
        },
      });
      localData.clear();
      dispatch(resetUser());

      // return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 회원가입
export const signupAction = createAsyncThunk(
  "SIGNUP",
  async (userData: SignupType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/user`, userData);
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 이메일 중복 확인
export const checkDupEmailAction = createAsyncThunk(
  "CHECK_DUP_EMAIL",
  async (email: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/user/check-email/${email}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// refresh token 업데이트
export const updateAccessToken = createAsyncThunk(
  "UPDATE_TOKEN",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const refreshToken = localData.getRefreshToken();
      const axios = axiosInitializer();
      await axios
        .post(`/api/user/access`, { refreshToken, accessToken })
        .then((data: any) => {
          localData.setAccessToken(data.data.response.accessToken);
          localData.setRefreshToken(data.data.response.refreshToken);
        })
        .then(() => {
          // dispatch(getUserDataToTokenAction());
        });
      // return await dispatch(getUserDataToTokenAction());
    } catch (e: any) {
      // localData.clear();
      return rejectWithValue(e);
    }
  }
);

// 유저 정보 변경
export const updateUserInfoAction = createAsyncThunk(
  "UPDATE_USERINFO",
  async (
    { userData, imgFile }: { userData: UpdateInfoType; imgFile: string },
    { rejectWithValue }
  ) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();

      const formData = new FormData();
      const blob = new Blob([JSON.stringify(userData)], {
        type: "application/json",
      }); //이미지 전송
      formData.append("img", imgFile);
      formData.append("memberRequestDto", blob);

      const { data } = await axios.put(`/api/user`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 소셜 로그인시 유저 정보 수정
export const socialLoginUpdateAction = createAsyncThunk(
  "SOCIAL",
  async (userData: any, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.put(`/api/user/social`, userData);

      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 회원탈퇴
export const userDeleteAction = createAsyncThunk(
  "DELETE",
  async (userEmail: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const accessToken = localData.getAccessToken();
      await axios.delete(`/api/user/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

// 비밀번호 변경
export const changePwdAction = createAsyncThunk(
  "CHANGE_PASSWORD_ACTION",
  async (userData: LoginType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const accessToken = localData.getAccessToken();
      await axios.put(`/api/user/pwd`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);
