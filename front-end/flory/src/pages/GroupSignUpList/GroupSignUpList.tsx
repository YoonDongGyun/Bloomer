import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSignUpMemberListAction } from "../../redux/modules/group";
import { useAppDispatch } from "../../redux/store.hooks";
import GroupSignUpComment from "../../components/MyPage/GroupSignUpComment/GroupSignUpComment"
import BackButton from "../../components/common/BackButton/BackButton";
import { SMain } from "./styles";

const GroupSignUpList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = parseInt(location.pathname.slice(19));
  const [signupInfo, setSignupInfo] = useState<[]>();

  useEffect(() => {
    updateList();
  }, []);

  const updateList = () => {
    dispatch(getSignUpMemberListAction(groupId)).then((res) => {
      const response = res.payload.response;
      if (response) {
        setSignupInfo(response);
      }
    });
  };

  return (
    <SMain>
      <BackButton color="purple" />
      <div className="header">
        <div className="title">가입 신청자 목록</div>
        <hr></hr>
      </div>
      { signupInfo && signupInfo.length > 0 ? (
        signupInfo.map((group: any, idx: number) => {
          return (
            <GroupSignUpComment
              signupInfo={group}
              key={idx}
              updateList={updateList}
            />
          );
        })
      ) : (
          <div className="snone">신청 내역이 없습니다.</div>
      )}
    </SMain>
  );
};

export default GroupSignUpList;
