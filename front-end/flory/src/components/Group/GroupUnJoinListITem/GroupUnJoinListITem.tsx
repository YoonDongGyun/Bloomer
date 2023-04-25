import React, { useRef, useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiCalendar, FiUser } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { SForm, SMain } from "./styles";
import CreateInput from "../../common/CreateInput/CreateInput";
import { GroupJoinRequestType } from "../../../models/Group/groupJoinRequestType";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import { requestJoinGroup } from "../../../redux/modules/group";
import { convertDateFormat } from "../../../utils/utils";
import AlertModal from "../../common/Modal/AlertModal/AlertModal";

const GroupUnJoinListITem = ({ group, top }: any) => {
  const userInfo = useAppSelector((state) => state.user.userData);
  const [isDetail, setIsDetail] = useState(false);
  const contentInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [isRequest, setIsRequest] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDetail = () => {
    setIsDetail(!isDetail);
  };
  const handleClickFormArea = (e: any) => {
    e.stopPropagation();
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const contentInputVal = contentInput.current?.value;

    if (
      !group.open &&
      (!contentInputVal || contentInputVal.trim().length === 0)
    ) {
      contentInput.current?.focus();
      handleOpen();
      return;
    } else {
      const groupJoinData: GroupJoinRequestType = {
        teamId: group.teamId,
        userId: userInfo.userId,
        message: contentInput.current?.value,
      };

      // 가입 api 쏘기
      await dispatch(requestJoinGroup(groupJoinData));
      setIsRequest(true);
    }
  };

  return (
    <>
      <SMain onClick={handleClickDetail} ref={top}>
        <div className="title__wrapper">
          <div className="group-name">{group.name}</div>
          <div className="private__section">
            {group.status === 0 && (
              <div className="accept-tag">승인 대기 중</div>
            )}
            {isRequest && <div className="accept-tag done">신청 완료</div>}
            {!group.open && (
              <div>
                <FaLock color="#656565" />
              </div>
            )}
          </div>
        </div>
        <div className="content__wrapper">
          <div className="flex__oneline">
            <div>
              <FiCalendar />
            </div>
            <div className="group-content">
              {convertDateFormat(group.createdDate)}
            </div>
          </div>
          <div className="flex__oneline">
            <div>
              <FiUser />
            </div>
            <div className="group-content">{group.userTeamList.length} 명</div>
          </div>
          <div className="flex__oneline">
            <div>
              <RiFilePaper2Line />
            </div>
            {isDetail ? (
              <div className="group-content-detail">{group.info}</div>
            ) : (
              <div className="group-content">{group.info}</div>
            )}
          </div>
          {group.status !== 0 && !isRequest && (
            <SForm onClick={handleClickFormArea} isDetail={isDetail}>
              {!group.open && (
                <CreateInput
                  contentInput={contentInput}
                  placeholder="승인 요청을 위한 가입 메시지를 작성해 주세요"
                  page="group"
                />
              )}
              <div className="btn__wrapper">
                <button className="btn" onClick={handleSubmitForm}>
                  참여 신청하기
                </button>
              </div>
            </SForm>
          )}
        </div>
      </SMain>
      <AlertModal
        open={open}
        handleClose={handleClose}
        content="가입 메시지를 작성해주세요."
      />
    </>
  );
};

export default GroupUnJoinListITem;
