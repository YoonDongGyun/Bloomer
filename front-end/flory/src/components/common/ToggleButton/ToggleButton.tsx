import {
  faBars,
  faCamera,
  faLayerGroup,
  faVolumeOff,
  faVolumeXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState, useEffect, RefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import { SNav } from "./styles";
import { updateIsPlaying } from "../../../redux/modules/music/music-slice";

const ToggleButton = ({ state, gardenType, capture }: any) => {
  const [toggleOnOff, setToggleOnOff] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const music = useAppSelector((store) => store.music);
  const [volumeMute, setVolumeMute] = useState(false);
  const screenshotBtn = document.getElementsByClassName("leva-c-ihqPFh")[0];

  // 토글 핸들러 함수
  const handleToggleOnOff = () => {
    setToggleOnOff(!toggleOnOff);
  };

  // 소리 음소거 핸들러 함수
  const handleVolumeOnOff = () => {
    if (music.isPlaying) {
      dispatch(updateIsPlaying(false));
      setVolumeMute(true);
    } else {
      dispatch(updateIsPlaying(true));
      setVolumeMute(false);
    }
  };

  useEffect(() => {
    if (music.isPlaying) {
      setVolumeMute(true);
    } else {
      setVolumeMute(false);
    }
  }, [music]);

  const handleMoveToGardenList = () => {
    navigate("/garden/list");
  };

  // Trigger a click event on the screenshot button
  const triggerClick = () => {
    const clickEvent = new Event("click", { bubbles: true });
    screenshotBtn.dispatchEvent(clickEvent);
  };

  // Call the triggerClick function to simulate a click event on the screenshot button
  const handleScreenShot = () => {
    triggerClick();
  };

  return (
    <SNav gardenType={gardenType}>
      <input
        type="checkbox"
        // href="#"
        className="menu-open"
        name="menu-open"
        id="menu-open"
      />
      <label
        className="menu-open-button"
        htmlFor="menu-open"
        onClick={handleToggleOnOff}
      >
        {toggleOnOff ? (
          <FontAwesomeIcon className="lines" icon={faXmark} />
        ) : (
          <FontAwesomeIcon className="lines" icon={faBars} />
        )}
      </label>
      {state !== "other" && (
        <button
          className="menu-item gardenList"
          onClick={handleMoveToGardenList}
        >
          <FontAwesomeIcon className="gardenList__icon" icon={faLayerGroup} />
        </button>
      )}
      <button className="menu-item volume" onClick={handleVolumeOnOff}>
        {volumeMute ? (
          <FontAwesomeIcon className="volumeMute__icon" icon={faVolumeOff} />
        ) : (
          <FontAwesomeIcon className="volumeMute__icon" icon={faVolumeXmark} />
        )}
      </button>
      <button className="menu-item camera" onClick={handleScreenShot}>
        <FontAwesomeIcon className="camera__icon" icon={faCamera} />
      </button>
    </SNav>
  );
};

export default ToggleButton;
