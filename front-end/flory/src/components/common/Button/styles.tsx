import styled, { css } from "styled-components"

export const SButton = styled.button<any>`
  font-family: "S-CoreDream-5Medium";
  letter-spacing: 0.1rem;
  ${(props) => {
    return css`
      position: ${props.addStyle.position};
      top: ${props.addStyle.top};
      right: ${props.addStyle.right};
      padding: ${props.addStyle.padding};
      margin: ${props.addStyle.margin};
      font-size: ${props.addStyle.fontSize};
      width: ${props.addStyle.width};
      height: ${props.addStyle.height};
      background-color: ${props.addStyle.backgroundColor};
      background: ${props.addStyle.background1};
      background: ${props.addStyle.background2};
      color: ${props.addStyle.color};
      border-radius: ${props.addStyle.borderRadius};
      box-shadow: ${props.addStyle.boxShadow};
    `
  }}
`
