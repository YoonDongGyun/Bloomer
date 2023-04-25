import { Navigate } from "react-router-dom";

const checkGarden = (props: any) => {
  return localStorage.getItem("newGarden") === "No" ? (
    props
  ) : (
    <Navigate to="/gardenTheme" />
  );
};

export default checkGarden;
