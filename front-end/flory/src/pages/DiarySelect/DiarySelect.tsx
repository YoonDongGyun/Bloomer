import React, { useState } from "react"
import { SMain } from "./styles"
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti"
import testFlower from "../../assets/imgs/test_flower.png"
import Navbar from "../../components/common/Navbar/Navbar"
import Button from "../../components/common/Button/Button"
import { useLocation, useNavigate } from "react-router"
import Chart from "react-apexcharts"
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks"
import DiaryFlower from "../../components/Diary/DiaryFlower/DiaryFlower"
import { createInfoSaveAction } from "../../redux/modules/diaryCreate"
import { emotionColor } from "../../redux/utils/emotionColor"
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiDoubleQuotesL,
  RiDoubleQuotesR,
} from "react-icons/ri"

const MAX_VISIBILITY = 5

const Card = ({ title, content }: any) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
)

const Carousel = ({ children }: any) => {
  const [active, setActive] = useState<number>(2)
  const count = React.Children.count(children)

  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={() => setActive((i) => i - 1)}>
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i: any) => (
        <div
          className="card-container"
          style={
            {
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 1.2,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              "pointer-events": active === i ? "auto" : "none",
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "flex",
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={() => setActive((i) => i + 1)}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  )
}

const DiarySelect = () => {
  const nickname = useAppSelector((state) => state.user.userData.nickname)
  const dispatch = useAppDispatch()

  // 감정 정보
  const emotionData = useAppSelector(
    (state) => state.diaryCreate.currentEmotionData
  )
  const emoCategory = emotionData.map((item: any) => item.largeCategory)
  const emoValue = emotionData.map((item: any) => {
    return item.analysis.toFixed(2)
  })
  const emoColors = emoCategory.map((item: any) => emotionColor(item))
  const [showReport, setShowReport] = useState(false)

  const emoColor = emotionColor(emotionData[0].largeCategory)

  // 해당 감정에 대한 꽃 정보 (소분류들)
  const flowerData = useAppSelector(
    (state) => state.diaryCreate.currentFlowerData
  )

  const navigate = useNavigate()

  const handleNavigate = () => {
    const target = document.querySelector('[style*="--active:1"]')
    const parentNode: any = target?.parentNode?.childNodes
    const targetArray = [...parentNode].filter(
      (item) => item.localName === "div"
    )

    let targetFid: any
    for (let i = 0; i < targetArray.length; i++) {
      const styles = getComputedStyle(targetArray[i])
      const activeValue = styles.getPropertyValue("--active")
      if (activeValue === "1") {
        targetFid = i
        const fidData = {
          fid: flowerData[targetFid].fid,
        }
        dispatch(createInfoSaveAction(fidData)).then(() => {
          navigate("/diary/select/music")
        })
      }
    }
  }

  const newFlowerData = flowerData.slice(0, 5)

  return (
    <SMain emoColor={emoColor}>
      <div className="info__wrapper">
        <span className="info__title">작성된 글에서 느껴지는 감정은</span>
        <span className="info__title extract-emotion">
          {" "}
          {emotionData[0].largeCategory}
        </span>
        <span className="info__title"> 입니다.</span>
        <p className="info__title">피우고 싶은 꽃을 선택해주세요.</p>
        {!showReport && (
          <RiArrowDownSLine
            className="arrow-icon"
            onClick={() => setShowReport(!showReport)}
          />
        )}
        {showReport && (
          <RiArrowUpSLine
            className="arrow-icon"
            onClick={() => setShowReport(!showReport)}
          />
        )}

        {showReport === true && (
          <Chart
            type="bar"
            series={[{ name: "", data: emoValue }]}
            options={{
              tooltip: {
                enabled: true,
                y: {
                  formatter: function (value) {
                    return value + "%"
                  },
                },
              },
              chart: {
                toolbar: {
                  show: false,
                },
                height: 500,
                width: 500,
              },
              xaxis: {
                categories: emoCategory,
              },
              yaxis: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              colors: emoColors,
              plotOptions: {
                bar: {
                  distributed: true,
                },
              },
              legend: {
                show: false,
              },
            }}
          ></Chart>
        )}
      </div>
      {/* 선택된 감정 */}
      <div className="emotion__wrapper">
        <Carousel>
          {newFlowerData.map((item: any, i: number) => (
            <>
              <div key={item.id} className="emotion">
                {item.smallCategory}
              </div>
              <DiaryFlower flower={item} />
              <div className="flower__wrapper">
                <p className="name__title">{item.flowerName}</p>
                <p className="flower__language">{item.language}</p>
              </div>
            </>
          ))}
        </Carousel>
      </div>
      <div className="select__wrapper" onClick={handleNavigate}>
        <div className="background">
          <p className="select__p">선택</p>
        </div>
      </div>
      <Navbar absolute={true} />
    </SMain>
  )
}

export default DiarySelect
