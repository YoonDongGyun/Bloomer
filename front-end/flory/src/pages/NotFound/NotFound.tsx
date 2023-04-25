import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import { SMain } from "./styles";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <SMain>
      <BackButton color="purple" />
      <h1 id="title">404</h1>
      <h3 id="subtitle">잘못된 접근입니다.</h3>
      <div className="info__wrapper">
        <div
          className="background"
          onClick={() => {
            navigate("/");
          }}
        >
          메인으로
          {/* </button> */}
        </div>
      </div>
    </SMain>
  );
};

export default NotFound;
