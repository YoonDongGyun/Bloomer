import {
  faUser,
  faEnvelope,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Button from "../../common/Button/Button";
import { SForm, SInput } from "./styles";
import { signupAction, checkDupEmailAction } from "../../../redux/modules/user";
import { useAppDispatch } from "../../../redux/store.hooks";
import { useNavigate } from "react-router-dom";

const UserSignupForm = () => {
  const [nickname, setNickname] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [alarm, setAlarm] = useState({
    nickname: "",
    email: "",
    pw: "",
    pwConf: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 이메일 유효성 검사를 위한 정규표현식
  const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  // 이메일 중복 확인
  const onCheckEmail = (e: any) => {
    e.preventDefault();
    if (!regexEmail.test(email)) {
      setAlarm({
        ...alarm,
        email: "validation",
      });
    } else {
      dispatch(checkDupEmailAction(email)).then((data: any) => {
        if (data.payload.response) {
          setAlarm({
            ...alarm,
            email: "alarm",
          });
        } else {
          setAlarm({
            ...alarm,
            email: "confirm",
          });
        }
      });
    }
  };

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
  }, [nickname, email, password, passwordCheck]);

  useEffect(() => {
    if (nickname !== null) {
      if (!nickname.trim()) {
        setAlarm({
          ...alarm,
          nickname: "alarm",
        });
      } else {
        setAlarm({
          ...alarm,
          nickname: "confirm",
        });
      }
    }
  }, [nickname]);

  // 회원가입
  const onSignup = (e: any) => {
    e.preventDefault();
    const signupData = {
      nickname,
      password,
      email,
    };

    if (!nickname) {
      setAlarm({
        ...alarm,
        nickname: "alarm",
      });
    } else {
      setAlarm({
        ...alarm,
        nickname: "confirm",
      });
    }

    if (
      alarm.nickname === "confirm" &&
      alarm.email === "confirm" &&
      alarm.pwConf === "confirm"
    ) {
      navigate("/signup/music", {
        state: {
          signupData,
          update: false,
        },
      });
    }
  };

  return (
    <SForm alarm={alarm}>
      {/* 닉네임 */}
      <div className="input__wrapper">
        <FontAwesomeIcon
          className={nickname ? "icon active" : "icon"}
          icon={faUser}
        />
        <SInput
          maxLength={"10"}
          value={nickname}
          onChange={(e: any) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요."
        />
        <p id="nicknameAlarm">
          {alarm.nickname === "alarm" ? "필수 입력 사항입니다." : "닉네임 확인"}
        </p>
      </div>
      {/* 이메일 */}
      <div className="input__wrapper">
        <FontAwesomeIcon
          className={email ? "icon active" : "icon"}
          icon={faEnvelope}
        />

        <Button
          onClick={onCheckEmail}
          contents="중복 검사"
          addStyle={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "0.3rem 0.6rem",
            backgroundColor: "#bfc6ff",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "0.75rem",
          }}
        />
        <SInput
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요."
        />
        <p id="emailAlarm">
          {alarm.email === "alarm"
            ? "이미 존재하는 이메일입니다."
            : alarm.email === "confirm"
            ? "사용 가능한 이메일입니다."
            : "올바른 이메일 형식으로 입력해주세요."}
        </p>
      </div>
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
        onClick={onSignup}
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
        contents="다음"
      />
    </SForm>
  );
};

export default UserSignupForm;
