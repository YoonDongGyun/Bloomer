import styled from "styled-components"

export const SMain = styled.div<any>`
  position: absolute;
  width: 4rem;
  background-color: ${(props) =>
    props.type === "day" ? "rgba(0, 0, 0, 0.187)" : "rgba(255, 255, 255, 0.3)"};
  border-radius: 10px;
  padding: 0.3rem;
  text-align: center;
  bottom: 2.5rem;
  right: 5%;
  z-index: 100;

  .weather-icon {
    height: 1.7rem;
  }

  .info-container {
    color: white;
    display: flex;
    flex-direction: column;

    div {
      font-size: 0.5rem;
    }
  }
`
