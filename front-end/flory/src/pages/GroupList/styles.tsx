import styled from "styled-components";

export const SMain = styled.main`
  width: 100%;
  height: 100%;

  .search__wrappers {
    position: relative;
    width: 90%;
    height: 120px;
    margin: auto;
    padding-top: 3.3rem;
  }

  .grouplist__wrapper {
    width: 90%;
    height: calc(100% - 120px);
    margin: auto;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
