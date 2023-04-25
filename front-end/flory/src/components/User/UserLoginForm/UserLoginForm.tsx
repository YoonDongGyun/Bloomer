import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserDataToTokenAction,
  loginAction,
} from "../../../redux/modules/user";
import { getCurrentGardenAction } from "../../../redux/modules/garden";
import { localData } from "../../../redux/modules/user/token";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import Button from "../../common/Button/Button";
import { SForm, SInput } from "./styles";

// mui
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { createGardenAction } from "../../../redux/modules/garden";
import { GardenStateType } from "../../../models/garden/gardenStateType";
import { gardenType } from "../../../models/garden/gardenType";
import AlertModal from "../../common/Modal/AlertModal/AlertModal";
import { updateIsPlaying } from "../../../redux/modules/music/music-slice";
const UserLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gardenId = useAppSelector((state) => state.garden.gardenData.gardenId);
  const userId = useAppSelector((state) => state.user.userData.userId);

  // 모달 상태 관리
  const [open, setOpen] = React.useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 로그인
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 이메일을 입력하지 않았으면
    if (!email.trim().length) {
      setErrorInfo("이메일을 입력해주세요.");
      handleOpen();
    } else if (!password.trim().length) {
      setErrorInfo("비밀번호를 입력해주세요.");
      handleOpen();
    } else {
      const loginData = {
        email,
        password,
      };
      dispatch(loginAction(loginData))
        .then((response) => {
          if (response.type === "LOGIN/rejected") {
            setErrorInfo(
              "존재하지 않는 이메일이거나\n 비밀번호가 일치하지 않습니다."
            );
            handleOpen();
            return false;
          } else {
            return true;
          }
        })

        .then((response) => {
          // 이메일이 존재하고 비밀번호가 일치하면
          if (response) {
            // 로컬스토리지에 저장된 엑세스 토큰으로 유저 정보 업데이트
            dispatch(getUserDataToTokenAction()).then(() => {
              dispatch(updateIsPlaying(true));
              if (localStorage.getItem("newGarden") === "No") {
                navigate("/garden");
              } else {
                navigate("/gardenTheme");
              }
            });
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <SForm onSubmit={onSubmit}>
        <div className="input-wrapper">
          <FontAwesomeIcon
            className={email ? "icon active" : "icon"}
            icon={faEnvelope}
          />
          <SInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="이메일"
          />
        </div>
        <div className="input-wrapper">
          <FontAwesomeIcon
            className={password ? "icon active" : "icon"}
            icon={faLock}
          />
          <SInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <p className="moveToSignup" onClick={() => navigate("/signup")}>
          아직 계정이 없으신가요?
        </p>
        <Button
          type="submit"
          addStyle={{
            margin: "auto",
            fontSize: "1rem",
            width: "50%",
            height: "3rem",
            color: "#ffffff",
            background1: "rgb(101,182,255)",
            background2:
              "linear-gradient(90deg, rgba(101,182,255,1) 0%, rgba(139,92,246,1) 100%)",
            borderRadius: "24px",
            boxShadow: "5px 5px 5px 0px rgb(158 158 158)",
          }}
          contents="로그인"
          onClick={onSubmit}
        />
      </SForm>
      <div>
        <AlertModal open={open} handleClose={handleClose} content={errorInfo} />
      </div>
    </>
  );
};

export default UserLoginForm;
