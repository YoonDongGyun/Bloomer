import { Navigate } from "react-router-dom";
import { localData } from "../redux/modules/user/token";

const withAuth = (props: any) => {
  return localData.getAccessToken() ? props : <Navigate to="/login" />;
};

export default withAuth;
