import { ReduxStateType } from "../reduxStateType";
import { WeatherType } from "./WeatherType";

export type WeatherStateType = {
  weatherData: WeatherType;
  weather: ReduxStateType;
};
