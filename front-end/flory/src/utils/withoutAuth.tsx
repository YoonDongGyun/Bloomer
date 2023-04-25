import { Navigate } from "react-router-dom";
import { localData } from "../redux/modules/user/token";

const withoutAuth = (props: any) => {
  return localData.getAccessToken() ? <Navigate to="/garden" /> : props;
};

export default withoutAuth;
