import {
  faUser,
  faPenToSquare,
  faHome,
  faListUl,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SNavbar, SNavWrapper } from "./styles";

interface NavBarProps {
  absolute?: boolean;
  bottomZero?: boolean;
}
const Navbar = ({ absolute, bottomZero }: NavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMove = (target: string) => {
    navigate(target);
  };

  // url을 통해 현재 위치를 인식해서 해당 아이콘을 엑티브시키는 함수
  const currentLocationIconActive = (pathname: string) => {
    if (pathname === "/diary/create") return "diaryCreate";
    else if (pathname === "/diary/select") return "diaryCreate";
    else if (pathname === "/diary/select/music") return "diaryCreate";
    else if (pathname === "/diary") return "diaryList";
    else if (pathname === "/garden") return "garden";
    else if (pathname === "/map") return "map";
    else if (pathname === "/mypage") return "mypage";
  };

  return (
    <SNavWrapper absolute={absolute} bottomZero={bottomZero}>
      <SNavbar>
        {/* 클래스 부여; 선택된 버튼 wrapper에 wrapper__active, 버튼에 button__active, 아이콘에 item__active 주기 */}
        <div
          className={
            currentLocationIconActive(location.pathname) === "diaryCreate"
              ? "button__wrapper wrapper__active"
              : "button__wrapper"
          }
        >
          <button
            onClick={() => handleMove("/diary/create")}
            className={
              currentLocationIconActive(location.pathname) === "diaryCreate"
                ? "button__active"
                : ""
            }
            // className="button__active"
          >
            <FontAwesomeIcon
              className={
                currentLocationIconActive(location.pathname) === "diaryCreate"
                  ? "nav__item item__active"
                  : "nav__item"
              }
              icon={faPenToSquare}
            />
          </button>
        </div>
        <div
          className={
            currentLocationIconActive(location.pathname) === "diaryList"
              ? "button__wrapper wrapper__active"
              : "button__wrapper"
          }
        >
          <button
            onClick={() => handleMove("/diary")}
            className={
              currentLocationIconActive(location.pathname) === "diaryList"
                ? "button__active"
                : ""
            }
          >
            <FontAwesomeIcon
              className={
                currentLocationIconActive(location.pathname) === "diaryList"
                  ? "nav__item item__active"
                  : "nav__item"
              }
              icon={faListUl}
            />
          </button>
        </div>

        <div
          className={
            currentLocationIconActive(location.pathname) === "garden"
              ? "button__wrapper wrapper__active"
              : "button__wrapper"
          }
        >
          <button
            onClick={() => handleMove("/garden")}
            className={
              currentLocationIconActive(location.pathname) === "garden"
                ? "button__active"
                : ""
            }
          >
            <FontAwesomeIcon
              className={
                currentLocationIconActive(location.pathname) === "garden"
                  ? "nav__item item__active"
                  : "nav__item"
              }
              icon={faHome}
            />
          </button>
        </div>
        <div
          className={
            currentLocationIconActive(location.pathname) === "map"
              ? "button__wrapper wrapper__active"
              : "button__wrapper"
          }
        >
          <button
            onClick={() => handleMove("/map")}
            className={
              currentLocationIconActive(location.pathname) === "map"
                ? "button__active"
                : ""
            }
          >
            <FontAwesomeIcon
              className={
                currentLocationIconActive(location.pathname) === "map"
                  ? "nav__item item__active"
                  : "nav__item"
              }
              icon={faLocationDot}
            />
          </button>
        </div>
        <div
          className={
            currentLocationIconActive(location.pathname) === "mypage"
              ? "button__wrapper wrapper__active"
              : "button__wrapper"
          }
        >
          <button
            onClick={() => handleMove("/mypage")}
            className={
              currentLocationIconActive(location.pathname) === "mypage"
                ? "button__active"
                : ""
            }
          >
            <FontAwesomeIcon
              className={
                currentLocationIconActive(location.pathname) === "mypage"
                  ? "nav__item item__active"
                  : "nav__item"
              }
              icon={faUser}
            />
          </button>
        </div>
      </SNavbar>
    </SNavWrapper>
  );
};

export default Navbar;
