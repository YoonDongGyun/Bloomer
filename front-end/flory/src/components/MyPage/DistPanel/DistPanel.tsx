import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { SDistPanel, StyledWordCloud } from "./styles"
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks"
import Pie from "../../../components/common/Graph/Pie/Pie"
import Bar from "../../../components/common/Graph/Bar/Bar"
import FlowerImg from "../../../assets/imgs/flower_icon/Red Flower.png"
import Post from "../../../components/common/Post/Post"
import {
  getStatisticsMonth,
  getStatisticsLastWeek,
  getWordCloud,
} from "../../../redux/modules/diary/diary-action"
import ReactWordcloud from "react-wordcloud"

type MinMaxPair = [number, number]

function DistPanel({}): JSX.Element {
  const dispatch = useAppDispatch()

  // 본인 ID
  const userId = useAppSelector((state) => state.user.userData.userId)
  const [words, setWords] = useState({})

  useEffect(() => {
    if (userId != 0 && userId) {
      dispatch(getStatisticsMonth(userId))
      dispatch(getStatisticsLastWeek(userId))
      dispatch(getWordCloud(userId)).then((res) => {
        const response = res.payload.response
        if (
          response &&
          (typeof response === "object" || Array.isArray(response))
        ) {
          setWords(response)
        }
      })
    }
  }, [userId])

  //한달 통계 데이터
  const monthStat = useAppSelector((state) => state.diary.monthStat)
  const Piedata = []
  //저번주 대비 데이터
  const weekStat = useAppSelector((state) => state.diary.weekStat)
  const Bardata = []

  const bgIcons = []
  const keys = ["01", "06", "09", "12", "15", "18", "21"]
  const emotions = ["기쁨", "안정", "당황", "분노", "불안", "상처", "슬픔"]
  const emotionKey = [
    "joy",
    "stable",
    "flustered",
    "angry",
    "anxiety",
    "hurt",
    "sadness",
  ]
  const colorKey = [
    "#FFE897",
    "#C2F9B9",
    "#D4AAFA",
    "#FFB59E",
    "#A5DFFF",
    "#6972C0",
    "#FF8C9B",
  ]
  let monthCnt = 0,
    weekCnt = 0
  let maxCnt = 0,
    maxEmotion = "기쁨"

  for (var i = 0; i < 7; i++) {
    //한달
    Piedata.push({
      id: emotions[i],
      label: emotions[i],
      value: monthStat[emotionKey[i]],
    })
    monthCnt += monthStat[emotionKey[i]]

    if (maxCnt < monthStat[emotionKey[i]]) {
      maxCnt = monthStat[emotionKey[i]]
      maxEmotion = emotions[i]
    }

    //지난주
    var img_icon = require(`../../../assets/imgs/flower_bgicon/bgicon_f${keys[i]}.png`)
    bgIcons.push(<img className="emotion__flower" key={i} src={img_icon} />)
    Bardata.push({
      emotion: emotions[i],
      count: weekStat[emotionKey[i]],
      color: {
        type: "linearGradient",
        id: `gradient-${i}`,
        colors: [
          {
            offset: "0%",
            color: colorKey[i],
          },
          {
            offset: "100%",
            color: "#ffffff",
          },
        ],
      },
    })
    weekCnt += weekStat[emotionKey[i]]
  }

  // wordCloud
  const Worddata = Object.entries(words).map(([key, value]) => ({
    text: key,
    value: Number(value),
  }))

  const options = {
    fontSizes: [12, 50] as MinMaxPair,
  }

  return (
    <SDistPanel>
      <div className="totalFlower">
        <img src={FlowerImg} className="flowerImg"></img>
        <div className="flower-title">
          이번 달에 {monthCnt}개의 꽃을 피웠습니다!
        </div>
      </div>

      <Post
        title="실시간 누적 감정 분포"
        content={
          monthCnt > 0 ? (
            <div>
              <div className="inner-title">
                이번 달 현재까지 가장 많이 기록된 감정은{" "}
                <span style={{ color: "red" }}>{maxEmotion}</span>입니다
              </div>
              <Pie data={Piedata} />
            </div>
          ) : (
            <div className="default">감정을 기록해보세요</div>
          )
        }
      />
      <Post
        title="일기 키워드"
        content={
          Worddata.length ? (
            <div className="keywordBox">
              <StyledWordCloud words={Worddata} options={options} />
            </div>
          ) : (
            <div className="default">감정을 기록해보세요</div>
          )
        }
      />
      <Post
        title="지난주 대비 감정 분포"
        content={
          weekCnt > 0 ? (
            <div>
              <Bar data={Bardata} />
              <div style={{ display: "flex" }}>{bgIcons}</div>
            </div>
          ) : (
              <div className="default">지난주 대비 감정을 {weekCnt*-1}개 적게 피웠어요 😢</div>
          )
        }
      />
    </SDistPanel>
  )
}

export default DistPanel
