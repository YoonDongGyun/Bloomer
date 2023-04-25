import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../../common/Avatar/Avatar";
import BasicModal from "../../common/Modal/BasicModal/BasicModal";
import { ImgIcon, SForm } from "./styles";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { updateUserInfoAction } from "../../../redux/modules/user";
import ModifyButtonImg from "../../../assets/imgs/button/ModifyButton.png";
import { SlCamera } from "react-icons/sl";
import { FaCamera, FaCameraRetro } from "react-icons/fa";

const returnPickStatus = (idx: string, pickedIdx: string) => {
  return idx === pickedIdx ? "pick" : "";
};

const MyPageEditModal = () => {
  const imgIdxList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const userInfo = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState(userInfo.nickname);
  const [pickedIdx, setPickedIdx] = useState(userInfo.img);
  // const [password, setPassword] = useState(userInfo.password);
  const [email, setEmail] = useState(userInfo.email);

  useEffect(() => {
    if (userInfo.img && userInfo.img.length > 2) {
      setPickedIdx("11");
    } else {
      setPickedIdx(userInfo.img || "");
    }
  }, [userInfo.img]);

  useEffect(() => {
    setNickname(userInfo.nickname);
    setPickedIdx(userInfo.img);
  }, [userInfo]);

  const selectFile = useRef<HTMLInputElement | null>(null); // Icon onClick에 input File을 달기 위한 ref

  const [previewImg, setpreviewImg] = useState(""); // 미리보기 파일(출력을 위한)
  const [imgFile, setImgFile] = useState(""); // 미리보기 실제 파일(저장을 위한)

  const handlePickImg = (idx: string) => {
    setPickedIdx(idx);
  };

  const handleUpdateInfo = async () => {
    const userData = {
      nickname: nickname,
      img: pickedIdx,
      email: userInfo.email,
    };

    if (pickedIdx === "11") {
      await dispatch(updateUserInfoAction({ userData, imgFile }));
    } else {
      await dispatch(updateUserInfoAction({ userData, imgFile: "" }));
    }
    return true;
  };

  // 선택이미지 미리보기
  const handleChangePreview = (e: any) => {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      // 1. 파일을 읽어 버퍼에 저장합니다.
      // 파일 상태 업데이트
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
        if (base64) {
          var base64Sub = base64.toString();
          setpreviewImg(base64Sub); // 파일 base64 상태 업데이트
          setImgFile(e.target.files[0]); //저장을 위한 파일
        }
      };
    }
  };

  return (
    <BasicModal
      modalButton={
        <ImgIcon>
          <Avatar
            size="big"
            src={userInfo.img}
            imgIdx={
              userInfo.img && userInfo.img.length > 2 ? "11" : userInfo.img
            }
          />
          <button>
            <img src={ModifyButtonImg} className="modifyButtonImg"></img>
          </button>
        </ImgIcon>
      }
      dispatchAction={handleUpdateInfo}
    >
      <h3>프로필 설정</h3>
      <SForm>
        <p>닉네임 변경</p>
        <div className="nickname__wrapper">
          <FontAwesomeIcon
            icon={faUser}
            className={nickname ? "icon active" : "icon"}
          />
          <input
            className="input__section"
            type="text"
            placeholder={userInfo.nickname}
            onChange={(e: any) => setNickname(e.target.value)}
            value={nickname}
            maxLength={10}
          />
        </div>
        <p>프로필 사진 변경</p>
        <div className="image__wrapper">
          <span
            key={11}
            className="image__btn"
            onClick={() => handlePickImg("11")}
          >
            <input
              type="file"
              accept=".jpg, .png"
              style={{ display: "none" }}
              ref={(ref) => {
                selectFile.current = ref;
              }} //Avatar에서 input에 접근
              onChange={handleChangePreview}
            />
            <Avatar
              onClick={() => selectFile.current?.click()}
              size="medium"
              tmpsrc={previewImg}
              src={userInfo.img}
              imgIdx={"11"}
              key={11}
              status={returnPickStatus("11", pickedIdx)}
            />
            {/* <FaCamera className="cameraButtonImg" /> */}
            {/* <img src={cameraButtonImg} className="cameraButtonImg"></img> */}
          </span>
          {imgIdxList.map((item, idx) => {
            return (
              <span
                key={idx}
                className="image__btn"
                onClick={() => handlePickImg(item)}
              >
                <Avatar
                  imgIdx={item}
                  size="medium"
                  key={idx}
                  status={returnPickStatus(item, pickedIdx)}
                />
              </span>
            );
          })}
        </div>
      </SForm>
    </BasicModal>
  );
};

export default MyPageEditModal;
