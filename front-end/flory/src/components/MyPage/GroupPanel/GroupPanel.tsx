import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import Post from "../../common/Post/Post";
import Accordion from "../../../components/common/Accordion/Accordion";
import Avatar from "../../common/Avatar/Avatar";
import { SGroupPanel, SMember } from "./styles";
import { useSwipeable } from "react-swipeable";
import { convertNumFormat, diffTimeFormat } from "../../../utils/utils";
import GroupCreateModal from "../GroupCreateModal/GroupCreateModal";
import GroupEditModal from "../GroupEditModal/GroupEditModal";
import { getGroupInfoAction, deleteGroupMemberAction } from "../../../redux/modules/group/group-action";
import crownImg from "../../../assets/imgs/crown.png";

function GroupPanel({}): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userGroupList = useAppSelector((state) => state.group.userGroupList);
  const userId = useAppSelector((state) => state.user.userData.userId);

  useEffect(() => {
    dispatch(getGroupInfoAction());
  }, []);

  const deleteAction = (teamId: any, userId: any) => {
    dispatch(deleteGroupMemberAction({teamId: teamId, userId})).then(() => {
      dispatch(getGroupInfoAction());
    });
  };

  const handleSwipeRight = () => {
    setShowDeleteButton(false);
  };

  const handleSwipeLeft = () => {
    setShowDeleteButton(true);
  }
  
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const swipeConfig = useSwipeable({
    onSwipedRight: handleSwipeRight,
    onSwipedLeft: handleSwipeLeft,
    trackMouse: true,
    delta: 50,
  });

  return (
    <SGroupPanel>
    <div className="BrowseGroup" onClick={() => navigate("/group/list")}>
      그룹 둘러보기
    </div>
    <Post
      title="가입한 그룹 목록"
      content={
        <div>
          {userGroupList.length === 0 ? (
            <div className="default">
              그룹에 가입해보세요
            </div>
          ) : (
            userGroupList.map((group: any, index: any) => (
              <Accordion
                key={group.teamId}
                title={`${group.name} (${group.userTeamList.length})`}
                contents={
                  <div>
                    {group.manager === 0 && (
                      <GroupEditModal
                        groupId={group.teamId}
                      />
                    )}
                    {group.manager === 1 && (
                      <div className="secessionGroup" onClick={() => deleteAction(group.teamId, userId)}>그룹 탈퇴</div>
                    )}
                    {group.userTeamList.map((member: any, idx:any) => {
                      // const random = Math.floor(Math.random() * bgIcons.length);
                      const flowerIcon = member.flowerId ?
                        require(`../../../assets/imgs/flower_icon/icon_f${convertNumFormat(member.flowerId)}.png`)
                        : require(`../../../assets/imgs/flower_icon/icon_f01.png`);
                      
                      const handleMoveToOtherGarden = () => {
                        navigate(`/garden/${member.userId}`);
                      }
                      
                      return (
                        <SMember key={member.userId} {...swipeConfig}>
                          {member.img && member.img.length > 2 ? (
                            <Avatar
                              size="small"
                              src={member.img}
                              imgIdx={"11"}
                              key={index}
                              onClick={handleMoveToOtherGarden}
                            />
                          ) : (
                            <Avatar size="small"
                                imgIdx={member.img} key={member.userId}
                                onClick={handleMoveToOtherGarden}
                              />
                          )}
                          <br />
                          <div className="memberName">{member.nickname}</div>
                          {group.managerId === member.userId && (
                            <img src={crownImg} width={18} height={15} style={{marginLeft: "1px"}} />
                          )}
                          {member.lastTime && (
                            <div className="lastTime">{diffTimeFormat(member.lastTime)}시간전</div>
                          )}
                          <img className="icon_flower" src={flowerIcon} />
                          {showDeleteButton && group.manager === 0 &&  (
                            <button className="deleteButton" onClick={() => deleteAction(group.teamId, member.userId)}>
                              삭제
                            </button>
                          )}
                        </SMember>
                      );
                    })}
                  </div>
                }
              />
            ))
          )}
        </div>
      }
      addition={<GroupCreateModal />}
    />
  </SGroupPanel>
  )
}

export default GroupPanel
