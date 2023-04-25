import React, { useEffect, useRef } from "react";
import Avatar from "../../common/Avatar/Avatar";
import { SSection } from "./styles";
import AOS from "aos";
import "aos/dist/aos.css";
import { convertDateFormat } from "../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import SettingPopover from "../../common/SettingPopover/SettingPopover";
import {
  deleteGuestBook,
  getAllGuestBookList,
} from "../../../redux/modules/guestBook";
import "animate.css";
import { useNavigate } from "react-router-dom";

const GuestBookComment = (props: any) => {
  const navigate = useNavigate();
  const commentRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const commentData = props.info;

  const userId: number = useAppSelector((state) => state.user.userData.userId);
  const writerId: number = commentData.userId;
  const isSelf: boolean = userId === writerId ? true : false;

  const checkDeg = (num: number) => {
    if (num > 0) return "animate__animated animate__fadeInLeft";
    else if (num === 0) return "animate__animated animate__fadeInDown";
    else if (num < 0) return "animate__animated animate__fadeInRight";
  };

  const handleDelete = () => {
    const requestData = {
      bookId: commentData.book_id,
      gardenId: commentData.gardenId,
    };
    dispatch(deleteGuestBook(requestData));
  };

  // \n 인식시키기
  const convertNewLineToBreak = (str: string) => {
    return str.split("\n").map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <SSection deg={props.deg} ref={commentRef} color={commentData.color}>
      <div className={`post-it ${checkDeg(props.deg)}`}>
        <p className="note">
          <div className="header">
            {/* 작성자 프로필 이미지 */}
            <Avatar
              size={"small"}
              src={props.info.img}
              imgIdx={
                props.info.img && props.info.img.length > 2
                  ? "11"
                  : props.info.img
              }
              pointer={"pointer"}
              onClick={() => {
                navigate(`/garden/${writerId}`);
              }}
            />
            {/* 작성자 이름 */}
            <p
              className="user-name"
              onClick={() => {
                navigate(`/garden/${writerId}`);
              }}
            >
              {commentData.nickName}
            </p>
            {isSelf && (
              <div className="setting">
                <SettingPopover deleteAction={handleDelete} />
              </div>
            )}
          </div>
          {/* 작성 내용 */}
          <p className="comment">
            {convertNewLineToBreak(commentData.contents)}
          </p>
          <p className="date">{convertDateFormat(commentData.created_time)}</p>
        </p>
      </div>
    </SSection>
  );
};

export default GuestBookComment;
