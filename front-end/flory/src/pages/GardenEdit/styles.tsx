import styled from "styled-components";

export const SMain = styled.main<any>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.gardenType === 1
      ? "#fbee9d"
      : props.gardenType === 0
      ? "#9B31B8"
      : props.gardenType === 2
      ? "#E58649"
      : "white"};

  .info__wrapper {
    cursor: pointer;
    position: absolute;
    bottom: 1rem;
    width: 100%;
    /* height: 25%; */
    display: flex;
    justify-content: center;
    align-items: center;

    .background {
      z-index: 10;
      background-color: rgba(255, 255, 255, 0.32);
      padding: 0.3rem 1rem;
      border-radius: 12px;
      border: 2px solid var(--color-white);
      transition: all linear 300ms;
    }

    p {
      font-size: 1rem;
      color: ${(props) => (props.gardenType === 1 ? "#ffc089" : "#ffffff")};
      z-index: 10;
      transition: all linear 300ms;
      user-select: none;
    }
  }

  .info__wrapper:hover {
    .background {
      background-color: rgba(255, 255, 255, 0.5);
    }

    p {
      color: ${(props) =>
        props.gardenType === 0
          ? "#af5df8"
          : props.gardenType === 1
          ? "#ffe604"
          : "#E58649"};
    }
  }
`;
