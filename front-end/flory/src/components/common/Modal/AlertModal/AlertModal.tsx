import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../../Button/Button";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import "./styles.css";
import { SModal } from "./styles";

const style: any = {
  // position: "absolute" as "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: 370,
  // bgcolor: "#ffffff",
  boxShadow: 24,
};

interface AlertModalProps {
  open: boolean;
  handleClose: () => void;
  content: string;
  action?: () => void;
  additionBtn?: boolean;
}

const AlertModal = ({
  open,
  handleClose,
  content,
  action,
  additionBtn,
}: AlertModalProps) => {
  const handleCloseModal = () => {
    if (action) {
      action();
      handleClose();
    } else {
      handleClose();
    }
  };

  const handleCancleModal = () => {
    handleClose();
  };

  // \n 인식시키기
  const convertNewLineToBreak = (str: string) => {
    return str.split("\n").map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    // <div>
    <SModal
      open={open}
      onClose={handleCancleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal__wrapper modal__style" style={style}>
        <RiErrorWarningLine color="#b3b1c5" size={"60px"} />
        <Typography
          id="modal-modal-title"
          variant="h6"
          // component="h1"
          style={{
            color: "black",
            fontSize: "1rem",
            whiteSpace: "pre-line",
            textAlign: "center",
            lineHeight: "1.8rem",
            marginBottom: "1rem",
          }}
        >
          {convertNewLineToBreak(content)}
        </Typography>

        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          {additionBtn && (
            <Button
              addStyle={{
                fontSize: "0.9rem",
                width: "48%",
                height: "2.5rem",
                color: "#ffffff",
                background1: "#c7c7c7",
                borderRadius: "15px",
              }}
              contents="취소"
              onClick={handleCancleModal}
            />
          )}
          <Button
            addStyle={{
              fontSize: "0.9rem",
              width: additionBtn ? "48%" : "100%",
              height: "2.5rem",
              color: "#ffffff",
              background1: "#645ac1",
              borderRadius: "15px",
            }}
            contents="확인"
            onClick={handleCloseModal}
          />
        </div>
      </div>
    </SModal>
    // </div>
  );
};

export default AlertModal;
