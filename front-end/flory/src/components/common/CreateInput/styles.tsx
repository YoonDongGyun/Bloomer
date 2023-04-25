import styled from "styled-components"

export const STextarea = styled.textarea<any>`
  height: ${(props) =>
    props.page === "group" ? "60px" : props.isTotal ? "60%" : "50%"};
  width: ${(props) => (props.page === "group" ? "100%" : "90%")};
  background: #f2f2fc;
  border-radius: ${(props) => (props.page === "group" ? "10px" : "15px")};
  border: none;
  outline: none;
  padding: 10px;
  resize: none;
  font-family: "S-CoreDream-3Light";

  /* 스크롤바 */
  /* Chrome, Edge, and Safari */

  ::-webkit-scrollbar {
    display: none;
  }
`
