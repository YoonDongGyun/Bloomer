import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { SButton } from "./styles";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  color?: string;
  onClickAction?: any;
}

function BackButton({ color, onClickAction }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleGoBack = onClickAction
    ? onClickAction
    : () => {
        // 뒤로가기
        navigate(-1);
      };
  return (
    <SButton color={color}>
      <FontAwesomeIcon
        className="back-icon"
        icon={faArrowLeft}
        onClick={handleGoBack}
      />
    </SButton>
  );
}

export default BackButton;
