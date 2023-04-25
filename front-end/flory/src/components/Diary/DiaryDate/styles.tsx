import styled from "styled-components";

export const SContainer = styled.div`
  position: absolute;
  bottom: -0.7rem;
  /* top: 21vh; */
  left: 5%;
  display: flex;
  gap: 1rem;
  .date-picker {
    cursor: pointer;
  }
  .icon {
    font-size: 0.9rem;
  }
`;

export const SMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.1rem;
  font-weight: bold;
  color: #000000;
  background-color: white;
  height: 2.3rem;
  width: 2.3rem;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
