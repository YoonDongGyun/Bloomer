import styled from "styled-components";

export const SMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(144, 91, 241);
  background: linear-gradient(
    140deg,
    rgba(144, 91, 241, 1) 0%,
    rgba(232, 73, 158, 1) 100%
  );
  overflow: hidden;
  #title {
    font-size: 100px;
    font-family: "Niconne";
    color: #ffffff;
    text-align: center;
    margin: 0;
    text-shadow: #805f89 5px 4px 2px;
  }
  .info__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Cafe24Shiningstar";
    font-size: 60px;
  }

  .email__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;

    .background {
      background-color: rgba(255, 255, 255, 0.32);
      padding: 0.4rem 6rem;
      border-radius: 12px;
      border: 2.4px solid var(--color-white);

      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.3rem;
      color: var(--color-white);
      z-index: 10;
    }
  }
`;
