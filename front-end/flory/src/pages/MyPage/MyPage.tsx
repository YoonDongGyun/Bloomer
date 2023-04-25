import React, { useEffect } from "react";
import styled from "styled-components";
import { SMyPage } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import BasicTabs from "../../components/common/Tabs/BasicTabs";
import BasicModal from "../../components/User/UserLoginErrorModal/UserLoginErrorModal";
import MyPageEditModal from "../../components/MyPage/MyPageEditModal/MyPageEditModal";
import Pie from "../../components/common/Graph/Pie/Pie";
import Bar from "../../components/common/Graph/Bar/Bar";
import FlowerImg from "../../assets/imgs/flower_icon/Red Flower.png";
import Post from "../../components/common/Post/Post";
import Navbar from "../../components/common/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "../../components/common/ProfileCard/ProfileCard";
import Avatar from "../../components/common/Avatar/Avatar";
import GroupPanel from "../../components/MyPage/GroupPanel/GroupPanel";
import DistPanel from "../../components/MyPage/DistPanel/DistPanel";
import { updateShowMusic } from "../../redux/modules/music/music-slice";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userData);

  const handleMove = (target: string) => {
    navigate(target);
  };

  const handleMoveGroupList = () => {
    navigate("/group/list");
  };

  const distPanel = <DistPanel />;
  const groupPanel = <GroupPanel />;
  dispatch(updateShowMusic(false));

  return (
    <SMyPage>
      <div className="profile-background"></div>
      <div className="header">
        {/* 환경 설정 아이콘 */}
        <FontAwesomeIcon
          className="setting-icon"
          style={{color: "white"}}
          onClick={() => handleMove("/setting")}
          icon={faGear}
        />
      </div>
      <ProfileCard
        width="100%"
        header={<MyPageEditModal />}
        name={userInfo.nickname}
        body={
          <div
            style={{
              textAlign: "center",
              padding: "1px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            {userInfo.email}
          </div>
        }
        height="100%"
        className="profile"
      />
      <BasicTabs
        tabs={[
          {
            label: "나의 감정 분포",
            panel: distPanel,
          },
          { label: "그룹 목록 보기", panel: groupPanel },
        ]}
      />
      <Navbar bottomZero={true} />
    </SMyPage>
  );
};

export default MyPage;
