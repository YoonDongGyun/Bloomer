import React, { useState } from "react";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import testFlower from "../../assets/imgs/test_flower.png";
import Navbar from "../../components/common/Navbar/Navbar";
import Button from "../../components/common/Button/Button";
import { useLocation, useNavigate } from "react-router";
import Chart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import DiaryFlower from "../../components/Diary/DiaryFlower/DiaryFlower";
import { createInfoSaveAction } from "../../redux/modules/diaryCreate";
import { SMain } from "./styles";
import GardenWrapper from "../../components/GardenTheme/GardenWrapper";
import ParkBaseMap from "../../assets/imgs/park_base.png";
import BeachBaseMap from "../../assets/imgs/beach_base.png";
import CampBaseMap from "../../assets/imgs/camp_base.png";
import { createGardenAction } from "../../redux/modules/garden";

const MAX_VISIBILITY = 3;

const Card = ({ title, content }: any) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({ active, setActive, children }: any) => {
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <button
          className="nav left"
          onClick={() => setActive((i: number) => i - 1)}
        >
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
        <button
          className="nav right"
          onClick={() => setActive((i: number) => i + 1)}
        >
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const GardenTheme = () => {
  const [active, setActive] = useState<number>(0);
  const dispatch = useAppDispatch();
  const mapData = [
    { map: ParkBaseMap, title: "공원", content: "" },
    { map: CampBaseMap, title: "캠프", content: "" },
    { map: BeachBaseMap, title: "해변", content: "" },
  ];
  const userId = useAppSelector((state) => state.user.userData.userId);
  const navigate = useNavigate();

  const handleCreateGarden = () => {
    const gardenCreateData = {
      userId,
      type: active,
    };
    if (localStorage.getItem("newGarden") === "Yes") {
      dispatch(createGardenAction(gardenCreateData)).then(() => {
        navigate("/garden");
      });
    }
  };

  return (
    <SMain active={active}>
      <div className="info__wrapper">
        <p className="info__title">정원의 테마를 선택해주세요.</p>
        <p className="info__title red">
          정원의 테마는 한 달 동안 유지되며 변경 불가능합니다.
        </p>
      </div>
      {/* 선택된 감정 */}
      <div className="emotion__wrapper">
        <Carousel active={active} setActive={setActive}>
          {mapData.map((item: any, i: number) => (
            <>
              <img src={item.map} alt="" />
              <div className="flower__wrapper">
                <p className="name__title">{item.title}</p>
                <p className="flower__language">{}</p>
              </div>
            </>
          ))}
        </Carousel>
      </div>
      <div className="select__wrapper" onClick={handleCreateGarden}>
        <div className="background">
          <p className="select__p">선택</p>
        </div>
      </div>
    </SMain>
  );
};

export default GardenTheme;
