import styled from "styled-components";

export const SNavWrapper = styled.div<any>`
  position: ${(props) => (props.absolute ? "absolute" : "sticky")};
  bottom: ${(props) =>
    props.absolute ? "0" : props.bottomZero ? "0" : "1rem"};
  max-width: 480px;
  width: 100%;
  padding: 0 1.5rem;
  background: transparent;
`;

export const SNavbar = styled.menu`
  background-color: #2e2162;
  /* font-size: 1.5em; */
  /* padding: 0 2.85em; */
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 16px;

  .button__wrapper {
    /* border: 3px solid #2e2162;
    border-radius: 50%; */
  }

  .wrapper__active {
    transform: scale(1.2);
  }

  /* 아이콘을 감싸는 버튼 */
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 7px solid #2e2162;
  }

  .button__active {
    background-color: #dec5fd;
  }

  .nav__item {
    color: var(--color-white);
    width: 1rem;
    height: 1rem;
    padding: 1rem 0;
  }

  .item__active {
    color: #9a1aff;
  }
`;
