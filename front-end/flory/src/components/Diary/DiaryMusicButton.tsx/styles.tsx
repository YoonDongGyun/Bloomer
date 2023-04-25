import styled, { css } from "styled-components";

export const SMusicWrapper = styled.button<any>`
  right: 16px;
  top: 16px;
  position: absolute;
  z-index: 2;

  ${(props) => {
    return css`
      right: ${props.where === "guestbook" ? "5rem" : "16px"};
      top: ${props.where === "guestbook" ? "1rem" : "16px"};
      background-color: ${props.where === "guestbook" ? "#ffffff" : ""};
      width: ${props.where === "guestbook" ? "3rem" : ""};
      height: ${props.where === "guestbook" ? "3rem" : ""};
      border-radius: ${props.where === "guestbook" ? "50%" : ""};
      box-shadow: ${props.where === "guestbook"
        ? "rgba(0, 0, 0, 0.25) 0px 4px 4px, rgba(0, 0, 0, 0.25) 0px 4px 4px"
        : ""};
    `;
  }}

  transition: all linear 300ms;

  /* 오디오 숨기기 */
  audio {
    display: none;
  }

  .icon {
    cursor: pointer;
    font-size: 1.8rem;
    color: white;
    filter: drop-shadow(1px 1px 1px #aaa);
  }

  .icon {
    ${(props) => {
      return css`
        color: ${props.where === "guestbook" ? "#000000" : "white"};
      `;
    }}
  }
`;
