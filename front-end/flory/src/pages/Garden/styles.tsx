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

  .goto__info {
    /* position: absolute; */
    /* top: 1rem;
    left: 1rem; */
  }

  .moveToEdit {
    position: absolute;
    bottom: 5rem;
    right: 1.8rem;

    background-color: ${(props) =>
      props.gardenType === 0
        ? "rgb(222, 197, 253)"
        : props.gardenType === 1
        ? "#ffe604"
        : props.gardenType === 2
        ? "rgb(253 200 167)"
        : "white"};
    width: 2.5rem;
    height: 2.5rem;
    box-shadow: rgba(0, 0, 0, 0.14) 3px 3px 0px 0px;
    border-radius: 100%;

    transition: all 400ms ease;
  }

  .moveToEdit:hover {
    transform: scale(1.2);
    color: ${(props) =>
      props.gardenType === 0
        ? "#af5df8"
        : props.gardenType === 1
        ? "white"
        : "#E58649"};
  }

  .moveToInfo {
    position: absolute;
    top: 1rem;
    left: 1rem;

    background-color: ${(props) =>
      props.gardenType === 0
        ? "rgb(222, 197, 253)"
        : props.gardenType === 1
        ? "#ffe604"
        : props.gardenType === 2
        ? "rgb(253 200 167)"
        : "white"};

    width: 2.5rem;
    height: 2.5rem;
    box-shadow: rgba(0, 0, 0, 0.14) 3px 3px 0px 0px;
    border-radius: 100%;

    transition: all 400ms ease;
  }

  .moveToInfo:hover {
    transform: scale(1.2);
    color: ${(props) =>
      props.gardenType === 0
        ? "#af5df8"
        : props.gardenType === 1
        ? "white"
        : "#E58649"};
  }
`;
