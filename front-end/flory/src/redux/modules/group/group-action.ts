import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupCreateType } from "../../../models/Group/groupCreateType";
import { GroupJoinRequestType } from "../../../models/Group/groupJoinRequestType";
import { GroupUpdateType } from "../../../models/Group/groupUpdateType";
import { GroupJoinType } from "../../../models/Group/groupJoinType";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { localData } from "../user/token";
import { groupActions } from "./group-slice";

// 토큰으로 내 그룹 목록 가져오기
export const getGroupInfoAction = createAsyncThunk(
  "MY_GROUP_LIST",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/team/member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      let lst = [];
      for (let i of data.response) {
        lst.push({ name: i.name, teamId: i.teamId, check: true });
      }
      dispatch(groupActions.replaceCheck({ checkList: lst }));
      return data;
    } catch (e: any) {
      // dispatch(updateAccessToken());
      return rejectWithValue(e);
    }
  }
);

// 그룹 생성하기
export const createGroupAction = createAsyncThunk(
  "CREATE_GROUP",
  async (groupCreateData: GroupCreateType, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/team`, groupCreateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 모든 그룹 목록 가져오기
export const getAllGroupAction = createAsyncThunk(
  "GET_ALL_GROUP",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/team/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data.response;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 키워드로 그룹 목록 가져오기
export const getAllGroupByKeywordAction = createAsyncThunk(
  "GET_ALL_GROUP_BY_KEYWORD",
  async (keyword: string, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(
        `/api/team/all/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data.response;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

// 그룹 신청하기
export const requestJoinGroup = createAsyncThunk(
  "REQUEST_JOIN_GROUP",
  async (groupJoinData: GroupJoinRequestType, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/team/member`, groupJoinData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data.response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 특정 그룹 정보 가져오기
export const getSpeGroupInfoAction = createAsyncThunk(
  "GET_SPECIFIC_GROUP_INFO",
  async (group_id: any, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/team/${group_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 그룹 정보 변경
export const updateGroupInfoAction = createAsyncThunk(
  "UPDATE_GROUP_INFO",
  async (groupUpdateData: GroupUpdateType, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.put(`/api/team`, groupUpdateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

//그룹 신청 내역 가져오기
export const getSignUpMemberListAction = createAsyncThunk(
  "GET_SIGNUP_MEMBER_LIST",
  async (group_id: any, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/team/sign/${group_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 그룹 멤버 삭제
export const deleteGroupMemberAction = createAsyncThunk(
  "DELETE",
  async ({ teamId, userId }: GroupJoinType, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.delete(
        `/api/team/member?teamId=${teamId}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 가입 신청 수락
export const updateGroupMemberAction = createAsyncThunk(
  "UPDATE_GROUP_MEMBER",
  async (memberUpdateData: GroupJoinType, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.put(`/api/team/approve`, memberUpdateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);

// 그룹 삭제
export const deleteGroupAction = createAsyncThunk(
  "DELETE_GROUP",
  async (groupId: any, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.delete(`/api/team/${groupId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
