import React, { useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import { logoutAction } from "../../redux/modules/user";
import { localData } from "../../redux/modules/user/token";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import { SMain } from "./styles";

import { ReactComponent as LoadingImg } from "../../assets/imgs/loading.svg";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router";
import MainFlowerAsset from "../../components/Main/MainFlowerAsset/MainFlowerAsset";
import { updateIsPlaying } from "../../redux/modules/music/music-slice";

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector((store) => store.user.userData.userId);

  const handleMoveLogin = () => {
    dispatch(updateIsPlaying(true));
    if (userId !== 0) {
      navigate("/garden");
    } else {
      navigate("/login");
    }
  };
  const handleMoveSignUp = () => {
    navigate("signup");
  };

  return (
    <SMain>
      <h1 id="title">Bloomer</h1>
      <h4 id="main-sub-title">감정을 꽃 피우다</h4>
      <MainFlowerAsset />
      <div className="btn__wrapper">
        <button className="btn" onClick={handleMoveLogin}>
          시작하기
        </button>
      </div>
    </SMain>
  );
};

export default Main;
