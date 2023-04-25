import React, { useState } from "react"
import { SMain } from "./styles"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faBell } from "@fortawesome/free-regular-svg-icons"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Accordion from "../../components/common/Accordion/Accordion"
import { useLocation, useNavigate } from "react-router-dom"
import { logoutAction, userDeleteAction } from "../../redux/modules/user"
import { localData } from "../../redux/modules/user/token"
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks"
import BackButton from "../../components/common/BackButton/BackButton"
import { resetUser, userAction } from "../../redux/modules/user/user-slice"
import AlertModal from "../../components/common/Modal/AlertModal/AlertModal"
import Navbar from "../../components/common/Navbar/Navbar"

const Setting = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userEmail = useAppSelector((state) => state.user.userData.email)

  // 모달 상태 관리
  const [open, setOpen] = React.useState(false)
  const [content, setContent] = React.useState(
    "회원 탈퇴 후에는 복구할 수 없습니다. \n 탈퇴를 원하시면 확인을 눌러주세요."
  )
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 로그아웃
  const handleLogout = () => {
    const accessToken = localData.getAccessToken()
    dispatch(logoutAction(accessToken)).then(() => {
      dispatch(resetUser())
      localData.clear()
    })
  }

  // 회원탈퇴
  const handleUserDelete = () => {
    dispatch(userDeleteAction(userEmail)).then(() => {
      dispatch(resetUser())
      localData.clear()
    })
  }

  const handleOpenModal = () => {
    handleOpen()
  }

  const info = (
    <div>
      <div
        className="contents"
        onClick={() => {
          navigate(`/conditionInfo`)
        }}
      >
        서비스 이용 약관
      </div>
      <div
        className="contents"
        onClick={() => {
          navigate(`/intro`)
        }}
      >
        이용 문의
      </div>
    </div>
  )

  const accountInfo = (
    <div>
      <div
        className="contents"
        onClick={() => {
          navigate(`/findpassword`)
        }}
      >
        비밀번호 변경
      </div>
      <div className="contents" onClick={handleLogout}>
        로그아웃
      </div>
      <div className="contents" onClick={handleOpenModal}>
        회원탈퇴
      </div>
    </div>
  )

  return (
    <>
      <SMain>
        <div className="header">
          {/* 뒤로 가기 아이콘 */}

          <BackButton color="black" />

          <div className="inner-header flex">환경 설정</div>
        </div>

        <div className="box-Accordion">
          <Accordion title="계정" contents={accountInfo} icon={faUser} />
          {/* <Accordion title="알림" contents={contents} icon={faBell} /> */}
          <Accordion title="정보" contents={info} icon={faCircleInfo} />
        </div>
        <div>
          <AlertModal
            open={open}
            handleClose={handleClose}
            content={content}
            action={handleUserDelete}
            additionBtn={true}
          />
        </div>
      </SMain>
      <Navbar />
    </>
  )
}

export default Setting
