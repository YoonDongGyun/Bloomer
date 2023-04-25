import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeatherAction = createAsyncThunk(
  "GET_WEATHER",
  async (requireData: any, { rejectWithValue }) => {
    try {
      let lat = requireData.lat;
      let lon = requireData.lon;

      if (!requireData.lat) {
        lat = 37.5012860931305;
        lon = 127.039604663862;
      }

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );

      return data;
    } catch (e: any) {
      return rejectWithValue(e);
    }
  }
);
