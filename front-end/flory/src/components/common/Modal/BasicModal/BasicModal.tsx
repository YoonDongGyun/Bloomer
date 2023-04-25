import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Button from "../../Button/Button";
import { SDrawer, Puller, SModalContent } from "./styles";
import styled from "styled-components";

function BasicModal({
  children,
  modalButton,
  dispatchAction,
  deleteAction,
}: any): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    // setOpen(false);
    if (dispatchAction) {
      dispatchAction().then((res: boolean) => {
        if (res) {
          setOpen(false);
        }
      });
    } else {
      setOpen(false);
    }
  };

  const deleteClick = () => {
    if (deleteAction) {
      deleteAction();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const ModalContent = (
    <SModalContent role="presentation">
      <Puller />
      {children}
      {!deleteAction && (
        <Button
          // type="submit"
          onClick={handleClick}
          addStyle={{
            margin: "auto",
            fontSize: "1rem",
            width: "320px",
            height: "3rem",
            color: "#ffffff",
            // background1: "rgb(101,182,255)",
            // background2:
            //   "linear-gradient(90deg, rgba(101,182,255,1) 0%, rgba(139,92,246,1) 100%)",
            background1: "rgb(244,175,255)",
            background2:
              "linear-gradient(90deg, rgba(244,175,255,1) 0%, rgba(156,147,221,1) 58%, rgba(150,119,210,1) 100%)",
            borderRadius: "24px",
          }}
          contents="확인"
        />
      )}
      {deleteAction && (
        <div>
          <SButton style={{ marginRight: "1rem" }} onClick={handleClick}>
            <div>
              <p>변경</p>
            </div>
          </SButton>
          <SButton style={{ marginLeft: "1rem" }} onClick={deleteClick}>
            <div>
              <p>삭제</p>
            </div>
          </SButton>
        </div>
      )}
    </SModalContent>
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <div>
      <div onClick={toggleDrawer(true)}>{modalButton}</div>
      <SDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {ModalContent}
      </SDrawer>
    </div>
  );
}

export default BasicModal;

export const SButton = styled.button`
  width: 12rem;
  height: 3rem;
  background-color: #858aeb;
  border-radius: 30px;
  box-shadow: 5px 5px 5px #3737372d;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: var(--color-white);
      font-size: 14px;
    }
  }
`;
