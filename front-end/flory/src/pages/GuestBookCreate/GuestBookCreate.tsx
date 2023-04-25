import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useRef, useState } from "react"
import { SSection } from "./styles"
import { FaPencilAlt } from "react-icons/fa"
import BackButton from "../../components/common/BackButton/BackButton"
import { GuestBookAddType } from "../../models/guestBook/GuestBookAddType"
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks"
import {
  addGuestBook,
  getAllGuestBookList,
} from "../../redux/modules/guestBook"
import { useLocation, useNavigate } from "react-router"
import { gardenType } from "../../models/garden/gardenType"

const GuestBookCreate = () => {
  const [backgroundColor, setBackGroundColor] = useState("#f4f39e")
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const gardenData = location.state.gardenData
  const gardenId = gardenData.gardenId
  const userId = useAppSelector((state) => state.user.userData.userId)
  const [contents, setContents] = useState<any>()

  const handleChangeBackGroundColor = () => {}

  const handleTextChange = (e: any) => {
    setContents(e.target.value)
  }

  const handleSubmit = () => {
    const guestData: GuestBookAddType = {
      gardenId,
      userId,
      contents: contents,
      color: backgroundColor,
    }
    dispatch(addGuestBook(guestData)).then(() => {
      navigate("/guestBook", { state: { gardenData } })
    })
  }

  const goBackToGuestBook = () => {
    navigate("/guestBook", { state: { gardenData } })
  }

  return (
    <SSection backgroundColor={backgroundColor}>
      <BackButton color="black" onClickAction={goBackToGuestBook} />
      <div className="create__wrapper">
        <textarea
          maxLength={200}
          value={contents}
          // ref={contentRef}
          onChange={handleTextChange}
        ></textarea>
        <div className="color-button__wrapper">
          <div className="left">
            <button
              className="color yellow"
              onClick={() => setBackGroundColor("#f4f39e")}
            ></button>
            <button
              className="color pink"
              onClick={() => setBackGroundColor("#fdd7db")}
            ></button>
            <button
              className="color blue"
              onClick={() => setBackGroundColor("#b9eaf6")}
            ></button>
          </div>
          <button className="complete">
            <FaPencilAlt onClick={handleSubmit} />
            {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
          </button>
        </div>
        <span className="limit">
          {contents?.length ? contents.length : 0} / 200
        </span>
      </div>
    </SSection>
  )
}

export default GuestBookCreate
