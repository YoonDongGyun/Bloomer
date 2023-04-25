import React from "react";
import { IoMdFlower } from "react-icons/io";
import { MdFilterVintage } from "react-icons/md";
import { FaSpa } from "react-icons/fa";
import Calendar from "react-calendar";
import "./styles.css";
import moment from "moment";
import { useNavigate } from "react-router";
import { emotionColor } from "../../../redux/utils/emotionColor";

const GardenCalendar = ({ dateData, diaryList }) => {
  const navigate = useNavigate();
  const handleClickCalendar = () => {
    // 해당 년월 상세 일기 페이지로 이동
    // 데이터 옮기는 방법 생각하기
    const diaryData = {
      id: dateData.id,
      year: dateData.year,
      month: dateData.month,
    };

    navigate("/diary", {
      state: {
        diaryData: diaryData,
      },
    });
  };

  return (
    <div className="calendar__wrapper" onClick={handleClickCalendar}>
      <Calendar
        activeStartDate={new Date(dateData.year, dateData.month - 1)}
        formatDay={(locale, date) => moment(date).format("DD")}
        showNeighboringMonth={false}
        showNavigation={false}
        tileContent={({ date, _ }) => {
          let tag = [];
          let targetLst = [];
          diaryList.forEach((data) => {
            if (data.day === moment(date).format("D").padStart(2, "0")) {
              targetLst = data.diaryList;
            }
          });
          if (targetLst.length) {
            targetLst.map((data, idx) => {
              if (idx > 2) {
                return tag;
              } else {
                tag.push(
                  <MdFilterVintage
                    color={emotionColor(data.flowerEmotion.largeCategory)}
                  />
                );
              }
            });
          } else {
            tag.push(<div className="none"></div>);
          }
          return <div className="mark__wrapper">{tag}</div>;
        }}
      />
    </div>
  );
};

export default GardenCalendar;
