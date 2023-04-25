import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store.hooks";
import { getUserDataToTokenAction } from "../../redux/modules/user";

const OauthRedirect = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const search = params.search;
    const splitedSearch = search.split("&&");

    const userId = +splitedSearch[2].slice(7);

    // 기존 유저면 0
    // 신규 유저면 1
    const isNewUser = +splitedSearch[3].slice(8);

    localStorage.setItem("refreshToken", splitedSearch[0].slice(14));
    localStorage.setItem("accessToken", splitedSearch[1].slice(12));

    // 신규 유저이면
    if (isNewUser === 1) {
      localStorage.setItem("newGarden", "Yes");
      navigate("/signup/music", {
        state: {
          update: true,
          userId,
        },
      });
      // 기존 유저이면
    } else {
      localStorage.setItem("newGarden", "No");
      localStorage.setItem("refreshToken", splitedSearch[0].slice(14));
      localStorage.setItem("accessToken", splitedSearch[1].slice(12));
      dispatch(getUserDataToTokenAction()).then(() => {
        if (localStorage.getItem("newGarden") === "No") {
          navigate("/garden");
        } else {
          navigate("/gardenTheme");
        }
      });
    }
  }, []);

  return <></>;
};

export default OauthRedirect;
