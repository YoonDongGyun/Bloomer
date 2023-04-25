import styled, { css } from "styled-components";

export const SSection = styled.div``;

export const SButton = styled.button<any>`
  ${(props) => {
    return css`
      margin: 0 0.5rem;
      color: ${props.addStyle.fontColor};
      border: 2px solid
        ${props.active ? props.addStyle.fontColor : props.addStyle.borderColor};
      font-size: 1rem;
      padding: 0.6rem 0.9rem;
      border-radius: 1.5rem;
      background-color: ${props.active ? props.addStyle.activeColor : ""};
      &:hover {
        background-color: ${props.addStyle.hoverColor};
        /* background-color: ${props.addStyle.activeColor}; */
        border: 2px solid ${props.addStyle.fontColor};
      }
    `;
  }}
`;
