import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

export const SModal = styled(Modal)`
  .MuiBackdrop-root {
    position: relative;
    margin: auto;
    width: 100%;
    height: 100%;
    max-width: 480px;
  }
  .MuiPaper-root {
    margin: auto;
    width: 100%;
    max-width: 480px;
    border-radius: 50px 50px 0 0;
  }
  .modal__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translate(-50%, -50%); */
    width: 370px;
    background-color: #ffffff;
  }
`;
