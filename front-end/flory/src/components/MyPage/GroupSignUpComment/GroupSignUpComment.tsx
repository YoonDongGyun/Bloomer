import { useNavigate } from "react-router-dom"
import { JsxElement, updateCommaList } from "typescript"
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks"
import { deleteGroupMemberAction, updateGroupMemberAction } from "../../../redux/modules/group";
import { GroupJoinType } from "../../../models/Group/groupJoinType"
import Avatar from "../../common/Avatar/Avatar"
import SettingPopover from "../../common/SettingPopover/SettingPopover"

import { SMain } from "./styles"
function DiaryComment({ signupInfo, updateList }: any): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleMoveToOtherGarden = () => {
    navigate(`/garden/${signupInfo.user.userId}`)
  }

  const deleteAction = () => {
    dispatch(deleteGroupMemberAction({teamId: signupInfo.teamId, userId: signupInfo.user.userId})).then(() => {
      updateList();
    })
  }

  const acceptAction = () => {
    const memberUpdateData: GroupJoinType = {
      teamId: signupInfo.teamId,
      userId: signupInfo.user.userId
    };

    dispatch(updateGroupMemberAction(memberUpdateData)).then(() => {
      updateList();
    })
  }

  return (
    <SMain style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", marginBottom: "0.5rem" }}>
        {signupInfo.user.img && signupInfo.user.img.length > 2 ? (
          <Avatar
            size="small"
            src={signupInfo.user.img}
            imgIdx={"11"}
            onClick={handleMoveToOtherGarden}
          />
        ) : (
            <Avatar size="small"
              imgIdx={signupInfo.user.img}
              onClick={handleMoveToOtherGarden}
            />
        )}
        <p
          style={{
            marginLeft: "0.5rem",
            color: "#612FAB",
            marginRight: "auto",
            cursor: "pointer",
          }}
          onClick={handleMoveToOtherGarden}
        >
          {signupInfo.user.nickname}
        </p>
        <SettingPopover
          addAction={acceptAction}
          deleteAction={deleteAction} />
      </div>
      <p>{signupInfo.message}</p>
    </SMain>
  )
}

export default DiaryComment
