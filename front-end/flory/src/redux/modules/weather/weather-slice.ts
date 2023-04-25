import { createSlice } from "@reduxjs/toolkit";
import { WeatherStateType } from "../../../models/weather/weatherStateType";
import { getWeatherAction } from "./weather-action";

const initialState: WeatherStateType = {
  weatherData: {
    description: null,
    temp: null,
    sunrise: null,
    sunset: null,
  },
  weather: {
    loading: false,
    data: null,
    error: null,
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherAction.pending, (state) => {
        state.weather.loading = true;
        state.weather.data = null;
        state.weather.error = null;
      })
      .addCase(getWeatherAction.fulfilled, (state, { payload }) => {
        state.weather.loading = false;
        state.weather.data = payload;
        state.weather.error = null;

        state.weatherData.description = payload.weather[0].main;
        state.weatherData.temp = Math.round(payload.main.temp);
        state.weatherData.sunrise = new Date(
          payload.sys.sunrise * 1000
        ).toTimeString();
        state.weatherData.sunset = new Date(
          payload.sys.sunset * 1000
        ).toTimeString();
      })
      .addCase(getWeatherAction.rejected, (state, { payload }) => {
        state.weather.loading = false;
        state.weather.data = null;
        state.weather.error = payload;
      });
  },
});

export default weatherSlice.reducer;
