import React, { useState, useEffect } from "react";
import { SMain } from "./styles";
import { ReactComponent as Wave } from "../../../assets/imgs/wave.svg";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/common/BackButton/BackButton";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SForm, SInput } from "./styles";
import Button from "../../../components/common/Button/Button";
import { changePwdAction } from "../../../redux/modules/user";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import { localData } from "../../../redux/modules/user/token";
import { resetUser } from "../../../redux/modules/user/user-slice";
import AlertModal from "../../../components/common/Modal/AlertModal/AlertModal";

const FindPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [alarm, setAlarm] = useState({
    pw: "",
    pwConf: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.user.userData.email);

  // 모달 상태 관리
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(
    "비밀번호가 변경되었습니다. \n 다시 로그인 해주세요"
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 비밀번호 재입력 확인
  useEffect(() => {
    if (password && password === passwordCheck) {
      setAlarm({
        ...alarm,
        pwConf: "confirm",
      });
    } else if (password && passwordCheck) {
      setAlarm({
        ...alarm,
        pwConf: "alarm",
      });
    } else {
      setAlarm({
        ...alarm,
        pwConf: "",
      });
    }
  }, [password, passwordCheck]);

  // 회원가입
  const onChangePwd = (e: any) => {
    e.preventDefault();
    const changePwdData = {
      email,
      password,
    };

    if (
      alarm.pwConf === "confirm"
    ) {
      handleOpen();
      dispatch(changePwdAction(changePwdData)).then(() => {
        dispatch(resetUser());
        localData.clear();
      })
    }
  };

  const redirect = () => {
    navigate(`/login`);
  }

  return (
    <SMain>
      <div className="header">
        <div className="inner-header flex"></div>
        <div>
          <Wave />
        </div>
      </div>
      <BackButton color="white" />
      <div className="password__title">
        <h1>비밀번호 변경</h1>
      </div>

      <SForm alarm={alarm}>
        {/* 비밀번호 */}
        <div className="input__wrapper">
          <FontAwesomeIcon
            className={password ? "icon active" : "icon"}
            icon={faLock}
          />
          <SInput
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type={"password"}
            placeholder="비밀번호를 입력해주세요."
          />
          <p id="pwAlarm">
            {alarm.pw === "alarm" ? "비밀번호 경고" : "비밀번호 확인"}
          </p>
        </div>
        {/* 비밀번호 확인 */}
        <div className="input__wrapper">
          <FontAwesomeIcon
            className={passwordCheck ? "icon active" : "icon"}
            icon={faLockOpen}
          />
          <SInput
            value={passwordCheck}
            onChange={(e: any) => setPasswordCheck(e.target.value)}
            type={"password"}
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <p id="pwConfAlarm">
            {alarm.pwConf === "alarm"
              ? "비밀번호가 일치하지 않습니다."
              : "비밀번호가 일치합니다."}
          </p>
        </div>
        <Button
          onClick={onChangePwd}
          type="submit"
          addStyle={{
            margin: "auto",
            fontSize: "1rem",
            width: "60%",
            height: "3rem",
            color: "#ffffff",
            background1: "rgb(101,182,255)",
            background2:
              "linear-gradient(90deg, rgba(101,182,255,1) 0%, rgba(139,92,246,1) 100%)",
            borderRadius: "20px",
            boxShadow: "5px 5px 5px 0px rgb(158 158 158)",
          }}
          contents="변경"
        />
      </SForm>

      <div>
        <AlertModal
          open={open}
          handleClose={handleClose}
          content={content}
          action={redirect}
        />
      </div>
    </SMain>
  );
};

export default FindPassword;
