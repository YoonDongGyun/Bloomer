import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DiaryDate from "../../components/Diary/DiaryDate/DiaryDate";
import DiaryTotalList from "../../components/Diary/DiaryTotalList/DiaryTotalList";
import DiaryWeather from "../../components/Diary/DiaryWeather/DiaryWeather";
import dayBackground from "../../assets/imgs/lotties/day-background.json";
import nightBackground from "../../assets/imgs/lotties/night-background.json";

import { SMain } from "./styles";
import Navbar from "../../components/common/Navbar/Navbar";
import Lottie from "react-lottie";
import useGeolocation from "react-hook-geolocation";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import { getWeatherAction } from "../../redux/modules/weather/weather-action";
import { WeatherRequiredType } from "../../models/weather/weatherRequiredType";
import { useLocation } from "react-router-dom";
import { getDiaryWithDate } from "../../redux/modules/diary";
import { updateShowMusic } from "../../redux/modules/music/music-slice";
import ScrollToTopButton from "../../components/common/ScrollToTopButton/ScrollToTopButton";

const createLottieOptions = (type: string | null) => {
  return {
    loop: true,
    autoplay: true,
    animationData: type === "day" ? dayBackground : nightBackground,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
};

const Diary = () => {
  const top = useRef<any>();
  let isInitial = true;
  const geoLocation = useGeolocation();
  const dispatch = useAppDispatch();
  const lat = geoLocation.latitude;
  const lon = geoLocation.longitude;
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  const diary = useAppSelector((state) => state.diary);
  const [currentMonthDiaryList, setCurrentMonthDiaryList] = useState<any>([]);
  const userId = useAppSelector((state) => state.user.userData.userId);

  const today = new Date();
  const currentTime = today.toTimeString();
  const type =
    weatherData.sunrise <= currentTime && weatherData.sunset > currentTime
      ? "day"
      : "night";
  const backoption = createLottieOptions(type);
  const initialDiaryData = {
    id: userId,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };
  const location = useLocation();
  const diaryData = location.state
    ? location.state.diaryData
    : initialDiaryData;

  useEffect(() => {
    setCurrentMonthDiaryList(diary.monthDiaryList);
  }, [diary]);

  useEffect(() => {
    dispatch(getDiaryWithDate(diaryData));
  }, [userId]);

  useEffect(() => {
    if (isInitial) {
      let requiredData: WeatherRequiredType;
      requiredData = {
        lat: lat,
        lon: lon,
      };
      dispatch(getWeatherAction(requiredData));
    }
    isInitial = false;
  }, [lat]);
  dispatch(updateShowMusic(false));

  // ArrowUp Button Flag
  const [flag, setFlag] = useState(false);

  return (
    <SMain>
      <div className="header-container">
        <Lottie
          style={{
            position: "relative",
          }}
          options={backoption}
          width="100%"
        />
        {weatherData.description && (
          <DiaryWeather
            weatherData={{
              description: weatherData.description,
              temp: weatherData.temp,
            }}
            type={type}
          />
        )}
        <DiaryDate diaryData={diaryData} />
      </div>

      <div
        className="content-container"
        onScroll={() => {
          if (top.current?.getBoundingClientRect().top < -100) {
            setFlag(true);
          } else {
            setFlag(false);
          }
        }}
      >
        <div className="line"></div>
        <div className="diary-section" ref={top}>
          <DiaryTotalList DIARY_LIST={currentMonthDiaryList} />
          <div className="empty-space"></div>
        </div>
      </div>
      <ScrollToTopButton target={top} active={flag} />
      <Navbar absolute={true} />
    </SMain>
  );
};

export default Diary;
