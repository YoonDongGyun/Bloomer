import styled from "styled-components";

export const SDiv = styled.div`
  width: 90%;
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
  .icon {
    position: absolute;
    left: 3%;
    top: 10%;
    color: #b0b0b0;
  }

  .active {
    color: #bfc6ff;
  }
`;
export const SInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 3px solid #bfc6ff;
  padding-left: 2.5rem;
  padding-bottom: 1rem;
`;
