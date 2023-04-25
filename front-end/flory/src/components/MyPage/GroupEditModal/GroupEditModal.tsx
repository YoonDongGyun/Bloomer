import { STitle } from "./styles";
import BasicModal from "../../common/Modal/BasicModal/BasicModal";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateInput from "../../common/CreateInput/CreateInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CreateInputLine from "../../common/CreateInputLine/CreateInputLine";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import { GroupUpdateType } from "../../../models/Group/groupUpdateType";
import { GroupType } from "../../../models/Group/GroupType";
import {
  updateGroupInfoAction,
  getSpeGroupInfoAction,
  getGroupInfoAction,
  deleteGroupAction,
} from "../../../redux/modules/group";

type Props = {
  groupId?: number;
};

function GroupEditModal(props: Props): JSX.Element {
  const [groupName, setGroupName] = useState("");
  const [content, setContent] = useState("");
  const groupNameInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLInputElement>(null);
  const [isOpenData, setIsOpenData] = useState(true);
  const [groupInfo, setGroupInfo] = useState<GroupType | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeSwitch = (e: any) => {
    setIsOpenData(e.target.checked);
  };

  const deleteGroup = () => {
    dispatch(deleteGroupAction(props.groupId)).then(() => {
      dispatch(getGroupInfoAction());
    });
  };

  useEffect(() => {
    // 그룹 정보를 가져옴
    dispatch(getSpeGroupInfoAction(props.groupId)).then((res) => {
      const response = res.payload.response;
      if (response) {
        // groupInfo가 null이 아닌 경우에만 값을 설정
        setGroupInfo(response);
        setGroupName(response.name);
        setIsOpenData(response.open);
        setContent(response.info);
      }
    });
  }, []);

  return (
    <BasicModal
      modalButton={<div className="BrowseGroup">그룹 설정 변경</div>}
      dispatchAction={async () => {
        const groupUpdateData: GroupUpdateType = {
          teamId: props.groupId,
          name: groupName,
          info: content,
          open: isOpenData,
        };
        await dispatch(updateGroupInfoAction(groupUpdateData)).then(() => {
          // 변경 완료 후 본인 가입 그룹 목록 다시 불러와야 함
          dispatch(getGroupInfoAction());
        });
        return true;
      }}
      deleteAction={deleteGroup}
    >
      <STitle>
        <h3>그룹 설정 변경</h3>
        <h2 onClick={() => navigate(`/group/list/signup/${props.groupId}`)}>
          <FontAwesomeIcon icon={faBell} />
        </h2>
      </STitle>

      <CreateInputLine
        icon={faUserGroup}
        placeholder={groupInfo?.name || ""}
        value={groupName}
        onChange={(e: any) => setGroupName(e.target.value)}
        ref={groupNameInput}
      />

      <CreateInput
        placeholder={groupInfo?.info || ""}
        value={content}
        onChange={(e: any) => setContent(e.target.value)}
        ref={contentInput}
      />
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p>공개 여부</p>
          <p style={{ fontSize: "small" }}>
            가입 승인 없이 모든 사람이 가입할 수 있게 합니다.
          </p>
        </div>
        <FormControlLabel
          onChange={handleChangeSwitch}
          control={<Switch checked={isOpenData} />}
          label=""
        />
      </div>
    </BasicModal>
  );
}

export default GroupEditModal;
