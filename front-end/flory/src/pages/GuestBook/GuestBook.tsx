import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import GuestBookComment from "../../components/GuestBook/GuestBookComment/GuestBookComment";
import { getAllGuestBookList } from "../../redux/modules/guestBook";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import { SMain } from "./styles";
import {
  checkDetail,
  updateShowMusic,
} from "../../redux/modules/music/music-slice";

const GuestBook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const gardenData = location.state !== null ? location.state.gardenData : null;
  const gardenId = gardenData !== null ? gardenData.gardenId : null;
  const guestBookList = useAppSelector(
    (state) => state.guestBook.guestBookList
  );

  const userGardenId = useAppSelector(
    (state) => state.garden.gardenData.gardenId
  );

  useEffect(() => {
    if (gardenId !== null) {
      dispatch(getAllGuestBookList(gardenId));
    }
  }, []);

  const degArray = [2, -2, 0, 2, 2, -2];

  // dispatch(updateShowMusic(false));
  dispatch(checkDetail(false));

  const goBackToGarden = () => {
    if (gardenId == userGardenId) {
      navigate("/garden");
    } else {
      navigate(`/garden/${gardenData.userId}`);
    }
  };

  return (
    <>
      {gardenId === null ? (
        <div>잘못된 접근입니다</div>
      ) : (
        <SMain>
          <BackButton color="black" onClickAction={goBackToGarden} />
          <div className="title">{gardenData.nickname}님의 방명록</div>
          {/* 내 정원의 방명록에서는 내가 글을 작성하지 못하도록 글작성 버튼 숨기기 */}
          {gardenId !== userGardenId && (
            <div
              className="create"
              onClick={() =>
                navigate("/guestbook/create", { state: { gardenData } })
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          )}
          {guestBookList.length ? (
            guestBookList.map((item, index) => {
              return (
                <GuestBookComment
                  info={item}
                  deg={degArray[index % 6]}
                  key={index}
                />
              );
            })
          ) : (
            <div className="empty__guestbook">
              방명록을 통해 {gardenData.nickname} 님의 정원에 추억을 남겨보세요.
            </div>
          )}
        </SMain>
      )}
    </>
  );
};

export default GuestBook;
