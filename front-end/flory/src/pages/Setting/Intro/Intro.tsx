import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/common/BackButton/BackButton";
import { SMain } from "./styles";
import logo from "../../../assets/imgs/icon.png" 
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Intro = () => {
  const navigate = useNavigate();
  const handleEmailClick = () => {
    window.location.href = 'mailto:dlwltn0350@gmail.com';
  };

  return (
    <SMain>
      <BackButton color="purple" />
      {/* <img src={logo}></img> */}
      <h2 id="title">Bloomer</h2>
      <div className="info__wrapper">
        <p>Copyright 2023. 뚜벅초 inc. all rights reserved.</p>
      </div>
      <div className="email__wrapper">
        <div
          className="background"
          onClick={handleEmailClick}
        >
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <div>이메일</div>
        </div>
      </div>
    </SMain>
  );
};

export default Intro;
