import React from "react";
import Avatar from "../Avatar/Avatar";
import { STextarea, SDiv } from "./styles";
import TextareaAutosize from "react-textarea-autosize";
import SendIcon from "@mui/icons-material/Send";
import { StyledSendIcon } from "../StyledIcons/styledIcons";
import { IconButton } from "@mui/material";
import { useAppSelector } from "../../../redux/store.hooks";

interface CommentInputProps {
  contentInput: any;
  placeholder: string;
  createCommentHandler: any;
  page?: string;
}
function CommentInput({
  contentInput,
  placeholder,
  createCommentHandler,
  page,
}: CommentInputProps): JSX.Element {
  const userInfo = useAppSelector((state) => state.user.userData);

  return (
    <SDiv>
      <div className="avatar wrapper">
        <Avatar
          size="small"
          status="comment"
          src={userInfo.img}
          imgIdx={userInfo.img && userInfo.img.length > 2 ? "11" : userInfo.img}
        />
      </div>
      <STextarea>
        <div className="txt comment__wrapper">
          <TextareaAutosize
            className="inputArea"
            placeholder={placeholder}
            maxRows={3}
            ref={contentInput}
          />
        </div>
      </STextarea>
      <div className="icon icon__wrapper">
        <StyledSendIcon onClick={createCommentHandler} />
      </div>
    </SDiv>
  );
}

export default CommentInput;
