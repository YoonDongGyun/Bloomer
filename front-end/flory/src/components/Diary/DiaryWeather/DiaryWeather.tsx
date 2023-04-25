import React from "react"
import { convertDayIdx, convertWeatherDescription } from "../../../utils/utils"
import { SMain } from "./styles"

const DiaryWeather = ({ weatherData, type }: any): JSX.Element => {
  const today = new Date()
  const year = today.getFullYear().toString().substring(2)
  const month = (today.getMonth() + 1).toString().padStart(2, "0")
  const date = today.getDate().toString().padStart(2, "0")
  const day = convertDayIdx(today.getDay())
  const weatherSrc = require(`../../../assets/imgs/weather_icon/${convertWeatherDescription(
    weatherData.description
  )}.png`)

  return (
    <SMain type={type}>
      <img src={weatherSrc} alt="weather" className="weather-icon" />
      <div className="info-container">
        <div>
          {day} {weatherData.temp}°C
        </div>
        <div>
          {year}/{month}/{date}
        </div>
      </div>
    </SMain>
  )
}

export default DiaryWeather
