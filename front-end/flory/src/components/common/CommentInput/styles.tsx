import styled from "styled-components";

export const SDiv = styled.div`
  display: flex;
  align-items: center;
  .comment__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .icon__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .avatar {
    width: 2.5rem;
    margin-right: 0.25rem;
  }
  .txt {
    width: 100%;
  }
  .icon {
    margin-left: 0.5rem;
  }
`;

export const STextarea = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  border-radius: 15px;
  border: 2px solid #dec5fd;
  display: flex;
  padding: 0.25rem 0.5rem;

  .inputArea {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    font-family: "S-CoreDream-3Light";
  }
`;
