import styled from "styled-components";

export const SMain = styled.main<any>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.gardenType === 1
      ? "#fbee9d"
      : props.gardenType === 0
      ? "#9B31B8"
      : props.gardenType === 2
      ? "#E58649"
      : "white"};
`;
