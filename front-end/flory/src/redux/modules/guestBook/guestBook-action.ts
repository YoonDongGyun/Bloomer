import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupCreateType } from "../../../models/Group/groupCreateType";
import { GroupJoinRequestType } from "../../../models/Group/groupJoinRequestType";
import { GuestBookAddType } from "../../../models/guestBook/GuestBookAddType";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { localData } from "../user/token";
// import { guestBookActions } from "./guestBook-slice";

// 방명록 생성
export const addGuestBook = createAsyncThunk(
  "ADD_GUESTBOOK",
  async (guestData: GuestBookAddType, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/guest`, guestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getAllGuestBookList(data.response.gardenId));
      return data;
    } catch (e: any) {
      // dispatch(updateAccessToken());
      return rejectWithValue(e);
    }
  }
);

// // 방명록 디테일 보기
// export const createGroupAction = createAsyncThunk(
//   "CREATE_GROUP",
//   async (groupCreateData: GroupCreateType, { rejectWithValue }) => {
//     console.log("받은 데이터", groupCreateData);

//     try {
//       const accessToken = localData.getAccessToken();
//       const axios = axiosInitializer();
//       const { data } = await axios.post(`/api/team`, groupCreateData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       return data;
//     } catch (e) {
//       return rejectWithValue(e);
//     }
//   }
// );

// // 방명록 수정
// export const getAllGroupAction = createAsyncThunk(
//   "GET_ALL_GROUP",
//   async (_, { rejectWithValue }) => {
//     try {
//       const accessToken = localData.getAccessToken();
//       const axios = axiosInitializer();
//       const { data } = await axios.get(`/api/team/all`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       return data.response;
//     } catch (e: any) {
//       return rejectWithValue(e);
//     }
//   }
// );

// // 방명록 삭제
export const deleteGuestBook = createAsyncThunk(
  "DELETE_GUESTBOOK",
  async (
    requestData: { bookId: number; gardenId: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      await axios.delete(`/api/guest/${requestData.bookId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getAllGuestBookList(requestData.gardenId));
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

// 방명록 리스트 가져오기
export const getAllGuestBookList = createAsyncThunk(
  "GET_ALL_GUESTBOOK_LIST",
  async (garden_id: number, { rejectWithValue }) => {
    try {
      const accessToken = localData.getAccessToken();
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/guest/garden/${garden_id}`, {
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
