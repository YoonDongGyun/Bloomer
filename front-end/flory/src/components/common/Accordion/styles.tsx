import styled from "styled-components";

export const SAccordion = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid silver;

  .title {
    float: left;
    color: black;
  }

  .select-icon {
    cursor: pointer;
    color: black;
    float: left;
    font-size: 1.8rem;
    margin-right: 20px;
  }

  .down-icon {
    cursor: pointer;
    color: black;
    float: right;
  }
`;
